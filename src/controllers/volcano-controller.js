import { Router } from "express";
import volcanoService from "../services/volcano-service.js";
import { getErrorMessage } from "../utils/errorUtils.js";
import { isAuth } from "../middlewares/authMiddleware.js";

function getVolcanoTypeViewData({ typeVolcano }) {
  const volcanoTypes = [
    "Supervolcanoes",
    "Submarine",
    "Subglacial",
    "Mud",
    "Stratovolcanoes",
    "Shield",
  ];
  const viewData = volcanoTypes.map((type) => ({
    value: type,
    label: type,
    selected: typeVolcano === type ? "selected" : "",
  }));

  return viewData;
}

const volcanoController = Router();

volcanoController.get("/create", isAuth, (req, res) => {
  const volcanoTypes = getVolcanoTypeViewData({});
  res.render("create", { title: "Create Volcano Wiki", volcanoTypes });
});

volcanoController.post("/create", isAuth, async (req, res) => {
  const volcanoData = req.body;
  const userId = req.user._id;

  try {
    await volcanoService.create(volcanoData, userId);
    res.redirect("/volcanoes");
  } catch (err) {
    const error = getErrorMessage(err);
    const volcanoTypeData = getVolcanoTypeViewData(volcanoData);
    res.render("create", {
      title: "Create Volcano Wiki",
      volcanoData,
      volcanoTypes: volcanoTypeData,
      error,
    });
  }
});

volcanoController.get('/search', async (req,res) => {
    
    const volcanoes = await volcanoService.getAll(req.query).lean();


    res.render('search', {title: 'Search Page', volcanoes});
})

volcanoController.get("/volcanoes", async (req, res) => {
  const volcanoes = await volcanoService.getAll().lean();
  res.render("catalog", { title: "All volcanoes", volcanoes });
});

volcanoController.get("/:volcanoId/details", async (req, res) => {
  const volcano = await volcanoService.getOne(req.params.volcanoId).lean();
  const isOwner = volcano.owner == req.user?._id;
  const isVoted = volcano.voteList.some((userId) => userId == req.user?._id);
  const voteCount = volcano.voteList.length;

  res.render("details", {
    title: "Details Page",
    volcano,
    isOwner,
    isVoted,
    voteCount,
  });
});

volcanoController.get("/:volcanoId/vote", isAuth, async (req, res) => {
 if(!isVolcanoOwner(req.params.volcanoId, req.user._id)){
    return res.redirect('/404');
 }
  
  if(isOwner){
    return res.redirect(`404`);
  }

  try {
    await volcanoService.vote(volcanoId, userId);
    res.redirect(`/${volcanoId}/details`);
  } catch (err) {
    console.log(err);
  }
});

volcanoController.get('/:volcanoId/delete', isAuth, async (req,res)=> {

   if(!isVolcanoOwner(req.params.volcanoId, req.user._id)){
    return res.redirect('/404');
   }
    try{
        await volcanoService.remove(req.params.volcanoId);

        res.redirect('/volcanoes')
    }catch(err){
        console.log(err);

    }
});

volcanoController.get('/:volcanoId/edit', async (req,res) => {
    const volcano = await volcanoService.getOne(req.params.volcanoId).lean();
    const volcanoTypes  = getVolcanoTypeViewData(volcano);
    const isOwner = volcano.owner.toString() === req.user._id;

    if(!isOwner){
        return res.redirect('/404')
    }

    res.render('edit', {title: 'Edit Page', volcano, volcanoTypes});
});

volcanoController.post('/:volcanoId/edit', async (req,res) => {
    const volcanoData = req.body;
    const volcanoId = req.params.volcanoId;

    if(!isVolcanoOwner(volcanoId, req.user._id)){
        return res.redirect('/404'); 
    }
    try{

        await volcanoService.edit(volcanoId, volcanoData);
        res.redirect(`/${volcanoId}/details`)
    }catch(err){
        const volcanoTypes  = getVolcanoTypeViewData(volcanoData);
        const error = getErrorMessage(err);
        res.render('edit', {title: 'Edit Page', volcano: volcanoData, volcanoTypes, error});
    }
})

async function isVolcanoOwner(volcanoId, userId){
    const volcano = await volcanoService.getOne(volcanoId);
    const isOwner = volcano.owner.toString() === userId;

    return isOwner;
}






export default volcanoController;
