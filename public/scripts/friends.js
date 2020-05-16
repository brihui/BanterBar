let userID = "";

firebase.auth().onAuthStateChanged(function (user) {
    user = firebase.auth().currentUser;
    userID = user.uid;

    // Using get() instead of onSnapshot() because i don't want it to constantly read data
    // and update the page
    db.collection("users").doc(userID).get()
        .then(function(doc){
            // Get the list of user's friends IDs as an array 
            let friendArray = doc.data().friends;
            // Loop through the friend array
            for(let i = 0; i < friendArray.length; i++){
                // Get a reference of each user using their ID
                db.collection("users").doc(friendArray[i]).get()
                    .then(function(doc){
                        // Append a bunch of HTML that creates the friend card, including a 'delete' function
                        $('#friends-list').append('<div class="card" style="width: 18rem;"><img src="../images/men.png" alt="Card image cap" class="rounded-circle profile-pic"><div class="card-body"><h5 class="card-title">' + doc.data().name + '</h5><div id="interactions"><a href="#" class="btn btn-light btn-sm" id="invite-friend">Invite</a><input type="button" value="Delete" onclick="removeFriend(\'' + doc.id + '\')" class="btn btn-light btn-sm"></div></div></div>');
                    
                })
            }
        })
})

// let addFriendButton = document.getElementById("addBtn");

// // Function to add a friend by email
function addFriend(){
    // Get the email typed in by user
    let emailToAdd = document.getElementById("add-email").value;

    // Loop through all the users in our database
    firebase.firestore().collection("users").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // Get each user's email
            let userEmail = doc.data().email;
            // Checking if emails are the same as the input one (case insensitive)
            if(userEmail.toLowerCase() == emailToAdd.toLowerCase()){
                // Add the user's ID to current user's friends array if the emails match
                db.collection("users").doc(userID).update({
                    friends: firebase.firestore.FieldValue.arrayUnion(doc.id)
                })
                .then(function(){
                    console.log("Friend Added Successfully");
                    location.reload();
                })
            }
        })
    })
}

function removeFriend(removeID){
    db.collection("users").doc(userID).update({
        friends: firebase.firestore.FieldValue.arrayRemove(removeID)
    })
    .then(function(){
        console.log("Friend Removed");
        location.reload();
    })
}

// addFriendButton.onclick = addFriend;

/**
 * Using AJAX to post the email to be added and the current user's ID to the server
 */
// $(document).ready(function() {
//     $('#addBtn').on('click', function(){
//         $.ajax({
//             url: '/addFriend',
//             method: 'POST',
//             data: 
//             {
//                 addEmail : document.getElementById("add-email").value,
//                 uid : userID
//             }
//         })
//         .done(function(data){
//             console.log(data);
//         })
//         .fail(function(error){
//             console.log(error.fail);
//         })
//     })
// })

/**
 * A function that is called by a button onclick, ID to be removed passed into the function.
 * Using AJAX to pass that ID and the current user's ID to the server and reloads the page once that is done.
 */
// function removeFriend(removeID){
//     $.ajax({
//         url: '/deleteFriend',
//         method: 'POST',
//         data: 
//         {
//             deleteId : removeID,
//             uid : userID
//         }
//     })
//     .done(function(data){
//         console.log(data);
//         // Reload the page
//         location.reload();
//     })
//     .fail(function(error){
//         console.log(error);
//     })
// }