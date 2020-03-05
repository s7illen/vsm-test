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

d3.select();
d3.selectAll();

d3.select('.test').style('color', 'red')