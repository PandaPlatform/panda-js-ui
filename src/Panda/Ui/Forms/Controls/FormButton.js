(function ($) {
    'use strict';

    /**
     * FormButton Service
     */
    Panda.Ui.Forms.Controls.FormButton = $.extend(Panda.Ui.Forms.Controls.FormButton || {}, {
        /**
         * Creates a <button> HTMLElement
         *
         * @param {string} title
         * @param {string} type
         * @param {string} id
         * @param {string} name
         *
         * @return {tag}
         */
        create: function (title, type, id, name) {
            // Create button item
            return Panda.Ui.Forms.Controls.FormElement.create('button', name, '', id, 'panda-form-button')
                .html(title)
                .attr('type', type);
        }
    });
})(jQuery);
