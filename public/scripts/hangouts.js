//Joined hangouts
firebase.auth().onAuthStateChanged(function (user) {
    user = firebase.auth().currentUser;
    let userID = user.uid;
    db.collection("users").doc(userID).get()
        .then(function (doc) {
            let roomArray = doc.data().rooms;

            for (let i = 0; i < roomArray.length; i++) {
                db.collection("users").doc(roomArray[i]).get()
                    .then(function (doc) {
                        db.collection("rooms").doc(doc.id).get()
                            .then(function (doc) {
                                $('#rooms-list').append('<div class="card" style="width: 18rem;"><div class="card-body"><h5 class="card-title">' + doc.data().roomName + '</h5><div id="interactions"><input type="button" class="btn btn-light btn-sm" value ="Join" onclick ="joinRoom(' + "'" + doc.id + "'" + ')"><input type="button" class="btn btn-light btn-sm" value ="Delete" onclick ="delRoom(' + "'" + doc.id + "'" + ')"></div></div></div>');
                            })

                    })
            }
        })
})

//Invited hangouts
firebase.auth().onAuthStateChanged(function (user) {
    user = firebase.auth().currentUser;
    let userID = user.uid;
    db.collection("invitations").where("to", "==", userID).get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                $('#invited-rooms').append('<div class="card" style="width: 18rem;"><div class="card-body"><h5 class="card-title">' + doc.data().roomName + '</h5><p>from:' + doc.data().userName + '</p><div id="interactions"><input type="button" class="btn btn-light btn-sm" value ="Accept" onclick ="acpRecord(' + "'" + doc.data().roomID + "', '" + doc.id + "'" + ')"><input type="button" class="btn btn-light btn-sm" value ="Deny" onclick ="delRecord(' + "'" + doc.id + "'" + ')"></div></div></div>');
            })
        })
})

//Public hangouts
firebase.auth().onAuthStateChanged(function (user) {
    db.collection("rooms").where("private", "==", false)
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                $('#public-rooms').append('<div class="card" style="width: 18rem;"><div class="card-body"><h5 class="card-title">' + doc.data().roomName + '</h5><div id="interactions"><input type="button" class="btn btn-light btn-sm" id="joinRoom" value ="Join" onclick ="joinRoom(' + "'" + doc.id + "'" + ')"></div></div></div>');
            });
        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
        });
})