// This file holds and exports our firebase config information

// Your web app's Firebase configuration
export const firebaseConfig = {
	apiKey            : 'AIzaSyDq71zvp0RBrSyrrlThTsGfPRVPp4hIDco',
	authDomain        : 'livemood-a14e0.firebaseapp.com',
	databaseURL       : 'https://livemood-a14e0.firebaseio.com',
	projectId         : 'livemood-a14e0',
	storageBucket     : 'livemood-a14e0.appspot.com',
	messagingSenderId : '1067638898956',
	appId             : '1:1067638898956:web:c8d393bcbe54dc004a8929'
};

// This file holds and exports our firebase auth config settings

export const uiConfig = {
	callbacks        : {
		signInSuccessWithAuthResult : function(authResult, redirectUrl) {
			// User successfully signed in.
			// Return type determines whether we continue the redirect automatically
			// or whether we leave that to developer to handle.
			return true;
		},
		uiShown                     : function() {
			// The widget is rendered.
			// Hide the loader.
			document.getElementById('loader').style.display = 'none';
		}
	},
	credentialHelper : firebaseui.auth.CredentialHelper.NONE,
	// Will use popup for IDP Providers sign-in flow instead of the default, redirect.
	signInFlow       : 'popup',
	signInSuccessUrl : 'dashboard.html',
	signInOptions    : [ firebase.auth.EmailAuthProvider.PROVIDER_ID ],
	// Terms of service url.
	tosUrl           : 'dashboard.html',
	// Privacy policy url.
	privacyPolicyUrl : 'dashboard.html'
};
