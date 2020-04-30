/**
 * @desc adds the onclick handlers to buttons
 */
function addOnClickHandlers() {
    document.getElementById("signupbutton").onclick = goToSignUpPage;
    document.getElementById("signinbutton").onclick = login;


}
addOnClickHandlers();

/**
 * @desc redirect to signup page 
 */
function goToSignUpPage() {
    window.location.assign("signup.html");

}


/**
 * @desc login user and redirect to index page 
 */
function login() {
    let email = document.getElementById("inputEmail").value;
    let password = document.getElementById("inputPassword").value;

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorMessage = error.message;
        window.alert(errorMessage);
    }).then(function() {
        window.location = "index.html";
    });
}