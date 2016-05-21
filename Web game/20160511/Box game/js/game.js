var box, box2;
var drawables;

window.onload = function() {
    //初始化程式，取得重要的全域物件
    cvs = document.getElementById("cvs");
    ctx = cvs.getContext("2d");
    drawables = [];
    boxgenerator(100);
    window.setInterval(refresh, 25);
};

function boxgenerator(num) {
    for (i = 0; i < num; i++) {
        drawables.push(new Box());
    }
}

function move() {
    //更新資料
    x += 2;
    y += 1;
    //清除畫面
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    //全部重繪
    ctx.fillRect(x, 100, 50, 50);
    ctx.fillRect(x, y, 50, 50);
}

function refresh() {
    //更新資訊
    for (var i = 0; i < drawables.length; i++) {
        if (drawables[i].update()) {
            drawables[i].splice(i, 1);
            i--;
        }
        //drawables[i].update();
    }

    //清除畫面
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    //重畫
    for (i = 0; i < drawables.length; i++) {
        drawables[i].draw();
    }
}

//Box constructor
function Box() {
    this.x = 0;
    this.y = 0;
    this.vx = Math.floor((Math.random() * 10) + 1);
    this.vy = Math.floor((Math.random() * 10) + 1);
    this.update = function() {
        this.vy += 0.25;
        this.x = this.x + this.vx;
        this.y = this.y + this.vy;
        return this.x > cvs.width || this.y > cvs.height;
    };
    this.draw = function() {
        ctx.save();
        ctx.fillRect(this.x, this.y, 5, 5);
        ctx.restore();
    }
}
