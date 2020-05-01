function addOnClickHandlers() {
	document.getElementById('goto-editProfilePage').onclick = goToProfilePage;
	document.getElementById('signinbutton').onclick = login;
}
addOnClickHandlers();

/**
 * @desc redirect to signup page 
 */
function goToProfilePage() {
	window.location.assign('editProfile.html');
}
