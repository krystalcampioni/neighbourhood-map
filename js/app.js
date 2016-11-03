var map, infoWindow;

function initMap() {
  map = new google.maps.Map(
    document.getElementById('map'), {
      center: {
        lat: -23.596996,
        lng: -46.6489021
      },
      zoom: 13,
      mapTypeControl: false
    }
  );
  infowindow = new google.maps.InfoWindow();
  ko.applyBindings(new ViewModel());
}

function mapsError() {
  document.getElementById('flash-message').innerHTML = "Could not load map from Google. Please try again later"
}
