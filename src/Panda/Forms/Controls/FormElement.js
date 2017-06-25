(function ($) {
    'use strict';

    Panda.Ui.Forms.Controls.FormElement = $.extend(Panda.Ui.Forms.Controls.FormElement || {}, {
        create: function (tag, name, id, value, itemClass) {
            // Create item object
            var item = Panda.Ui.DOM.create(tag, '', id, itemClass);

            // Add name and value
            item.attr('name', name);
            item.attr('value', value);

            // Return item
            return item;
        }
    });
})(jQuery);
