/**
 * @desc adds the onclick handlers to buttons
 */
function addOnClickHandlers() {
	document.getElementById('back').onclick = goToLoginPage;
	document.getElementById('signupbutton').onclick = register;
}

addOnClickHandlers();
