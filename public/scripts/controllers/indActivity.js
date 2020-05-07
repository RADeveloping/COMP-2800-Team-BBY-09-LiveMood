const moodScore = Math.floor(Math.random() * 10);

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
	let activityInfo = document.createElement('p');
	activity.setAttribute('data-id', doc.id);
	activityName.textContent = doc.data().name;
	activityInfo.textContent = doc.data().info;

	activity.appendChild(activityName);
	activity.appendChild(activityInfo);

	actSuggestion.appendChild(activity);
}
document.getElementById('curMood').onclick = indActivity;
// get the activity base on current mood score
function indActivity() {
	db.collection('individualActivities').get().then((snapshot) => {
		snapshot.docs.forEach((doc) => {
			console.log(doc.data());
			if (doc.data().rating == moodScore) {
				renderSuggestion(doc);
			}
		});
	});
}
// indActivity();
