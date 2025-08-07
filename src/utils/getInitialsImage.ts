import { createCanvas, registerFont } from 'canvas';

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

  // Text
  ctx.fillStyle = fontColor;
  ctx.font = `${size * 0.5}px ${fontFamily}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(email.slice(0, 2).toUpperCase(), size / 2, size / 2);

  return canvas.toBuffer('image/png');
};

export default getInitialsImage;
