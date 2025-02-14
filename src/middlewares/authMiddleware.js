import jwt from "../lib/jwt.js";

export const authMiddleware = async (req,res,next) => {
    const token = req.cookies['auth'];

    if(!token){
        return next();
    };

    try{
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);

        req.user = decodedToken;
        req.isAuthenticated = true;

        res.locals.user = decodedToken;
        res.locals.isAuthenticated = true;

        next();
    }catch(err){
        res.clearCookie('auth');
         res.redirect('/auth/login')
    }
}

export const isAuth = (req,res,next) => {
    if(!req.user){
        res.redirect('/auth/login');
    };

    next();
};