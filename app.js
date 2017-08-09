//mrb ben necmi

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


console.log("listening..");


/*var url = 'mongodb://212.237.20.140:27017/denemedb';
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server.");
    db.close();
});*/


app.get('/deneme', function(req, res){
    res.send('sth happened');
});

app.get('/ez', function(req, res){
    res.send('get shit happened');
});


app.post('/ez', function(req, res){

    var received = req.body;
    console.log(received);
    //res.send('post shit happened');


    MongoClient.connect(url, function(err, db)
    {
        if (err) throw err;
        db.collection("elements").insertOne(received, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");

            db.close();
        });
    });

    res.send('succesfuly saved to db');

});

app.listen(8080);

module.exports = app;
