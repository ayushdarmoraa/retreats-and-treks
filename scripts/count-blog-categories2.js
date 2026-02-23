const fs = require('fs');
const path = require('path');

const DIR = path.join(process.cwd(), 'content', 'blogs');
const files = fs.readdirSync(DIR).filter((f) => f.endsWith('.ts'));
const counts = {};
for (const f of files) {
  const src = fs.readFileSync(path.join(DIR, f), 'utf8');
  const m = src.match(/category\\s*:\\s*['\"]([^'\"]+)['\"]/);
  if (m) {
    counts[m[1]] = (counts[m[1]] || 0) + 1;
  }
}
console.log('Counts across blog files:');
for (const [k, v] of Object.entries(counts)) {
  console.log(' ', k, v);
}
process.exit(0);

