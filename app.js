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

app.get("/"), (req, res) => {
    res.render("html/landing.html");
}

app.get("/friends", (req, res)=> { 
    res.render("pages/friends"); 
})

// Adds a friend to the user's friend array
app.post("/addFriend", (req, res) => {
    let addEmail = req.body.addEmail;
    let currentUserId = req.body.uid;

    let userRef = db.collection('users')
    // Getting all users
    let allUserRef = userRef.get()
      .then(snapshot => {
        // Looping through all users and getting their email
        snapshot.forEach(doc => {
          let userEmail = doc.data().email;
          // Checking if emails are the same (case insensitive)
          if(userEmail.toLowerCase() == addEmail.toLowerCase()){
            // arrayUnion adds an entry onto an array field if it doesn't already exist
            let arrUnion = userRef.doc(currentUserId).update({
              friends: admin.firestore.FieldValue.arrayUnion(doc.id)
            })
          }
        })
      })
})

// Deletes a friend from the user's friend array
app.post("/deleteFriend", (req, res) => {
    // ID to be deleted and current user's ID gets passed in
    let deleteId = req.body.deleteId;
    let currentUserId = req.body.uid;

    // Reference to current user's document
    let userRef = db.collection('users').doc(currentUserId);
    let deleteFriendRef = userRef.update({
        // Removes all istances of the ID to be deleted
        friends: admin.firestore.FieldValue.arrayRemove(deleteId)
    })
      .then(function(){
        res.json("Friend Removed")
      })
})

// app.post("/getFriends", (req, res) => { 
//     let userID = req.body;

//     console.log(userID);

//     let userRef = db.collection('users').doc('' + userID["uid"]);
//     let friendsRef = userRef.get()
//       .then(doc => {
//         let friendIdArray = doc.data().friends;
//         let friendNameArray = [];
        
//         for(let i = 0; i < friendIdArray.length; i++){
//             let friendRef = db.collection('users').doc(friendIdArray[i])
//             let friendName = friendRef.get()
//                 .then(doc => {
//                     friendNameArray.push(doc.data().name);
                    
//                     if(i == (friendIdArray.length - 1)){
//                         res.json(friendNameArray);
//                     }
//                 })       
//         }
//       })
//       .catch(err => {
//         console.log('Error getting documents', err);
//       });
// }) 

app.listen(3000);