import { Router } from 'express';
import gravatar from './controllers/gravatar';

const router = Router();

router.get('/gravatar', gravatar);

export default router;
