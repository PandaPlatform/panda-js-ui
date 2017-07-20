var Popup = function(sender, content, parent) {

    this.prefix = "pp_";
    this.id = this.prefix + Math.floor(Math.random() * 100000);
    this.$sender = ($(sender).length ? $(sender) : $(document));
    this.contentClass = 'popupContent';
    this.$content = ($("." + this.contentClass, content).length
        ? $("." + this.contentClass, content)
        : $("<div class=" + this.contentClass + "></div>").html(content));
    this.$parent = ($(parent).length ? $(parent) : $(document.body));
    this.location = new PopupLocator(sender, content, parent);

    this.dataAttributes = {
        "settings": "popup-settings"
    };

    this.bindingOptions = {
        "on": "on"
    };

    this.typeOptions = {
        "obedient": "obedient"
    };

    // Popup basic settings
    this.binding = this.bindingOptions.on;
    this.type = this.typeOptions.obedient;
    this.withTimeout = false;
    this.withBackground = false;
    this.withFade = false;

};

// Get settings for popup
Popup.extractSettings = function() {

    // Get settings through content element
    var $settings = this.$content
        .find("[data-"+this.dataAttributes.settings+"]")
        .add(this.$content.filter("[data-"+this.dataAttributes.settings+"]"))
        .eq(0);
    var extractedSettings = $settings.data(this.dataAttributes.settings) || {};

    // Priority of choices is: JS settings > $settings > default
    this.id             = extractedSettings.id || this.id;
    this.parent         = (extractedSettings.parentid ? $("#"+extractedSettings.parentid) : this.parent);
    this.binding        = $.fn.popup.binding || extractedSettings.binding || this.binding;
    this.type           = $.fn.popup.type || extractedSettings.type || this.type;
    this.withTimeout    = $.fn.popup.withTimeout || extractedSettings.withTimeout || this.withTimeout;
    this.withBackground = $.fn.popup.withBackground || extractedSettings.withBackground || this.withBackground;
    this.withFade       = $.fn.popup.withFade || extractedSettings.withFade || this.withFade;

    // Remove settings from content element
    $settings.removeAttr("data-"+this.dataAttributes.settings);
};

var PopupLocator = function(sender, content, parent) {

    this.$sender = $(sender) || $(document);
    this.$content = $(content) || $("<div />");
    this.$parent = $(parent) || $(document.body);

    this.dataAttributes = {
        "settings" : "popup-extra"
    };

    this.orientationOptions = {
        "user" : "user"
    };

    this.invertDockOptions = {
        "none" : "none",
        "horizontal" : "horizontal",
        "vertical" : "vertical",
        "both" : "both"
    };

    // Position settings
    this.orientation = this.orientationOptions.user;
    this.calculatedOrientation = this.orientationOptions.user;
    this.distance = 0;
    this.alignOffset = 0;
    this.invertDock = this.invertDockOptions.none;
    this.senderOffset = this.$sender.offset();

    // Get settings for position
    this.extractSettings = function() {

        // Get positioning settings through content element
        var $settings = this.$content
            .find("[data-"+this.dataAttributes.settings+"]")
            .add(this.$content.filter("[data-"+this.dataAttributes.settings+"]"))
            .eq(0);

        var extractedSettings = $settings.data(this.dataAttributes.settings) || {};

        this.orientation    = $.fn.popup.position || extractedSettings.position || this.orientation;
        this.calculatedOrientation = this.orientation;
        this.distance       = $.fn.popup.distance || extractedSettings.distance || this.distance;
        this.alignOffset    = $.fn.popup.alignOffset || extractedSettings.alignOffset || this.alignOffset;
        this.invertDock     = $.fn.popup.invertDock || extractedSettings.invertDock || this.invertDock;

        // Remove settings from content element
        $settings.removeAttr("data-"+this.dataAttributes.settings);
    };

    this.hasInvertedHorizontalDock = function () {
        return this.invertDock == this.invertDockOptions.horizontal
            || this.invertDock == this.invertDockOptions.both;
    };

    this.hasInvertedVerticalDock = function () {
        return this.invertDock == this.invertDockOptions.vertical
            || this.invertDock == this.invertDockOptions.both;
    };

    this.getSenderOffset = function() {
        return {
            "top": this.$sender.offset().top - this.$parent.offset().top,
            "left": this.$sender.offset().left - this.parent.offset().left
        };
    };
};