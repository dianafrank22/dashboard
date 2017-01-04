require('dotenv').config();

const express      = require('express');
const logger       = require('morgan');
const path         = require('path');
const bodyParser   = require('body-parser');
// const sass         = require('node-sass');
const app          = express();
const port         = process.env.PORT || 3000;

// app.use(sass.middleware({
// 	src: __dirname + '/sass',
// 	dest: __dirname + '/public',
// 	debug: true,
// 	outputStyle: 'compressed'
// }))
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.use(logger('dev'));

app.listen(port, () =>{
	console.log('Server running on port ', port)
})