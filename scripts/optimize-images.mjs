
import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const root = path.resolve("public/images/books");
const widths = [320, 480, 640];

async function processImages(dir) {
  const files = await fs.readdir(dir, { withFileTypes: true });

  for (const file of files) {
    const fullPath = path.join(dir, file.name);

    if (file.isDirectory()) {
      await processImages(fullPath);
      continue;
    }

    if (!/\.(jpe?g|png)$/i.test(file.name)) continue;

    const metadata = await sharp(fullPath).metadata();
    const extension = path.extname(file.name);
    const base = fullPath.slice(0, -extension.length);

    // Generate one compressed WebP at the original dimensions.
    await sharp(fullPath)
      .webp({ quality: 80 })
      .toFile(`${base}.webp`);

    // Generate smaller variants only when useful.
    for (const width of widths) {
      if (metadata.width > width) {
        await sharp(fullPath)
          .resize({ width, withoutEnlargement: true })
          .webp({ quality: 80 })
          .toFile(`${base}-${width}.webp`);
      }
    }

    console.log(`Optimized ${file.name}`);
  }
}

await processImages(root);
console.log("Book image optimization complete.");
