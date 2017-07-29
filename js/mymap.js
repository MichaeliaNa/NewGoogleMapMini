      var map, infoWindow;
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
            var marker = new google.maps.Marker({
              position: pos,
              map: map
            });
            infoWindow.open(map);
            map.setCenter(pos);
            $.ajax({
              url : 'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
              data : {
                'key' : GOOGLE_API_KEY,
                'location' : pos.lat + ',' + pos.lng,
                'type' : 'park',
                'radius' : 500
              },
              success: function(data){
                debugger;
              },
              failure: function(data){
                debugger;
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
