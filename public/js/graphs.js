
// get min
function GetMin(collection, attribute) {
    
    // get the minimum value
    var min_value = _.reduce(collection, function (memo, record) {
        
        // return the lower value if available
        if (record[attribute] < memo)
            return record[attribute];
        
        // return same value
        return memo;
        
    }, collection[0][attribute]);
    
    return min_value;
    
}

// get max
function GetMax(collection, attribute) {
    
    // get the maximum value
    var max_value = _.reduce(collection, function (memo, record) {
        
        // return the higher value if available
        if (record[attribute] > memo)
            return record[attribute];
        
        // return same value
        return memo;
        
    }, collection[0][attribute]);
    
    return max_value;
    
}

// build a chart for a set of data
function BuildChart (key, values) {
    
    // insert dom element for this graph
    $('<span>').appendTo($('<li>', {
        
        'class': 'chart',
        'data-title': key,
        text: key + ':'
        
    }).appendTo('#charts'));
    
    // sparkline dat shit
    $("li[data-title='" + key + "'] span").sparkline(values);
   
};

// build the collection of aggregate views
function BuildAggregates (data) {
    
    // init aggregate view object
    var aggregate_view = new Object;
    
    // init property for each logged item type
    _.each(data, function (data) {
        
        _.each(data.data, function (data) {
            
            // format string for the quality and item
            var item_plus_quality = (data.quality + ' ' + data.item).trim();
            
            // init the collection for this item quality
            aggregate_view[item_plus_quality] = new Array;
            
        });
        
    });
    
    // insert values into each item type array
    _.each(data, function (data) {
        
        var timestamp = new Date(data.timestamp);
        
        _.each(data.data, function (data) {
            
            // format string for the quality and item
            var item_plus_quality = (data.quality + ' ' + data.item).trim();
            
            // aggregate_view[data.item].push({ gold: data.gold, timestamp: timestamp });
            aggregate_view[item_plus_quality].push(data.gold);
            
        });
        
    });
    
    // return the data view
    return aggregate_view;
    
};

// retrieve the data for the graph
function GetGraphData (callback) {
    
    $.getJSON('/api/series', function (data) {
        
        return callback(data.reverse());
        
    });
    
};

$(function () {
    
    // get the raw data from server
    GetGraphData(function (data) {
        
        // build the aggregated data view
        var aggregate_data = BuildAggregates(data);
        
        // build the charts
        _.each(aggregate_data, function (value, key, list) {
            
            // build the chart dom element
            BuildChart(key, value);
            
        });
        
    });
    
});