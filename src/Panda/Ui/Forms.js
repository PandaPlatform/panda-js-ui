(function ($) {
    'use strict';

    /**
     * Panda UI Forms Main Service
     */
    Panda.Ui.Forms = $.extend(Panda.Ui.Forms || {}, {
        init: function () {
            // Initialize Form libraries
            Panda.Ui.Forms.Controls.init();
        }
    });
})(jQuery);
