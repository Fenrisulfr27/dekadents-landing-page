import sharp from "sharp";
import { promises as fs } from "fs";
import path from "path";

async function convertToWebP() {
  const assetsDir = "public/assets";
  const files = await fs.readdir(assetsDir);

  const imageFiles = files.filter(
    (file) =>
      file.endsWith(".png") || file.endsWith(".jpg") || file.endsWith(".jpeg"),
  );

  for (const file of imageFiles) {
    const inputPath = path.join(assetsDir, file);
    const outputPath = path.join(
      assetsDir,
      file.replace(/\.(png|jpg|jpeg)$/i, ".webp"),
    );

    console.log(`Converting ${file} to WebP...`);

    await sharp(inputPath).webp({ quality: 80, effort: 6 }).toFile(outputPath);

    console.log(`✓ Converted ${file} → ${path.basename(outputPath)}`);
  }
}

convertToWebP().catch(console.error);
