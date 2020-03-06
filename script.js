mapboxgl.accessToken = 'pk.eyJ1IjoiczdpbGxlbiIsImEiOiJjazdjcnpvOG4wN2NlM21wdHpveXl3eXNkIn0.K_K8MhdI6ynjQgpE-joyAA';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [-80.37,43.46],
    zoom: 10
});

map.addControl(
    new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
    })
);

map.addControl(new mapboxgl.NavigationControl());



var geojson = {
    type: 'FeatureCollection',
    features: [{
        type: 'Feature',
        geometry: {
        type: 'Point',
        coordinates: [-80.526,43.465]
        },
        properties: {
        location: 'Waterloo',
        volume: '1461 GB',
        subscribers: '81,279'
        }
    },
    {
        type: 'Feature',
        geometry: {
        type: 'Point',
        coordinates: [-80.5,43.451]
        },
        properties: {
        location: 'Kitchener',
        volume: '2241 GB',
        subscribers: '119,637'
        }
    },
    {
        type: 'Feature',
        geometry: {
        type: 'Point',
        coordinates: [-80.31,43.384]
        },
        properties: {
        location: 'Cambridge',
        volume: '781 GB',
        subscribers: '47,843'
        }
    },
    {
        type: 'Feature',
        geometry: {
        type: 'Point',
        coordinates: [-80.253,43.545]
        },
        properties: {
        location: 'Guelph',
        volume: '1203 GB',
        subscribers: '73,164'
        }
    },]
};

// add markers to map
geojson.features.forEach(function(marker) {

    // create a HTML element for each feature
    var el = document.createElement('div');
    el.className = 'marker';
  
    // make a marker for each feature and add to the map
    new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(
                `<h3>Location: </h3>
                <p>${marker.properties.location}</p>
                <p>Volume: ${marker.properties.volume}</p>
                <p>Subscribers: ${marker.properties.subscribers}</p>`
            )
        )
        .addTo(map);
});



var margin = {top: 40, right: 30, bottom: 30, left: 50},
width = 460 - margin.left - margin.right,
height = 320 - margin.top - margin.bottom;

var greyColor = "#898989";
var barColor = d3.interpolateInferno(0.4);
var highlightColor = d3.interpolateInferno(0.3);

var svg = d3.select("body").append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleBand()
.range([0, width])
    .padding(0.4);
var y = d3.scaleLinear()
.range([height, 0]);

var xAxis = d3.axisBottom(x).tickSize([]).tickPadding(10);
var yAxis = d3.axisLeft(y);

var dataset = [
    {"time":"12AM", "value": 121},
    {"time":"1AM", "value": 151},
    {"time":"2AM", "value": 264},
    {"time":"3AM", "value": 216},
    {"time":"4AM", "value": 156},
    {"time":"5AM", "value": 056},
    {"time":"6AM", "value": 256},
    {"time":"7AM", "value": 121},
    {"time":"8AM", "value": 151},
    {"time":"9AM", "value": 264},
    {"time":"10AM", "value": 216},
    {"time":"11AM", "value": 156},
    {"time":"12PM", "value": 056},
    {"time":"1PM", "value": 151},
    {"time":"2PM", "value": 264},
    {"time":"3PM", "value": 216},
    {"time":"4PM", "value": 156},
    {"time":"5PM", "value": 056},
    {"time":"6PM", "value": 256},
    {"time":"7PM", "value": 121},
    {"time":"8PM", "value": 151},
    {"time":"9PM", "value": 264},
    {"time":"10PM", "value": 216},
    {"time":"11PM", "value": 156},
    ];

x.domain(dataset.map( d => { return d.time; }));
// y.domain([0, d3.max(dataset,  d => { return d.value; })]);
y.domain([0, 400]);

svg.append("g")
.attr("class", "x axis")
.attr("transform", "translate(0," + height + ")")
.call(xAxis.ticks(5));
svg.append("g")
.attr("class","y axis")
.call(yAxis);

svg.selectAll(".bar")
.data(dataset)
.enter().append("rect")
.attr("class", "bar")
.style("display", d => { return d.value === null ? "none" : null; })
.style("fill", "#996699")
.attr("x",  d => { return x(d.time); })
.attr("width", x.bandwidth())
    .attr("y",  d => { return height; })
    .attr("height", 0)
        .transition()
        .duration(750)
        .delay(function (d, i) {
            return i * 50;
        })
.attr("y",  d => { return y(d.value); })
.attr("height",  d => { return height - y(d.value); });

var ticks = d3.selectAll(".tick text");
ticks.each(function(_,i){
    if(i <= 22 && i !== 12 && i !== 0) d3.select(this).remove();
});