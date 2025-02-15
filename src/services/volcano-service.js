import Volcano from "../models/Volcano.js"


const volcanoService = {
    create(volcanoData, userId){
        return Volcano.create({...volcanoData, owner: userId});
    }
};

export default volcanoService;