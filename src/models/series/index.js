
var SeriesModel = module.exports = function (mongodb_connection) {
    
    this.db = mongodb_connection;
    
};

SeriesModel.prototype.get = function (spec, callback) {
    
    this.db.collection('series', function (err, series) {
        
        series.findOne(spec, function (err, series) {
            
            return callback(null, series);
            
        });
        
    });
    
};

SeriesModel.prototype.find = function (spec, callback) {
    
    this.db.collection('series', function (err, series) {
        
        series.find(spec).toArray(function (err, series) {
            
            return callback(null, series);
            
        });
        
    });
    
};

SeriesModel.prototype.create = function (spec, callback) {
    
    this.db.collection('series', function (err, series) {
        
        series.insert(spec, function (err, series) {
            
            return callback(null, series);
            
        });
        
    });
    
};