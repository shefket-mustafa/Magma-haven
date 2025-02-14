import { Router } from 'express';
import homeController from './controllers/home-controller.js';

const router = Router();

router.use(homeController)

router.all('*', (req,res) => {
    res.render('404', {title: '404 Page'})
})

export default router;