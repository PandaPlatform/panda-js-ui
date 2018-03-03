(function ($) {
    'use strict';

    /**
     * FormLabel Service
     */
    Panda.Ui.Forms.Controls.FormLabel = $.extend(Panda.Ui.Forms.Controls.FormLabel || {}, {
        /**
         * Create a simple <label> HTMLElement
         *
         * @param {string} title
         * @param {string} forInputId
         *
         * @return {tag}
         */
        create: function (title, forInputId) {
            // Create label item
            return Panda.Ui.Forms.Controls.FormElement.create('label', '', '', '', 'panda-form-label')
                .html(title)
                .attr('for', forInputId);
        }
    });
})(jQuery);
