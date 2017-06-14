var Panda = Panda || {};
Panda.Ui = Panda.Ui || {};

(function ($) {
    // Initialize
    $(document).one('ready', function () {
        // Initialize Notification
        Panda.Ui.Notification.init();
    });

    Panda.Ui.Notification = {
        init: function () {
            $(document).on('click', '.uiNotification > .uiNtfHead > .closeBtn', function (ev) {
                // Stops the Bubbling
                ev.stopPropagation();

                $(this).closest('.uiNotification').remove();
            });

            Panda.Events.on(document, 'panda.content.modified', '', function (ev) {
                // For each timeout notification, set timeout fade out
                $(document).find('.uiNotification.timeout').each(function () {
                    // Get notification
                    var jqthis = $(this);

                    // Remove class
                    jqthis.removeClass('timeout');

                    // Set fade out timeout
                    setTimeout(function () {
                        jqthis.fadeOut('slow', function () {
                            jqthis.remove();
                        });
                    }, 2000);
                });
            });
        }
    };
})(jQuery);