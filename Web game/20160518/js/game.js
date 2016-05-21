var ga = {
    "dom": {
        "loading": null,
        "main": null,
        "game": null
    },

    "res": {
        "total": 4,
        "loaded": 0,
        "imgs": {
            "plane": "plane.png",
            "explosion": "explosion.png"
        },
        "sounds": {
            "bullet": "bullet.mp3",
            "explosion": "explosion.mp3"
        }
    },

    "game": {
        "drawables": null,
        "plane": null,
        "rounds": null
    },

    "key": {
        "left": false,
        "right": false,
        "top": false,
        "bottom": false,
        "space": false
    },

    "ctx": null,
    "audioCtx": null
};
window.onload = function() {
    //程式初始化
    ga.ctx = document.getElementById("cvs").getContext("2d");
    ga.dom.loading = document.getElementById("loading");
    ga.dom.main = document.getElementById("main");
    ga.dom.game = document.getElementById("game");
    ga.audioCtx = new AudioContext();
    //載入資源
    loadResources();
};

function loadResources() {
    loadImages();
    loadSounds();
};

function loadImages() {
    for (var name in ga.res.imgs) {
        loadImage(name, ga.res.imgs[name]);
    }
};

function loadImage(name, src) {
    var img = new Image();
    img.src = src;
    img.onload = function() {
        ga.res.imgs[name] = this;
        resourceLoaded();
    };
};

function loadSounds() {
    for (var name in ga.res.sounds) {
        loadSound(name, ga.res.sounds[name]);
    }
};

function loadSound(name, src) {
    var req = new XMLHttpRequest();
    req.open("get", src);
    req.responseType = "arraybuffer";
    req.onload = function() { //註冊load事件
        ga.audioCtx.decodeAudioData(this.response, function(buffer) {
            ga.res.sounds[name] = buffer;
            resourceLoaded();
        });
    };
    req.send();
};

function resourceLoaded() {
    ga.res.loaded++;
    ga.dom.loading.innerHTML = (100 * ga.res.loaded / ga.res.total) + "%";
    if (ga.res.loaded >= ga.res.total) { //全部資源載入完畢
        initMain();
    }
};

function initMain() {
    ga.dom.loading.style.display = "none";
    ga.dom.main.style.display = "block";
}

function initGame() {
    //準備接收鍵盤指令
    document.addEventListener("keydown", keydown);
    document.addEventListener("keyup", keyup);
    //準備遊戲資料
    ga.game.rounds = 0;
    ga.game.drawables = [];
    ga.game.plane = new Plane();
    ga.game.drawables.push(ga.game.plane);
    //彈幕系統
    ga.game.drawables.push(new BulletSystem());
    //啟動遊戲process
    window.setInterval(refreshGame, 20);

    //操作HTML DOM畫面
    ga.dom.main.style.display = "none";
    ga.dom.game.style.display = "block";
}

function keydown(e) {
    if (e.keyCode == 37) { //left
        ga.key.left = true;
    } else if (e.keyCode == 38) { //bottom
        ga.key.top = true;
    } else if (e.keyCode == 39) { //right
        ga.key.right = true;
    } else if (e.keyCode == 40) { //top
        ga.key.bottom = true;
    } else if (e.keyCode == 32) { //space
        ga.key.space = true;
    }
};

function keyup(e) {
    if (e.keyCode == 37) { //left
        ga.key.left = false;
    } else if (e.keyCode == 38) { //top
        ga.key.top = false;
    } else if (e.keyCode == 39) { //right
        ga.key.right = false;
    } else if (e.keyCode == 40) { //bottom
        ga.key.bottom = false;
    } else if (e.keyCode == 32) { //space
        ga.key.space = false;
    }
};

function refreshGame() {
    //更新資料
    for (var i = 0; i < ga.game.drawables.length; i++) {
        if (ga.game.drawables[i].update()) {
            ga.game.drawables.splice(i, 1);
            i--;
        }
    }

    //重新繪製畫面
    ga.ctx.fillRect(0, 0, ga.ctx.canvas.width, ga.ctx.canvas.height);
    for (var i = 0; i < ga.game.drawables.length; i++) {
        ga.game.drawables[i].draw();
    }

    //更新回合
    ga.game.rounds++;
}

function Plane() {
    this.x = 300;
    this.y = 225;
    this.size = 20;
    this.speed = 2;
    this.update = function() {
        var v = this.speed;
        if (ga.key.space) {
            v = v * 2;
        }

        if (ga.key.left) {
            this.x -= v;
        }
        if (ga.key.top) {
            this.y -= v;
        }
        if (ga.key.right) {
            this.x += v;
        }
        if (ga.key.bottom) {
            this.y += v;
        }
        return false; //永遠不死
    };
    this.draw = function() {
        ga.ctx.save();
        var img = ga.res.imgs.plane;
        if (ga.key.space) {
            img = ga.res.imgs.explosion;
        }

        ga.ctx.drawImage(
            img,
            this.x - this.size / 2,
            this.y - this.size / 2,
            this.size,
            this.size
        );
        ga.ctx.restore();
    };
};

function BulletSystem() {
    this.bullets = [];
    this.freq = 2;
    this.max = 100;

    this.update = function() {
        //每freq回合加入一顆子彈，最大不超過max
        if ((this.bullets.length < this.max) && (ga.game.rounds % this.freq == 0)) {
            this.bullets.push(new Bullet());
        }
        //更新子彈資訊
        for (var i = 0; i < this.bullets.length; i++) {
            if (this.bullets[i].update()) {
                this.bullets.splice(i, 1);
                i--;
            }
        }
        return false;
    };

    this.draw = function() {
        for (var i = 0; i < this.bullets.length; i++) {
            this.bullets[i].draw();
        }
    };
};

function Bullet() {
    this.x = 0;
    this.y = Math.random() * ga.ctx.canvas.height;
    this.vx = Math.random() * 3 + 1 //1~4

    this.update = function() {
        this.x += this.vx;
        return this.x > ga.ctx.canvas.width;
    };

    this.draw = function() {
        ga.ctx.save();
        ga.ctx.fillStyle = "#ffffff";
        ga.ctx.fillRect(this.x - 1, this.y - 1, 2, 2);
        ga.ctx.restore();
    };
}
