/**
 * @openapi
 * /api/gravatar:
 *   get:
 *     summary: Returns gravatar image or fallback
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Email of the user to get gravatar
 *       - in: query
 *         name: fb
 *         schema:
 *           type: string
 *         required: false
 *         description: Fallback initials
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
 *           enum: [sans-serif, serif, monospace, Arial, Roboto, Verdana, 'Courier New', 'Times New Roman', Georgia]
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
 *               example: Missing email query param
 *       500:
 *         description: Internal Error
 *         content:
 *           plain/text:
 *             schema:
 *               type: string
 *               example: Internal Error
 */
import type { Request, Response } from 'express';
import CryptoJS from 'crypto-js';
import { pipeline } from 'stream';
import { promisify } from 'util';
import getInitialsImage from '../utils/getInitialsImage';

const streamPipeline = promisify(pipeline);

const gravatar = async (req: Request, res: Response) => {
  const { email, fb, bg, color, font } = req.query;

  if (email && typeof email === 'string') {
    const hashedEmail = CryptoJS.SHA256(email).toString();
    const gravatarUrl = `https://www.gravatar.com/avatar/${hashedEmail}?d=404`;

    try {
      const response = await fetch(gravatarUrl);

      if (response.ok && response.body) {
        res.setHeader('Content-Type', 'image/png');
        await streamPipeline(response.body, res);
      } else {
        const fallback = typeof fb === 'string' ? fb : email;
        const fallbackText = fallback
          ? fallback.slice(0, 2).toUpperCase()
          : '??';
        const bgColor = typeof bg === 'string' ? `#${bg}` : '#ffffff';
        const fontColor = typeof color === 'string' ? `#${color}` : '#000000';
        const imageFont = typeof font === 'string' ? font : 'sans-serif';

        const imageBuffer = getInitialsImage(
          fallbackText,
          bgColor,
          fontColor,
          imageFont,
        );
        res.setHeader('Content-Type', 'image/png');
        return res.send(imageBuffer);
      }
    } catch (err) {
      res.status(500).send('Internal Error');
    }
  } else {
    res.status(400).send('Missing email query param');
  }
};

export default gravatar;
