
// build a chart for a set of data
function BuildChart (key, value) {
    
    var max = d3.max(value),
        scale_x = d3.scale.linear().domain([0, data.length - 1]).range [0, w],
        scale_y = d3.scale.linear().domain([0, max]).range [h, 0];
    
};

// build the collection of aggregate views
function BuildAggregates (data) {
    
    // init aggregate view object
    var aggregate_view = new Object;
    
    // init property for each logged item type
    _.each(data, function (data) {
        
        _.each(data.data, function (data) {
            
            aggregate_view[data.item] = new Array;
            
        });
        
    });
    
    // insert values into each item type array
    _.each(data, function (data) {
        
        _.each(data.data, function (data) {
            
            aggregate_view[data.item].push(data.gold);
            
        });
        
    });
    
    // return the data view
    return aggregate_view;
    
};

// retrieve the data for the graph
function GetGraphData (callback) {
    
    $.getJSON('/api/series', function (data) {
        
        return callback(data);
        
    });
    
};

$(function () {
    
    // get the raw data from server
    GetGraphData(function (data) {
        
        // build the aggregated data view
        var aggregate_data = BuildAggregates(data);
        
        // build the charts
        _.each(aggregate_data, function (value, key, list) {
            
            BuildChart(key, value);
            
        });
        
    });
    
});