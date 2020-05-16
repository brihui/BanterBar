let leaderboard = document.getElementById("leaderboard");

db.collection("leaderboard").orderBy('score', 'desc').limit(10).onSnapshot(function (querySnapshot){
    querySnapshot.forEach(function(doc){
        leaderboard.innerHTML += '<li class="list-group-item list-group-item-info scoreboard"><span>' + doc.data().name + '</span><span>Score: ' + doc.data().score + '</span></li>';
    })
})
