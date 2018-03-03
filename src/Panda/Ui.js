/*!
 * Panda Ui JavaScript Library v1.1.0
 * https://pandaphp.org
 *
 * Copyright JS Ioannis Papikas
 * Released under the MIT license
 * https://pandaphp.org/js/license
 */
var Panda = Panda || {};

(function ($) {
    'use strict';

    /**
     * Panda Ui Base Service
     */
    Panda.Ui = $.extend(Panda.Ui || {}, {
        version: '2.0.0',
        init: function () {
            // Initialize Panda Ui Libraries
            Panda.Ui.Forms.init();
        }
    });
})(jQuery);
