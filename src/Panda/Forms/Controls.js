(function ($) {
    'use strict';

    Panda.Ui.Forms.Controls = $.extend(Panda.Ui.Forms.Controls || {}, {
        init: function () {
            // Initialize Form libraries
            Panda.Ui.Forms.Controls.SwitchButton.init();
        }
    });
})(jQuery);
