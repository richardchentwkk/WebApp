/*function test() {
    alert(this.x);
}*/
/*test = test.bind({ "x": 3 });
test();*/

//test.apply({ "x": 3 }); //test();

var cvx, ctx;
window.onload = function() {
    cvs = document.getElementById("cvs");
    ctx = cvs.getContext("2d");
    var img = new Image();
    img.src = "bulldog.jpg";
    img.onload = function() {
        ctx.drawImage(this, 0, 0);
    };

    //Filter practice
}

function invert() {
    var pixels = ctx.getImageData(0, 0, cvs.width, cvs.height);
    console.log(pixels);
    for (var i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i] = 255 - pixels.data[i]; //red
        pixels.data[i + 1] = 255 - pixels.data[i + 1]; //Green
        pixels.data[i + 2] = 255 - pixels.data[i + 2]; //Blue
        //pixels.data[i+3] //alpha 透明度
    }
    ctx.putImageData(pixels, 0, 0);
}

function grayscale() {
    //取得Canvas的像素細節
    var pixels = ctx.getImageData(0, 0, cvs.width, cvs.height);
    //以像素為單位檢視資料
    var avg;
    for (var i = 0; i < pixels.data.length; i += 4) {
        avg = (pixels.data[i] + pixels.data[i + 1] + pixels.data[i + 2]) / 3;
        avg = Math.round(avg);
        //用在平均數覆蓋顏色資訊
        pixels.data[i] = avg;
        pixels.data[i + 1] = avg;
        pixels.data[i + 2] = avg;
    }
    //將修改過的畫素資料放回畫布中
    ctx.putImageData(pixels, 0, 0);
}

function saveFile() {
    cvs.toBlob(
        function(blob) { //Callback 函示
            //得到一個blob物件
            var src = URL.createObjectURL(blob);
            var link = document.getElementById("download");
            link.download = "image.png";
            link.href = src; //連結的網址 => 圖片的資料
            link.click();
        }, "image/png" /*圖片格式*/
    );

}

if (!HTMLCanvasElement.prototype.toBlob) {
    Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
        value: function(callback, type, quality) {

            var binStr = atob(this.toDataURL(type, quality).split(',')[1]),
                len = binStr.length,
                arr = new Uint8Array(len);

            for (var i = 0; i < len; i++) {
                arr[i] = binStr.charCodeAt(i);
            }

            callback(new Blob([arr], { type: type || 'image/png' }));
        }
    });
}
