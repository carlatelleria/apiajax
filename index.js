var express 	= require('express');
var http 		= require('http');
var bodyParser 	= require('body-parser');
var logger 		= require('morgan');
var mongoose 	= require('mongoose');
var pasties		= require('./router/apirouter');

// BASE SETUP
// =============================================================================

var app = express();
app.set('port', process.env.PORT || 8080);
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", 'GET, PUT, POST, DELETE');
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

// DATABASE SETUP
// =============================================================================

//Connect to our database.
mongoose.connect('mongodb://gdati:pochacco123@ds061246.mlab.com:61246/ajaxlab');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// MOUNTING ROUTES
// =============================================================================

//All the routes will be prefixed with /api.
app.use('/api', pasties);

// START THE SERVER
// =============================================================================

app.listen(app.get('port'));
console.log("App listening on " + app.get('port'));