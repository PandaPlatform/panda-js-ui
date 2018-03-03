(function ($) {
    'use strict';

    /**
     * Main DOM Service
     */
    Panda.Ui.DOM = $.extend(Panda.Ui.DOM || {}, {
        /**
         * Create a simple DOM/HTMLElement
         *
         * @param {string} tag
         * @param {string} content
         * @param {string} id
         * @param {string} itemClass
         *
         * @return {tag}
         */
        create: function (tag, content, id, itemClass) {
            // Create DOMElement object
            return $('<' + tag + '/>')
                .html(content)
                .attr('id', id)
                .addClass(itemClass);
        }
    });
})(jQuery);
