$(document).ready(function() {
    $("a").click(function() {
        var src = $(this).attr("data-src");
        alert(src);
        if (src) {
            var req = new XMLHttpRequest();
            req.open("get", "docs/" + src); //設定連線
            req.send(); //Send request
            req.onload = function() {
                //取得伺服器回應
                //alert(this.responseText);
                $("#detail").html(this.responseText);
            };
        }
    });
});
