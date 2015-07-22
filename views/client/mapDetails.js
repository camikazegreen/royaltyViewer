
//++++++++++++++++++++++++++++++++++++
var currentLat = '32.2288556';
var currentLng = '-110.9685464';
navigator.geolocation.getCurrentPosition(
  function(location){
  currentLat = location.latitude;
  currentLng = location.longitude;
},
function(error){
console.log(error)
});

function initialize() {
  var map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: new google.maps.LatLng(currentLat, currentLng),
    zoom: 15
  });

  var currentLoc = new google.maps.LatLng(currentLat, currentLng);
var request = {
    location: currentLoc,
    radius: 500,
    types: ['food']
  };
  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

google.maps.event.addDomListener(window, 'load', initialize);
