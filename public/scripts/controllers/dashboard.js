/**
 * @desc redirect to signup page
 */
function goToProfilePage() {
    window.location.assign("editProfile.html");
}
// chart colors
var colors = ["#007bff", "#28a745", "#333333", "#c3e6cb", "#dc3545", "#6c757d"];

// large line chart
var chLine = document.getElementById("chLine");
var chartData = {
    labels: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
    ],
    datasets: [

        // Insert mood ranking from user database here
        {
            data: [400, 300, 500, 600, 300, 400, 500, 300, 400, 300, 500, 550, 450, 330, 332, 400, 300, 500, 600, 300, 400, 500, 300, 400, 300, 500, 550, 450, 330, 332],
            backgroundColor: "transparent",
            borderColor: colors[0],
            borderWidth: 4,
            pointBackgroundColor: colors[0],
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
    firebase
        .auth()
        .signOut()
        .then(function() {
            // Sign-out successful.
            window.location = "login.html";
        })
        .catch(function(error) {
            window.alert(error);
        });
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

function setGraph(month) {
    document.getElementById("chartText").innerText = "Personal Chart for " + month;
}