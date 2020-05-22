//*****************************************************************************
// Firebase
//*****************************************************************************
//
// This file hold all the firebase/firestore logic.
//
// It initializes the firebase app, sets up auth, and starts firestore.
//
//*****************************************************************************

// Importing firebase config object from config file
import { firebaseConfig, uiConfig } from '../config/firebaseConfig.js';

//*****************************************************************************
// Initialize Firebase App
//*****************************************************************************
firebase.initializeApp(firebaseConfig);
//*****************************************************************************
// Firebase Auth
//*****************************************************************************
const ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
// This is only needed on login page, needed for login
export const firebaseAuth = {
	authUI : function() {
		ui.start('#firebase-auth-container', uiConfig);
	}
};
const db = firebase.firestore();
export const global = {
	//*****************************************************************************
	// Reads From Database
	// 	- Redirects user to homepage if not logged in.
	// 	- Sets users first name in header
	// 	- Sets mood list in timer pop-up
	//*****************************************************************************

	readDB : function() {
		firebase.auth().onAuthStateChanged(function(user) {
			// If no user is currently logged in, redirects to sign in page
			if (!user) {
				window.location.href = './signup.html';
			}
			// DB Reference to logged in user's collection
			const dbRef = db.collection('users').doc(user.uid);

			// If the current user logged in, user is authenticated
			dbRef.set(
				{
					id    : user.id,
					name  : user.name,
					email : user.email
				},
				{ merge: true }
			);
			// Gets: User Data From DB
			// Sets: User's First name in Header
			dbRef.onSnapshot(function(snap) {
				// Current User Data
				const currentUser = snap.data();
				// Imported From Views, passes in current user data
				headerViews.renderName(currentUser);
			});
			// Gets: mood Data From DB
			// Sets: mood List in history
			dbRef.collection('moods').get().then(function(querySnapshot) {
				const indMoods = [];
				querySnapshot.forEach((doc) => {
					// Uses destructuring to get data from each mood
					const { indMood, date } = doc.data();
					const id = doc.id;
					// Adds data to mood object
					const indMoods = {
						mood : mood,
						date : date
					};
					// Adds mood object to array
					dashboard.push(indMoods);
				});
				// Passes completed Array of moods into views method
			});
		});
	},
	//*****************************************************************************
	// Logs current user out of app. Redirects to login page. Called by
	// /controllers/global.js.
	//
	//*****************************************************************************
	logOut : function() {
		firebase
			.auth()
			.signOut()
			.then(function() {
				window.location.href = '/login.html';
			})
			.catch(function(error) {
				console.log(error);
			});
	}
};
