//Display joined hangouts
firebase.auth().onAuthStateChanged(function (user) {
    user = firebase.auth().currentUser;
    let userID = user.uid;
    db.collection("users").doc(userID).get()
    .then(function (doc) {
        let roomArray = doc.data().rooms;
        //iterates through user's rooms list
        for (let i = 0; i < roomArray.length; i++) {
            db.collection("users").doc(roomArray[i]).get()
            .then(function (doc) {
                db.collection("rooms").doc(doc.id).get()
                .then(function (doc) {
                    //each room gets inserted as a div
                    $('#rooms-list').append('<div class="card" style="width: 18rem;"><div class="card-body"><h5 class="card-title">' + doc.data().roomName + '</h5><div id="interactions"><input type="button" class="btn btn-light btn-sm" value ="Join" onclick ="joinRoom(' + "'" + doc.id + "'" + ')"><input type="button" class="btn btn-light btn-sm" value ="Delete" onclick ="delRoom(' + "'" + doc.id + "'" + ')"></div></div></div>');
                })
            })
        }
    })
})

//Display invited hangouts
firebase.auth().onAuthStateChanged(function (user) {
    user = firebase.auth().currentUser;
    let userID = user.uid;
    //queries for invitations addressed at the user
    db.collection("invitations").where("to", "==", userID).get()
    .then(function (querySnapshot) {
        //iterates through the list of invitations
        querySnapshot.forEach(function (doc) {
            //each room gets inserted as a div
            $('#invited-rooms').append('<div class="card" style="width: 18rem;"><div class="card-body"><h5 class="card-title">' + doc.data().roomName + '</h5><p>from:' + doc.data().userName + '</p><div id="interactions"><input type="button" class="btn btn-light btn-sm" value ="Accept" onclick ="acpRecord(' + "'" + doc.data().roomID + "', '" + doc.id + "'" + ')"><input type="button" class="btn btn-light btn-sm" value ="Deny" onclick ="dnyRec(' + "'" + doc.id + "'" + ')"></div></div></div>');
        })
    })
})

//Display public hangouts
firebase.auth().onAuthStateChanged(function (user) {
    //queries for public rooms
    db.collection("rooms").where("private", "==", false).get()
    .then(function (querySnapshot) {
        //iterates through the list of public room
        querySnapshot.forEach(function (doc) {
        //each room gets inserted as a div
        $('#public-rooms').append('<div class="card" style="width: 18rem;"><div class="card-body"><h5 class="card-title">' + doc.data().roomName + '</h5><div id="interactions"><input type="button" class="btn btn-light btn-sm" id="joinRoom" value ="Join" onclick ="joinRoom(' + "'" + doc.id + "'" + ')"></div></div></div>');
        });
    })
    .catch(function (error) {
        console.log("Error getting documents: ", error);
    });
})