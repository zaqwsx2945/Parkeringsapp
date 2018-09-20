
mapModule = {
    map: null,
    geoCoder: null,
    currentPosition: {},
    initiateMap : function(){

        console.log("Initiate map");

        var div = document.getElementById("map_canvas");

        // Create a Google Maps native view under the map_canvas div.
        this.map = plugin.google.maps.Map.getMap(div);

        this.geoCoder = plugin.google.maps.Geocoder;

        // If you click the button, do something...
        /*var button = document.getElementById("button");*/

        var _this = this;

        var onSuccess = function(position) {
            currentPosition = position;
            console.log(currentPosition);
            _this.goToCurrentPosition(currentPosition);
        };


        function onError(error) {
            alert('code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n');
        }

        navigator.geolocation.getCurrentPosition((position) => {
            this.currentPosition = position;
            console.log(this.currentPosition);
            this.goToCurrentPosition(this.currentPosition);
        }, onError);


        /*button.addEventListener("click", function() {
            goToCurrentPosition(this.currentPosition);
        });*/


    },
    goToCurrentPosition: function(currentPosition){
        this.map.animateCamera({
            target: {lat: currentPosition.coords.latitude, lng: currentPosition.coords.longitude},
            zoom: 17,
            duration: 5000
        });

        this.map.addMarker({
            "position": {lat: currentPosition.coords.latitude, lng: currentPosition.coords.longitude}
        }, (marker) => {
            console.log(this.currentPosition);
            // Latitude, longitude -> address
            this.geoCoder.geocode({
                "position": {lat: currentPosition.coords.latitude, lng: currentPosition.coords.longitude}
            }, (results) => {
                console.log(results);
                if (results.length === 0) {
                    // Not found
                    return;
                }

                var address = [
                    results[0].subThoroughfare || "",
                    results[0].thoroughfare || "",
                    results[0].locality || "",
                    results[0].adminArea || "",
                    results[0].postalCode || "",
                    results[0].country || ""].join(", ");

                marker.setTitle(address)
                    .showInfoWindow();
            });
        });
    }
};

