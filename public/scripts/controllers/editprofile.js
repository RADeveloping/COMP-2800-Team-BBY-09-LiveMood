let credential;

/**
 * @desc adds onclick to buttons
 */
function init() {
    document.getElementById("savechanges").onclick = updateProfile;

    // Prompt the user to re-provide their sign-in credentials

    bootbox.prompt({
        title: "Please enter your password to make changes to your profile.",
        inputType: 'password',
        callback: function(result) {

            if (result === null) {
                window.location.assign("index.html");
            } else {
                let user = firebase.auth().currentUser;
                credential = firebase.auth.EmailAuthProvider.credential(
                    user.email,
                    result
                );
            }


        }
    });

}

init();

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
    document.getElementById("savechanges").disabled = true;
    document.getElementById("savechanges").innerHTML = '<span class="spinner-border spinner-border-sm mr-2 disabled" role="status" aria-hidden="true"></span>Loading...';

    let inputname = document.getElementById("inputName")
    let inputemail = document.getElementById("inputEmail");
    console.log();

    let user = firebase.auth().currentUser;
    if (user != null) {
        user.updateProfile({
            displayName: inputname.value
        }).then(function() {
            user.reauthenticateWithCredential(credential).then(function() {
                // User re-authenticated.
                user.updateEmail(inputemail.value).then(function() {
                    // update firstore DB 
                    db.collection("users").doc(user.uid).set({
                        name: inputname.value,
                        email: inputemail.value,
                    }).then(function() {
                        window.location.reload();
                    }).catch(function(error) {
                        //error updating database
                        window.alert(error);
                        document.getElementById("savechanges").disabled = false;
                        document.getElementById("savechanges").innerHTML = "Save Changes"

                    });
                }).catch(function(error) {
                    // error updating email
                    window.alert(error.message);
                    document.getElementById("savechanges").disabled = false;
                    document.getElementById("savechanges").innerHTML = "Save Changes"


                });
            }).catch(function(error) {
                // An error happened.
                window.alert(error.message);
                document.getElementById("savechanges").disabled = false;
                document.getElementById("savechanges").innerHTML = "Save Changes"

                init();

            });
        }).catch(function(error) {
            // error updating display name
            document.getElementById("savechanges").disabled = false;
            document.getElementById("savechanges").innerHTML = "Save Changes"

        });
    }

}