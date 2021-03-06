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
function setUserName() {
	document.getElementById('username').innerText = user.displayName;
}

let user;
let userId;

function init() {
	user = firebase.auth().currentUser;
	userId = user.uid;
	setUserName();
	getUserMood();
	document.getElementById('logoutButton').onclick = logout;
}

let moodScore;

//*****************************************************************************
// Get the current date YYYY/MM/DD  as a string
//*****************************************************************************

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
//*****************************************************************************
// Retrives the users mood for fot today's date
//*****************************************************************************
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

//*****************************************************************************
// Renders the activity to the page
//*****************************************************************************
const actSuggestion = document.querySelector('.suggestion');
const actSug = document.querySelector('#actSug');
// Render the suggestion to the user
function renderSuggestion(doc, userDoc) {
	$('#noMoodScore').addClass('hide');
	let activity = document.createElement('div');
	let activityName = document.createElement('span');
	let activityInfo = document.createElement('h2');
	let activityImg = document.createElement('img');
	let activityLink = document.createElement('a');
	let activityRate = document.createElement('h3');
	activityLink.classList.add('link');
	activityName.textContent = doc.data().name;
	activityInfo.innerHTML = doc.data().info;
	activityLink.innerHTML = '<br>Click here for more info<br>';
	activityImg.src = doc.data().image;
	activityLink.href = doc.data().link;
	activityInfo.href = doc.data().link;
	activityRate.innerHTML = '<h3>You scored: ' + userDoc.data().score + ' /100</h2>';
	actSug.prepend(activityRate);
	actSug.appendChild(activityName);
	activity.appendChild(activityInfo);
	activity.appendChild(activityLink);
	activity.appendChild(activityImg);

	actSuggestion.appendChild(activity);
}
//*****************************************************************************
// Get the activity base on current mood score
//*****************************************************************************
function indActivity(userDoc) {
	db.collection('individualActivities').get().then((snapshot) => {
		snapshot.docs.forEach((doc) => {
			if (doc.data().rating == moodScore) {
				renderSuggestion(doc, userDoc);
			}
		});
	});
}
