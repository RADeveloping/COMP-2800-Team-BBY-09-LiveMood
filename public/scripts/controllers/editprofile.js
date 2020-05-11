let credential;

/**
 * @desc adds onclick to buttons
 */
function init() {
    document.getElementById("savechanges").onclick = updateProfile;
    document.getElementById("logoutButton").onclick = logout;

    // Prompt the user to re-provide their sign-in credentials

    bootbox.prompt({
        title: "Please enter your password to make changes to your profile.",
        inputType: 'password',
        callback: function(result) {
            console.log(result);

            let user = firebase.auth().currentUser;
            credential = firebase.auth.EmailAuthProvider.credential(
                user.email,
                result
            );

            user.reauthenticateWithCredential(credential).then(function() {

                document.getElementById("inputName").readOnly = false;
                document.getElementById("inputEmail").readOnly = false;
                document.getElementById("inputPassword").readOnly = false;
                document.getElementById("deleteuserbutton").disabled = false;
                document.getElementById("inputPassword").value = "";
                document.getElementById("savechanges").disabled = false;

            }).catch(function(error) {
                alert("Incorrect Password. Please refresh the page to try again!");

                document.getElementById("inputName").readOnly = true;
                document.getElementById("inputEmail").readOnly = true;
                document.getElementById("inputPassword").readOnly = true;
                document.getElementById("deleteuserbutton").disabled = true;
                document.getElementById("inputPassword").value = "*********";
                document.getElementById("savechanges").disabled = true;
                document.getElementById("savechanges").style.opacity = 0.5;

            });

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
 * @desc update user password 
 */
function updatePassword() {
    let newPassword = document.getElementById("inputPassword").value;
    let user = firebase.auth().currentUser;
    user.updatePassword(newPassword).then(function() {
        window.alert("Succesfully updated changes and password!")
        window.location.assign("login.html");
    }).catch(function(error) {
        alert(error);
    });
}

/**
 * @desc update user info. 
 */
function updateProfile() {
    document.getElementById("savechanges").disabled = true;
    document.getElementById("savechanges").innerHTML = '<span class="spinner-border spinner-border-sm mr-2 disabled" role="status" aria-hidden="true"></span>Loading...';

    let inputname = document.getElementById("inputName")
    let inputemail = document.getElementById("inputEmail");
    let inputpassword = document.getElementById("inputPassword")


    let user = firebase.auth().currentUser;
    if (user != null) {
        user.updateProfile({
            displayName: inputname.value
        }).then(function() {
            user.reauthenticateWithCredential(credential).then(function() {
                // User re-authenticated.
                user.updateEmail(inputemail.value).then(function() {
                    // update firstore DB 
                    db.collection("users").doc(user.uid).update({
                        name: inputname.value,
                        email: inputemail.value,
                    }).then(function() {
                        if (inputpassword.value != "") {
                            updatePassword();
                        } else {
                            window.alert("Succesfully updated changes!")
                            window.location.assign("index.html");
                        }

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

function deleteUser() {
    // Prompt the user to re-provide their sign-in credentials
    bootbox.confirm({
        title: "MAYDAY MAYDAY!",
        message: "Do you want to permanently delete your LiveMood account? This cannot be undone.",
        buttons: {
            cancel: {
                label: '<i class="fa fa-times"></i> Cancel'
            },
            confirm: {
                label: '<i class="fa fa-check"></i> Confirm',
                className: 'btn-danger'

            }
        },
        callback: function(result) {
            if (result == true) {
                // delete all db items
                let user = firebase.auth().currentUser;
                db.collection("users").doc(user.uid).delete().then(function() {
                    console.log("Document successfully deleted!");
                    user.delete().then(function() {
                        window.location.assign = "login.html";
                    }).catch(function(error) {
                        alert(error);
                    });
                }).catch(function(error) {
                    alert(error);
                });
            }
        }
    });
}