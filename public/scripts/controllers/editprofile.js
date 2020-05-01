/**
 * @desc logs out current user
 */
function logout() {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        window.location = "login.html";
    }).catch(function(error) {
        window.alert(error);
    })
}

/**
 * @desc checks if user is logged in and if not kicks them out.
 */
function checkCred() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (!user) {
            window.location = "login.html";
        } else {
            loadUserInfo();
        }
    });
}

checkCred();

/**
 * @desc loads user information from Firebase
 */
function loadUserInfo() {
    let name = document.getElementById("username")
    let inputname = document.getElementById("inputName")
    let inputemail = document.getElementById("inputEmail");

    let user = firebase.auth().currentUser;
    if (user != null) {
        user.providerData.forEach(function(profile) {

            name.innerHTML = profile.displayName;
            inputname.value = profile.displayName;
            inputemail.value = profile.email;

        });
    }

}




/**
 * @desc update user info. 
 */
function updateProfile() {
    let inputname = document.getElementById("inputName")
    let inputemail = document.getElementById("inputEmail");

    let user = firebase.auth().currentUser;
    if (user != null) {
        user.updateProfile({
            displayName: inputname.value
        }).then(function() {
            user.updateEmail(inputemail).then(function() {
                // update firstore DB 
                db.collection("users").doc(user.uid).set({
                    name: inputname.value,
                    email: inputemail.value,
                }).then(function() {
                    window.location.reload();
                }).catch(function(error) {
                    //error updating database
                    window.alert(error);
                });
            }).catch(function(error) {
                // error updating email
                window.alert(error);
            });
        }).catch(function(error) {
            // error updating display name
        });
    }

}