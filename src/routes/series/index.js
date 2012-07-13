
var models = require('../../models');


var SeriesRouter = module.exports = function (server) {
    
    // store web server reference
    this.server = server;
    
    // get route handlers
    this.server.get('/', this.list);
    
};

SeriesRouter.prototype.list = function (req, res) {
    
    models.series.find({}, function (err, series) {
        
        return res.render('series/list', { series: series });
        
    });
    
};