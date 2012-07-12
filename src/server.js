
var express = require('express');


// initialize application server
var server = module.exports = express.createServer();

// configure template engine
server.set('view engine', 'jade');
server.set('views', __dirname + '/views');
server.set('view options', { layout: false });

// configure application server
server.configure(function () {
    
    server.use(express.bodyParser());
    server.use(express.cookieParser());
    server.use(express.methodOverride());
    
    server.use(express.errorHandler({
        
        dumpExceptions : true,
        showStack : true
        
    }));
    
    server.use(server.router);
    server.use('/public', express.static(__dirname + '/../public'));
    
});

// instantiate route handlers
var routes = require('./routes')(server);