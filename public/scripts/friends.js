/**
 * Using AJAX to post to server, and then generating the friends list
 * from the data sent back. This would be useful for friend requests, 
 * chat and hangouts. 
 */
// $(document).ready(function() {
//     $('#delete-friend').on('click', function(){
//         $.ajax({
//             url: '/deleteFriend',
//             method: 'POST',
            
//         })
//     })

    // let userID = "";
    // firebase.auth().onAuthStateChanged(function (user) {
    //     user = firebase.auth().currentUser;
    //     userID = user.uid;

    //     // console.log(userID);

    //     $.ajax({
    //         url: '/getFriends',
    //         method: 'POST',
    //         data: {uid : userID}
    //     })
    //     .done(function(data){
    //         // console.log(data);
    //         for(let i = 0; i < data.length; i++){
    //             $('#friends-list').append(data[i]);
    //         }
    //     })
    //     .fail(function(error){
    //         console.log(error.fail);
    //     })
    // })
// })

/**
 * Just reading the data using vanilla javascript, should be enough for
 * friends list as it only needs to be generated when the page loads, and does
 * not need to be updated unless the user refreshes the page.
 */

firebase.auth().onAuthStateChanged(function (user) {
    user = firebase.auth().currentUser;
    let userID = user.uid;

    // Using get() instead of onSnapshot() because i don't want it to constantly read data
    // and update the page
    db.collection("users").doc(userID).get()
        .then(function(doc){
        let friendArray = doc.data().friends;

        for(let i = 0; i < friendArray.length; i++){
            db.collection("users").doc(friendArray[i]).get()
                .then(function(doc){
                $('#friends-list').append('<div class="card" style="width: 18rem;"><img src="../images/men.png" alt="Card image cap" class="rounded-circle profile-pic"><div class="card-body"><h5 class="card-title">' + doc.data().name + '</h5><div id="interactions"><a href="#" class="btn btn-light btn-sm" id="invite-friend">Invite</a><a href="#" class="btn btn-light btn-sm" id="delete-friend">Delete</a></div></div></div>');
            })
        }
    })
})