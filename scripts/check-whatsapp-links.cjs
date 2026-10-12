'use strict';

const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const SOURCE_EXTENSIONS = new Set(['.cjs', '.js', '.jsx', '.mjs', '.ts', '.tsx']);
const WHATSAPP_ORIGIN = ['https:', '', 'wa.me'].join('/');
const LEGACY_HOME_URL = `${WHATSAPP_ORIGIN}/919760446101`;
const WHATSAPP_URL_PATTERN =
  /https?:\/\/(?:wa\.me|api\.whatsapp\.com|(?:www\.)?whatsapp\.com\/send)\b[^\s"'`<>)]*/gi;
const BARE_WHATSAPP_DOMAIN_PATTERN = /\b(?:wa\.me|api\.whatsapp\.com|(?:www\.)?whatsapp\.com\/send)\b/i;
const WHATSAPP_NUMBER_PATTERN = /(?:\+?\s*91[\s-]?)?97604[\s-]?46101/;
const LINK_SINK_PATTERN = /\b(?:href|window\.open|window\.location|location\.href|bookingUrl|whatsappLink)\b/i;
const DYNAMIC_WHATSAPP_OPEN_PATTERN =
  /\bwindow\.open\s*\([^)]*\b(?:whatsapp|wa(?:Url|Link|Href))\w*\b/i;

const ALLOWLIST = [
  {
    file: 'lib/whatsapp.ts',
    reason: 'The shared URL builder and configured business WhatsApp number.',
    matches: () => true,
  },
  {
    file: 'next.config.ts',
    reason: 'The Content-Security-Policy form-action origin, not a visitor CTA.',
    matches: (line) => line.trim() === `"form-action 'self' ${WHATSAPP_ORIGIN}",`,
  },
  {
    file: 'app/HomeClient_clean.tsx',
    reason: 'Two legacy WhatsApp links in the confirmed-unused clean snapshot.',
    matches: (line) =>
      line.trim() ===
        `const whatsappLink = \`${LEGACY_HOME_URL}?text=\${encodeURIComponent(whatsappMessage)}\`;` ||
      line.includes(
        `<a href="${LEGACY_HOME_URL}?text=Hi%2C%20I%20want%20to%20plan%20a%20custom%20retreat.`,
      ),
  },
  {
    file: 'scripts/verify-yoga-analytics.cjs',
    reason: 'An isolated test fixture passed to the tracked-link component.',
    matches: (line) =>
      line.trim() ===
      `const link = TrackedWhatsAppLink({ href: '${LEGACY_HOME_URL}', children: 'Ask', ...props });`,
  },
  {
    file: 'components/ArtFixedDepartures.test.tsx',
    reason: 'Asserts the shared handoff URL origin; it does not create a CTA.',
    matches: (line) => line.trim() === `assert.equal(handoffUrl.origin, '${WHATSAPP_ORIGIN}');`,
  },
];

function normalizeFilePath(filePath) {
  return filePath.split(path.sep).join('/');
}

function isAllowed(filePath, line) {
  const rule = ALLOWLIST.find((entry) => entry.file === filePath);
  return rule ? rule.matches(line) : false;
}

function scanSource(filePath, source) {
  const normalizedPath = normalizeFilePath(filePath);
  const violations = [];
  const lines = source.split(/\r?\n/);

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const matches = [...line.matchAll(WHATSAPP_URL_PATTERN)].map((match) => match[0]);
    const hasWhatsAppDomain = BARE_WHATSAPP_DOMAIN_PATTERN.test(line);

    if (hasWhatsAppDomain && LINK_SINK_PATTERN.test(line) && matches.length === 0) {
      matches.push(line.match(BARE_WHATSAPP_DOMAIN_PATTERN)[0]);
    }

    if (
      matches.length === 0 &&
      WHATSAPP_NUMBER_PATTERN.test(line) &&
      LINK_SINK_PATTERN.test(line)
    ) {
      matches.push(line.match(WHATSAPP_NUMBER_PATTERN)[0]);
    }

    if (DYNAMIC_WHATSAPP_OPEN_PATTERN.test(line) && matches.length === 0) {
      matches.push(line.trim());
    }

    if (isAllowed(normalizedPath, line)) {
      continue;
    }

    for (const match of matches) {
      violations.push({
        file: normalizedPath,
        line: index + 1,
        match,
      });
    }
  }

  return violations;
}

function listSourceFiles(repositoryPath) {
  const trackedFiles = execFileSync(
    'git',
    ['ls-files', '--cached', '--others', '--exclude-standard'],
    { cwd: repositoryPath, encoding: 'utf8' },
  )
    .split(/\r?\n/)
    .filter(Boolean);

  return trackedFiles.filter((file) => SOURCE_EXTENSIONS.has(path.extname(file).toLowerCase()));
}

function scanRepository(repositoryPath = process.cwd()) {
  const files = listSourceFiles(repositoryPath);
  return files.flatMap((file) => {
    const absolutePath = path.join(repositoryPath, file);
    return scanSource(file, fs.readFileSync(absolutePath, 'utf8'));
  });
}

function formatViolations(violations) {
  return violations.map(({ file, line, match }) => `${file}:${line}: raw WhatsApp link (${match})`).join('\n');
}

if (require.main === module) {
  const violations = scanRepository();
  if (violations.length > 0) {
    console.error(formatViolations(violations));
    process.exitCode = 1;
  } else {
    console.log('WhatsApp link check passed.');
  }
}

module.exports = { ALLOWLIST, formatViolations, scanSource };
