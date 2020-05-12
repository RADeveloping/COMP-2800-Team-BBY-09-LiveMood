/**
 * Redirect to signup page
 */
function goToProfilePage() {
    window.location.assign("editProfile.html");
}

/* Handle month select */
function setGraph(month) {

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
    datasets: [
      {
        data: getMonthScore(month), // Get user data!
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
          yAxes: [
            {
              ticks: {
                beginAtZero: false,
              },
            },
          ],
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
    let scoreId = "" + year + formatMonth + day + userId.substring(0, 13);
    let userDayScoreRef = db.collection("surveyTaken").doc(scoreId);

    // Add to array
    userDayScoreRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          // Get past score
          monthScore.push(doc.data()["score"]);
        } else {
          // No score for the day
          monthScore.push(null);
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  }

  return monthScore;
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

