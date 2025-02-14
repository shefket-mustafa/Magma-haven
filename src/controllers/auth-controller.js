import { Router } from 'express';

import authService from '../services/auth-service.js';

const authController = Router();

authController.get('/register', (req,res) => {
    res.render('auth/register', {title: 'Register Page'});
});

authController.post('/register', async (req,res) => {
    const {username, email , password, confirmPassword} = req.body;
    
    try{

        await authService.register(username,email,password);
        res.redirect('/');
    }catch(err){
        res.render('/auth/register', {title: 'Register Page', username, email});
    };
});

export default authController;