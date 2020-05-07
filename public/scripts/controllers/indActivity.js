const moodScore = 1;

// function logout() {
// 	firebase
// 		.auth()
// 		.signOut()
// 		.then(function() {
// 			// Sign-out successful.
// 			window.location = 'login.html';
// 		})
// 		.catch(function(error) {
// 			window.alert(error);
// 		});
// }

// function checkCred() {
// 	firebase.auth().onAuthStateChanged(function(user) {
// 		if (!user) {
// 			window.location = 'login.html';
// 		} else {
// 			init();
// 		}
// 	});
// }

// checkCred();

// let user;

// function init() {
// 	user = firebase.auth().currentUser;
// 	indActivity();
// }
const actSuggestion = document.querySelector('.suggestion');
// Render the suggestion to the user
function renderSuggestion(doc) {
	let activity = document.createElement('div');
	let activityName = document.createElement('h2');
	let activityLink = document.createElement('a');
	activity.setAttribute('data-id', doc.id);
	activityName.textContent = doc.data().name;
	activityLink.textContent = doc.data().link;

	activity.appendChild(activityName);
	activity.appendChild(activityLink);

	actSuggestion.appendChild(activity);
}

// get the activity base on current mood score
function indActivity() {
	db.collection('individualActivities ').get().then((snapshot) => {
		snapshot.docs.forEach((doc) => {
			console.log(doc.data());
			if (doc.data().rating == moodScore) {
				renderSuggestion(doc);
			}
		});
	});
}
indActivity();
