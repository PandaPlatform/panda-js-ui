(function ($) {
    'use strict';

    /**
     * Weblink Service
     */
    Panda.Ui.HTML.Weblink = $.extend(Panda.Ui.HTML.Weblink || {}, {
        /**
         * Create a <a> HTMLElement
         *
         * @param {string} href
         * @param {string} target
         * @param {string} content
         * @param {string} id
         * @param {string} linkClass
         *
         * @return {tag}
         */
        create: function (href, target, content, id, linkClass) {
            // Create item object
            return Panda.Ui.DOM.create('a', content, id, linkClass)
                .attr('href', href)
                .attr('target', target);
        }
    });
})(jQuery);
