// convert-to-webp.js

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputDir = '/workspaces/LuxBlinds/images'; // <- Set your input directory here

const supportedFormats = ['.webp', '.webp', '.webp', '.gif', '.bmp', '.tiff'];
const excludedFormats = ['.webp', '.ico'];

async function convertToWebP(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (excludedFormats.includes(ext)) return;

  const outputPath = filePath.replace(ext, '.webp');

  try {
    await sharp(filePath).toFile(outputPath);
    console.log(`Converted: ${filePath} → ${outputPath}`);
  } catch (err) {
    console.error(`Error converting ${filePath}:`, err.message);
  }
}

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath, callback);
    } else {
      callback(fullPath);
    }
  });
}

walkDir(inputDir, (filePath) => {
  const ext = path.extname(filePath).toLowerCase();
  if (supportedFormats.includes(ext)) {
    convertToWebP(filePath);
  }
});