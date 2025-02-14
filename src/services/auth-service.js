import bcrypt from 'bcrypt';

import User from "../models/User.js";
import jwt from '../lib/jwt.js';

const authService = {
    async register(username, email, password, confirmPassword){
        const user = await User.findOne({ $or: [{email}, {username}] });
        
        if(user){
            throw new Error('User already exists!');
        };

        if(password !== confirmPassword){
            throw new Error('Password mismatch!');
        };


        return User.create({username,password,email})
    },

    async login(email,password){
        const user = await User.findOne({email});

        if(!user){
            throw new Error('Invalid user or password');
        };
        
        const isValid = await bcrypt.compare(password, user.password); 
        if(!isValid){
            throw new Error('Invalid user or password');
        };
        const payload = {
            _id: user._id,
            email ,
            username: user.username,
        };

        const token = await jwt.sign(payload, process.env.JWT_SECRET);
        return token;
    },
}

export default authService;