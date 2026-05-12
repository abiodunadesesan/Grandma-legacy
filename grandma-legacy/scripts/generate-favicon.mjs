/**
 * Builds square PNG icons + multi-resolution favicon.ico from src/app/icon.png.
 * Run after changing the source portrait: `npm run favicon`
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const source = path.join(root, "src/app/icon.png");
const iconOut = path.join(root, "src/app/icon.png");
const appleOut = path.join(root, "src/app/apple-icon.png");
const icoOut = path.join(root, "src/app/favicon.ico");

async function main() {
  if (!fs.existsSync(source)) {
    console.error("Missing source:", source);
    process.exit(1);
  }

  const original = fs.readFileSync(source);
  const square = await sharp(original)
    .resize(512, 512, { fit: "cover", position: "centre" })
    .png()
    .toBuffer();

  fs.writeFileSync(iconOut, square);
  fs.writeFileSync(appleOut, square);

  const tmpSquare = path.join(root, ".favicon-square-tmp.png");
  fs.writeFileSync(tmpSquare, square);
  try {
    const ico = await pngToIco(tmpSquare);
    fs.writeFileSync(icoOut, ico);
  } finally {
    fs.unlinkSync(tmpSquare);
  }

  console.log("Wrote:", path.relative(root, iconOut), path.relative(root, appleOut), path.relative(root, icoOut));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
