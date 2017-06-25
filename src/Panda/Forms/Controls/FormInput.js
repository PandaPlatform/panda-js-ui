(function ($) {
    'use strict';

    Panda.Ui.Forms.Controls.FormInput = $.extend(Panda.Ui.Forms.Controls.FormInput || {}, {
        create: function (type, name, id, value, required) {
            // Check if input is radio or checkbox
            var checked = false;
            if (type === 'checkbox' && jq.type(value) === 'boolean') {
                checked = (value === true);
                value = '';
            }

            // Create input item
            var input = Panda.Ui.Forms.Controls.FormElement.create('input', name, id, value, 'uiFormInput');

            // Add extra attributes
            input.attr('type', type);
            input.attr('checked', checked);
            input.attr('required', required);

            // Return item
            return input;
        }
    });
})(jQuery);
