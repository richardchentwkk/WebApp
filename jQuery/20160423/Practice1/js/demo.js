$(document).ready(function() {
    $("a").attr("target", "_blank").click(function(e) {
        e.preventDefault();
        $(this).fadeOut().fadeIn();
    });
});

function change() {
    //addclass, removeclass, toggleclass
    //$("a").toggleClass("link_change");

    //Test for remove.
    //$("a").remove();


    $("a").click(function(e /*事件物件*/ ) {
        e.preventDefault(); //阻擋預設動作
        alert(this.innerHTML);
    });
}
