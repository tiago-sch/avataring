import { Router } from 'express';
import gravatar from './controllers/gravatar';
import initials from './controllers/initials';

const router = Router();

router.get('/gravatar', gravatar);
router.get('/initials', initials);

export default router;
