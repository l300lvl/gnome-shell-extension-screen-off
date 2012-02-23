const Lang = imports.lang;
const St = imports.gi.St;
const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;
const Util = imports.misc.util;
const GLib = imports.gi.GLib;

function ScreenOff() {
    this._init();
}

ScreenOff.prototype = {
    __proto__: PanelMenu.SystemStatusButton.prototype,

    _init: function() {
        PanelMenu.SystemStatusButton.prototype._init.call(this, 'start-here');
        this._button = new St.Button();
        this._button.set_tooltip_text('Click me to turn the screen off!');
        this._button.set_child(new St.Icon({
            icon_name: 'process-stop',
            icon_type: St.IconType.FULLCOLOR,
            icon_size: 17
        }));
        this._button.connect('clicked', Lang.bind(this, function () {
            Util.spawn(['xset','dpms','force','off']);
        }));
    }
};

let screenOff;

function enable() {
    screenOff = new ScreenOff();
    let _children = Main.panel._leftBox.get_children();
    Main.panel._leftBox.insert_actor(screenOff._button, _children.length - 1);
}

function disable() {
    Main.panel._leftBox.remove_actor(screenOff._button);
    screenOff.destroy();
}

function init() {
    // do nothing
}

