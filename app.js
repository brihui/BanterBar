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


app.post("/getFriends", (req, res) => { 
    let userID = req.body;

    console.log(userID);

    let userRef = db.collection('users').doc('' + userID["uid"]);
    let friendsRef = userRef.get()
      .then(doc => {
        let friendIdArray = doc.data().friends;
        let friendNameArray = [];
        
        for(let i = 0; i < friendIdArray.length; i++){
            let friendRef = db.collection('users').doc(friendIdArray[i])
            let friendName = friendRef.get()
                .then(doc => {
                    friendNameArray.push(doc.data().name);
                    
                    if(i == (friendIdArray.length - 1)){
                        res.json(friendNameArray);
                    }
                })       
        }
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
}) 

app.listen(3000);