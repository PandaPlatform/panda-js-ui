(function ($) {
    $.fn.animateHighlight = function (highlightColor, duration) {
        var highlightBg = highlightColor || "#FFFF9C";
        var animateMs = duration || 1500;
        var originalBg = this.css("backgroundColor");
        if (this.locked == undefined) {
            this.locked = true;
            this.stop().css("background-color", highlightBg)
                .animate({backgroundColor: originalBg}, animateMs, function () {
                    this.locked = undefined;
                });
        }
    };
})(jQuery);