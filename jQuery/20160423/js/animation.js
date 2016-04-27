$(document).ready(function() {
    $(".keyword").on("mouseover", function(e) {
        //alert(this.textContent);
        /*var x = e.clientX;
        var y = e.clientY;*/
        var xx;
        var yy;
        xx = this.getBoundingClientRect().left;
        yy = this.getBoundingClientRect().bottom;

        //取得Span位置
        var position = $(this).position(); //$(this).offset();
        var x = position.left;
        var y = position.bottom;
        /*
         	javascript: this.getAttribute
			jQuery: $(this).attr("Attribute")
        */
        $("#tip").html($(this).attr("data-tip")).css({
            "left": x + "px",
            "top": y + 30 + "px"
        }).fadeIn();
    }).on("mouseout", function(e) {
        $("#tip").fadeOut();
    });
});
