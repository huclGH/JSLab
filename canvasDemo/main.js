let mapArray, ctx, currentImgMain;
let imgMountain, imgMain, imgEnemy;
//mapArray -決定地圖中每個格子的元素
//ctx - html Canvas 用
//currentImgMainX, currentImgMAinY -決定主角所在座標
//imgMountain, imgMain, imgEnemy -障礙物，主角，敵人的圖片物件
const gridLength = 200; //網頁載入完成後初始化動作
$(function () {

    mapArray = [
        [0, 1, 1],
        [0, 0, 0],
        [3, 1, 2]
    ];//0-可以走、1-障礙,2-終點,3-敵人
    ctx = $("#myCanvas")[0].getContext("2d");//處理HTML Canvas是唯一要特別指定元素的[0]的部分，一般指定id不需要指定;指定模式是2d

    imgMain = new Image();
    imgMain.src = "canvasDemo/images/spriteSheet.png";
    currentImgMain = {
        x: 0, //"x" 雙引號有無皆可以
        y: 0

    }

    // imgMountain = new Image();
    // imgMountaun.src= "images/material.png";
    // imgEnemy = new Image();
    imgMain.onload = function () {
        //從原本圖的(0,0) 剪下寬80, 高130的區域，貼至目前定位置，並且縮放成指定的寬度及高度
        ctx.drawImage(imgMain, 0, 0, 80, 130, currentImgMain.x, currentImgMain.y, gridLength, gridLength);
        // ctx.drawImage(imgMain, 0,0,300,300);
    }
    imgMountain = new Image();
    imgMountain.src = "canvasDemo/images/material.png";
    imgEnemy = new Image();
    imgEnemy.src = "canvasDemo/images/Enemy.png";

    imgMountain.onload = function () {
        imgEnemy.onload = function () {
            for (var x in mapArray) {
                for (var y in mapArray) {
                    if (mapArray[x][y] == 1) {
                        ctx.drawImage(imgMountain, 32, 65, 32, 32, y * gridLength, x * gridLength, gridLength, gridLength);
                    } else if (mapArray[x][y] == 3) {
                        ctx.drawImage(imgEnemy, 7, 40, 104, 135, y * gridLength, x * gridLength, gridLength, gridLength);
                    }
                }
            }
        }
    }
});


//處理使用者按下按鍵
$(document).on("keydown", function (event) {
    let targetImg, targetBlock, cutImagePositionX;
    //cutImagePositionX - 決定主角臉朝向哪個方向
    targetImg = { //主角的目標座標
        "x": -1,
        "y": -1
    };
    targetBlock = { //主角的目標(對應2維陣列)
        "x": -1,
        "y": -1
    }
    event.preventDefault();
    //避免鍵盤預設行為發生，如捲動/放大/換頁...
    //判斷使用者按下什麼並推算目標座標
    // console.log(event);

    switch
    (event.code) {
        case
            "ArrowLeft":
            targetImg.x = currentImgMain.x - gridLength;
            targetImg.y = currentImgMain.y;
            cutImagePositionX = 175;//臉朝左
            break;
        case
            "ArrowUp":
            targetImg.x = currentImgMain.x;
            targetImg.y = currentImgMain.y - gridLength;
            cutImagePositionX = 355;//臉朝上
            break;
        case
            "ArrowRight":
            targetImg.x = currentImgMain.x + gridLength
                ;
            targetImg.y = currentImgMain.y;
            cutImagePositionX = 540;//臉朝右
            break;
        case
            "ArrowDown":
            targetImg.x = currentImgMain.x;
            targetImg.y = currentImgMain.y + gridLength;
            cutImagePositionX = 0;//臉朝下
            break;
        default
            ://其他按鍵不處理
            return;
    }

    console.log(`TargetBlock(${targetImg.x},${targetImg.y}`);
    
    //確認目標位置不會超過地圖
    if (targetImg.x <= 400 && targetImg.x >= 0 && targetImg.y <= 400 && targetImg.y >= 0) {
        targetBlock.x = targetImg.y / gridLength;
        targetBlock.y = targetImg.x / gridLength;
    } else {
        targetBlock.x = -1; //忽略他，不計算了
        targetBlock.y = -1;
    }
    
    console.log(`TargetBlock(${targetBlock.x},${targetBlock.y}`);
    
    //清空主角原本所在的位置
    ctx.clearRect(currentImgMain.x, currentImgMain.y, gridLength, gridLength);

    if (targetBlock.x != -1 && targetBlock.y != -1) {
        switch (mapArray[targetBlock.x][targetBlock.y]) {
            case 0: // 一般道路(可移動)
                $("#talkBox").text("");
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                break;
            case 1: // 有障礙物(不可移動)
                $("#talkBox").text("有山");
                break;
            case 2: // 終點(可移動)
                $("#talkBox").text("抵達終點");
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                break;
            case 3: // 敵人(不可移動)
                $("#talkBox").text("哈摟");
                break;
        }
    } else {
        $("#talkBox").text("邊界");
    }
    //重新繪製主角
    ctx.drawImage(imgMain, cutImagePositionX, 0, 80, 130, currentImgMain.x, currentImgMain.y, gridLength, gridLength);
});



