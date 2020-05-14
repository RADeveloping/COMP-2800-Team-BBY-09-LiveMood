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

function checkCred() {
	firebase.auth().onAuthStateChanged(function(user) {
		if (!user) {
			window.location = 'login.html';
		} else {
			init();
		}
	});
}

checkCred();

let user;
let userId;

function init() {
	user = firebase.auth().currentUser;
	userId = user.uid;
	getUserMood();
}

let moodScore;

let day = new Date().getDate();
let month = new Date().getMonth();
let year = new Date().getFullYear();
let today;

function getDocId() {
	if (month < 10) {
		month = '0' + (month + 1);
	} else {
		month++;
	}

	if (day < 10) {
		day = '0' + day;
	}
	today = '' + year + month + day;
	return today;
}

function getUserMood() {
	getDocId();
	console.log('in get user mood');
	db
		.collection('users')
		.doc(userId)
		.collection('surveyTaken')
		.get()
		.then((snapshot) => {
			snapshot.docs.forEach((doc) => {
				if (doc.id == today) {
					console.log('got user');
					moodScore = Math.round(doc.data().score / 10);
					console.log(doc.id);
					indActivity(doc);
				}
			});
		})
		.catch((error) => console.log('error'));
}

const actSuggestion = document.querySelector('.suggestion');
const actSug = document.querySelector('#actSug');
// Render the suggestion to the user
function renderSuggestion(doc, userDoc) {
	let activity = document.createElement('div');
	let activityName = document.createElement('span');
	let activityInfo = document.createElement('h2');
	let activityImg = document.createElement('img');
	let activityLink = document.createElement('a');
	let activityRate = document.createElement('h3');
	activityLink.classList.add('link');
	activityName.textContent = doc.data().name;
	activityInfo.textContent = doc.data().info;
	activityLink.innerHTML = '<br>Click here for more info';
	activityImg.src = doc.data().image;
	activityLink.href = doc.data().link;
	activityInfo.href = doc.data().link;
	activityRate.innerHTML = '<h3>Your personal mood score is: ' + userDoc.data().score + '</h2>';
	actSug.prepend(activityRate);
	actSug.appendChild(activityName);
	activity.appendChild(activityInfo);
	activity.appendChild(activityLink);
	activity.appendChild(activityImg);
	// activity.style.backgroundImage = 'url(' + doc.data().image + ')';

	actSuggestion.appendChild(activity);
}
// document.getElementById('curMood').onclick = indActivity;
// get the activity base on current mood score
function indActivity(userDoc) {
	db.collection('individualActivities').get().then((snapshot) => {
		snapshot.docs.forEach((doc) => {
			// console.log(doc.data());
			if (doc.data().rating == moodScore) {
				renderSuggestion(doc, userDoc);
			}
		});
	});
}
