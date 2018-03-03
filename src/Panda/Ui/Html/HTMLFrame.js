(function ($) {
    'use strict';

    /**
     * HTMLFrame Service (iframe)
     */
    Panda.Ui.HTML.HTMLFrame = $.extend(Panda.Ui.HTML.HTMLFrame || {}, {
        /**
         * Create an <iframe> HTMLElement
         *
         * @param {string} src
         * @param {string} name
         * @param {string} id
         * @param {string} frameClass
         * @param {boolean} sandbox
         *
         * @return {tag}
         */
        create: function (src, name, id, frameClass, sandbox) {
            // Create item object
            return Panda.Ui.DOM.create('iframe', '', id, frameClass)
                .attr('name', name)
                .attr('src', src)
                .attr('sandbox', sandbox);
        }
    });
})(jQuery);
