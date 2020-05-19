// Global variables
let questions = [];
let ansWords = [ [], [] ];
let scoreList = [];
let minMood = '0';
let defaultMood = '50';
let maxMood = '100';
let intervalMood = '10';

// Date variables
let day = new Date().getDate();
let month = new Date().getMonth();
let year = new Date().getFullYear();
let today = new Date(year, month, day, 0, 0, 0);

// Get userId
let userId;
let user;
firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		userId = user.uid;
		setUserName();
		readDB();
		document.getElementById('logoutButton').onclick = logout;
	} else {
		window.location = 'login.html';
	}
});

function setUserName() {
	user = firebase.auth().currentUser;
	document.getElementById('username').innerText = user.displayName;
}

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

// Read DB data, questions and scores
function readDB() {
	// Read questions
	db.collection('survey').get().then((querySnapshot) => {
		querySnapshot.forEach((doc) => {
			questions.push(doc.data()['question']);
			ansWords[0].push(doc.data()['minWord']);
			ansWords[1].push(doc.data()['maxWord']);
		});
	});

	// Sub-collection in each user
	let userDayScoreRef = db.collection('users').doc(userId).collection('surveyTaken').doc(getDocId());

	userDayScoreRef
		.get()
		.then(function(doc) {
			if (doc.exists) {
				// Get past score
				scoreList = doc.data()['scoreList'];
				document.getElementById("saveButton").innerHTML = "Update";
				$('#infoMsg').css('display', 'block');

				
			} else {
				// New deafault score
				scoreList = new Array(5).fill(defaultMood, 0, 4);
				document.getElementById("saveButton").innerHTML = "Save";
			}

			// Load data onto page
			loadPage();
		})
		.catch(function(error) {
			console.log('Error getting document:', error);
		});
}

function getUser() {
	user = firebase.auth().currentUser;
}

// Create survey dynamically
function loadPage() {
	for (let i = 0; i < questions.length; i++) {
		let q = questions[i];

		// Question text
		let questionPara = document.createElement('p');
		questionPara.className = 'text-center';
		questionPara.textContent = q;

		// Slider div
		let sliderDiv = document.createElement('DIV');
		sliderDiv.className = 'form-control-range mb-4 sliderCont';

		// Slider
		let slider = document.createElement('INPUT');
		slider.className = 'form-control-range slider';
		slider.setAttribute('type', 'range');
		slider.setAttribute('min', minMood);
		slider.setAttribute('max', maxMood);
		slider.setAttribute('value', scoreList[i]);
		slider.setAttribute('step', intervalMood);

		// Min descriptive word
		let textMin = document.createElement('p');
		textMin.className = 'descWord';
		textMin.innerText = ansWords[0][i];

		// Max descriptive word
		let textMax = document.createElement('p');
		textMax.className = 'descWord';
		textMax.innerText = ansWords[1][i];

		sliderDiv.appendChild(textMin);
		sliderDiv.appendChild(slider);
		sliderDiv.appendChild(textMax);

		// Main container
		let qDiv = document.createElement('DIV');
		qDiv.className = 'q';
		qDiv.appendChild(questionPara);
		qDiv.appendChild(sliderDiv);

		$('.qContainer').append(qDiv);
	}
}

// Write scores to DB when save
function save() {
	let scoreList = [];
	let sum = 0;

	sliderList = document.getElementsByClassName('slider');

	Array.from(sliderList).forEach((slider) => {
		scoreList.push(parseInt(slider.value));
		sum += parseInt(slider.value);
	});

	let score = sum / sliderList.length;

	// Sub-collection in each user
	let userDayScoreRef = db.collection('users').doc(userId).collection('surveyTaken').doc(getDocId());

	// Update if exist
	return userDayScoreRef
		.update({
			score     : score,
			date      : Date(),
			scoreList : scoreList
		})
		.then(function() {
			console.log('Updated Document');
			window.location = 'activity.html';
		})
		.catch(function(error) {
			// Create new doc
			userDayScoreRef
				.set({
					score     : score,
					date      : Date(),
					scoreList : scoreList
				})
				.then(function() {
					console.log('New document successfully written');
					window.location = 'activity.html';
				})
				.catch(function(error) {
					// The document doesn't exist.
					console.error('Error adding document: ', error);
					$('#warnMsg').css('display', 'block');
					document.body.scrollTop = 0; // For Safari
					document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
				});
		});
}

// Generate Doc ID (YYYYMMDD)
function getDocId() {
	let tempMonth;
	let tempDay;

	if (month < 10) {
		tempMonth = '0' + (month + 1);
	} else {
		tempMonth = month + 1;
	}

	if (day < 10) {
		tempDay = '0' + day;
	} else {
		tempDay = day;
	}

	return '' + year + tempMonth + tempDay;
}

document.getElementById('saveButton').addEventListener('click', save);
