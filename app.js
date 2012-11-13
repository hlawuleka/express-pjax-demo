
/**
 * Module dependencies.
 */

var express = require('express')
  , partials = require('express-partials')
  , pjax = require('express-pjax')
  , routes = require('./routes')

var app = module.exports = express();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(partials());
  app.use(pjax());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', routes.index);
app.get('/dinosaurs', routes.dinosaurs);
app.get('/aliens', routes.aliens);

var port = 3000;
app.listen(port, function() {
  console.log("Express server listening on port %d in %s mode", port, app.settings.env);
});
