
// route handlers
var ApiRouter = require('./api');

// export route handler instances
module.exports = function (server) {
    
    return {
        
        api: new ApiRouter(server)
        
    };
    
};