// args: speed (number|string) - of the animation, focus (boolean) - after animation
(function ($) {
    var methods = {
        "animate": function (scrollThis, speed) {
            if ($.type(speed) === "undefined") {
                speed = 400;
            }

            return this.each(function () {
                // Calculate pixels to move, in order for this to reach the top of scrollThis
                var top = scrollThis.scrollTop() + $(this).offset().top - scrollThis.offset().top;
                // Offset to move from top
                var offset = 0.25 * scrollThis.height();

                scrollThis.animate({
                    scrollTop: top - offset
                }, speed)
            });
        },
        "scroll": function (scrollThis) {
            return this.each(function () {
                // Calculate pixels to move, in order for this to reach the top of scrollThis
                var top = scrollThis.scrollTop() + $(this).offset().top - scrollThis.offset().top;
                // Offset to move from top
                var offset = 0.25 * scrollThis.height();

                scrollThis.animate({
                    scrollTop: top - offset
                }, "fast")
            });
        },
        "focus": function (scrollThis, f) {
            return this.each(function () {
                // Calculate pixels to move, in order for this to reach the top of scrollThis
                var top = scrollThis.scrollTop() + $(this).offset().top - scrollThis.offset().top;
                // Offset to move from top
                var offset = 0.25 * scrollThis.height();

                scrollThis.animate({
                    scrollTop: top - offset
                }, "fast", function () {
                    if (f) $(this).focus();
                });
            });
        },
        "anifocus": function (scrollThis, o, t) {
            return this.each(function () {
                var speed = 400;
                var f = false;
                var jqthis = $(this);
                if (typeof(o) === "boolean") f = o;
                if (typeof(o) === "string" || typeof(o) === "number") speed = o;
                if (typeof(t) === "boolean") f = t;
                if (typeof(t) === "string" || typeof(t) === "number") speed = t;

                // Calculate pixels to move, in order for this to reach the top of scrollThis
                var top = scrollThis.scrollTop() + $(this).offset().top - scrollThis.offset().top;
                // Offset to move from top
                var offset = 0.25 * scrollThis.height();

                scrollThis.animate({
                    scrollTop: top - offset
                }, speed, function () {
                    if (f) jqthis.focus();
                })
            });
        }
    };

    $.fn.scrollHere = function (method) {
        // Closest scrolling element
        var collection = $(this).add($(this).parents());
        var scrollThis = $(collection.get().reverse()).filter(function () {
            return $(this).height() !== this.scrollHeight;
        }).first();
        scrollThis = (scrollThis.length === 0 ? $(window) : scrollThis );

        // Method calling logic
        if ($.type(method) === "undefined" || $.type(method) === "null") {
            return methods["scroll"].call(this, scrollThis);
        } else if (arguments.length === 1 && typeof(method) === "boolean") {
            return methods["focus"].apply(this, [scrollThis].concat(Array.prototype.slice.call(arguments, 0)));
        } else if (arguments.length === 1 && (typeof(method) === "string" || typeof(method) === "number" )) {
            return methods["animate"].apply(this, [scrollThis].concat(Array.prototype.slice.call(arguments, 0)));
        } else if (arguments.length === 2) {
            return methods["anifocus"].apply(this, [scrollThis].concat(Array.prototype.slice.call(arguments, 0)));
        } else {
            $.error('Wrong use of method jQuery.scrollTo...');
        }
    };
})(jQuery);

(function ($) {
    $(document).on({
        "mousemove.scrollArea": function (ev) {
            var jqthis = $(this);
            //split area into 3 parts
            var topPart = jqthis.offset().top + jqthis.height() / 3;
            var bottomPart = jqthis.offset().top + 2 * (jqthis.height() / 3);
            var h = jqthis.height();
            var sh = jqthis.get(0).scrollHeight;
            var interval = 4;

            // mouse above top part
            if (ev.pageY < topPart && jqthis.data("scrollArea") === true) {
                jqthis.doTimeout('scrollListUp', interval, function () {
                    var acc = (topPart - ev.pageY) / 4;
                    var speed = 1 + acc;
                    if (this.scrollTop() === 0) {
                        return false;
                    } else {

                        // do something loopy
                        this.scrollTop(this.scrollTop() - speed);
                        return true;
                    }
                }, false);
                //mouse above bottom part
            } else if (ev.pageY > bottomPart && jqthis.data("scrollArea") === true) {
                jqthis.doTimeout('scrollListDown', interval, function () {
                    var acc = (ev.pageY - bottomPart) / 4;
                    var speed = 1 + acc;
                    if (this.scrollTop() + h >= sh) {
                        return false;
                    } else {
                        // do something loopy
                        this.scrollTop(this.scrollTop() + speed);
                        return true;
                    }
                }, false);
                //cancel timeouts + init scrollable area
            } else {
                if (jqthis.data("scrollArea") !== true && topPart < ev.pageY && ev.pageY < bottomPart) {
                    jqthis.data("scrollArea", true);
                }
                jqthis.doTimeout('scrollListUp');
                jqthis.doTimeout('scrollListDown');
            }
        },

        "mouseleave.scrollArea": function () {
            //cancel timeouts
            var jqthis = $(this);
            jqthis.doTimeout('scrollListUp');
            jqthis.doTimeout('scrollListDown');
        }
    }, ".uiScrollableArea");

    // Scrollable elements that prevents scroll bubbling.
    $(document).on('wheel mousewheel DOMMouseScroll', '.soloScrollable', function (ev) {
        var delta = ev.originalEvent.wheelDelta || -ev.originalEvent.detail;
        this.scrollTop += ( delta < 0 ? 1 : -1 ) * 90;
        ev.preventDefault();
    });
})(jQuery);
