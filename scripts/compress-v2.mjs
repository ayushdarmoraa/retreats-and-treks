import sharp from 'sharp';
import { statSync, mkdirSync } from 'fs';
import { resolve } from 'path';

// Write compressed versions to separate directories, then robocopy them
const dirs = {
  'scripts/tmp/kedarkantha': 'public/Images/trek/itinerary/kedarkantha',
  'scripts/tmp/har-ki-dun': 'public/Images/trek/itinerary/har-ki-dun',
};

const images = [
  { src: 'public/Images/trek/itinerary/kedarkantha/day1.webp', out: 'scripts/tmp/kedarkantha/day1.webp', w: 600 },
  { src: 'public/Images/trek/itinerary/kedarkantha/day2.webp', out: 'scripts/tmp/kedarkantha/day2.webp', w: 1200 },
  { src: 'public/Images/trek/itinerary/kedarkantha/day3.webp', out: 'scripts/tmp/kedarkantha/day3.webp', w: 600 },
  { src: 'public/Images/trek/itinerary/kedarkantha/day4.webp', out: 'scripts/tmp/kedarkantha/day4.webp', w: 1200 },
  { src: 'public/Images/trek/itinerary/kedarkantha/day5.webp', out: 'scripts/tmp/kedarkantha/day5.webp', w: 600 },
  { src: 'public/Images/trek/itinerary/har-ki-dun/day1.webp', out: 'scripts/tmp/har-ki-dun/day1.webp', w: 1200 },
  { src: 'public/Images/trek/itinerary/har-ki-dun/day2.webp', out: 'scripts/tmp/har-ki-dun/day2.webp', w: 600 },
  { src: 'public/Images/trek/itinerary/har-ki-dun/day3.webp', out: 'scripts/tmp/har-ki-dun/day3.webp', w: 1200 },
  { src: 'public/Images/trek/itinerary/har-ki-dun/day4.webp', out: 'scripts/tmp/har-ki-dun/day4.webp', w: 600 },
  { src: 'public/Images/trek/itinerary/har-ki-dun/day5.webp', out: 'scripts/tmp/har-ki-dun/day5.webp', w: 600 },
];

for (const dir of Object.keys(dirs)) {
  mkdirSync(resolve(dir), { recursive: true });
}

for (const img of images) {
  const src = resolve(img.src);
  const out = resolve(img.out);
  const before = statSync(src).size;
  await sharp(src).resize(img.w).webp({ quality: 40, effort: 6 }).toFile(out);
  const after = statSync(out).size;
  console.log(`${img.src}: ${Math.round(before/1024)}KB → ${Math.round(after/1024)}KB`);
}
console.log('\\nNow run: robocopy scripts\\\\tmp\\\\kedarkantha public\\\\Images\\\\trek\\\\itinerary\\\\kedarkantha *.webp /IS');
console.log('And: robocopy scripts\\\\tmp\\\\har-ki-dun public\\\\Images\\\\trek\\\\itinerary\\\\har-ki-dun *.webp /IS');
