import { Router } from 'express';
import volcanoService from '../services/volcano-service.js';
import { getErrorMessage } from '../utils/errorUtils.js';

function getVolcanoTypeViewData({typeVolcano}){
    const volcanoTypes = [
        "Supervolcanoes",
          "Submarine",
          "Subglacial",
          "Mud",
          "Stratovolcanoes",
          "Shield"
    ];
    const viewData = volcanoTypes.map(type => ({value: type, label: type, selected: typeVolcano === type ? 'selected' : ''}));

    return viewData;
}

const volcanoController = Router();

volcanoController.get('/create', (req,res) => {
    const volcanoTypes = getVolcanoTypeViewData({} );
    res.render('create', {title: 'Create Volcano Wiki', volcanoTypes})
});

volcanoController.post('/create', async (req,res) => {
    const volcanoData = req.body;
    const userId = req.user._id;

    try{

        await volcanoService.create(volcanoData, userId);
        res.redirect('/volcanoes');
    }catch(err){
        const error = getErrorMessage(err);
        const volcanoTypeData = getVolcanoTypeViewData(volcanoData)
        res.render('create', { title: 'Create Volcano Wiki', volcanoData, volcanoTypes: volcanoTypeData, error});
    }

});


volcanoController.get('/volcanoes', async (req,res) => {
    const volcanoes = await volcanoService.getAll().lean();
    res.render('catalog', {title: 'All volcanoes', volcanoes});
});

volcanoController.get('/:volcanoId/details', (req,res) => {
    res.render('details', {title: 'Details Page'})
})
export default volcanoController;