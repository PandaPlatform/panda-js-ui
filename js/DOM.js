var Panda = Panda || {};
Panda.Ui = Panda.Ui || {};

(function ($) {
    Panda.Ui.DOM = {
        create: function (tag, context, id, itemClass) {
            // Create DOMElement object
            var domElement = $('<' + tag + '/>').html(context);
            if (id != '') {
                domElement.attr('id', id);
            }

            if (itemClass != '') {
                domElement.addClass(itemClass);
            }

            return domElement;
        }
    };
})(jQuery);