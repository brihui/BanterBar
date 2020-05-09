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
    $('.display-div').innerHTML = '';
    var users = doc.data().users;
    var i;
    for(i = 0; i < users.length; i++){
        var userRef = db.collection("users").doc(users[i]);
        userRef.get().then(function(doc){
            $('.display-div').append('<div>' + doc.data().name + '</div>');
        })
    }
        
})
