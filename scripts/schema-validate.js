const fs = require('node:fs');
const path = require('node:path');

const ROOTS = ['app', 'components', 'content', 'config', 'lib'];
const EXTENSIONS = new Set(['.ts', '.tsx']);

const issues = [];

function walk(dir) {
  if (!fs.existsSync(dir)) return [];

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...walk(fullPath));
      continue;
    }

    if (entry.isFile() && EXTENSIONS.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
}

function addIssue(file, message) {
  issues.push({ file, message });
}

for (const root of ROOTS) {
  for (const file of walk(root)) {
    const normalizedFile = file.replace(/\\/g, '/');

    if (normalizedFile.startsWith('app/api/')) {
      continue;
    }

    const text = fs.readFileSync(file, 'utf8');

    if (text.includes('http://localhost:3000')) {
      addIssue(file, 'SEO/schema source contains localhost fallback.');
    }

    if (/https:\/\/retreatsandtreks\.com(?![a-zA-Z0-9.-])/g.test(text)) {
      addIssue(file, 'SEO/schema source contains non-www retreatsandtreks.com URL.');
    }

    if (text.includes('/logo.png')) {
      addIssue(file, 'Schema/source references /logo.png, but the real logo lives under /Images/logo/.');
    }

    if (text.includes("template: '%s | Retreats And Treks'")) {
      addIssue(file, 'Metadata title template may duplicate already-branded page titles.');
    }
  }
}

if (issues.length > 0) {
  console.error('\nSchema validation failed:\n');

  for (const issue of issues) {
    console.error(`- ${issue.file}: ${issue.message}`);
  }

  console.error(`\n${issues.length} issue(s) found.\n`);
  process.exit(1);
}

console.log('Schema validation passed: no localhost, non-www canonical domain, missing logo, or duplicate title-template issues found.');
