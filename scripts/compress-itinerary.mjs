import sharp from 'sharp';
import { writeFileSync, statSync, mkdirSync } from 'fs';
import { resolve, basename } from 'path';

// Compress itinerary images directly to separate output paths
const images = [
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
  const buf = await sharp(full).resize(img.w).webp({ quality: 40, effort: 6 }).toBuffer();
  try {
    writeFileSync(full, buf);
    const afterSize = statSync(full).size;
    console.log(`${img.src}: ${Math.round(beforeSize/1024)}KB → ${Math.round(afterSize/1024)}KB`);
  } catch (e) {
    console.log(`⚠ ${img.src}: locked, skipping`);
  }
}
console.log('Done');
