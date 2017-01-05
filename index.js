require('dotenv').config();
console.log(process.env.FORECAST)

const express      = require('express');
const logger       = require('morgan');
const path         = require('path');
const bodyParser   = require('body-parser');
const app          = express();
const port         = process.env.PORT || 3000;


app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.use(logger('dev'));

app.listen(port, () =>{
	console.log('Server running on port ', port)
})