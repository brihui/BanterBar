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
                    $('#rooms-list').append('<div class="card" style="width: 18rem;"><div class="card-body"><h5 class="card-title">' + doc.data().roomName + '</h5><div id="interactions"><input type="button" class="btn btn-light btn-sm" value ="Join" onclick ="joinRoom(' + "'" +  doc.id+ "'" + ')"><input type="button" class="btn btn-light btn-sm" value ="Delete" onclick ="delRoom(' + "'" +  doc.id+ "'" + ')"></div></div></div>');
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
    var userID;
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
//    var a = false, b = false;
//    var roomRef = db.collection("rooms").doc(roomID);
//    roomRef.onSnapshot(function(doc){
//        a = true;
//})
//    firebase.auth().onAuthStateChanged(function (user) {
//    user = firebase.auth().currentUser;
//    let userID = user.uid;
//    var userRef = db.collection("users").doc(userID);
//    userRef.onSnapshot(function(doc){
//        b = true;
//    })
//    })
    var url = "hangout/" + roomID;
    setTimeout(function(){window.location.href = url;}, 1000);
    
    
}

function delRoom(roomID){
    firebase.auth().onAuthStateChanged(function (user) {
    user = firebase.auth().currentUser;
    let userID = user.uid;
    db.collection("users").doc(userID).get()
        .then(function(doc){
        db.collection('rooms').doc(roomID).get()
        .then(function(doc){
            var users = doc.data().users;
            var i;
            for(i = 0; i < users.length; i ++){
                if(users[i]==userID){
                    db.collection('rooms').doc(roomID).update({
                        "users":firebase.firestore.FieldValue.arrayRemove(userID)
                    });
                }
            }
        })
        var rooms = doc.data().rooms;
        var i;
        for(i = 0; i < rooms.length; i ++){
             if(rooms[i]==roomID){
                 db.collection('users').doc(userID).update({
                   "rooms":firebase.firestore.FieldValue.arrayRemove(roomID)
               })
                .then(function(doc){
                    setTimeout(function(){location.reload();}, 1000);                  
                 })
            }
        }
    })
})


}