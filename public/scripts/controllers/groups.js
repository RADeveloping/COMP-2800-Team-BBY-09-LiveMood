function logout() {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        window.location = "login.html";
    }).catch(function(error) {
        window.alert(error);
    })
}

function checkCred() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (!user) {
            window.location = "login.html";
        } else {
            init();
        }
    });
}

checkCred();

let user;

function init() {
    user = firebase.auth().currentUser;
    showGroups();
}


/**
 * @desc adds the onclick handlers to buttons
 */
function addOnClickHandlers() {
    document.getElementById("addnew").onclick = createGroup;
    document.getElementById("joingroup").onclick = joinGroup;


}
addOnClickHandlers();

function createGroup() {
    bootbox.prompt({
        title: "Please enter a group name",
        inputType: 'text',
        buttons: {
            cancel: {
                label: '<i class="fa fa-times"></i> Cancel'
            },
            confirm: {
                label: '<i class="fa fa-check"></i> Create Group'
            }
        },
        callback: function(result) {

            if (result === null) {

            } else {

                // Add a new document with a generated id.
                db.collection("groups").add({
                        name: result
                    })
                    .then(function(docRef) {
                        console.log("Document written with ID: ", docRef.id);

                        let groupRef = db.collection("users").doc(user.uid);
                        groupRef.update({
                            groups: firebase.firestore.FieldValue.arrayUnion(docRef.id)
                        });

                        let groupRefArray = db.collection("groups").doc(docRef.id);
                        groupRefArray.update({
                            users: firebase.firestore.FieldValue.arrayUnion(user.uid)
                        }).then(function() {
                            window.location.reload();
                        });



                    })
                    .catch(function(error) {
                        console.error("Error adding document: ", error);
                    });

            }


        }
    });

}


function joinGroup() {
    bootbox.prompt({
        title: "Please paste your group code",
        inputType: 'text',
        buttons: {
            cancel: {
                label: '<i class="fa fa-times"></i> Cancel'
            },
            confirm: {
                label: '<i class="fa fa-check"></i> Join Group'
            }
        },
        callback: function(result) {

            if (result === null) {

            } else {

                let groupRefArray = db.collection("groups").doc(result);
                groupRefArray.get()
                    .then((docSnapshot) => {
                        if (docSnapshot.exists) {
                            groupRefArray.onSnapshot((doc) => {
                                // valid invite code

                                let groupRef = db.collection("users").doc(user.uid);
                                groupRef.update({
                                    groups: firebase.firestore.FieldValue.arrayUnion(result)
                                }).then(function() {
                                    groupRefArray.update({
                                        users: firebase.firestore.FieldValue.arrayUnion(user.uid)
                                    }).then(function() {
                                        window.location.reload();
                                    });
                                });
                            });
                        } else {
                            alert("not valid");
                        }
                    });
            }

        }
    });

}



function showGroups() {
    let groupsRef = db.collection("groups");
    var query = groupsRef.where("users", "array-contains", user.uid)
    query.get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                if (doc.exists) {

                    console.log(doc.id)
                    let groupElement = document.getElementById("groupslist");

                    let divCard = document.createElement("div");
                    divCard.classList.add("card");
                    divCard.classList.add("ml-1");
                    divCard.classList.add("mr-1");
                    divCard.id = doc.id;
                    divCard.onclick = groupClicked;

                    let divCardBody = document.createElement("div");
                    divCardBody.classList.add("card-body");

                    let cardTitle = document.createElement("h5");
                    cardTitle.classList.add("card-title");
                    cardTitle.innerText = doc.data().name;
                    divCardBody.appendChild(cardTitle);
                    divCard.appendChild(divCardBody);

                    groupElement.appendChild(divCard);
                    document.body.appendChild(groupElement);
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }

            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
}


function groupClicked(event) {

    let groupID = event.srcElement.offsetParent.id;

    bootbox.dialog({
        title: event.target.innerText,
        message: "<p>What would you like to do to?</p>",
        size: 'large',
        buttons: {
            ok: {
                label: "Cancel",
                className: 'btn-info',
                callback: function() {
                    console.log('Custom OK clicked');
                }
            },
            invite: {
                label: "Group Invite Code",
                className: 'btn-primary',
                callback: function() {
                    window.prompt("Copy to clipboard: Ctrl+C, Enter", groupID);
                }
            },
            cancel: {
                label: "Remove Me From Group",
                className: 'btn-danger',
                callback: function() {
                    removeSelfFromGroup(groupID);
                }
            }
        }
    });
}

function removeSelfFromGroup(groupID) {
    var userGroupRef = db.collection("users").doc(user.uid);

    console.log(user.uid);
    userGroupRef.update({
        groups: firebase.firestore.FieldValue.arrayRemove(groupID)
    }).then(function() {
        var GroupUserRef = db.collection("groups").doc(groupID);
        GroupUserRef.update({
            users: firebase.firestore.FieldValue.arrayRemove(user.uid)
        }).then(function() {
            window.location.reload();
        })
    })






}