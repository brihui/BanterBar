let leaderboard = document.getElementById("leaderboard");

//
// Runs everytime the page is loaded to get the current user, and populate the leaderboard
//
firebase.auth().onAuthStateChanged(function (user) {
    user = firebase.auth().currentUser;
    let userName = user.displayName;

    // Boolean variable to confirm whether high score was obtained to break the loop
    let gotHighScore = false;

    // Loop through all scores in the leaderboard in descending order to get the highest score of current user
    // and list it at the top of the leaderboard
    db.collection("leaderboard").orderBy('score', 'desc').get().then(function (querySnapshot){
        querySnapshot.forEach(function(doc){
            if(doc.data().name == userName && !gotHighScore){
                // Make boolean true in order to not trigger the if statement again
                gotHighScore = true;
                leaderboard.innerHTML += '<li class="list-group-item list-group-item-primary scoreboard"><span><em><b>' + "Your High Score" + '</span><span>' + doc.data().score + '</em></b></span></li>';
            }
        })
    })
    // Once current user's high score has been listed, proceed to list the top 10
    .then(function(){
        db.collection("leaderboard").orderBy('score', 'desc').limit(10).get().then(function (querySnapshot){
            querySnapshot.forEach(function(doc){
                leaderboard.innerHTML += '<li class="list-group-item list-group-item-dark scoreboard"><span>' + doc.data().name + '</span><span>Score: ' + doc.data().score + '</span></li>';
            })
        })
    })
})




