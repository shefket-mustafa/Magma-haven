import { Router } from 'express';
import homeController from './controllers/home-controller.js';
import authController from './controllers/auth-controller.js';
import volcanoController from './controllers/volcano-controller.js';

const router = Router();

router.use(homeController)
router.use('/auth', authController);
router.use(volcanoController);

router.all('*', (req,res) => {
    res.render('404', {title: '404 Page'})
})

export default router;