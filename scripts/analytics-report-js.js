const fs = require('fs');
const path = require('path');

const EVENT_LOG = path.join(process.cwd(), 'data', 'events.jsonl');

function readEvents() {
  if (!fs.existsSync(EVENT_LOG)) {
    console.log('No events file');
    return [];
  }
  const raw = fs.readFileSync(EVENT_LOG, 'utf8');
  // Try line-based parse first\n+  let lines = raw.split(/\\r?\\n/).filter(Boolean);\n+  console.log('Raw lines read:', lines.length);\n+  let parsed = [];\n+  try {\n+    parsed = lines.map((l) => JSON.parse(l)).filter(Boolean);\n+    console.log('Line-JSON parsed:', parsed.length);\n+    if (parsed.length > 0) return parsed;\n+  } catch (e) {\n+    // fallthrough to regex method\n+  }\n+\n+  // Fallback: extract JSON objects via regex\n+  const objMatches = raw.match(/\\{[\\s\\S]*?\\}(?=\\s*\\{|\\s*$)/g) || [];\n+  console.log('Regex object matches:', objMatches.length);\n+  parsed = objMatches.map((s, i) => {\n+    try { return JSON.parse(s); } catch (err) { console.error('Regex parse error', i, err && err.message); return null; }\n+  }).filter(Boolean);\n+  console.log('Regex parsed objects:', parsed.length);\n+  return parsed;\n }
}

const events = readEvents();
console.log('\\nTotal events:', events.length);

const byType = events.reduce((acc, e) => { acc[e.event] = (acc[e.event]||0)+1; return acc; }, {});
console.log('\\nEvent type counts:');
Object.entries(byType).forEach(([k,v]) => console.log(' ', k, v));

console.log('\\nMost recent 10 events:');
events.slice(-10).reverse().forEach((e) => {
  console.log(' ', e.ts, e.event, e.from, e.to ? '→ '+e.to : '', e.meta ? JSON.stringify(e.meta) : '');
});

console.log('\\nCheck /api/track route presence:', fs.existsSync(path.join(process.cwd(), 'app','api','track','route.ts')) ? 'OK' : 'MISSING');

process.exit(0);

