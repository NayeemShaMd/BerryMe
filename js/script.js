var map;
var geocoder;
var markers = [];
var userMarker;
var defaultZoomLevel = 14;
var uef = {lat:62.603964,lng:29.745859}
var defaultLocation = uef;

function initMap(){
	map = new google.maps.Map(document.getElementById('map'), {
	center: defaultLocation,
	zoom: 12,
	disableDefaultUI: true
	});
	
	geocoder = new google.maps.Geocoder;
	
	var icon={
		url:"img/user.png",
		size:new google.maps.Size(30,30),
		scaledSize:new google.maps.Size(30,30),
		origin:new google.maps.Point(0,0),
		anchor:new google.maps.Point(15,23)
	}
	
	userMarker = new google.maps.Marker({
		map: map,
		title: '',
		icon:icon,
		position:new google.maps.LatLng(defaultLocation.lat, defaultLocation.lng),
		content:'Your location:'
	});
	
	var infowindow = new google.maps.InfoWindow({
		content: ""
	});
	
	userMarker.addListener('click', function(){
		infowindow.open(map, userMarker);
	});
	
	if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
          	function(position) {
            var pos = {
              lat: parseFloat(position.coords.latitude),
              lng: parseFloat(position.coords.longitude)
            };
            
			userMarker.setPosition(
				new google.maps.LatLng(
				pos.lat,
				pos.lng)
			);
			
			google.maps.event.addListener(userMarker, 'click', function() {
				getReverseGeocodingData(userMarker.position, infowindow, userMarker);
			});			
          },function(error){
				switch(error.code){
				  case error.PERMISSION_DENIED:
					console.log("Geolocation's permission is denied.");
					google.maps.event.addListener(userMarker, 'click', function() {
						getReverseGeocodingData(userMarker.position, infowindow, userMarker);
					});
				}
		  });
        }
		else {
			// Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }

    //for address autocomplete

    //address autocomplete

	$("#locateMeBtn").click(function(){
		activateUserBounds();
	});

	
}

// Gets the nearest address of location to show on Infowindow
function getReverseGeocodingData(latlng, infowindow, thisMarker){
	geocoder.geocode({'location': latlng}, function(results, status) {
		if (status === 'OK') {
			if (results[0]) {
				infowindow.close();
				infowindow.setContent(thisMarker.content+'<br>'+results[0].formatted_address);
				infowindow.open(map, thisMarker);
				console.log(results[0].formatted_address);
			} else {
			console.log('No results found');
			}
		} else {
			console.log('Geocoder failed due to: ' + status);
		}
    });
}

// Bounds the map using user's location on map.
function activateUserBounds(){
	var bounds = new google.maps.LatLngBounds();
	bounds.extend(userMarker.position);
	map.fitBounds(bounds);
	map.setZoom(defaultZoomLevel);
}

Parse.initialize("yqmOnVqd4NdQPa8UVXLpMrYwlSn7vuGMe7wbjHvt", "ALZzjaSo5jJZGFQgpdC4xvsvqltGFzdJwiRRXE3f"); 
Parse.serverURL = "https://parseapi.back4app.com";

const Berry = Parse.Object.extend('Berry');


function saveBerry() {

    // post berry data to the backend
    var name = $("#exampleFormControlSelect1").val();
    var details = $("#discription").val();
    var rating = parseInt($("#ratingSelect").val()); // IMPORTANT TO CONVERT TO NUMBER
    var state = $("#stateName").val();
    var zip = parseInt($("#zipCode").val()); // IMPORTANT TO CONVERT TO NUMBER
    var city = $("#cityName").val();
    var location = $('#location').val();                                                                 //We have to add location in the index file
    
    const myNewObject = new Berry();

    myNewObject.set('Details', details);
    myNewObject.set('Name', name);
    myNewObject.set('Rating', rating);
    myNewObject.set('State', state);
    myNewObject.set('ZIP', zip);
    myNewObject.set('City', city);
    myNewObject.set('Location', location);

    //alert("Please insert required fields")

    myNewObject.save({
        success: function(){
            alert("Congratulation ! Berry has been added succesfully!!")
        }, error: function(error){
            alert("Something went wrong !")
            console.log("Error:" + error.message);
        }
    });
};




function getBerry(type) {

    const Berry = Parse.Object.extend('Berry');
    const query = new Parse.Query('Berry');


    // If there is specific type, then we add it to the query
    // otherwise, we search for all the database
    if (type != "all") {
        query.equalTo("Name", type);
    } 


    query.find().then((results) => {
      results.forEach((result) => {

        console.log("Berry succesfully got from the datbase");

        const Name = result.get('Name');
        const rating = result.get("Rating");
        const zip = result.get('ZIP');
        const state = result.get('State');
        const details = result.get('Details');
        const city = result.get('City');
        const location = result.get('Location')
		var loc = location.split(',')
        var latlang = new google.maps.LatLng(loc[0], loc[1])
        console.log(loc[0], loc[1])
        //We have to add location in the index file.
        var infowindow = new google.maps.InfoWindow({
    		content: 'Name: '+ Name + '<br/>' + 'Details: ' + details + '<br/>' + 'Rating: ' +  rating
  		});
    

        var br_icon={
        url:"img/strawberry.png",
        size:new google.maps.Size(30,30),
        scaledSize:new google.maps.Size(30,30),
        origin:new google.maps.Point(0,0),
        anchor:new google.maps.Point(15,23)
        }
        var marker = new google.maps.Marker({
			position: latlang,
			title: Name,
			map: map,
            icon: br_icon
			});
        map.setCenter(marker.getPosition())
        marker.addListener('click', function() {
    		infowindow.open(map, marker);
  		});
 

        // HERE YOU GET THE LOCATION 
        // const Berry_location = blablabla

        console.log(Name, rating, zip, state, details, city);   

        // HERE YOU CALL THE MAP API TO PUT THE MARKER WITH THE LOCATION JUST RETRIEVED FROM ALL THE BERRIES
        // new marker = 
        // {
        //    blablabla
        //    location : Berry_location
        // }


  })
    }, (error) => {
      console.error(error);
       alert("error while getting data from database")
    });

};
	
