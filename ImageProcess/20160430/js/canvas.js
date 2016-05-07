/* Init */
var cvs, ctx;
window.onload = function() {
    cvs = document.getElementById("cvs");
    //Get canvas context, 2d or webgl(3D)
    ctx = cvs.getContext("2d");
    //Using context to draw rect
    ctx.fillRect(50, 50, 100, 100);
    ctx.strokeStyle = "red";
    ctx.strokeRect(200, 200, 100, 50);
    //繪製三角形,使用路徑(Path)的概念
    ctx.beginPath();
    ctx.moveTo(250, 250);
    ctx.lineTo(100, 100);
    ctx.lineTo(50, 100);
    ctx.closePath();
ctx.strokeStyle = "red";
ctx.stroke();
 // 填滿或是描邊 ctx.stroke();
    
};
