
import sharp from "sharp";

const input = "public/images/tresco-logo.png";
const output = "public/images/tresco-logo.webp";

await sharp(input)
  .resize({
    width: 400,
    withoutEnlargement: true,
  })
  .webp({ quality: 82 })
  .toFile(output);

console.log("Created optimized logo:", output);
