var express = require("express");
var app = express();

var path = require("path");
var bodyParser = require("body-parser");
var session = require("express-session");
var http = require('http');
var models = require('./server/models');
var debug = require('debug')('testPostSQL:server');
var passport = require('passport');

LocalStrategy = require('passport-local').Strategy;

app.use(express.static(path.join(__dirname,'/public/dist')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({secret: 'BlaBlaBla2', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());



require('./server/config/passport/passport.js')(passport); // pass passport for configuration
require('./server/config/routes.js')(app);

var port = normalizePort(process.env.PORT || '8000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);
console.log("welcome at test psql	 go too " + port)
/**
 * Listen on provided port, on all network interfaces.
 */

models.sequelize.sync().then(function() {
  server.listen(port);
   // server.listen(5432);
   console.log("sevrer.listen to 5432 ")
  server.on('error', onError);
  server.on('listening', onListening);
});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
