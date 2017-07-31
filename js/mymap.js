      $(function(){
        var map;
        var infoWindow;
        var service;
        var DEFAULT_ZOOM = 15;
        var GOOGLE_API_KEY = 'AIzaSyCnjHGp7ASdYvTQhDRG2otqpH78Y95yS2Q';

        function initMap() {
          infoWindow = new google.maps.InfoWindow;
          // Try HTML5 geolocation.
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
              var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };
              map = new google.maps.Map($('#map')[0], {
                zoom: DEFAULT_ZOOM,
                center: pos
              });
              var currLocation_marker = new google.maps.Marker({
                position: pos,
                map: map,
                icon: {
                  path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                  scale: 3,
                  fillColor: 'red'
                }
              });
              map.setCenter(pos);

              var params = {
                location : pos,
                radius : 500,
                type : 'restaurant'
              };
              service = new google.maps.places.PlacesService(map);
              service.nearbySearch(params, function(result, status){
                if(status == google.maps.places.PlacesServiceStatus.OK){
                  var infoWindow_content;
                  var currSelected_infoWindow;
                  _.each(result, function(place){
                    var marker = new google.maps.Marker({
                      position : place.geometry.location,
                      map : map 
                    }); 
                    marker.addListener('click', function() {
                      service.getDetails(place, function(result, status) {
                        if (status !== google.maps.places.PlacesServiceStatus.OK) {
                          console.error(status);
                          return;
                        }
                        if(currSelected_infoWindow){
                          currSelected_infoWindo.close();
                        }
                        infoWindow.setContent(result.name);
                        infoWindow.open(map, marker);
                        currSelected_infoWindo = infoWindow;
                      });
                    });
                  });
                }else{
                  alert(status);
                }
              });
            }, function() {
              handleLocationError(true, infoWindow, map.getCenter());
            });
          } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
          }
        }
        function handleLocationError(browserHasGeolocation, infoWindow, pos) {
          infoWindow.setPosition(pos);
          infoWindow.setContent(browserHasGeolocation ?
                                'Error: The Geolocation service failed.' :
                                'Error: Your browser doesn\'t support geolocation.');
          infoWindow.open(map);
        }
        initMap();
      });