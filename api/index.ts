import { createServer } from 'http';
import { parse } from 'url';
import app from '../src/app';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const server = createServer(app);
  const parsedUrl = parse(req.url!, true);
  req.url = parsedUrl.path!;

  server.emit('request', req, res);
}
