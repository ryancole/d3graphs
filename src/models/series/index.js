
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
        
        series.find(spec, { limit: 10, sort: { _id: -1 }}).toArray(function (err, series) {
            
            return callback(null, series);
            
        });
        
    });
    
};

SeriesModel.prototype.create = function (spec, callback) {
    
    // convert timestamp to date object
    spec.forEach(function (value, index, array) {
        
        array[index].timestamp = new Date(value.timestamp);
        
    });
    
    this.db.collection('series', function (err, series) {
        
        series.insert(spec, function (err, series) {
            
            return callback(null, series);
            
        });
        
    });
    
};