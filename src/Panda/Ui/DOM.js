(function ($) {
    'use strict';

    Panda.Ui.DOM = $.extend(Panda.Ui.DOM || {}, {
        create: function (tag, context, id, itemClass) {
            // Create DOMElement object
            var domElement = $('<' + tag + '/>').html(context);
            if (id !== '') {
                domElement.attr('id', id);
            }

            if (itemClass !== '') {
                domElement.addClass(itemClass);
            }

            return domElement;
        }
    });
})(jQuery);
