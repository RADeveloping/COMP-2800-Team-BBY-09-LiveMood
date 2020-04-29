    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyDq71zvp0RBrSyrrlThTsGfPRVPp4hIDco",
        authDomain: "livemood-a14e0.firebaseapp.com",
        databaseURL: "https://livemood-a14e0.firebaseio.com",
        projectId: "livemood-a14e0",
        storageBucket: "livemood-a14e0.appspot.com",
        messagingSenderId: "1067638898956",
        appId: "1:1067638898956:web:c8d393bcbe54dc004a8929"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();
    const storageRef = firebase.storage().ref();