
// route handlers
var ApiRouter = require('./api'),
    SeriesRouter = require('./series');

// export route handler instances
module.exports = function (server) {
    
    return {
        
        api: new ApiRouter(server),
        series: new SeriesRouter(server)
        
    };
    
};