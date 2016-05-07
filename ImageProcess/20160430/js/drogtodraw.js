/* Init */
var cvs, ctx;
window.onload = function() {
    cvs = document.getElementById("cvs");
    //Get canvas context, 2d or webgl(3D)
    ctx = cvs.getContext("2d");
    cvs.addEventListener("mousedown", draw);

};

function draw(e) {
    //滑鼠點下瞬間
    var currentX = e.clientX - cvs.offsetLeft;
    var currentY = e.clientY - cvs.offsetTop;
    ctx.strokeStyle = document.getElementById("color").value;
    ctx.lineWidth = document.getElementById("width").value;

    var move = function(e) {
        //滑鼠移動的過程
        //document.title = e.clientX + "," + e.clientY;
        ctx.beginPath();
        ctx.moveTo(currentX, currentY);
        ctx.lineTo(e.clientX - cvs.offsetLeft, e.clientY - cvs.offsetTop);
        ctx.closePath();
        ctx.stroke();
        //更新當前的點
        currentX = e.clientX - cvs.offsetLeft;
        currentY = e.clientY - cvs.offsetTop;
    };

    var end = function() {
        //滑鼠放開的瞬間
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", end);
    };

    //Register event listener for mouse move and mouse up
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", end);
}

function getFile(input) {
    console.log(input.files);
    var file = input.files[0];
    //取得檔案網址
    var src = URL.createObjectURL(file);
    //載入圖片
    var img = new Image(); //建立圖片物件
    img.src = src;
    img.onload = function() {
        //圖片載入後，畫到Canvas上
        ctx.drawImage(this, 0, 0, cvs.width, cvs.height);
    };
};

function saveFile() {
    var src = cvs.toDataURL("image/png");
    var link = document.getElementById("download");
    link.href = src;
    //Download file name
    link.download = "downloadfile";
    link.click();
}
