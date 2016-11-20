var Panda = Panda || {};
Panda.Ui = Panda.Ui || {};

(function ($) {
    $(document).one("ready", function () {
        // Init Navigation handlers
        Panda.Ui.Navigation.init();
    });

    Panda.Ui.Navigation = {
        init: function () {
            // Click event listener
            $(document).on('click', '[data-static-nav]', function (ev) {
                Panda.Ui.Navigation.triggerClick($(this));
            });

            // Set listeners
            Panda.Events.on(document, 'panda.content.modified', '', function (ev) {
                $('[data-static-nav].selected').each(function () {
                    Panda.Ui.Navigation.triggerClick($(this));
                });
            });

            // Trigger content modified to select items
            $(document).trigger('panda.content.modified');
        },
        triggerClick: function (navItem) {
            // Get whether this item has the selected class
            var selected = navItem.hasClass('selected');

            // Get the target Group
            var thisTargetGroup = navItem.data('static-nav').targetgroupid;
            var thisTargetContainer = navItem.data('static-nav').targetcontainerid;
            var thisNavGroup = navItem.data('static-nav').navgroup;

            // Clear all selected from navigation with the same targetgroup
            $("[data-static-nav]").each(function () {
                if (typeof($(this).data('static-nav').navgroup) != "undefined" && $(this).data('static-nav').navgroup == thisNavGroup) {
                    $(this).removeClass('selected');
                }
            });

            // Set this item as selected
            if (!(selected && navItem.data("static-nav").display == "toggle")) {
                navItem.addClass('selected');
            }

            if (navItem.data("static-nav").display == "none" || navItem.data("static-nav").display == "toggle") {
                // Clear All content from target container from the same group if "clearAll"
                $("[data-targetgroupid='" + thisTargetGroup + "']", "#" + thisTargetContainer).not(".noDisplay").addClass("noDisplay");
            } else if (navItem.data("static-nav").display == "all") {
                // Display All content from target container from the same group if "displayAll"
                $("[data-targetgroupid ='" + thisTargetGroup + "']", "#" + thisTargetContainer).removeClass("noDisplay");
            }

            // Set Display to dataRef
            var thisTarget = navItem.data('static-nav').ref;
            if (!(selected && navItem.data("static-nav").display == "toggle")) {
                $("#" + thisTarget, "#" + thisTargetContainer).removeClass("noDisplay");
            }
        }
    };
})(jQuery);
