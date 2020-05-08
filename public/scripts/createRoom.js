function createRoom(){
    var roomName = $('#roomName').val();
    var roomSize = parseInt($('#roomSize').val());
    var private = document.getElementById('roomPrivate').checked;
    db.collection('rooms').add({
        "roomName": roomName,
        "host" : userID,
        "roomSize" : roomSize,
        "private" : private
    })
    .then(function(docRef) {
        db.collection('users').doc(userID).update({
            rooms:firebase.firestore.FieldValue.arrayUnion(docRef.id)
        });
        docRef.update({
           users:firebase.firestore.FieldValue.arrayUnion(userID) 
        });
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
          

}
