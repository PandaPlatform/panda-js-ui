var Panda = Panda || {};
Panda.Ui = Panda.Ui || {};
Panda.Ui.Forms = Panda.Ui.Forms || {};
Panda.Ui.Forms.Controls = Panda.Ui.Forms.Controls || {};

(function ($) {
    // Initialize
    $(document).one('ready', function () {
        // Initialize Switch Button
        Panda.Ui.Forms.Controls.SwitchButton.init();
    });

    Panda.Ui.Forms.Controls.SwitchButton = {
        init: function () {
            $(document).off('click', '.uiSwitchButton');
            $(document).on('click', '.uiSwitchButton', function (ev) {
                // Get Switch Object
                var jqSwitch = $(this);

                // Toggle on-off class
                if (jqSwitch.hasClass('loading'))
                    jqSwitch.toggleClass('on');

                // Initiate loading status
                jqSwitch.addClass('loading');

                // Set checkbutton
                if (jqSwitch.hasClass('on'))
                    jqSwitch.find('.swt_chk').prop('checked', false);
                else
                    jqSwitch.find('.swt_chk').prop('checked', true);
            });
        },
        getStatus: function (jqSwitch) {
            return jqSwitch.hasClass('uiSwitchButton') && jqSwitch.hasClass('on');
        },
        activate: function (jqSwitch) {
            // Transition to on status
            jqSwitch.addClass('on');
            jqSwitch.removeClass('loading');

            // Set checkbox value for next submit
            jqSwitch.find('.swt_chk').prop('checked', true);
        },
        deactivate: function (jqSwitch) {
            // Transition to on status
            jqSwitch.removeClass('on');
            jqSwitch.removeClass('loading');

            // Set checkbox value for next submit
            jqSwitch.find('.swt_chk').prop('checked', false);
        }
    };
})(jQuery);
