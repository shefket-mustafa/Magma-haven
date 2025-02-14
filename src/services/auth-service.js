import User from "../models/User.js";

const authService = {
    register(username, email, password){
        //Check rePass
        return User.create({username,password,email})
    }
}

export default authService;