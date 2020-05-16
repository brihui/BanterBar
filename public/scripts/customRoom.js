var room = localStorage.getItem('hangoutID');
function log(room){
    console.log(room);
}
var roomRef = db.collection("rooms").doc(room);

roomRef.get().then(function(doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data());
        $('#roomName').text(doc.data().roomName);
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});
roomRef.onSnapshot(function(doc){
    firebase.auth().onAuthStateChanged(function (user) {
    user = firebase.auth().currentUser;
    let userID = user.uid;
    if(doc.data().host == userID){
        var kick ='<li class="context-menu__item"><a href="#" class="context-menu__link" data-action="Edit"><i class="fa fa-edit"></i>Kick User</a></li>';
        $('#cont').append(kick);
        var kick ='<li class="context-menu__item"><a href="#" class="context-menu__link" data-action="Edit"><i class="fa fa-edit"></i>Assign DJ</a></li>';
        $('#cont').append(kick);
    }
})
    $('.display-div').innerHTML = '';
    var users = doc.data().users;
    var i;
    for(i = 0; i < users.length; i++){
        var userRef = db.collection("users").doc(users[i]);
        userRef.get().then(function(doc){
            $('.display-div').append('<div class ="task">' + doc.data().name + '</div>');
        })
    }
        
})
