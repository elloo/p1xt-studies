/*
 * Implement all your JavaScript in this file!
 */

$("button").click(function(){
    var btn = $(this).html();
    $("input").val(btn);
});