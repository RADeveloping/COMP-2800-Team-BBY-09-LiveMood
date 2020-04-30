/**
 * @desc adds the onclick handlers to buttons
 */
function addOnClickHandlers() {
    document.getElementById("back").onclick = goToLoginPage;
}
addOnClickHandlers();

/**
 * @desc redirect to login page 
 */
function goToLoginPage() {
    window.location.assign("login.html");

}