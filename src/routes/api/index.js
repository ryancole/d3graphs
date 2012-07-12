
var ApiRouter = module.exports = function (server) {
    
    this.server = server;
    this.server.get('/:id', this.view);
    
};

ApiRouter.prototype.view = function (req, res) {
    
    return res.render('channel/view');
    
};