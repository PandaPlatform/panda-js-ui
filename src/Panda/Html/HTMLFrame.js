(function ($) {
    'use strict';

    Panda.Ui.HTMLFrame = $.extend(Panda.Ui.HTMLFrame || {}, {
        create: function (src, name, id, frameClass, sandbox) {
            // Create item object
            var frameItem = Panda.Ui.DOM.create('iframe', '', id, frameClass);

            // Add source, name and sandbox
            frameItem.attr('name', name);
            frameItem.attr('src', src);
            frameItem.attr('sandbox', sandbox);

            // Return item
            return frameItem;
        }
    });
})(jQuery);
