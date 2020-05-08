const moodScore = Math.ceil(Math.random() * 10);
console.log(moodScore);

function logout() {
    firebase
        .auth()
        .signOut()
        .then(function() {
            // Sign-out successful.
            window.location = 'login.html';
        })
        .catch(function(error) {
            window.alert(error);
        });
}

function checkCred() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (!user) {
            window.location = 'login.html';
        } else {
            init();
        }
    });
}

checkCred();

let user;

function init() {
    user = firebase.auth().currentUser;
    document.getElementById("logoutButton").onclick = logout;
    setUserName();
    indActivity();
}

function setUserName() {
    document.getElementById("username").innerText = user.displayName;

}
const actSuggestion = document.querySelector('.suggestion');
const actSug = document.querySelector('#actSug');

// Render the suggestion to the user
function renderSuggestion(doc) {
    let activity = document.createElement('div');
    let activityName = document.createElement('span');
    let activityInfo = document.createElement('h2');
    let activityImg = document.createElement('img');
    let activityLink = document.createElement('a');
    activityLink.classList.add("link");
    activityName.textContent = doc.data().name;
    activityInfo.textContent = doc.data().info;
    activityLink.innerHTML = '<br>Click here for more info';
    activityImg.src = doc.data().image;
    activityLink.href = doc.data().link;
    activityInfo.href = doc.data().link;

    actSug.appendChild(activityName);
    activity.appendChild(activityInfo);
    activity.appendChild(activityLink);
    activity.appendChild(activityImg);
    // activity.style.backgroundImage = 'url(' + doc.data().image + ')';

    actSuggestion.appendChild(activity);
}
// document.getElementById('curMood').onclick = indActivity;
// get the activity base on current mood score
function indActivity() {
    db.collection('individualActivities').get().then((snapshot) => {
        snapshot.docs.forEach((doc) => {
            // console.log(doc.data());
            if (doc.data().rating == moodScore) {
                renderSuggestion(doc);
            }
        });
    });
}