$(document).ready(function() {
    $(".menu>.title").click(function() {
        $(this).next().slideToggle();
    });
});
