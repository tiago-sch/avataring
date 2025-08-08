import { createCanvas, registerFont } from 'canvas';
import path from 'path';
import fs from 'fs';

const FONTS: [string, string][] = [
  ['Roboto', 'Roboto-VariableFont_wdth,wght.ttf'],
  ['Roboto Serif', 'RobotoSerif-VariableFont_GRAD,opsz,wdth,wght.ttf'],
  ['Roboto Slab', 'RobotoSlab-VariableFont_wght.ttf'],
  ['Urbanist', 'Urbanist-VariableFont_wght.ttf'],
];

FONTS.forEach(([fontName, fontFile]) => {
  const fontPath = path.resolve(__dirname, '../fonts/', fontFile);
  if (fs.existsSync(fontPath)) {
    registerFont(fontPath, { family: fontName });
  }
});

registerFont('src/fonts/RobotoSerif-VariableFont_GRAD,opsz,wdth,wght.ttf', {
  family: 'Roboto Serif',
});
registerFont('src/fonts/RobotoSlab-VariableFont_wght.ttf', {
  family: 'Roboto Slab',
});
registerFont('src/fonts/Urbanist-VariableFont_wght.ttf', {
  family: 'Urbanist',
});

const getInitialsImage = (
  email: string,
  backgroundColor = '#cccccc',
  fontColor = '#000000',
  fontFamily = 'sans-serif',
) => {
  const size = 128;
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, size, size);

  let fontName = 'Roboto';
  if (fontFamily === 'serif') {
    fontName = 'Roboto Serif';
  }
  if (fontFamily === 'slab') {
    fontName = 'Roboto Slab';
  }
  if (fontFamily === 'urbanist') {
    fontName = 'Urbanist';
  }

  // Text
  ctx.fillStyle = fontColor;
  ctx.font = `${size * 0.5}px ${fontName}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(email.slice(0, 2).toUpperCase(), size / 2, size / 2);

  return canvas.toBuffer('image/png');
};

export default getInitialsImage;
