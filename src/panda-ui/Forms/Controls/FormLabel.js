(function ($) {
    'use strict';

    Panda.Ui.Forms.Controls.FormLabel = $.extend(Panda.Ui.Forms.Controls.FormLabel || {}, {
        create: function (title, forInputId) {
            // Create label item
            var label = Panda.Ui.Forms.Controls.FormElement.create('label', '', '', '', 'uiFormLabel').html(title);

            // Add extra attributes
            if (forInputId !== '') {
                label.attr('for', forInputId);
            }

            // Return item
            return label;
        }
    });
})(jQuery);
