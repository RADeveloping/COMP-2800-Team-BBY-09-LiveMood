/**
 * @desc Check user state.
 */
firebase.auth().onAuthStateChanged(function(user) {
    loadUserInfo(user);
});

/**
 * @desc loads user information from Firebase
 * @param user the current logged in user.
 */
function loadUserInfo(user) {
    let name = document.getElementById("username")
    let email = document.getElementById("validationCustomEmail");
    let docRef = db.collection("users").doc(user.uid);

    docRef.get().then(function(doc) {
        name.innerHTML = doc.data().name;
        email.value = doc.data().email;
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
}