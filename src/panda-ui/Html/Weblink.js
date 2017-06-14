var Panda = Panda || {};
Panda.Ui = Panda.Ui || {};

Panda.Ui.Weblink = {
    create: function (href, target, content, linkClass) {
        // Create item object
        var wlink = Panda.Ui.DOM.create('a', content, '', linkClass);

        // Add href and target
        wlink.attr('href', href);
        wlink.attr('target', target);

        // Return weblink
        return wlink;
    }
};