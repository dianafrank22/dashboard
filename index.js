require('dotenv').config();

const express      = require('express');
const logger       = require('morgan');
const path         = require('path');
const bodyParser   = require('body-parser');
const home         = require('./routes/home');
const weather      = require('./routes/weather')
// const train        = require('./routes/train')
const news         = require('./routes/news')
const app          = express();
const port         = process.env.PORT || 3000;


// @TODO create routes for api calls here, that way they're done server side
// the requests on client side will 


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'icons')));

app.use(bodyParser.json());

app.use(logger('dev'));

app.listen(port, () =>{
	console.log('Server running on port ', port)
})

app.use('/', home);
app.use('/weather', weather);
// app.use('/train', train);
app.use('/news', news);
