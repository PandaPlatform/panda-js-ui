(function ($) {
    'use strict';

    /**
     * FormElement Service
     */
    Panda.Ui.Forms.Controls.FormElement = $.extend(Panda.Ui.Forms.Controls.FormElement || {}, {
        /**
         * Create a simple FormElement with [name] and [value] attributes
         *
         * @param {string} tag
         * @param {string} id
         * @param {string} name
         * @param {string} value
         * @param {string} itemClass
         *
         * @return {tag}
         */
        create: function (tag, name, value, id, itemClass) {
            // Create item object
            return Panda.Ui.DOM.create(tag, '', id, itemClass)
                .attr('name', name)
                .attr('value', value);
        }
    });
})(jQuery);
