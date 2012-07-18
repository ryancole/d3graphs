
var server = require('../src/server');

// start the web server
server.listen(80, function () {
    
    console.log(server.settings.env + ' web server listening');
    
});