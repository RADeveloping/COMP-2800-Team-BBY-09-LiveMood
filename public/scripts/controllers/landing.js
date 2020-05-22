// ====================================================
// Determine buttons' visibility base on login status
// ====================================================
function checkCred() {
	firebase.auth().onAuthStateChanged(function(user) {
		if (!user) {
			$('#loginButton').css('display', 'list-item');
			$('#registerButton').css('display', 'list-item');
		} else {
			$('#dashboardButton').css('display', 'list-item');
			$('#logoutButton').css('display', 'list-item');
			document.getElementById('logoutButton').onclick = logout;
		}
	});
}

checkCred();
function logout() {
	firebase
		.auth()
		.signOut()
		.then(function() {
			// Sign-out successful.
			window.location = 'login.html';
		})
		.catch(function(error) {
			window.alert(error);
		});
}
