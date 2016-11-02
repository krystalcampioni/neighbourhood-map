var responseVenues;
var model = [];

// $.ajax( 'https://api.foursquare.com/v2/venues/search?client_id=W2BI1KCVPZ4PCCP0WU2AU0WJA5NZFGH330DKZT3PBMIHLRGT&client_secret=XBTCEG1KNSW3J2NX5BO1GM0TAS04FT0DNZMFLJLDP2OBKF4B&v=20130815&ll=40.7,-74&query=sushi&near=sao_paulo', {
//   jsonp: "callback",
//   dataType: "jsonp",
//    success: function(response) {
//      responseVenues = response.response.venues;
//      Object.keys(responseVenues).forEach(function(key) {
//        var tempObj = {}
//        tempObj['name'] = responseVenues[key].name;
//        tempObj['location'] = responseVenues[key].location;
//        tempObj['show'] = true;
//        tempObj['selected'] = false;
//        tempObj['venueid'] = responseVenues[key].id;
//        tempObj['url'] = responseVenues[key].url;
//        model.push(tempObj)
//      });
//    },
//    error: function(xhr,status,error) {
//     console.log("Could not load data from foursquare")
//    },
//    complete: function(xhr,status) {
//     initMap();
//    }
// });
//
// $.ajax({/* query the API here */})
// .done(function(result) {/* this fn will run on success */})
// .fail(function(error) {/* this fn will run on fail */});


 $.ajax({
    type: "get",
    dataType: 'json',
    url: 'https://api.foursquare.com/v2/venues/search?client_id=W2BI1KCVPZ4PCCP0WU2AU0WJA5NZFGH330DKZT3PBMIHLRGT&client_secret=XBTCEG1KNSW3J2NX5BO1GM0TAS04FT0DNZMFLJLDP2OBKF4B&v=20130815&ll=40.7,-74&query=sushi&near=sao_paulo'
  })
  .done(function(response) {
    responseVenues = response.response.venues;
    Object.keys(responseVenues).forEach(function(key) {
      var tempObj = {}
      tempObj['name'] = responseVenues[key].name;
      tempObj['location'] = responseVenues[key].location;
      tempObj['show'] = true;
      tempObj['selected'] = false;
      tempObj['venueid'] = responseVenues[key].id;
      tempObj['url'] = responseVenues[key].url;
      model.push(tempObj)
    });
    initMap();
  })
  .fail(function(error) {
    console.log("Could not load data from foursquare")
  });
