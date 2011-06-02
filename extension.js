const Lang = imports.lang;
const St = imports.gi.St;
const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;
const Util = imports.misc.util;

function DoIt() {
    this._init();
}

DoIt.prototype = {
    _button: null,

    _init: function() {

        this._button = new St.BoxLayout({ name: 'screen-off'});

        let icon = new St.Icon({ icon_name: 'process-stop',
                                 icon_type: St.IconType.FULLCOLOR,
                                 icon_size: Main.panel.button.height});

        icon.reactive = true;
        icon.connect('button-press-event', Lang.bind(this, function () {
              Util.spawn(['xset','dpms','force','off']);
            return true;
        }));

        this._button.add_actor(icon);
        this._button.set_tooltip_text('Click me to turn off the screen!');

        let _children = Main.panel._leftBox.get_children();
        Main.panel._leftBox.insert_actor(this._button, _children.length - 1);
    },
};

function main() {
    new DoIt();
}
