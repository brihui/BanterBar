//Opens form
function openForm() {
    updateFriends();
    document.getElementById("myForm").style.display = "block";
}
//Close the form
function closeForm() {
    document.getElementById("myForm").style.display = "none";
}
//Invite users
function invite() {
    let friends = new Array();
    //read roomId from local storage
    let roomID = localStorage.getItem('hangoutID');
    $.each($("input[name='friends']:checked"), function () {
        friends.push($(this).val());
    });
    firebase.auth().onAuthStateChanged(function (user) {
        user = firebase.auth().currentUser;
        let userID = user.uid;
        db.collection("users").doc(userID).get()
        .then(function (doc) {
            let name = doc.data().name;
            db.collection("rooms").doc(roomID).get()
            .then(function (doc) {
                let roomName = doc.data().roomName;
                //create invitation doc with variables needed
                if (typeof friends == "string") {
                    db.collection("invitations").add({
                        "from": userID,
                        "to": friends,
                        "roomID": roomID,
                        "userName": name,
                        "roomName": roomName
                    })
                } else {
                    for (let i = 0; i < friends.length; i++) {
                        db.collection("invitations").add({
                            "from": userID,
                            "to": friends[i],
                            "roomID": roomID,
                            "userName": name,
                            "roomName": roomName
                        })
                    }
                }
                closeForm();
            })
        })
    })
}
//Update lists of friends displayed
function updateFriends() {
    //resets invitations list
    $('#roomInvite').html('');
    firebase.auth().onAuthStateChanged(function (user) {
        user = firebase.auth().currentUser;
        let userID = user.uid;
        db.collection("users").doc(userID).get()
        .then(function (doc) {
                let friends = doc.data().friends;
                var display;
                //inserts a div for each friend the user has
                for (let i = 0; i < friends.length; i++) {
                    db.collection("users").doc(friends[i]).get()
                    .then(function (doc) {
                        let name = doc.data().name;
                        display = '<div><input type="checkbox" name ="friends" value = "' + doc.id + '"> <label>' + name + '</label></div>';
                        $('#roomInvite').append(display);
                    })
                }
                $('#roomInvite').append('<input type="checkbox" style ="display:none;" checked name="userID" value="' + userID + '">');
            })
    })
}