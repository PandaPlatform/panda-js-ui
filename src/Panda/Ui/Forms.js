(function ($) {
    'use strict';

    Panda.Ui.Forms = $.extend(Panda.Ui.Forms || {}, {
        init: function () {
            // Initialize Form libraries
            Panda.Ui.Forms.SwitchButton.init();
            Panda.Ui.Forms.Controls.init();
        }
    });
})(jQuery);
