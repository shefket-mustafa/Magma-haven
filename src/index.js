import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import 'dotenv/config';

import router from './routes.js';
import { authMiddleware } from './middlewares/authMiddleware.js';

const app = express();

const uri = 'mongodb://localhost:27017/magmaHaven'
mongoose.connect(uri)
.then(() => console.log('DB connected sucessfully!'))
.catch((err)=> console.log(`DB connection failed: ${err}`))

app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}));
app.set('views', 'src/views');
app.set('view engine', 'hbs');

app.use('/static', express.static('src/public'));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(authMiddleware);
app.use(router);


app.listen(3000, () => console.log('Server is running on http://localhost:3000...'));
