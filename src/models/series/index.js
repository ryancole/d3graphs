
var SeriesModel = module.exports = function (mongodb_connection, redis_connection) {
    
    this.db = mongodb_connection;
    this.cache = redis_connection;
    
};

SeriesModel.prototype.get = function (spec, callback) {
    
    this.db.collection('series', function (err, series) {
        
        series.findOne(spec, function (err, series) {
            
            return callback(null, series);
            
        });
        
    });
    
};

SeriesModel.prototype.find = function (spec, callback) {
    
    // get the data from the cache
    this.cache.get('d3data', function (err, data) {
        
        if (data)
            return callback(null, JSON.parse(data));
        
        // no cache data, get it from the database
        this.db.collection('series', function (err, series) {
        
            series.find(spec, { limit: 1000, sort: { _id: -1 }}).toArray(function (err, series) {
                
                // cache the data
                this.cache.setex('d3data', 60, JSON.stringify(series));
                
                // return the data
                return callback(null, series);
                
            }.bind(this));
            
        }.bind(this));
        
    }.bind(this));
    
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