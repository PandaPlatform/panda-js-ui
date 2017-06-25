(function ($) {
    'use strict';

    Panda.Ui.HTML.Weblink = $.extend(Panda.Ui.HTML.Weblink || {}, {
        create: function (href, target, content, linkClass) {
            // Create item object
            var link = Panda.Ui.DOM.create('a', content, '', linkClass);

            // Add href and target
            link.attr('href', href);
            link.attr('target', target);

            // Return web link
            return link;
        }
    });
})(jQuery);
