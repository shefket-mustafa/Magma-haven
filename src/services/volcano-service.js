import Volcano from "../models/Volcano.js"


const volcanoService = {
    getAll(){
      return Volcano.find();  
    },
    getOne(volcanoId){
      return Volcano.findById(volcanoId);
    },
    create(volcanoData, userId){
        return Volcano.create({...volcanoData, owner: userId});
    },
    async vote(volcanoId, userId){
      const volcano = await Volcano.findById(volcanoId
      
      );

      volcano.voteList.push(userId);

      return volcano.save();
    }
};

export default volcanoService;