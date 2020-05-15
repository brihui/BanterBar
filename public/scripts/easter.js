var count = 0;
$('#box').click(function(){
    count++;
    console.log(count);
    if(count == 10){
        easter();
    }
});
function easter(){
    console.log('easter effects');
    $('#container').css('display', 'none');
    $('#nav-bar').css('display', 'none');
    $('#myVideo').css('display', 'block');
    $('#myVideo').get(0).play();
    $('body').append("<p id='mc'>I'm Michael Jordan, and McDonald's restaurants have given me this time to talk to you about something we both really care about. Kids. Kids are the reason McDonald's sponsors their Get It Straight program, an national drug awareness effort.Think about this: Many of you using drugs out there now are under 18. Do you realize that at 18, you have lived only 1/4th of your life? When you're using drugs, you're only cheating yourself out of the chance to find out who you really can be, and believe me, if you don't use drugs, you can just about be anything you want to be.Listen, you got at least 3/4ths of your life to go. That's three more lifetimes to you. So don't blow it. Don't do drugs. If you're doing it, stop it. Get some help. McDonald's wants to give yourself a chance. A chance to find out all the wonderful things you really can be. And so do I.</p>");
    
}