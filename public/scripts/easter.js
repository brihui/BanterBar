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
    $('#myVideo').play()
    
}