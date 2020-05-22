//gets roomID from local storage
let room = localStorage.getItem('hangoutID');
let roomRef = db.collection("rooms").doc(room);
//Reads the name of the room and shows it on #roomName
roomRef.get().then(function (doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data());
        $('#roomName').text(doc.data().roomName);
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function (error) {
    console.log("Error getting document:", error);
});
//Listens in on the room database, executes whenever changes are made/page first loaded
roomRef.onSnapshot(function (doc) {
    //If current user is the room's host, context menu has more options added
    firebase.auth().onAuthStateChanged(function (user) {
        user = firebase.auth().currentUser;
        let userID = user.uid;
        if (doc.data().host == userID) {
            let kick = '<li class="context-menu__item"><a href="#" class="context-menu__link" data-action="Edit"><i class="fa fa-edit"></i>Kick User</a></li>';
            $('#cont').append(kick);
            let assign = '<li class="context-menu__item"><a href="#" class="context-menu__link" data-action="Edit"><i class="fa fa-edit"></i>Assign DJ</a></li>';
            $('#cont').append(assign);
        }
    })
    //Resets the users displayed
    $('.display-div').html('');
    //Inserts each user as a list item
    let users = doc.data().users;
    let i;
    for (i = 0; i < users.length; i++) {
        let userRef = db.collection("users").doc(users[i]);
        userRef.get().then(function (doc) {
            $('.display-div').append('<div class ="task">' + doc.data().name + '</div>');
        })
    }

})