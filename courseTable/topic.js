var topic=[
    "尚未開學",
    "國定假日",
    "環境準備",
    "隨機性",
    "重複性"
];

var startDate = new Date();

function setMonthAndDay(startMonth, startDay){
//把社長指定的日期變成javaScript需要的日期時間格式
startDate.setMonth(startMonth-1,startDay);
startDate.setHours(0);
startDate.setMinutes(0);
startDate.setSeconds(0);
}

setMonthAndDay(2,21);