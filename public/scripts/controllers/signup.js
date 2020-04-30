/**
 * @desc adds the onclick handlers to buttons
 */
function addOnClickHandlers() {
    document.getElementById("signinbutton").onclick = goToLoginPage;
}
addOnClickHandlers();

/**
 * @desc redirect to login page 
 */
function goToLoginPage() {
    window.location.assign("login.html");

}

/**
 * @desc register user to Firebase.
 */
function register() {
    let pw = document.getElementById("pwInput").value;
    let pwCon = document.getElementById("pwInputCon").value;
    let name = document.getElementById("nameInput").value;
    let email = document.getElementById("emailInput").value;

    if (pw != pwCon) {
        window.alert("Passwords do not match");
        return;

    } else {
        firebase.auth().createUserWithEmailAndPassword(email, pw).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            window.alert(errorMessage);
            return false;
        }).then(function() {
            let user = firebase.auth().currentUser;
            let event = new Date();
            db.collection("users").doc(user.uid).set({
                name: name,
                email: email,
                // dateOfCreation : event.toString()
            }).then(function() {
                window.location = "index.html";
            })
        });
    }
}