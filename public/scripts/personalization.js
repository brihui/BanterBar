let userID;

// Performs personalization if a user is logged in.
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // If user is signed in, do...
        let user = firebase.auth().currentUser;
        if (user != null) {
            userID = user.uid;
            // Call personalization function.
            personalizeHeader(userID);
        }
    } else {
        // If no user is signed in, redirect to landing and alert.
        window.location.replace('../index.html');
        alert("You must be signed in to access the homepage.");
    }
});
//Youtube layout handling
$(document).ready(function () {

    $('iframe').each(function () {
        let url = $(this).attr("src");
        let char = "?";
        if (url.indexOf("?") != -1) {
            let char = "&";
        }
        $(this).attr("src", url + char + "wmode=transparent");
    });

});
// Function to personalize the home page.
function personalizeHeader(uID) {
    db.collection('users').doc(uID).onSnapshot(
        function (snapshot) {
            $('#p-header').html("Welcome, " + snapshot.data().name);
        }
    );
}