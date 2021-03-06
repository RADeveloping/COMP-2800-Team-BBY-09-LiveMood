/**
 * @desc adds the onclick handlers to buttons
 */
function addOnClickHandlers() {
	document.getElementById('signupbutton').onclick = register;
}

addOnClickHandlers();

/**
 * @desc register user to Firebase.
 */
function register() {
	document.getElementById('signupbutton').disabled = true;
	document.getElementById('signupbutton').innerHTML =
		'<span class="spinner-border spinner-border-sm mr-2 disabled" role="status" aria-hidden="true"></span>Loading...';

	let pw = document.getElementById('inputPassword').value;
	let name = document.getElementById('inputName').value;
	let email = document.getElementById('inputEmail').value;

	firebase
		.auth()
		.createUserWithEmailAndPassword(email, pw)
		.then(function() {
			let user = firebase.auth().currentUser;
			user
				.updateProfile({
					displayName : name
				})
				.then(function() {
					// Display name set successfully, add data to firestore.
					db
						.collection('users')
						.doc(user.uid)
						.set({
							name  : name,
							email : email
						})
						.then(function() {
							user
								.sendEmailVerification()
								.then(function() {
									$('#createAccountBox').addClass('hide');
									$('#emailMessage').removeClass('hide');
									$('#emailMessage').addClass('showMessage');
								})
								.catch(function(error) {
									alert(error);
								});
						});
				})
				.catch(function(error) {
					// An error happened while adding data to firestore.
					window.alert(error.message);
					document.getElementById('signupbutton').disabled = false;
					document.getElementById('signupbutton').innerHTML = 'Register';
				});
		})
		.catch(function(error) {
			// Handle Errors here.
			window.alert(error.message);
			document.getElementById('signupbutton').disabled = false;
			document.getElementById('signupbutton').innerHTML = 'Register';
		});
}

$('#signinbutton').click(function() {
	window.location.assign('login.html');
});
