//匿名函式, 馬上呼叫
/*(function test() {
    alert("Test");
})();*/

//Scheduler.
/*window.setTimeout(
    function() {
        alert("3 secs.");
    }, 3000);*/

//======= Funtion Review =========//
//function add(n1, n2, callback /* 希望是個函式 */ ) {
//    callback(n1 + n2);
//}

/*var handler = function(result) {
    alert(result);
};

var handler1 = function(result) {
    alert("Result is " + result);
};*/


/*add(3, 5, function(result) {
    alert(result);
});
add(2, 4, function(result) {
    alert("Result is " + result);
});*/

//=====Object======
/*var point = new Object();
point.x = 3;
point.y = 4;
point.getPosition = function() {
    alert(this.x + "," + this.y);
}
point.getPosition();*/

//=======JSON=======
var point = {
    "x": 3,
    "y": 4,
    "getPosition": function() {
        alert(this.x + "," + this.y);
    }
};
//point.getPosition();
//JSON用途介紹
/*
	args: Object
	n1: 數字
	n2: 數字
	callback: 函式
*/
function add(args) {
    args.callback(args.n1 + args.n2);
}
//Using Object
var obj = new Object();
obj.n1 = 3;
obj.n2 = 4;
obj.callback = function(result) {
    alert(result);
};
add(obj);
//Using JSON
add({ n1: 5, n2: 5, callback: function(result) { alert(result); } });
