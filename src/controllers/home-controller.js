import { Router } from 'express';

const homeController = Router();

homeController.get('/', (req,res) => {
    res.render('home', {title: 'Home Page'});
});

homeController.get('/volcanoes', (req,res) => {
    res.render('catalog', {title: 'All volcanoes'});
})

export default homeController;