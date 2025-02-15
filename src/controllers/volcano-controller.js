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

volcanoController.get('/:volcanoId/details',async (req,res) => {
    const volcano = await volcanoService.getOne(req.params.volcanoId).lean(); 
    const isOwner = volcano.owner == req.user?._id;
    const isVoted = volcano.voteList.some(userId => userId == req.user?._id);
    const voteCount = volcano.voteList.length;

    res.render('details', {title: 'Details Page', volcano, isOwner, isVoted, voteCount});
});

volcanoController.get('/:volcanoId/vote', async (req,res) => {
    const volcanoId = req.params.volcanoId;
    const userId  = req.user._id;
    
    try{
        await volcanoService.vote(volcanoId, userId);
        res.redirect(`/${volcanoId}/details`);
    }catch(err){

    }

})
export default volcanoController;