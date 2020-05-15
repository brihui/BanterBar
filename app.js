// Express and EJS
const express = require("express");
let app = express();

app.use(express.static("public"));

app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");

// Setting up Firebase
const admin = require('firebase-admin');

// ***** this JSON file has to be downloaded from our Banterbar database, cannot be 
// uploaded to Github as it has private credentials. *******
let serviceAccount = require('./banterbar-4ff3d-firebase-adminsdk-ai9ep-a3ff325123.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();
// End of setting up firebase

app.get("/", (req, res)=>{
    res.render("pages/landing")
})
app.get("/signup", (req, res)=> { 
    res.render("pages/signup"); 
})
app.get("/aboutus", (req, res)=> { 
    res.render("pages/aboutus"); 
})
app.get("/readmore", (req, res)=> { 
    res.render("pages/readmore"); 
})
app.get("/homepage", (req, res)=>{
    res.render("pages/homepage");
})
app.get("/hangouts", (req, res)=>{
    res.render("pages/hangouts");
})
app.get("/hangout/:one", (req, res)=>{
    let room = req.params.one;   
    res.render("pages/hangout", {room});
})
app.get("/friends", (req, res)=> { 
    res.render("pages/friends"); 
})
app.post("/hangout/:roomID", (req, res)=> {
    var roomID = req.params.roomID;
    var friends = req.body.friends;
    var userID = req.body.userID;
    db.collection("users").doc(userID).get()
    .then(function(doc){
        var name = doc.data().name;
        db.collection("rooms").doc(roomID).get()
        .then(function(doc){
            var roomName = doc.data().roomName;
                if(typeof friends == "string"){
                    db.collection("invitations").add({
                        "from": userID,
                        "to" : friends,
                        "roomID" : roomID,
                        "userName" : name,
                        "roomName": roomName
                    })
                }else{
                    for(var i = 0; i < friends.length; i++){
                    db.collection("invitations").add({
                        "from": userID,
                        "to" : friends[i],
                        "roomID" : roomID,
                        "userName" : name,
                        "roomName" : roomName
                    })     
                    }
                }
        })
    })
})
/**
 * Receives an email to add as a friend, and current user's ID
 * Looks through existing users in the database and matches the email and gets their UserID
 * Adds that userID to the current user's friends list
 */
// app.post("/addFriend", (req, res) => {
//     let addEmail = req.body.addEmail;
//     let currentUserId = req.body.uid;
//     let userRef = db.collection('users')
//     // Getting all users
//     let allUserRef = userRef.get()
//       .then(snapshot => {
//         // Looping through all users and getting their email
//         snapshot.forEach(doc => {
//           let userEmail = doc.data().email;
//           // Checking if emails are the same (case insensitive)
//           if(userEmail.toLowerCase() == addEmail.toLowerCase()){
//             // arrayUnion adds an entry onto an array field if it doesn't already exist
//             let arrUnion = userRef.doc(currentUserId).update({
//               friends: admin.firestore.FieldValue.arrayUnion(doc.id)
//             })
//           }
//         })
//       })
// })

/**
 * Receives an ID to delete, and the current user's ID
 * Deletes the ID from the current user's friends list
 */
// app.post("/deleteFriend", (req, res) => {
//     // ID to be deleted and current user's ID gets passed in
//     let deleteId = req.body.deleteId;
//     let currentUserId = req.body.uid;
//     // Reference to current user's document
//     let userRef = db.collection('users').doc(currentUserId);
//     let deleteFriendRef = userRef.update({
//         // Removes all istances of the ID to be deleted
//         friends: admin.firestore.FieldValue.arrayRemove(deleteId)
//     })
//       .then(function(){
//         res.json("Friend Removed")
//       })
// })

app.listen(3000);