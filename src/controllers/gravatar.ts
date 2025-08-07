import type { Request, Response } from 'express';

/**
 * @openapi
 * /api/gravatar:
 *   get:
 *     summary: Returns a greeting
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Hello World
 */
const gravatar = (req: Request, res: Response) => {
  res.send('Hello World!');
};

export default gravatar;
