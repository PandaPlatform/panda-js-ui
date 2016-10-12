var Panda = Panda || {};
Panda.Ui = Panda.Ui || {};

(function ($) {
    Panda.Ui.PageNotification = {
        show: function (title, notification_id, notification_type, timeout, options) {
            // Set default options
            var defaultOptions = {
                actionTitle: null,
                actionCallback: null,
                disposeCallback: null
            };
            options = $.extend(defaultOptions, options);

            // Check if there is already a notification with the same id
            if ($('#' + notification_id).length > 0) {
                return;
            }

            // Create notfication
            notification_id = (notification_id == undefined ? 'pg_ntf_' + Math.round(Math.random() * 1000000) : notification_id);
            var notification = Panda.Ui.DOM.create('div', '', notification_id, 'ui-page-notification')
                .addClass(notification_type);

            // Close button and action
            var close_button = Panda.Ui.DOM.create('div', '', '', 'close_button')
                .appendTo(notification)
                .on('click', function () {
                    // Close poup
                    $(this).trigger('dispose');

                    // Call callback function
                    if (typeof options.disposeCallback == 'function')
                        options.disposeCallback.call(this);
                });

            // Icon
            Panda.Ui.DOM.create('div', '', '', 'page-notification-icon')
                .appendTo(notification);

            // Title
            Panda.Ui.DOM.create('div', title, '', 'page-notification-title')
                .appendTo(notification);

            // Action button
            if (options.actionTitle != undefined || options.actionTitle != null) {
                // Add action
                var ntf_action = Panda.Ui.DOM.create('div', options.actionTitle, '', 'action_button')
                    .appendTo(notification)
                    .on('click', function () {
                        // Call callback function
                        if (typeof options.actionCallback == 'function')
                            options.actionCallback.call(this);
                    });
            }

            // Get notification count to see for position
            var ntf_count = $('.ui-page-notification').length;
            var pos_bottom = 20 + (55 + 20) * ntf_count;

            // Show popup
            var jqSender = $(document);
            jqSender.popup.withFade = true;
            jqSender.popup.withTimeout = (timeout == undefined ? false : timeout);
            jqSender.popup.type = 'persistent';
            jqSender.popup.position = {'bottom': pos_bottom + 'px', 'left': '20px', 'position': 'fixed'};
            jqSender.popup(notification);
        }
    }
})(jQuery);
