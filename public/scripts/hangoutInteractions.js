function delRecord(recID) {
    db.collection("invitations").doc(recID).delete();
}

function acpRecord(roomID, recID) {
    delRecord(recID);
    joinRoom(roomID);
}


function joinRoom(roomID) {

    firebase.auth().onAuthStateChanged(function (user) {
        user = firebase.auth().currentUser;
        let userID = user.uid;
        db.collection("users").doc(userID).get()
            .then(function (doc) {
            db.collection("rooms").doc(roomID).get()
            .then(function(doc){
                var boo = true;
                var size = doc.data().roomSize;
                var users = doc.data().users;
                var joined = false;
                for(var i = 0; i < users.length; i ++){
                    if(users[i] == userID){
                        joined = true;
                    }
                }
            if(typeof users == "string" && joined == false){
                if(joined == false && size <= 1){
                    alert("size exceeded");
                    boo = false ;
                }
            }else if(joined == false && size <= users.length){
                alert("size exceeded");
                boo =  false;
            }
                if(boo){
            
                db.collection('rooms').doc(roomID).update({
                        users: firebase.firestore.FieldValue.arrayUnion(userID)
                    })
                    .then(function (docRef) {
                        db.collection('users').doc(userID).update({
                                rooms: firebase.firestore.FieldValue.arrayUnion(roomID)
                            })
                            .then(function (doc) {
                                localStorage.setItem('hangoutID', roomID);
                                window.location.replace("../hangout/index.html");
                                // var url = "hangout/" + roomID;
                                // window.location.href = url;
                            })
                    })
                    .catch(function (error) {
                        console.error("Error adding document: ", error);
                    });
                }
                })
            })
    })
}

function delRoom(roomID) {
    firebase.auth().onAuthStateChanged(function (user) {
        user = firebase.auth().currentUser;
        let userID = user.uid;
        db.collection("users").doc(userID).get()
            .then(function (doc) {
                db.collection('rooms').doc(roomID).get()
                    .then(function (doc) {
                        var users = doc.data().users;
                        var i;
                        for (i = 0; i < users.length; i++) {
                            if (users[i] == userID) {
                                db.collection('rooms').doc(roomID).update({
                                    "users": firebase.firestore.FieldValue.arrayRemove(userID)
                                });
                            }
                        }
                    })
                var rooms = doc.data().rooms;
                var i;
                for (i = 0; i < rooms.length; i++) {
                    if (rooms[i] == roomID) {
                        db.collection('users').doc(userID).update({
                                "rooms": firebase.firestore.FieldValue.arrayRemove(roomID)
                            })
                            .then(function (doc) {
                                location.reload();
                            })
                    }
                }
            })
    })


}