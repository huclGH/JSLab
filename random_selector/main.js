$(function () {
    $("input").on("click", function () {
        //alert("Hi");
        var numberOfListItem=$("#choices li").length;
        var randomChildNumber = Math.floor(Math.random()*numberOfListItem);
        $("h1").text($("choices li").eq(randomChildNumber).text());
        //想要找到img元件
        //設定img元件的SRC屬性 ->對應元件的屬性
        //用同一數字的
        //jQuery set attributes 
        $("img").attr("src",$("li").eq(randomChildNumber).attr("title"))
        



    });
});