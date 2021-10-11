const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const methodOverride = require('method-override');
const db = require('./config/db');
const sortMiddleware = require('./app/moddlewares/SortMiddleware');

const app = express();
const port = 3000;

//Router: 
const route = require('./routes');

//Connect DB
db.connect();

//HTTP logger
app.use(morgan('combined'));

//Upload img: 
app.use(express.static(path.join(__dirname, 'public')));

//app Middleware
app.use(sortMiddleware);

//Template engine:
app.engine(
  'hbs',
  exphbs({
    extname: '.hbs',
    helpers: require('./helper/Handlebars')
  }),
);

app.use(express.json());

//Buffer:
app.use(express.urlencoded({
    extended: true
  })
);

app.use(methodOverride('_method'));

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//route unit: 
route(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});