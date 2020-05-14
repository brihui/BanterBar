function openForm() {
    updateFriends();
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}
function updateFriends(){
    $('#roomInvite').html('');
    firebase.auth().onAuthStateChanged(function (user) {
    user = firebase.auth().currentUser;
    let userID = user.uid;
    db.collection("users").doc(userID).get()
        .then(function(doc){
        var friends = doc.data().friends;
        var display;
        for(var i = 0; i < friends.length; i++){
            db.collection("users").doc(friends[i]).get()
            .then(function(doc){
                var name = doc.data().name;
                display ='<option value = "' + name + '">' + name + '</option>';
                $('#roomInvite').append(display);
            })           
        }
    })
})
}
