import sharp from 'sharp';
import { writeFileSync, statSync, copyFileSync, mkdirSync } from 'fs';
import { resolve, basename, dirname } from 'path';

mkdirSync('scripts/tmp', { recursive: true });

const images = [
  { src: 'public/Images/location/sankri.webp', w: 1200 },
  { src: 'public/Images/trek/region/harkidun-valley.webp', w: 800 },
  { src: 'public/Images/trek/region/kedarkantha-summit.webp', w: 800 },
  { src: 'public/Images/trek/itinerary/kedarkantha/day1.webp', w: 600 },
  { src: 'public/Images/trek/itinerary/kedarkantha/day2.webp', w: 1200 },
  { src: 'public/Images/trek/itinerary/kedarkantha/day3.webp', w: 600 },
  { src: 'public/Images/trek/itinerary/kedarkantha/day4.webp', w: 1200 },
  { src: 'public/Images/trek/itinerary/kedarkantha/day5.webp', w: 600 },
  { src: 'public/Images/trek/itinerary/har-ki-dun/day1.webp', w: 1200 },
  { src: 'public/Images/trek/itinerary/har-ki-dun/day2.webp', w: 600 },
  { src: 'public/Images/trek/itinerary/har-ki-dun/day3.webp', w: 1200 },
  { src: 'public/Images/trek/itinerary/har-ki-dun/day4.webp', w: 600 },
  { src: 'public/Images/trek/itinerary/har-ki-dun/day5.webp', w: 600 },
];

for (const img of images) {
  const full = resolve(img.src);
  const beforeSize = statSync(full).size;
  const tmpPath = resolve('scripts/tmp', basename(img.src));
  await sharp(full).resize(img.w).webp({ quality: 40, effort: 6 }).toFile(tmpPath);
  const afterSize = statSync(tmpPath).size;
  console.log(`${basename(img.src)}: ${Math.round(beforeSize/1024)}KB → ${Math.round(afterSize/1024)}KB (saved ${Math.round((beforeSize-afterSize)/1024)}KB)`);
  // Copy back
  try {
    copyFileSync(tmpPath, full);
  } catch (e) {
    console.log(`  ⚠ Could not overwrite ${basename(img.src)} (file locked). Will need manual copy.`);
  }
}
console.log('Done. If any files were locked, run: copy scripts\\tmp\\*.webp back manually.');
