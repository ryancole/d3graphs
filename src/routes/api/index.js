
var models = require('../../models');


var ApiRouter = module.exports = function (server) {
    
    // store web server reference
    this.server = server;
    
    // get route handlers
    this.server.get('/api/series', this.list);
    this.server.get('/api/series/:id', this.view);
    
    // post route handlers
    this.server.post('/api/series', this.create);
    
};

ApiRouter.prototype.list = function (req, res) {
    
    models.series.find({}, function (err, series) {
        
        return res.json(series);
        
    });
    
};

ApiRouter.prototype.view = function (req, res) {
    
    models.series.get({ _id: req.params.id }, function (err, series) {
        
        return res.json(series);
        
    });
    
};

ApiRouter.prototype.create = function (req, res) {
    
    models.series.create(req.body, function (err, series) {
        
        return res.send(201);
        
    });
    
};