import Volcano from "../models/Volcano.js"


const volcanoService = {
    getAll(filter = {}){
      const query = Volcano.find();

      if(filter.name){
        query.find({ name: { $regex: filter.name, $options: 'i'} })
      };

      if(filter.typeVolcano){
        query.find({typeVolcano: filter.typeVolcano })
      }

      return query; 
    },
    getOne(volcanoId){
      return Volcano.findById(volcanoId);
    },
    create(volcanoData, userId){
        return Volcano.create({...volcanoData, owner: userId, runValidators: true}, );
    },
    async vote(volcanoId, userId){
      const volcano = await Volcano.findById(volcanoId
      
      );

      volcano.voteList.push(userId);

      return volcano.save();
    },
     remove(volcanoId){
      return Volcano.findByIdAndDelete(volcanoId);
    },
    edit(volcanoId, volcanoData){
      return Volcano.findByIdAndUpdate(volcanoId,volcanoData, {runValidators: true});
    }
};

export default volcanoService;