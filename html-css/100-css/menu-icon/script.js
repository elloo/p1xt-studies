$(document).ready(function(){
    $("#centre").on('click', function(){
      $(this).toggleClass("active");
      $(this).removeClass("no-animation");
    });
});