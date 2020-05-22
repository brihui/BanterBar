//Delete record by recID
function delRecord(recID) {
    db.collection("invitations").doc(recID).delete();
}

//Delete record by recID, then join room by roomID
function acpRecord(roomID, recID) {
    delRecord(recID);
    joinRoom(roomID);
}

//Join room by roomID
function joinRoom(roomID) {
    firebase.auth().onAuthStateChanged(function (user) {
        user = firebase.auth().currentUser;
        let userID = user.uid;
        db.collection("users").doc(userID).get()
            .then(function (doc) {
                db.collection("rooms").doc(roomID).get()
                    .then(function (doc) {
                        //join condition
                        let boo = true;
                        let size = doc.data().roomSize;
                        let users = doc.data().users;
                        //if user has previously joined
                        let joined = false;
                        for (let i = 0; i < users.length; i++) {
                            if (users[i] == userID) {
                                joined = true;
                            }
                        }
                        //if users is only a single ID
                        if (typeof users == "string" && joined == false) {
                            if (joined == false && size <= 1) {
                                alert("size exceeded");
                                boo = false;
                            }
                        //if users is an array
                        } else if (joined == false && size <= users.length) {
                            alert("size exceeded");
                            boo = false;
                        }
                        //if join condition passes
                        if (boo) {
                            //adds userID to room's users list
                            db.collection('rooms').doc(roomID).update({
                                users: firebase.firestore.FieldValue.arrayUnion(userID)
                            })
                            .then(function (docRef) {
                                //adds roomId to user's rooms list
                                db.collection('users').doc(userID).update({
                                    rooms: firebase.firestore.FieldValue.arrayUnion(roomID)
                                })
                                .then(function (doc) {
                                    //save roomID to local storage
                                    localStorage.setItem('hangoutID', roomID);
                                    //redirect to hangoutRoom.html
                                    window.location.replace("../html/hangoutRoom.html");
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
//Delete room by roomID
function delRoom(roomID) {
    firebase.auth().onAuthStateChanged(function (user) {
        user = firebase.auth().currentUser;
        let userID = user.uid;
        db.collection("users").doc(userID).get()
        .then(function (doc) {
            db.collection('rooms').doc(roomID).get()
            .then(function (doc) {
                let users = doc.data().users;
                let i;
                //delete curent userID from room's users list
                for (i = 0; i < users.length; i++) {
                    if (users[i] == userID) {
                        db.collection('rooms').doc(roomID).update({
                            "users": firebase.firestore.FieldValue.arrayRemove(userID)
                        });
                    }
                }
            })
            let rooms = doc.data().rooms;
            let i;
            //delete room from user's rooms list
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