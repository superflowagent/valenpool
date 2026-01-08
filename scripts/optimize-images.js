#!/usr/bin/env node
// scripts/optimize-images.js
// Simple helper: if 'sharp' is installed, convert gallery and clients images to webp and avif.

const fs = require('fs');
const path = require('path');

async function main() {
  let sharp;
  try {
    sharp = require('sharp');
  } catch (e) {
    console.log('sharp not installed. To enable image optimization run: npm i -D sharp');
    process.exit(0);
  }

  const folders = ['public/pool_photos/galery', 'public/pool_photos/clients'];
  for (const folder of folders) {
    const dir = path.resolve(folder);
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir).filter((f) => /\.(jpe?g|png)$/i.test(f));
    for (const file of files) {
      const input = path.join(dir, file);
      const base = file.replace(/\.[^.]+$/, '');
      const webp = path.join(dir, `${base}.webp`);
      const avif = path.join(dir, `${base}.avif`);
      try {
        await sharp(input).resize({ width: 1200 }).toFile(webp);
        await sharp(input).resize({ width: 1200 }).toFile(avif);
        console.log(`optimized ${input} -> ${webp}, ${avif}`);
      } catch (err) {
        console.error('error optimizing', input, err);
      }
    }
  }
  console.log('done');
}

main();