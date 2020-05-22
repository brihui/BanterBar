// Global variable for the database ID of curent logged in user
// This is global so there's no repetitive authentication every user interaction such as add/delete
let userID = "";

//
// This section runs everytime the page loads, and will load the friends list of the currently logged in user
//
firebase.auth().onAuthStateChanged(function (user) {
    // Get the current user, then assign their user uid to the global variable UserID
    user = firebase.auth().currentUser;
    userID = user.uid;

    // Using get() instead of onSnapshot() so it does not constantly add onto the friends list every time 
    // there is a change to the database
    db.collection("users").doc(userID).get()
        .then(function (doc) {
            // Get the list of user's friends IDs as an array 
            let friendArray = doc.data().friends;

            // Loop through the friend array
            for (let i = 0; i < friendArray.length; i++) {
                // Get a reference of each user using their ID
                db.collection("users").doc(friendArray[i]).get()
                    .then(function (doc) {
                        // Append a bunch of HTML that creates the friend card, including a 'delete' function
                        $('#friends-list').append('<div class="card bg-dark" style="width: 18rem;"><img src="../images/men.png" alt="Card image cap" class="rounded-circle profile-pic"><div class="card-body"><h5 class="card-title">' + doc.data().name + '</h5><div id="interactions"><a href="#" class="btn btn-outline-light btn-sm" id="invite-friend">Invite</a><input type="button" value="Delete" onclick="removeFriend(\'' + doc.id + '\')" class="btn btn-outline-light btn-sm"></div></div></div>');

                    })
            }
        })
})

//
// Function that gets called when 'Add' button is pressed to add a new friend by email
//
function addFriend() {
    // Get the email typed in by user
    let emailToAdd = document.getElementById("add-email").value;

    // Only search database for email if the user confirms their action
    if (confirm("Do you want to add " + emailToAdd + "?")) {
        let addSuccess = false;

        // Loop through all the users in our database
        firebase.firestore().collection("users").get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    // Get every user's email
                    let userEmail = doc.data().email;
                    // Checking if emails are the same as the input one (case insensitive)
                    if (userEmail.toLowerCase() == emailToAdd.toLowerCase()) {
                        addSuccess = true
                        // Add the user's ID to current user's friends array if the emails match
                        db.collection("users").doc(userID).update({
                                friends: firebase.firestore.FieldValue.arrayUnion(doc.id),
                            })
                            .then(function () {
                                // Once successful, alert confirmation and reload the window to display the new friend
                                window.alert("Friend added");
                                location.reload();
                            })
                    }
                })
            })
            // If no emails matched after looping through all users, display error message
            .then(function () {
                if (!addSuccess) {
                    window.alert("No user found, please try another email");
                }
            })
    }

}

//
// Function that gets called when 'Delete' button is pressed to remove a friend
//
function removeFriend(removeID) {
    if (confirm("Are you sure you want to remove this friend?")) {
        db.collection("users").doc(userID).update({
                friends: firebase.firestore.FieldValue.arrayRemove(removeID)
            })
            .then(function () {
                window.alert("Friend Removed");
                location.reload();
            })
    }
}