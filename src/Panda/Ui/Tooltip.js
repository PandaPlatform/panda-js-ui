(function ($) {
    'use strict';

    Panda.Ui.Tooltip = $.extend(Panda.Ui.Tooltip || {}, {
        init: function () {
            $(document).on('click mouseover', '[data-ui-tooltip]', function (ev) {
                // Display tooltip
                var tooltip = $(this).data('ui-tooltip');
                var tooltip_popup = Panda.Ui.DOM.create('div', tooltip.content, '', 'uiTooltip');
                $(this).popup.position = 'bottom|center';
                $(this).popup.type = 'obedient|toggle';
                $(this).popup(tooltip_popup);
            });
            $(document).on('mouseout', '[data-ui-tooltip]', function (ev) {
                // Dispose tooltip
                $('.uiTooltip').trigger('dispose');
            });
        }
    });
})(jQuery);