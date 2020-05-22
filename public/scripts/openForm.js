function openForm() {
    updateFriends();
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

function invite() {
    let friends = new Array();
    let roomID = localStorage.getItem('hangoutID');
    $.each($("input[name='friends']:checked"), function () {
        friends.push($(this).val());
    });
    console.log(friends);
    firebase.auth().onAuthStateChanged(function (user) {
        user = firebase.auth().currentUser;
        let userID = user.uid;
        db.collection("users").doc(userID).get()
            .then(function (doc) {
                let name = doc.data().name;
                db.collection("rooms").doc(roomID).get()
                    .then(function (doc) {
                        let roomName = doc.data().roomName;
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

function updateFriends() {
    $('#roomInvite').html('');
    firebase.auth().onAuthStateChanged(function (user) {
        user = firebase.auth().currentUser;
        let userID = user.uid;
        db.collection("users").doc(userID).get()
            .then(function (doc) {
                let friends = doc.data().friends;
                let display;
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