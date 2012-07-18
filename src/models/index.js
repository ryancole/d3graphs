
var mongodb = require('mongodb'),
    redis = require('redis');


// model handlers
var SeriesModel = require('./series');

// redis database connection
var redis_connection = redis.createClient();

// mongodb database connection
var mongodb_server = new mongodb.Server('localhost', mongodb.Connection.DEFAULT_PORT),
    mongodb_connection = new mongodb.Db('d3graphs', mongodb_server);

// open the mongodb database connection
mongodb_connection.open(function (err, db) {
    
    console.log('database state: %s', db.state)
    
});

// export the model handlers
module.exports = {
    
    series: new SeriesModel(mongodb_connection, redis_connection)
    
};