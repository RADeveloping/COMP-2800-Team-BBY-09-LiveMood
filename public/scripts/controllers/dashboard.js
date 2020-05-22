/**
 * Redirect to signup page
 */
function goToProfilePage() {
    window.location.assign("editProfile.html");
}

/* Handle month select */
function setGraph(month, data) {

    // Convert Month Name to number
    let monthNum = new Date(Date.parse(month + " 1, 2020")).getMonth() + 1

    // Display heading
    document.getElementById("chartText").innerText =
        "Personal Chart for " + month;

    // Display graph
    var colors = [ // Color
        "#007bff",
        "#28a745",
        "#333333",
        "#c3e6cb",
        "#dc3545",
        "#6c757d",
    ];

    var chLine = document.getElementById("chLine"); // Type of chart
    //let surveyData = getMonthScore(monthNum);

    var chartData = {
        labels: [ // Labels
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
        datasets: [{
            data: data, // Get user data!
            backgroundColor: "transparent",
            borderColor: colors[0],
            borderWidth: 4,
            pointBackgroundColor: colors[0],
        }, ],
    };
    console.log(chartData);
    if (chLine) {
        new Chart(chLine, {
            type: "line",
            data: chartData,
            options: {
                maintainAspectRatio: true,
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0
                    }
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            maxTickLimit: 100,
                            beginAtZero: true,
                        },
                    }, ],
                },
                legend: {
                    display: false,
                },
            },
        });
    }
}

/**
 * Retrieve and display user score
 */
function getMonthScore(month) {

    let monthScore = [];
    let year = new Date().getFullYear();
    let daysInMonth = new Date(year, month, 0).getDate();
    let formatMonth;
    let monthName = document.getElementById(month).innerText;

    // Format month to 2 digit
    if (month < 10) {
        formatMonth = "0" + month;
    } else {
        formatMonth = month;
    }

    //Iterate over days in a month
    for (let dd = 1; dd <= daysInMonth; dd++) {
        // Format Day to 2 digit
        let day;
        if (dd < 10) {
            day = "0" + dd;
        } else {
            day = dd;
        }

        // Form survey ID and reference
        let surveyId = "" + year + formatMonth + day;
        let userDayScoreRef = db.collection("users").doc(userId)
            .collection("surveyTaken").doc(surveyId);

        // Add to array
        userDayScoreRef
            .get()
            .then(function(doc) {
                if (doc.exists) {
                    // Get past score
                    monthScore.push(doc.data()["score"]);

                } else {
                    // No score for the day
                    monthScore.push(0);
                }
                setGraph(monthName, monthScore);
            })
            .catch(function(error) {
                console.log("Error getting document:", error);
            });
    }


    console.log(monthScore);
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
let userId

function init() {
    user = firebase.auth().currentUser;
    userId = user.uid
    setUserName();
    document.getElementById("logoutButton").onclick = logout;
}

function setUserName() {
    document.getElementById("username").innerText = user.displayName;
}

$.getJSON('https://api.covid19api.com/summary', function(data) {
        //covidinfo
        if (data) {
            let totalConfirmed = data["Countries"][30]["TotalConfirmed"];
            let TotalRecovered = data["Countries"][30]["TotalRecovered"];

            let TotalDeaths = data["Countries"][30]["TotalDeaths"];
            let string = 'As of date there has been a total of <strong>' + totalConfirmed + ' </strong>' + 'confirmed cases of COVID-19 and a total of <strong>' + TotalRecovered + '</strong> confirmed recoveries in Canada. <small>Data provided by: covid19api.com</small>';

            document.getElementById("covidinfo").innerHTML = string;
        }
    })
    .fail(function() {
        document.getElementById("coronaBanner").classList.replace("d-block", "d-none");
    });