import { Router } from 'express';
import homeController from './controllers/home-controller.js';

const router = Router();

router.use(homeController)

export default router;