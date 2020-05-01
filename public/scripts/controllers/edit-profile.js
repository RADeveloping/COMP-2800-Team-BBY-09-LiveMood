/**
 * @desc adds the onclick handlers to buttons
 */
function addOnClickHandlers() {
	document.getElementById('savechangs').onclick = saveChange;
	document.getElementById('cancelchangbtn').onclick = cancleChange;
}

addOnClickHandlers();

function register() {
	let name = document.getElementById('inputName').value;
	let email = document.getElementById('inputEmail').value;

	firebase
		.auth()
		.createUserWithEmailAndPassword(email, pw)
		.catch(function(error) {
			// Handle Errors here.
			var errorMessage = error.message;
			window.alert(errorMessage);
			console.log('error');

			return false;
		})
		.then(function() {
			console.log('success');

			let user = firebase.auth().currentUser;
			db
				.collection('users')
				.doc(user.uid)
				.set({
					name  : name,
					email : email
				})
				.then(function() {
					window.location.assign('index.html');
				});
		});
}

const helpers = {
	//*****************************************************************************
	// Take user data, pulls out and formats first name.
	//
	// Params: User data
	// Returns: User's capitalized first name
	//*****************************************************************************
	getFirstName : function(currentUser) {
		// Current User's full name
		const name = currentUser.name;

		return name;
	}
};
const dashboardViews = {
	//*****************************************************************************
	// Renders The users first name in the dashboard page heading.
	//
	// Params: Logged in user data
	//*****************************************************************************
	renderHeading : function(currentUser) {
		// Gets first name from helper function
		const firstName = helpers.getFirstName(currentUser);
		// Sets Users Name in Header
		document.getElementById('heading__username').innerText = firstName;
	}
};
