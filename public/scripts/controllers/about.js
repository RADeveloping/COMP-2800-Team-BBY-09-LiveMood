let user;

/**
 * @desc Log user out of website and redirect to login page.
 */
function logout() {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        window.location = "login.html";
    }).catch(function(error) {
        window.alert(error);
    })
}


/**
 * @desc check if user is logged in, if not send them back to login.html
 */
function checkCred() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (!user) {
            window.location = "login.html";
        } else {
            init();
        }
    });
}

checkCred();


/**
 * @desc initialize the current user and call set username.
 */
function init() {
    user = firebase.auth().currentUser;
    setUserName();
    document.getElementById("logoutButton").onclick = logout;
}

/**
 * @desc set the username for the user.
 */
function setUserName() {
    document.getElementById("username").innerText = user.displayName;

}

/**
 * @desc gets google maps api for location and display marker on map.
 */
function covidAPI() {
    // Create the script tag, set the appropriate attributes
    var script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA3Uaad8zscNtbfelpc2MCffLl0sJo5P08&callback=initMap';
    script.defer = true;
    script.async = true;

    // Attach your callback function to the `window` object
    window.initMap = function() {
        // JS API is loaded and available
        var map;
        var location = { lat: 49.254248, lng: -122.998346 };

        var contentString = "<b>LiveMood Headquarters</b><br>" + "<br>3700  Willingdon Ave" + "<br>Burnaby, BC V5G 3H2" + "<br>Canada"
        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        var marker = new google.maps.Marker({
            position: location,
            map: map,
            title: 'LiveMood HQ',
        });

        marker.addListener('click', function() {
            infowindow.open(map, marker);
        });

        map = new google.maps.Map(document.getElementById('googleMap'), {
            center: location,
            zoom: 14
        });

        marker.setMap(map);
        infowindow.open(map, marker);

    };

    // Append the 'script' element to 'head'
    document.head.appendChild(script);
}

covidAPI();