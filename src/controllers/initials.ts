/**
 * @openapi
 * /api/initials:
 *   get:
 *     summary: Returns initials image
 *     parameters:
 *       - in: query
 *         name: initials
 *         schema:
 *           type: string
 *         required: true
 *         description: Initials
 *       - in: query
 *         name: bg
 *         schema:
 *           type: string
 *           example: ffffff
 *         required: false
 *         description: Fallback background color without hash
 *       - in: query
 *         name: color
 *         schema:
 *           type: string
 *           example: 3e3e3e
 *         required: false
 *         description: Fallback text color without hash
 *       - in: query
 *         name: font
 *         schema:
 *           type: string
 *           enum: [sans-serif, serif, urbanist, slab]
 *         required: false
 *         description: Fallback text font
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           image/png:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Missing params
 *         content:
 *           plain/text:
 *             schema:
 *               type: string
 *               example: Missing initials query param
 */
import type { Request, Response } from 'express';
import getInitialsImage from '../utils/getInitialsImage';

const gravatar = async (req: Request, res: Response) => {
  const { initials, bg, color, font } = req.query;

  if (initials && typeof initials === 'string') {
    const initialsText = initials.slice(0, 2).toUpperCase();
    const bgColor = typeof bg === 'string' ? `#${bg}` : '#ffffff';
    const fontColor = typeof color === 'string' ? `#${color}` : '#000000';
    const imageFont = typeof font === 'string' ? font : 'sans-serif';

    const imageBuffer = getInitialsImage(
      initialsText,
      bgColor,
      fontColor,
      imageFont,
    );
    res.setHeader('Content-Type', 'image/png');
    return res.send(imageBuffer);
  } else {
    res.status(400).send('Missing initials query param');
  }
};

export default gravatar;
