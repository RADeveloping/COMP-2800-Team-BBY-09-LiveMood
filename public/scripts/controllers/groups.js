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
    document.getElementById("creategroup").onclick = createGroup;
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
                        });

                        window.location.reload();

                    })
                    .catch(function(error) {
                        console.error("Error adding document: ", error);
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
                    let groupElement = document.getElementById("groupslist");
                    let li = document.createElement("li");
                    li.innerText = doc.data().name;
                    groupElement.appendChild(li);
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