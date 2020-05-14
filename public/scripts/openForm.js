function openForm() {
    easter();
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}
function easter(){
    var x = document.getElementById("myAudio"); 
    x.play();
}