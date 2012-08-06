
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');



var nodify = {
	ports: {
	  php: 1338,
	  web: 1337
	}
};

// running the web server
var web = express();

web.configure(function(){
  web.set('port', nodify.ports.web);
  web.set('views', __dirname + '/views');
  web.set('view engine', 'jade');
  web.use(express.favicon());
  web.use(express.logger('dev'));
  web.use(express.bodyParser());
  web.use(express.methodOverride());
  web.use(web.router);
  web.use(express.static(path.join(__dirname, 'public')));
});

var web_server = http.createServer(web);
var io = require('socket.io').listen(web_server);

var web_socket = false;
io.sockets.on('connection', function (socket) {
  web_socket = socket;
});

web.configure('development', function(){
  web.use(express.errorHandler());
});
web.get('/', routes.index);

web_server.listen(web.get('port'), function(){
  console.log("web server listening on port " + web.get('port'));
});





// running the php-nodification receiver server
var php = express();

php.configure(function(){
  php.set('port', nodify.ports.php);
  php.set('views', __dirname + '/views');
  php.set('view engine', 'jade');
  php.use(express.favicon());
  php.use(express.logger('dev'));
  php.use(express.bodyParser());
  php.use(express.methodOverride());
  php.use(php.router);
  php.use(express.static(path.join(__dirname, 'public')));
});

php.configure('development', function(){
  php.use(express.errorHandler());
});

php.post('/', function(req, res){
  res.render('php'); 
  web_socket.emit('server', { 
    msg: req.param('msg', ''),
    line: req.param('line', ''), 
    file: req.param('file', ''),
  });
});

http.createServer(php).listen(php.get('port'), function(){
  console.log("PHP-listener active on port " + php.get('port'));
});