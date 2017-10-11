/*!
 * Panda Ui JavaScript Library v1.1.2
 * https://pandaphp.org
 *
 * Copyright JS Ioannis Papikas
 * Released under the MIT license
 * https://pandaphp.org/js/license
 */
var Panda = window.Panda || {};

(function ($) {
    'use strict';

    Panda.Ui = $.extend(Panda.Ui || {}, {
        version: '1.1.2',
        init: function () {
            // Initialize Panda Ui Libraries
            Panda.Ui.DataTable.init();
            Panda.Ui.Navigation.init();
            Panda.Ui.Notification.init();
            Panda.Ui.Tooltip.init();
            Panda.Ui.WindowFrame.init();
            Panda.Ui.Forms.init();
        }
    });
})(jQuery);
