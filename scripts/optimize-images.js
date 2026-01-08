#!/usr/bin/env node
// scripts/optimize-images.js
// Helper: convert gallery and clients images to webp and avif using sharp (quiet mode)

const fs = require('fs');
const path = require('path');

async function main() {
    let sharp;
    try {
        sharp = require('sharp');
    } catch (e) {
        // sharp not available; exit silently (CI will install required deps)
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
                // only write if target doesn't exist or is older than source
                const srcStat = fs.statSync(input);
                let write = false;
                try { const tStat = fs.statSync(webp); if (tStat.mtimeMs < srcStat.mtimeMs) write = true; } catch { write = true; }
                if (write) await sharp(input).resize({ width: 1200 }).toFile(webp);

                write = false;
                try { const tStat = fs.statSync(avif); if (tStat.mtimeMs < srcStat.mtimeMs) write = true; } catch { write = true; }
                if (write) await sharp(input).resize({ width: 1200 }).toFile(avif);
            } catch (err) {
                // Fail loudly on CI to show action failed
                console.error('error optimizing', input, err);
                process.exit(1);
            }
        }
    }
}

main();