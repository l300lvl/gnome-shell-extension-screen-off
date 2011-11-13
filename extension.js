const Lang = imports.lang;
const St = imports.gi.St;
const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;
const Util = imports.misc.util;

function ScreenOff() {
    this._init();
}

ScreenOff.prototype = {
    _button: null,

    _init: function() {

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

function enable() {
    let role = 'screen-off';

    if(Main.panel._status_area_order.indexOf(role) == -1) {
        Main.panel._status_area_order.unshift(role);
        Main.panel._status_area_shell_implementation[role] = ScreenOff;
    
        let constructor = Main.panel._status_area_shell_implementation[role];
        let indicator = new constructor();
        Main.panel.addToStatusArea(role, indicator, 0);
    } else {
        Main.panel._statusArea['screen-off'].actor.show();
    }
}

function disable() {
    Main.panel._statusArea['screen-off'].actor.hide();
}
