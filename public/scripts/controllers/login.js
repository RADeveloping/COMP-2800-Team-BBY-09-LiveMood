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

    firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {

        window.location = "index.html";

    }).catch(function(error) {
        switch (error.code) {
            case "auth/user-not-found":
                window.alert("Email address not found. Please try again!");
                break;
            case "auth/wrong-password":
                window.alert("Incorrect Password. Please try again!");
                break;
            default:
                var errorMessage = error.message;
                window.alert(errorMessage);
        }
    });
}