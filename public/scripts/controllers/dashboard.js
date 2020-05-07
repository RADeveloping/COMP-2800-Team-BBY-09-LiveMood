/**
 * @desc redirect to signup page 
 */
function goToProfilePage() {
    window.location.assign('editProfile.html');
}
// chart colors
var colors = ["#007bff", "#28a745", "#333333", "#c3e6cb", "#dc3545", "#6c757d"];

// large line chart
var chLine = document.getElementById("chLine");
var chartData = {
    labels: ["S", "M", "T", "W", "T", "F", "S"],
    datasets: [{
            data: [589, 445, 483, 503, 689, 692, 634],
            backgroundColor: "transparent",
            borderColor: colors[0],
            borderWidth: 4,
            pointBackgroundColor: colors[0],
        },
        {
            data: [639, 465, 493, 478, 589, 632, 674],
            backgroundColor: colors[3],
            borderColor: colors[1],
            borderWidth: 4,
            pointBackgroundColor: colors[1],
        },
    ],
};

if (chLine) {
    new Chart(chLine, {
        type: "line",
        data: chartData,
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: false,
                    },
                }, ],
            },
            legend: {
                display: false,
            },
        },
    });
}


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
    setUserName();
    document.getElementById("logoutButton").onclick = logout;
}


function setUserName() {
    document.getElementById("username").innerText = user.displayName;

}