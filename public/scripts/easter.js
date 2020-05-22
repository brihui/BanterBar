let count = 0;
$('#logo').click(function(){
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
    $('body').append("<p class='mc'>I'm Michael Jordan, and McDonald's restaurants have given me this time to talk to you about something we both really care about. Kids.</p>");
    setTimeout(function(){  $('body').append("<p class='mc'>Kids are the reason McDonald's sponsors their Get It Straight program, an national drug awareness effort.</p>"); }, 10000);
    setTimeout(function(){  $('body').append("<p class='mc'>Think about this: Many of you using drugs out there now are under 18.</p>"); }, 17000);
    setTimeout(function(){ $('body').append("<p class='mc'>Do you realize that at 18, you have lived only 1/4th of your life?</p>"); }, 22000);
    setTimeout(function(){ $('body').append("<p class='mc'>When you're using drugs, you're only cheating yourself out of the chance to find out who you really can be, and believe me, if you don't use drugs, you can just about be anything you want to be.</p>"); }, 27000);
    setTimeout(function(){ $('body').append("<p class='mc'>Listen, you got at least 3/4ths of your life to go.</p>");}, 39000);
    setTimeout(function(){ $('body').append("<p class='mc'>That's three more lifetimes to you. So don't blow it.</p>"); }, 42000);
    setTimeout(function(){ $('body').append("<p class='mc'>Don't do drugs.</p>"); }, 45000);
    setTimeout(function(){ $('body').append("<p class='mc'>If you're doing it, stop it. Get some help. McDonald's wants to give yourself a chance.</p>"); }, 48000);
    setTimeout(function(){ $('body').append("<p class='mc'>A chance to find out all the wonderful things you really can be.</p>");}, 54000);
    setTimeout(function(){ $('body').append("<p class='mc'>And so do I.</p>"); }, 57000);    
    $('#mc').addClass('move');
}