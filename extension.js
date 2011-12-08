const Lang = imports.lang;
const St = imports.gi.St;
const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;
const Util = imports.misc.util;
//gnome 3.0
const Panel = imports.ui.panel;

function ScreenOff() {
    this._init();
}

ScreenOff.prototype = {
     __proto__: PanelMenu.SystemStatusButton.prototype,

    _init: function() {

    PanelMenu.SystemStatusButton.prototype._init.call(this,'screen-off');

        this._button = new St.BoxLayout({ name: 'screen-off'});

        let icon = new St.Icon({ icon_name: 'process-stop',
                                 icon_type: St.IconType.FULLCOLOR,
                                  icon_size: 17});

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
    new ScreenOff();
}
function init(extensionMeta) {
    // do nothing here
}

//gnome3.0
function main() {
    Panel.STANDARD_TRAY_ICON_ORDER.unshift('screen-off');
    Panel.STANDARD_TRAY_ICON_SHELL_IMPLEMENTATION['screen-off'] = ScreenOff;
}

let indicator;

function enable() {
    indicator = new ScreenOff();
    Main.panel.addToStatusArea('screen-off', indicator);
}

function disable() {
    indicator.destroy();
    indicator = null;
}