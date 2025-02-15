import { Router } from 'express';
import volcanoService from '../services/volcano-service.js';
import { getErrorMessage } from '../utils/errorUtils.js';

const volcanoController = Router();

volcanoController.get('/create', (req,res) => {
    res.render('create', {title: 'Create Volcano Wiki'})
});

volcanoController.post('/create', async (req,res) => {
    const volcanoData = req.body;
    const userId = req.user._id;

    try{

        await volcanoService.create(volcanoData, userId);
        res.redirect('/volcanoes');
    }catch(err){
        const error = getErrorMessage(err);
        res.render('create', { title: 'Create Volcano Wiki', volcanoData, error});
    }

});

export default volcanoController;