
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
    $('<div>').appendTo($('<li>', {
        
        'class': 'chart',
        'data-title': key
        
    }).appendTo('#charts'));

    // sparkline dat shit
    $.jqplot("li[data-title='" + key + "'] div", [values], {
        
        title: key,
        series: [{
            showMarker: false,
            neighborThreshold: -1
            }],
        axes: {
            xaxis: {
                min: GetMin(values, 0),
                label: 'Timestamp',
                renderer: $.jqplot.DateAxisRenderer,
                labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
                tickOptions: { formatString: '%a, %R' },
            },
            yaxis: {
                min: 0,
                label: 'Gold',
                labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
                tickOptions: {
                    formatString: '%d'
                }
            }
        },
        cursor:{ 
            show: true,
            zoom: true, 
            showTooltip: false
        }
        
    });
   
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
            
            aggregate_view[item_plus_quality].push([ timestamp, data.gold ]);
            
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
    
    (function(c,a){var b,d,h,e;b=c.createElement("script");b.type="text/javascript";b.async=!0;b.src=("https:"===c.location.protocol?"https:":"http:")+'//api.mixpanel.com/site_media/js/api/mixpanel.2.js';d=c.getElementsByTagName("script")[0];d.parentNode.insertBefore(b,d);a._i=[];a.init=function(b,c,f){function d(a,b){var c=b.split(".");2==c.length&&(a=a[c[0]],b=c[1]);a[b]=function(){a.push([b].concat(Array.prototype.slice.call(arguments,0)))}}var g=a;"undefined"!==typeof f?g=
    a[f]=[]:f="mixpanel";g.people=g.people||[];h="disable track track_pageview track_links track_forms register register_once unregister identify name_tag set_config people.set people.increment".split(" ");for(e=0;e<h.length;e++)d(g,h[e]);a._i.push([b,c,f])};a.__SV=1.1;window.mixpanel=a})(document,window.mixpanel||[]);
    mixpanel.init("4ffe86b2c4bd82e43147af86f4299e1d");
    mixpanel.track("view graphs");
    
    // get the raw data from server
    GetGraphData(function (data) {
        
        // build the aggregated data view
        var aggregate_data = BuildAggregates(data);
        
        // build the charts
        _.each(aggregate_data, function (value, key, list) {
            
            // build the chart dom element
            BuildChart(key, value);
            
            // delete the loading spinner
            $('.spinner').remove();
            
        });
        
    });
    
});