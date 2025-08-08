import { createCanvas, registerFont } from 'canvas';

registerFont('src/fonts/Roboto-VariableFont_wdth,wght.ttf', {
  family: 'Roboto',
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
