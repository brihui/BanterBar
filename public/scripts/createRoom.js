function createRoom(){
    var roomName = $('#roomName').val();
    var roomSize = $('#roomSize').val();
    var private = $('#roomPrivate').val();
    db.collection('users').doc(userID).collection('hangouts').doc('testRoom').set({
        "roomName": roomName,
        "host" : userID,
    }, {merge: true});

    window.location.assign('../html/hangout.html');
}
