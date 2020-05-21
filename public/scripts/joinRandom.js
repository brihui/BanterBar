const bmiBtn = $("#join-bmi");

let publicRooms = [];

// Get all public hangout rooms and add to an array.
function getPublicRooms() {
    console.log("hello");
    db.collection("rooms").where("private", "==", false)
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // For each room, add the doc.id to an array.
                publicRooms.push(doc.id);
                console.log(publicRooms);
            });
            selectRandomRoom();
        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
        });
}

// Picks and returns a random number to use as the index for the publicRooms array.
function selectRandomRoom() {
    let max = publicRooms.length;
    let rand = Math.floor(Math.random() * max);
    let randomRoom = publicRooms[rand];
    console.log(randomRoom);
    localStorage.setItem('hangoutID', randomRoom);
    window.location.replace("../hangout/index.html");
}

console.log("hello");
bmiBtn.click(getPublicRooms);