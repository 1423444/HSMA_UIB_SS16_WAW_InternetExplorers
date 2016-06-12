//core behind object

const express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const _ = require('underscore');

var routes = require('./routes/index');
var playersPage = require('./routes/players');

var playersJson = require('./data/players.json');

const app = express();

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

  let query = req.query.favorites || 'false';
  let search = req.query.search || 'false';
  let regex = /^[A-Z]+$/;


  if(search !== 'false') {
    if(search.length === 1 && search.match(regex)) {
      let filtered = playersJson.filter(o => o.name.charAt(0) === search);
      res.status(200).json(filtered);
    } else {
      res.status(404).json({ 'message': 'Ungültige Suchanfrage' });
    }
  } else if(query === 'true'){
    let filtered = _.filter(playersJson, {favorites: true});
    res.status(200).json(filtered);
  } else if(query === 'false'){
    res.status(200).json(playersJson);
  } else {
    res.status(404).json({ 'message': 'Es ist ein Fehler aufgetreten' });
  }
});

app.post('/api/players', (req, res) => {
  if(req.body) {
    res.status(200).json({ 'message': 'Spieler wurde erfolgreich gespeichert' });
  } else {
    res.status(404).json({ 'message': 'Leerer Body ist nicht erlaubt' });
  }
});

app.delete('/api/players/:id', (req, res) => {
  let filtered = playersJson.filter(o => o.id !== req.params.id);
  playersJson = filtered;
  res.end();
});

app.put('/api/players/:id', (req, res) => {
  let filtered = playersJson.filter(o => o.id === req.params.id);
  if (filtered.length === 1) {
    res.status(200).json({ 'message': 'Spieler mit der ID ' + req.params.id + ' wurde erfolgreich geupdatet' });
  }
  else {
    res.status(404).json({ 'message': 'Spieler mit dieser ID existiert nicht' });
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
