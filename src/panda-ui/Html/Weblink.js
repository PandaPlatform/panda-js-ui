(function ($) {
    'use strict';

    Panda.Ui.Weblink = $.extend(Panda.Ui.Weblink || {}, {
        create: function (href, target, content, linkClass) {
            // Create item object
            var link = Panda.Ui.DOM.create('a', content, '', linkClass);

            // Add href and target
            link.attr('href', href);
            link.attr('target', target);

            // Return weblink
            return link;
        }
    });
})(jQuery);
