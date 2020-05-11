/**
 * @desc adds the onclick handlers to buttons
 */
function addOnClickHandlers() {
    document.getElementById("resetbutton").onclick = resetPassword;
}
addOnClickHandlers();


/**
 * @desc login user and redirect to index page 
 */
function resetPassword() {

    if (emailIsValid(document.getElementById("inputEmail").value) == false) {
        document.getElementById("emailHelp").classList.replace('d-none', 'd-block');
        document.getElementById("emailHelp").innerText = "Email doesn't appear to be valid. Please try again."
    } else {
        document.getElementById("emailHelp").classList.replace('d-block', 'd-none');

        document.getElementById("resetbutton").disabled = true;
        document.getElementById("resetbutton").innerHTML = '<span class="spinner-border spinner-border-sm mr-2 disabled" role="status" aria-hidden="true"></span>Loading...';

        let auth = firebase.auth();
        let email = document.getElementById("inputEmail").value;
        auth.sendPasswordResetEmail(email).then(function() {
            // Email sent.
            document.getElementById("message").classList.replace('d-none', 'd-block');
            document.getElementById("message").innerText = "Password reset email has been sent!"
            document.getElementById("resetbutton").disabled = false;
            document.getElementById("resetbutton").innerHTML = "Reset Password"
            setTimeout(() => {
                window.location.assign("login.html");
            }, 3000);

        }).catch(function(error) {
            // An error happened.
            document.getElementById("message").classList.replace('d-none', 'd-block');
            document.getElementById("message").innerText = "Oops! Something went wrong: " + error;
            document.getElementById("resetbutton").disabled = false;
            document.getElementById("resetbutton").innerHTML = "Reset Password"
        });
    }

}

function emailIsValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}