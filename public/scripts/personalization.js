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

// Function to personalize the home page.
function personalizeHeader(uID) { 
    db.collection('users').doc(uID).onSnapshot(
        function (snapshot) {
            $('#p-header').html("Hello, " + snapshot.data().name);
        }
    );
}