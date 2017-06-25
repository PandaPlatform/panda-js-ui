(function ($) {
    'use strict';

    Panda.Ui.Forms.Controls.FormButton = $.extend(Panda.Ui.Forms.Controls.FormButton || {}, {
        create: function (title, type, id, name, positive) {
            // Create button item
            var button = Panda.Ui.Forms.Controls.FormElement.create('button', name, id, '', 'uiFormButton').html(title);

            // Add extra attributes
            button.attr('type', type);
            if (positive) {
                button.addClass('positive');
            }

            // Return item
            return button;
        }
    });
})(jQuery);
