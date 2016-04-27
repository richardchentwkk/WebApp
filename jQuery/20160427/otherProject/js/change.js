$(document).ready(function() {
    //Hide page due to using flex
    $(".page").hide();

    window.addEventListener("hashchange", function() {
        changePage(document.location.hash);
    });

    //網頁一載入，立刻切換到當前頁面
    changePage(document.location.hash);
});

var $currentPage = null; //追蹤當前頁面，預設為null(空)

function changePage(hash) {
    //舊的頁面藏起來
    if ($currentPage != null) {
        $currentPage.hide();
    }

    var pageId;
    if (hash === "") { //沒有#, default go into homepage
        pageId = "home";
    } else {
        pageId = hash.substring(1); //將前面的#拿掉
    }

    $("#" + pageId).fadeIn();
    //更新紀錄
    $currentPage = $("#" + pageId);
}
