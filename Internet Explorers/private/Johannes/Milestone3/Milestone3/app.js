//core behind object

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var _ = require('underscore');

var routes = require('./routes/index');
var playersPage = require('./routes/players');

var playersJson = require('./data/players.json');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/players', playersPage);


app.get('/api/players',(req, res) => {

  var query = req.query.favorites || 'false';
  var search = req.query.search || 'false';

  if (search !== 'false') {
    if (search.length === 1) {
      var filtered = _.filter(playersJson, function (o) {
        return o.name.charAt(0) === search;
      });
      res.status(200).json(filtered);
    } else {
      res.status(404).json({'message': 'Fail: No such Search API'});
    }
  }else if (query === 'true'){
    var filtered = _.filter(playersJson, {favorites:true});
    res.status(200).json(filtered);
  } else if (query === 'false'){
    res.status(200).json(playersJson);
  } else{
    res.status(404).json({'message': 'Fail: No such Get API'})
  }
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
