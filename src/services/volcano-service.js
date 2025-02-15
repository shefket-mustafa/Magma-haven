import Volcano from "../models/Volcano.js"


const volcanoService = {
    getAll(){
      return Volcano.find();  
    },
    create(volcanoData, userId){
        return Volcano.create({...volcanoData, owner: userId});
    },
};

export default volcanoService;