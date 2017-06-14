var Panda = Panda || {};
Panda.Ui = Panda.Ui || {};
Panda.Ui.Forms = Panda.Ui.Forms || {};

(function ($) {
    // Initialize
    $(document).one('ready', function () {
        // Initialize Switch Button
        Panda.Ui.Forms.SwitchButtonForm.init();
    });

    Panda.Ui.Forms.SwitchButtonForm = {
        init: function () {
            $(document).off('switch.on', '.uiSwitchButtonForm');
            $(document).on('switch.on', '.uiSwitchButtonForm', function (ev) {
                // Activate switch
                jqSwitch = $(this).find('.sbf');
                Panda.Ui.Forms.Controls.SwitchButton.activate(jqSwitch);

                // Notify for content modified
                jqSwitch.trigger('status.modified');
            });

            $(document).off('switch.off', '.uiSwitchButtonForm');
            $(document).on('switch.off', '.uiSwitchButtonForm', function (ev) {
                // Deactivate switch
                jqSwitch = $(this).find('.sbf');
                Panda.Ui.Forms.Controls.SwitchButton.deactivate(jqSwitch);

                // Notify for content modified
                jqSwitch.trigger('status.modified');
            });

            $(document).off('click', '.uiSwitchButtonForm .sbf');
            $(document).on('click', '.uiSwitchButtonForm .sbf', function (ev) {
                // Get Switch Object
                var jqSwitch = $(this);

                // Submit form
                setTimeout(function () {
                    jqSwitch.trigger('submit');
                }, 10);
            });
        },
        getStatus: function (jqSwitchForm) {
            // Get switch
            var jqSwitch = jqSwitchForm.find('.sbf');

            // Return switch status
            return Panda.Ui.Forms.Controls.SwitchButton.getStatus(jqSwitch);
        }
    };
})(jQuery);