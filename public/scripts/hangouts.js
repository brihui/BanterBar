


//Joined hangouts
firebase.auth().onAuthStateChanged(function (user) {
    user = firebase.auth().currentUser;
    let userID = user.uid;
    db.collection("users").doc(userID).get()
        .then(function(doc){
        let roomArray = doc.data().rooms;

        for(let i = 0; i < roomArray.length; i++){
            db.collection("users").doc(roomArray[i]).get()
                .then(function(doc){
                db.collection("rooms").doc(doc.id).get()
                .then(function(doc){
                    $('#rooms-list').append('<div class="card" style="width: 18rem;"><div class="card-body"><h5 class="card-title">' + doc.data().roomName + '</h5><div id="interactions"><a href="#" class="btn btn-light btn-sm" id="joinRoom">Join</a><a href="#" class="btn btn-light btn-sm" id="delRoom">Delete</a></div></div></div>');
                })
                
            })
        }
    })
})
//Public hangouts
firebase.auth().onAuthStateChanged(function (user) {
    db.collection("rooms").where("private", "==", false)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            $('#public-rooms').append('<div class="card" style="width: 18rem;"><div class="card-body"><h5 class="card-title">' + doc.data().roomName + '</h5><div id="interactions"><input type="button" class="btn btn-light btn-sm" id="joinRoom" value ="Join" onclick ="joinRoom(' + "'" +  doc.id+ "'" + ')"></div></div></div>');
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
})
function joinRoom(roomID){
    firebase.auth().onAuthStateChanged(function (user) {
    user = firebase.auth().currentUser;
    let userID = user.uid;
    db.collection("users").doc(userID).get()
        .then(function(doc){
    db.collection('rooms').doc(roomID).update({
        users:firebase.firestore.FieldValue.arrayUnion(userID)
    })
    .then(function(docRef) {
        db.collection('users').doc(userID).update({
            rooms:firebase.firestore.FieldValue.arrayUnion(roomID)
        });
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    })
})
    location:reload;
}