$(function () {

    var currentQuiz = null;
    $("#startButton").on("click", function () {
        if (currentQuiz == null) {
            currentQuiz = 0;
            $("#question").text(questions[0].question);
            $("#options").empty();
            questions[0].answers.forEach(function (element, index, array) {
                $("#options").append(`<input name='options' type='radio' value='${index}'><label>${element[0]}</label><br><br>`);
            });
            //startbutton的屬性改為next (下一題)
            $('#startButton').attr("value", "Next");
        } else {
            //已經開始作答 從這邊繼續
            //查 radio 元件中誰的radio選項值變成true
            $.each($(":radio"), function (i, val) {
                if (val.checked) {
                    if (isNaN(questions[currentQuiz].answers[i][1])) {
                        var finalResult = questions[currentQuiz].answers[i][1];
                        $("#question").text(finalAnswers[finalResult][0]);
                        $("#options").empty();
                        //顯示最終結果內容
                        $("#options").append(`${finalAnswers[finalResult][1]}<br><br>`);
                        currentQuiz = null;
                        $("#startButton").attr("value", "重新開始");

                    } else {
                        //指定下一題，原始資料從1開始，這裡要-1
                        currentQuiz = questions[currentQuiz].answers[i][1] - 1;
                        $("#question").text(questions[currentQuiz].question);
                        $("#options").empty();
                        questions[currentQuiz].answers.forEach(function (element, index, array) {
                            $("#options").append(`<input name='options' type='radio' value='${index}'><label>${element[0]}</label><br><br>`
                            );

                        });


                    } return false; //跳出

                }


            });
        }
    });
});