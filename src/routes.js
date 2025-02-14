import { Router } from 'express';
import homeController from './controllers/home-controller.js';
import authController from './controllers/auth-controller.js';

const router = Router();

router.use(homeController)
router.use('/auth', authController);

router.all('*', (req,res) => {
    res.render('404', {title: '404 Page'})
})

export default router;