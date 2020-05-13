function logout() {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        window.location = "login.html";
    }).catch(function(error) {
        window.alert(error);
    })
}


checkCred();

function checkCred() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (!user) {
            window.location = "login.html";
        } else {
            init();
        }
    });
}


let user;

function init() {
    user = firebase.auth().currentUser;
    showGroups();
    setUserName();
}


function setUserName() {
    document.getElementById("username").innerText = user.displayName;

}
/**
 * @desc adds the onclick handlers to buttons
 */
function addOnClickHandlers() {
    document.getElementById("addnew").onclick = createGroup;
    document.getElementById("joingroup").onclick = joinGroup;
    document.getElementById("logoutButton").onclick = logout;


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

            console.log(result.length);
            if (result === null || result.length == 0) {

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
                            alert("Oops. That's not a valid invitation code!");
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

//Group score
function getGroupScoreToday(month){
    let groupScoreList;
    let formatYear = new Date().getFullYear();
    let formatMonth;

    if(month < 10){
        formatMonth = "0" + (month);
    }else{
        formatMonth = (month);
    }
    
    // Get group IDs
    let groupList;
    let userRef = db.collection('users').doc(userId);
    
    userRef.get().then(function(userDoc) {
        // Get groups the user is in
        groupList = userDoc.data()["groups"];
        
        // Each group
        groupList.forEach(groupId => {
            let groupRef = db.collection('groups').doc(groupId);

            // Get group members
            groupRef.get().then(function(groupDoc) {    
                let memberList = groupDoc.data()["users"];
                groupScoreList = [];
                

                // Get member's score
                for(let i = 0; i < memberList.length; i++){
                    let memberId = memberList[i];
                    groupScoreList.push([])
                    // Ref to memeber
                    let memberRef = db.collection('users').doc(memberId);

                    memberRef.get()
                    .then(function(memberDoc){
                        
                        // Iterate over days
                        let daysInMonth = new Date(formatYear, formatMonth, 0).getDate() ;
                        for(let dd = 1; dd<=daysInMonth; dd++){
                        
                            // Format Day to 2 digit
                            let day;
                            if(dd < 10){
                                day = "0" + dd;
                            }else{
                                day = dd;
                            }
                            // Member's score in a day
                            let scoreDocId = ""+ formatYear + formatMonth + day;

                            let userDayScoreRef = db.collection('users').doc(userId)
                                .collection('surveyTaken').doc(scoreDocId);
                            
                            // Daily score
                            userDayScoreRef.get().then(function(doc) {
                                groupScoreList[i].push(doc.data()["score"]);
                        
                            }).catch(function(error) {
                                groupScoreList[i].push(null);
                            });   

                        }

                    }).catch(function(error) {
                        console.log("Error getting document:", error);

                    }); 
                }; // End of day loop for a member

                // Debug info
                console.log(groupScoreList)

            }).catch(function(error) {
                console.log("Error getting document:", error);

            }); // End of member loop for a group

        }); // End of groups loop for a user 

        return(groupScoreList);
    
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });  
}
