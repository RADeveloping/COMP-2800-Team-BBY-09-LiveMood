// ====================================================
// Determine buttons' visibility base on login status
// ====================================================
function checkCred() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (!user) {
            $("#loginButton").css("display", "list-item");
            $("#registerButton").css("display", "list-item");
        }else{
            $("#dashboardButton").css("display", "list-item");
        }
    });
}

checkCred();