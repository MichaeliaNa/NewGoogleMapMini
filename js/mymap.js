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
                        showPlaceDetailedInfo(place);
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
          $('.place-info-visibility-toggle').on('click', function(){
            $('#place-info-wrapper').toggleClass('visible');
            $('#place-info-wrapper .triangle-icon').toggleClass('left');
          });
        }
        function showPlaceDetailedInfo(place){
          var params = {
            placeId : place.place_id
          };
          service.getDetails(params, function(place, status){
            if (status == google.maps.places.PlacesServiceStatus.OK) {
              $('#hero-header-wrapper img').attr('src', place.photos[0].getUrl({'maxWidth': 408, 'maxheight': 407}));
              $('.place-name').text(place.name);
              $('.place-review-score').text(place.rating);
              $('.place-type').text(place.types[0]);
              $('#place-info-wrapper').addClass('visible');
            }
          });
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