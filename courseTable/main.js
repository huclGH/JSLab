$(function(){
$("#courseTable").append("<tr><th>場次</th><th>時間</th><th>主題</th></tr>");

var topicCount=topic.length;

var millisecsPerday = 24*60*60*1000;

// function setPremiere{
// this
// }

let thisDay = document.getElementById("premiere").onchange = function() {myFunction()};


function myFunction() {
    var x = document.getElementById("premiere");
    thisDay.innerHTML=x;
  }

for(var x=0; x<topicCount;x++){
    $("#courseTable").append("<tr>");
    // $("#courseTable").append("<td>"+(x+1)+"</td>");
    $("#courseTable").append(`<td>${x+1}</td>`);
    $("#courseTable").append(`<td>${(new Date(startDate.getTime()+7*x*millisecsPerday)).toLocaleDateString().slice(5)}</td>`);
    $("#courseTable").append(`<td>${topic[x]}</td>`);
    $("#courseTable").append("</tr>");
}



});