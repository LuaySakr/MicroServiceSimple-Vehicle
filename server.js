var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var config = require('./app/config/config');
var cors = require('cors');
var app = express();


const appzip = require('appmetrics-zipkin')({
  host: 'zipkin',
  port: 9411,
  serviceName: 'vehicle-api'
});

var opbeat = require('opbeat').start(

)

app.use(morgan('dev'));                                         
app.use(cors());
app.use(bodyParser.urlencoded({'extended':'true'}));           
app.use(bodyParser.json());                                   
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(methodOverride());


require('./app/router/router')(app);

var db;

if(process.env.NODE_ENV === "test") {
	db = mongoose.connect(config.test_db);
	app.listen(config.test_port, function(err){
	  if(err) throw err;
	  console.log("App listening on port "+config.test_port);
	});
} else {
 	db = mongoose.connect(config.db);
        app.listen(config.port, function(err){
	  if(err) throw err;
	  console.log("App listening on port "+config.port);
	});
}

mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + config.db);
});

module.exports = app;
