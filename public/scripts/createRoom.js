function createRoom() {
    let roomName = $('#roomName').val();
    let roomSize = parseInt($('#roomSize').val());
    let private = document.getElementById('roomPrivate').checked;
    db.collection('rooms').add({
            "roomName": roomName,
            "host": userID,
            "roomSize": roomSize,
            "private": private
        })
        .then(function (docRef) {
            db.collection('users').doc(userID).update({
                rooms: firebase.firestore.FieldValue.arrayUnion(docRef.id)
            });
            docRef.update({
                users: firebase.firestore.FieldValue.arrayUnion(userID)
            });
            joinRoom(docRef.id);
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
}

$('form').on("submit", function () {
    createRoom();
    return false;
});