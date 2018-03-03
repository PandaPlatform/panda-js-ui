(function ($) {
    'use strict';

    /**
     * FormInput Service
     */
    Panda.Ui.Forms.Controls.FormInput = $.extend(Panda.Ui.Forms.Controls.FormInput || {}, {
        /**
         * Create a <input> HTMLElement, providing all the proper attributes
         *
         * @param {string} type
         * @param {string} name
         * @param {string} value
         * @param {string} id
         * @param {boolean} required
         *
         * @return {tag}
         */
        create: function (type, name, value, id, required) {
            // Check if input is radio or checkbox
            var checked = false;
            if ((type === 'checkbox' || type === 'radio') && jq.type(value) === 'boolean') {
                checked = (value === true);
                value = '';
            }

            // Create input item
            return Panda.Ui.Forms.Controls.FormElement.create('input', name, value, id, 'panda-form-input')
                .attr('type', type)
                .attr('checked', checked)
                .attr('required', required);
        }
    });
})(jQuery);
