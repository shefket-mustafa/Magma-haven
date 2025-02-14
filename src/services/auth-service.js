import User from "../models/User.js";

const authService = {
    register(username, email, password, confirmPassword){
        const user = User.findOne({ $or: [{email}, {username}] });
        
        if(user){
            throw new Error('User already exists!');
        };
        
        if(password !== confirmPassword){
            throw new Error('Password mismatch!');
        };


        return User.create({username,password,email})
    }
}

export default authService;