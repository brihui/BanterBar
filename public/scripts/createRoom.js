//Creates a room and adds the host to the room doc and vice versa, then redirects to the room
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
//On submission of the form, createRoom is called, but reloading is prevented to make sure function executes successfully
$('#myForm').on("submit", function () {
    createRoom();
    return false;
});