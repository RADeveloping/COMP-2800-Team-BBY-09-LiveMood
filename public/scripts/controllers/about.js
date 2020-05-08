function logout() {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        window.location = "login.html";
    }).catch(function(error) {
        window.alert(error);
    })
}


checkCred();

function checkCred() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (!user) {
            window.location = "login.html";
        } else {
            init();
        }
    });
}


let user;

function init() {
    user = firebase.auth().currentUser;
    setUserName();
    document.getElementById("logoutButton").onclick = logout;
}


function setUserName() {
    document.getElementById("username").innerText = user.displayName;

}