import express from 'express';
import router from './routes.js';
import handlebars from 'express-handlebars';

const app = express();

app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}));
app.set('views', 'src/views');
app.set('view engine', 'hbs');

app.use('/static', express.static('src/public'));
app.use(express.urlencoded({extended: false}));
app.use(router)


app.listen(3000, () => console.log('Server is running on http://localhost:3000...'));
