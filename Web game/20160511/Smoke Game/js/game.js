var cvs, ctx;
var smoke;
var drawables;
var MAX_NUM = 200;

/* Game "不即時的動作" "都需要" 預先處理 */

window.onload = function() {
    //初始化程式，取得重要的全域物件
    cvs = document.getElementById("cvs");
    ctx = cvs.getContext("2d");
    loadingRes();
};

function loadingRes() {
    //處理圖片資源
    smoke = new Image();
    smoke.src = "smoke.png";
    smoke.onload = initGame;
}

function initGame() {
    drawables = [];
    window.setInterval(refresh, 25);
}


function refresh() {
    if (drawables.length < MAX_NUM) {
        drawables.push(new Smoke());
    }

    for (i = 0; i < drawables.length; i++) {
        drawables[i].update();
    }

    //清除畫面
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    //重畫
    for (i = 0; i < drawables.length; i++) {
        drawables[i].draw();
    }
}


function Smoke() {
    this.x = 400;
    this.y = 550;
    this.vx = Math.random() * 2 - 1; // -1 ~ 1; 
    this.vy = Math.random() * 2 - 3; // -1 ~ -3;
    this.alpha = 1;
    this.size = 10;
    this.update = function() {
        this.x += this.vx + 1;
        this.y += this.vy;
        this.alpha -= 0.005;
        if (this.alpha < 0) {
            this.alpha = 0;
        }
        this.size++;
        return this.y < 0;
    };
    this.draw = function() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.drawImage(smoke, this.x - this.size / 2, this.y - this.size / 2,
            this.size, this.size
        );
        ctx.restore();
    };
}
