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

var svg = d3.select(".chart").append("svg")
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


//create donut chart

var deviceData = [
    {name: "Galaxy 9", volume: 1.47, percent: 0.0919},
    {name: "iPhone 11", volume: 1.93, percent: 0.1206},
    {name: "Galaxy 10", volume: 1.71, percent: 0.1069},
    {name: "iPad Pro", volume: 2.36, percent: 0.1475},
    {name: "Note 10", volume: 1.04, percent: 0.065},
    {name: "LG C9 OLED TV", volume: 0.87, percent: 0.0512},
    {name: "Samsung Q90", volume: 1.21, percent: 0.075},
    {name: "QLED TV", volume: 3.59, percent: 0.235},
    {name: "iPhone X", volume: 0.84, percent: 0.0525},
    {name: "Windows", volume: 0.98, percent: 0.06125},
  ];
  var text = "";
  
  var width = 260;
  var height = 260;
  var thickness = 40;
  var duration = 750;
  
  var radius = Math.min(width, height) / 2;
  var color = d3.scaleOrdinal(d3.schemeCategory10);
  
  var svg = d3.select(".chart")
  .append('svg')
  .attr('class', 'pie')
  .attr('width', width)
  .attr('height', height)

  
  var g = svg.append('g')
  .attr('transform', 'translate(' + (width/2) + ',' + (height/2) + ')');
  
  var arc = d3.arc()
  .innerRadius(radius - thickness)
  .outerRadius(radius);
  
  var pie = d3.pie()
  .value(function(d) { return d.volume; })
  .sort(null);



  var path = g.selectAll('path')
  .data(pie(deviceData))
  .enter()
  .append("g")
  .on("mouseover", function(d) {
        let g = d3.select(this)
          .style("cursor", "pointer")
          .style("fill", "black")
          .append("g")
          .attr("class", "text-group")
   
        g.append("text")
          .attr("class", "name-text")
          .text(`${d.data.name}`)
          .attr('text-anchor', 'middle')
          .attr('dy', '-1.2em');
    
        g.append("text")
          .attr("class", "value-text")
          .text(`${d.data.volume}TB`)
          .attr('text-anchor', 'middle')
          .attr('dy', '.6em');

        g.append("text")
        .attr("class", "value-text")
        .text(`${d.data.percent*100}%`)
        .attr('text-anchor', 'middle')
        .attr('dy', '1.2em');
      })
    .on("mouseout", function(d) {
        d3.select(this)
          .style("cursor", "none")  
          .style("fill", color(this._current))
          .select(".text-group").remove();
      })
    .append('path')
    .attr('d', arc)
    .attr('fill', (d,i) => color(i))
    .on("mouseover", function(d) {
        d3.select(this)     
          .style("cursor", "pointer")
          .style("fill", "black");
      })
    .on("mouseout", function(d) {
        d3.select(this)
          .style("cursor", "none")  
          .style("fill", color(this._current));
      })
    .each(function(d, i) { this._current = i; });
  


    var legendG = svg.selectAll(".legend") // note appending it to mySvg and not svg to make positioning easier
  .data(pie(deviceData))
  .enter().append("g")
  .attr("transform", function(d,i){
    return "translate(" + (width - 110) + "," + (i * 15 + 20) + ")"; // place each legend on the right and bump each one down 15 pixels
  })
  .attr("class", "legend");   

legendG.append("rect") // make a matching color rect
.attr("width", 10)
.attr("height", 10)
.style("fill", color);


legendG.append("text") // add the text
.text(function(d){
  return d.data.name + "  ";
})
.style("font-size", 12)
.attr("y", 10)
.attr("x", 11);


//third chart

var serviceData = [
    {name: "Xbox", volume: 472},
    {name: "HBO Now", volume: 521},
    {name: "SSL v3", volume: 540},
    {name: "iTunes Purchase", volume: 541},
    {name: "Hulu", volume: 563},
    {name: "Amazon Prime", volume: 689},
    {name: "HTTP media stream", volume: 729},
    {name: "Netflix", volume: 759},
    {name: "Youtube", volume: 997},
];

// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 400 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// set the ranges
var y = d3.scaleBand()
          .range([height, 0])
          .padding(0.1);

var x = d3.scaleLinear()
          .range([0, width]);
          
// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select(".rightChart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

  // format the data

  // Scale the range of the data in the domains
  x.domain([0, d3.max(serviceData, function(d){ return d.volume; })])
  y.domain(serviceData.map(function(d) { return d.name; }));
  //y.domain([0, d3.max(data, function(d) { return d.sales; })]);

  // append the rectangles for the bar chart
  svg.selectAll(".bar")
      .data(serviceData)
    .enter().append("rect")
      .attr("class", "bar")
      //.attr("x", function(d) { return x(d.sales); })
      .attr("width", function(d) {return x(d.volume); } )
      .attr("y", function(d) { return y(d.name); })
      .attr("height", y.bandwidth());

  // add the x Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // add the y Axis
  svg.append("g")
      .call(d3.axisLeft(y));