const fs = require('fs');
const path = require('path');

const BLOG_INDEX = path.join(process.cwd(), 'content', 'blogs', 'index.ts');
if (!fs.existsSync(BLOG_INDEX)) {
  console.error('blog index not found');
  process.exit(1);
}

const src = fs.readFileSync(BLOG_INDEX, 'utf8');
const regex = /category:\\s*'([^']+)'/g;
const counts = {};
let m;
while ((m = regex.exec(src)) !== null) {
  const cat = m[1];
  counts[cat] = (counts[cat] || 0) + 1;
}

console.log('Blog category counts:');
Object.entries(counts).forEach(([k, v]) => console.log(' ', k, v));

process.exit(0);

