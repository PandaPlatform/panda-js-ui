var Panda = Panda || {};
Panda.Ui = Panda.Ui || {};

(function ($) {
    // Initialize
    $(document).one('ready', function () {
        Panda.Ui.WindowFrame.init();
    });

    // Create Window Frame Prototype Object
    Panda.Ui.WindowFrame = {
        init: function () {
            // Handles preventDefault action on every weblink with href='' or href='#' or has handler onclick
            $(document).on('click', '.wFrame > .frameHeader > .closeBtn', function (ev) {
                // Dispose Popup
                $(this).trigger('dispose');
            });

            $(document).on('click', '.wFrame.dialogFrame button[type="reset"]', function (ev) {
                // Dispose Popup
                $(this).trigger('dispose');
            });
        }
    };
})(jQuery);