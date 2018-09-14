// var express = require('express');
// var path = require('path');
// var favicon = require('serve-favicon');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');

// var index = require('./routes/index');
// var users = require('./routes/users');
// var halls = require('./routes/halls');
// var movies = require('./routes/movies');
// var movieHall = require('./routes/movieHall');

// var app = express();


// app.listen(4200);
// // uncomment after placing your favicon in /public
// //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json({ type: 'application/*+json' }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
// /* app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public/index.html'));
// }); */ 

// app.use('/', index);
// app.use('/users', users);
// app.use('/halls', halls);
// app.use('/movies', movies);
// app.use('/moviehall', movieHall);

// app.set('view engine', 'pug')
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public/index.html'));
// }); 

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;


'use strict';

const express = require('express');  
const app = express();  
const bodyParser = require('body-parser');

var morgan = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('./config/database');
// var index = require('./routes/index');
// var users = require('./routes/users');
var halls = require('./routes/halls');
var login = require('./routes/login');
// var movies = require('./routes/movies');
// var movieHall = require('./routes/movieHall');

app.listen(4200);
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.Promise = require('bluebird');
mongoose.connect(config.database, { promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));


app.use('/halls', halls);
app.use('/', login);
app.use(passport.initialize());

module.exports = app;  
