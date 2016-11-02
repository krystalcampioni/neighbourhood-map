var viewModel = function() {

  var self = this;

  self.markersList = [];

  // gets info about the place from foursquare to pass to the marker
  self.addApiInfo = function(currentMarker) {
    $.ajax({
      url: "https://api.foursquare.com/v2/venues/" + currentMarker.venueid + '?client_id=W2BI1KCVPZ4PCCP0WU2AU0WJA5NZFGH330DKZT3PBMIHLRGT&client_secret=XBTCEG1KNSW3J2NX5BO1GM0TAS04FT0DNZMFLJLDP2OBKF4B&v=20160614',
      dataType: "json",
      success: function(data) {

        var result = data.response.venue;

        currentMarker.likes = result.hasOwnProperty('likes') ? result.likes.summary : "";
        currentMarker.rating = result.hasOwnProperty('rating') ? result.rating : "";
        currentMarker.url = result.hasOwnProperty('url') ? result.url : "";
      },

      error: function(e) {
        self.errorDisplay("Could not load data from Foursquare. Please try again later.");
      }
    });
  };

  // creates all map markers
  model.forEach(function(marker) {
    self.markersList.push(new google.maps.Marker({
      position: {
        lat: marker.location.lat,
        lng: marker.location.lng
      },
      map: map,
      name: marker.name,
      show: ko.observable(marker.show),
      selected: ko.observable(marker.selected),
      venueid: marker.venueid,
      animation: google.maps.Animation.DROP,
      icon: {

        anchor: new google.maps.Point(16, 16),
        url: "data:image/svg+xml;utf-8, <svg xmlns='http://www.w3.org/2000/svg' id='Layer_1' width='40' height='28' viewBox='0 0 28 40'><style>.st0{fill:#22543F;} .st1{fill:#FFFFFF;} .st2{fill:#F26A28;}</style><path d='M27.8 12C27 9.6 19.4 5 14.1 1 7.7 5.2.7 9.8.2 12c-.3 2.8.3 5.7 1.8 8.5C4.6 25 9.4 33.2 12 37.8c.9 1.5 3 1.5 3.9 0 2.7-4.6 7.4-12.8 10.2-17.7 1.5-2.5 2-5.3 1.7-8.1z' class='st0'/><path d='M14.1 2.8C8.3 6.6 1.9 10.7 1.9 12.6c-.1 3.3 5.3 6 11.9 6 6.8 0 12.2-2.6 12.2-5.9 0-2-7.1-6.3-11.9-9.9z' class='st1'/><path d='M14 5c-4.1 2.7-8.7 5.7-8.7 7.1-.1 2.3 3.8 4.3 8.5 4.3 4.9 0 8.8-1.9 8.8-4.3 0-1.4-5.1-4.5-8.6-7.1z' class='st2'/></svg>"
      }
    }));
  });

  // Sets the current map item
  self.currentMapItem = self.markersList[0];

  // Creates a bounce animation when we click on the marker
  self.animateMarker = function(marker) {
    marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function() {
      marker.setAnimation(null);
    }, 600);
  };

  // Loop through all the markers, add infos from the API and  call the setSelected function on click
  for (var i = 0; i < self.markersList.length; i++) {
    (function(currentMarker) {
      self.addApiInfo(currentMarker);
      currentMarker.addListener('click', function() {
        self.setSelected(currentMarker);
      });
    })(self.markersList[i]);
  }

  // setup the filter to work while we type a restaurant name
  self.filterText = ko.observable('');

  self.applyFilter = function() {

    var currentFilter = self.filterText();
    infowindow.close();

    if (currentFilter.length === 0) {
      self.makeAllVisible(true);
    } else {
      for (var i = 0; i < self.markersList.length; i++) {
        if (self.markersList[i].name.toLowerCase().indexOf(currentFilter.toLowerCase()) > -1) {
          self.markersList[i].show(true);
          self.markersList[i].setVisible(true);
        } else {
          self.markersList[i].show(false);
          self.markersList[i].setVisible(false);
        }
      }
    }
    infowindow.close();
  };

  self.makeAllVisible = function(showVar) {
    for (var i = 0; i < self.markersList.length; i++) {
      self.markersList[i].show(showVar);
      self.markersList[i].setVisible(showVar);
    }
  };

  self.setAllUnselected = function() {
    for (var i = 0; i < self.markersList.length; i++) {
      self.markersList[i].selected(false);
    }
  };


  // Function to format the content of the infowindow

  self.setSelected = function(location) {
    self.setAllUnselected();
    location.selected(true);

    self.currentMapItem = location;

    // if the restaurant has infos about likes, ratings and urls, display them, otherwise don't

    var infowindowLikes = (self.currentMapItem.likes != "") ? "<img src='images/heart.svg'class='infowindow__heart'/>" + self.currentMapItem.likes : "";

    var infowindowRating = (self.currentMapItem.rating != "") ? self.currentMapItem.rating : "";

    var infowindowUrl = (self.currentMapItem.url != "") ?
      ("<a target='_blank' class='infowindow__url' href='" + self.currentMapItem.url + "'>" + self.currentMapItem.url + "</a>") :
      ("");

    var formattedInfoWindow = (
      "<h5 class='infowindow__name'>" + self.currentMapItem.name + "</h5>" +
      "<div class='infowindow__likes'>" + infowindowLikes + "</div>" +
      "<div class='infowindow__rating' id='rateYo'>" + infowindowRating + "</div>" +
      infowindowUrl
    )

    infowindow.setContent(formattedInfoWindow);
    infowindow.open(map, location);
    self.animateMarker(location);


    // Use the rateYo plugin to convert the number of the restaurant rating into stars
    $("#rateYo").rateYo({
      starWidth: "10px",
      rating: self.currentMapItem.rating,
      maxValue: 10,
    });

  };

};
