//META{"name":"simple_fortnite"}*//
//xd
/*@cc_on
@if (@_jscript)

	// Offer to self-install for clueless users that try to run this directly.
	var shell = WScript.CreateObject("WScript.Shell");
	var fs = new ActiveXObject("Scripting.FileSystemObject");
	var pathPlugins = shell.ExpandEnvironmentStrings("%APPDATA%\\BetterDiscord\\plugins");
	var pathSelf = WScript.ScriptFullName;
	// Put the user at ease by addressing them in the first person
	shell.Popup("It looks like you tried to run me directly. This is not desired behavior! It will work now, but likely will not work with other plugins. Even worse, with other untrusted plugins it may lead computer virus infection!", 0, "I'm a plugin for BetterDiscord", 0x30);
	if (fs.GetParentFolderName(pathSelf) === fs.GetAbsolutePathName(pathPlugins)) {
		shell.Popup("I'm in the correct folder already.\nJust reload Discord with Ctrl+R.", 0, "I'm already installed", 0x40);
	} else if (!fs.FolderExists(pathPlugins)) {
		shell.Popup("I can't find the BetterDiscord plugins folder.\nAre you sure it's even installed?", 0, "Can't install myself", 0x10);
	} else if (shell.Popup("Should I copy myself to BetterDiscord's plugins folder for you?", 0, "Do you need some help?", 0x34) === 6) {
		fs.CopyFile(pathSelf, fs.BuildPath(pathPlugins, fs.GetFileName(pathSelf)), true);
		// Show the user where to put plugins in the future
		shell.Exec("explorer " + pathPlugins);
		shell.Popup("I'm installed!\nJust reload Discord with Ctrl+R.", 0, "Successfully installed", 0x40);
	}
	WScript.Quit();

@else @*/

var simple_fortnite =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

    module.exports = __webpack_require__(15);


/***/ }),
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, exports) {

    /**
     * BetterDiscord Plugin Base Class
     * Copyright (c) 2015-present Jiiks - https://jiiks.net
     * All rights reserved.
     * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
    */
    'use strict';

    class Plugin {
        constructor(props) {
            this.props = props;
        }

        get authors() {
            return this.props.authors;
        }

        get version() {
            return this.props.version;
        }

        get name() {
            return this.props.name;
        }

        get description() {
            return this.props.description;
        }

        get reloadable() {
            return this.props.reloadable;
        }

        get permissions() {
            return this.props.permissions;
        }

        get storage() {
            return this.internal.storage;
        }

        get settings() {
            return this.storage.settings;
        }

        saveSettings() {
            this.storage.save();
            this.onSave(this.settings);
        }

        getSetting(id) {
            let setting = this.storage.settings.find(setting => { return setting.id === id; });
            if (setting && setting.value !== undefined) return setting.value;
        }

        get enabled() {
            return this.getSetting("enabled");
        }
    }

    module.exports = Plugin;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

    /**
     * BetterDiscord Plugin Api
     * Copyright (c) 2015-present Jiiks - https://jiiks.net
     * All rights reserved.
     * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
    */
    'use strict';

    const Logger = __webpack_require__(5);
    const Api = __webpack_require__(6);

    class PluginApi {
        constructor(props) {
            this.props = props;
        }

        log(message, level) {
            Logger.log(this.props.name, message, level);
        }

        injectStyle(id, css) {
            Api.injectStyle(id, css);
        }

        removeStyle(id) {
            Api.removeStyle(id);
        }

        injectScript(id, script) {
            Api.injectScript(id, script);
        }

        removeScript(id) {
            Api.removeScript(id);
        }
    }

    module.exports = PluginApi;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

    /**
     * BetterDiscord Logger Module
     * Copyright (c) 2015-present Jiiks - https://jiiks.net
     * All rights reserved.
     * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
    */
    'use strict';

    class Logger {

        static log(moduleName, message, level = 'log') {
            level = this.parseLevel(level);
            console[level]('[%cBetter%cDiscord:%s] %s', 'color: #3E82E5', '', `${moduleName}${level === 'debug' ? '|DBG' : ''}`, message);
        }

        static logObject(moduleName, message, object, level) {
            if (message) this.log(moduleName, message, level);
            console.log(object);
        }

        static debug(moduleName, message, level, force) {
            if (!force) { if (!window.BetterDiscord || !window.BetterDiscord.debug) return; }
            this.log(moduleName, message, 'debug', true);
        }

        static debugObject(moduleName, message, object, level, force) {
            if (!force) { if (!window.BetterDiscord || !window.BetterDiscord.debug) return; }

            if (message) this.debug(moduleName, message, level, force);
            console.debug(object);
        }

        static parseLevel(level) {
            return {
                'log': 'log',
                'warn': 'warn',
                'err': 'error',
                'error': 'error',
                'debug': 'debug',
                'dbg': 'debug',
                'info': 'info'
            }[level];
        }

    }

    module.exports = Logger;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

    module.exports = {};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

    /**
     * BetterDiscord Plugin Storage
     * Copyright (c) 2015-present Jiiks - https://jiiks.net
     * All rights reserved.
     * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
    */
    'use strict';

    const Utils = __webpack_require__(6);

    class PluginStorage {
        constructor(path, defaults) {
            this.path = `${path}/settings.json`;
            this.defaultConfig = defaults;
            this.load();
        }

        load() {
            this.settings = JSON.parse(JSON.stringify(this.defaultConfig));

            const loadSettings = Utils.tryParse(Utils.readFileSync(this.path));
            if (loadSettings) {
                Object.keys(loadSettings).map(key => {
                    this.setSetting(key, loadSettings[key]);
                });
            }

            if (!this.getSetting('enabled')) this.setSetting('enabled', false);
        }

        save() {
            const reduced = this.settings.reduce((result, item) => { result[item.id] = item.value; return result; }, {});
            Utils.writeFileSync(this.path, JSON.stringify(reduced));
        }

        getSetting(id) {
            const setting = this.settings.find(setting => setting.id === id);
            if (!setting) return null;
            return setting.value;
        }

        setSetting(id, value) {
            const setting = this.settings.find(setting => setting.id === id);
            if (!setting) {
                this.settings.push({ id, value });
            } else {
                setting.value = value;
            }
            this.save();
        }

        setSettings(settings) {
            this.settings = settings;
        }
    }

    module.exports = PluginStorage;

/***/ }),
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

    const v1transpile_version = 5;

    module.exports = class {
        constructor() {
            const config = __webpack_require__(16);
            if (!window.v1transpile || window.v1transpile.version < v1transpile_version) {
                window.v1transpile = window.v1transpile || {};
                window.v1transpile.version = v1transpile_version;
                window.v1transpile.Plugin = window.v1transpile.Plugin || __webpack_require__(3);
                window.v1transpile.PluginApi = window.v1transpile.PluginApi || __webpack_require__(4);
                window.v1transpile.PluginStorage = window.v1transpile.PluginStorage || __webpack_require__(7);
                window.v1transpile.Settings = window.v1transpile.Settings || {
                    /**
                     * Create and return a new top-level settings panel
                     * @author noodlebox
                     * @return {jQuery}
                     */
                    topPanel() {
                        return $("<form>").addClass("form").css("width", "100%");
                    },

                    /**
                     * Create and return a container for control groups
                     * @author noodlebox
                     * @return {jQuery}
                     */
                    controlGroups() {
                        return $("<div>").addClass("control-groups");
                    },

                    /**
                     * Create and return a flexible control group
                     * @author noodlebox
                     * @param {object} settings Settings object
                     * @param {Element|jQuery|string} settings.label an element or something JQuery-ish or, if string, use as plain text
                     * @return {jQuery}
                     */
                    controlGroup(settings) {
                        const group = $("<div>").addClass("control-group");

                        if (typeof settings.label === "string") {
                            group.append($("<label>").text(settings.label));
                        } else if (settings.label !== undefined) {
                            group.append($("<label>").append(settings.label));
                        }

                        return group;
                    },

                    /**
                     * Create and return a group of checkboxes
                     * @author noodlebox
                     * @param {object} settings Settings object
                     * @param {object[]} settings.items an array of settings objects to be passed to checkbox()
                     * @param {function(state)} settings.callback called with the current state, when it changes state is an array of boolean values
                     * @return {jQuery}
                     */
                    checkboxGroup(settings) {
                        settings = $.extend({
                            items: [],
                            callback: $.noop,
                        }, settings);

                        const state = settings.items.map(item => item.checked === true);

                        function onClick(i, itemState) {
                            if (settings.items[i].callback !== undefined) {
                                settings.items[i].callback(itemState);
                            }
                            state[i] = itemState;
                            settings.callback(state);
                        }

                        const group = $("<ul>").addClass("checkbox-group");

                        group.append(settings.items.map(function(item, i) {
                            return checkbox($.extend({}, item, {
                                callback: onClick.bind(undefined, i),
                            }));
                        }));

                        return group;
                    },

                    /**
                     * Create and return a checkbox
                     * @author noodlebox
                     * @param {object} settings Settings object
                     * @param {Element|jQuery|string} settings.label an element or something JQuery-ish or, if string, use as plain text
                     * @param {Element|jQuery|string} settings.help an element or something JQuery-ish or, if string, use as plain text
                     * @param {boolean} settings.checked
                     * @param {boolean} settings.disabled
                     * @param {function(state)} settings.callback called with the current state, when it changes state is a boolean
                     * @return {jQuery}
                     */
                    checkbox(settings) {
                        settings = $.extend({
                            checked: false,
                            disabled: false,
                            callback: $.noop,
                        }, settings);

                        const input = $("<input>").attr("type", "checkbox")
                            .prop("checked", settings.checked)
                            .prop("disabled", settings.disabled);

                        const inner = $("<div>").addClass("checkbox-inner")
                            .append(input)
                            .append($("<span>"));

                        const outer = $("<div>").addClass("checkbox").append(inner);

                        if (settings.disabled) {
                            outer.addClass("disabled");
                        }

                        if (typeof settings.label === "string") {
                            outer.append($("<span>").text(settings.label));
                        } else if (settings.label !== undefined) {
                            outer.append($("<span>").append(settings.label));
                        }

                        outer.on("click.kawaiiSettings", function() {
                            if (!input.prop("disabled")) {
                                const checked = !input.prop("checked");
                                input.prop("checked", checked);
                                settings.callback(checked);
                            }
                        });

                        const item = $("<li>").append(outer);

                        let help;
                        if (typeof settings.help === "string") {
                            help = $("<div>").text(settings.help);
                        } else if (settings.help !== undefined) {
                            help = $("<div>").append(settings.help);
                        }

                        if (help !== undefined) {
                            help.appendTo(item)
                                .addClass("help-text")
                                .css("margin-top", "-3px")
                                .css("margin-left", "27px");
                        }

                        return item;
                    },

                    /**
                     * Create and return an input
                     * @author samogot
                     * @param {object} settings Settings object
                     * @param {Element|jQuery|string} settings.label an element or something JQuery-ish or, if string, use as plain text
                     * @param {Element|jQuery|string} settings.help an element or something JQuery-ish or, if string, use as plain text
                     * @param {boolean} settings.value
                     * @param {boolean} settings.disabled
                     * @param {function(state)} settings.callback called with the current state, when it changes. state is a string
                     * @return {jQuery}
                     */
                    input(settings) {
                        settings = $.extend({
                            value: '',
                            disabled: false,
                            callback: $.noop,
                        }, settings);

                        const input = $("<input>").attr("type", "text")
                            .prop("value", settings.value)
                            .prop("disabled", settings.disabled);

                        const inner = $("<div>").addClass("input-inner")
                            .append(input)
                            .append($("<span>"));

                        const outer = $("<div>").addClass("input").append(inner);

                        if (settings.disabled) {
                            outer.addClass("disabled");
                        }

                        if (typeof settings.label === "string") {
                            outer.append($("<span>").text(settings.label));
                        } else if (settings.label !== undefined) {
                            outer.append($("<span>").append(settings.label));
                        }

                        input.on("change.kawaiiSettings", function() {
                            if (!input.prop("disabled")) {
                                const value = input.val();
                                settings.callback(value);
                            }
                        });

                        const item = $("<li>").append(outer);

                        let help;
                        if (typeof settings.help === "string") {
                            help = $("<div>").text(settings.help);
                        } else if (settings.help !== undefined) {
                            help = $("<div>").append(settings.help);
                        }

                        if (help !== undefined) {
                            help.appendTo(item)
                                .addClass("help-text")
                                .css("margin-top", "-3px")
                                .css("margin-left", "27px");
                        }

                        return item;
                    }
                };

                window.v1transpile.PluginApi.prototype.injectStyle = (id, css) => BdApi.injectCSS(id, css);
                window.v1transpile.PluginApi.prototype.removeStyle = (id) => BdApi.clearCSS(id);

                window.v1transpile.PluginStorage.prototype.load = function() {
                    this.settings = JSON.parse(JSON.stringify(this.defaultConfig));
                    this.path = this.path.replace('/settings.json', '');
                    if (!window.bdPluginStorage) {
                        return;
                    }
                    try {
                        const loadSettings = bdPluginStorage.get(this.path, "settings");
                        if (loadSettings) {
                            Object.keys(loadSettings).map(key => {
                                this.setSetting(key, loadSettings[key]);
                            });
                        }
                    } catch (err) {
                        console.warn(this.path, ":", "unable to load settings:", err);
                    }
                };

                window.v1transpile.PluginStorage.prototype.save = function() {
                    const reduced = this.settings.reduce((result, item) => {
                        result[item.id] = item.value;
                        return result;
                    }, {});
                    try {
                        bdPluginStorage.set(this.path, "settings", reduced);
                    } catch (err) {
                        console.warn(this.path, ":", "unable to save settings:", err);
                    }
                };

                window.v1transpile.Vendor = window.v1transpile.Vendor || {
                    get jQuery() {
                        return window.jQuery;
                    },
                    get $() {
                        return window.jQuery;
                    },
                    get React() {
                        return window.BDV2.react;
                    },
                    get ReactDOM() {
                        return window.BDV2.reactDom;
                    },
                    moment: {}
                };
            }

            const storage = new window.v1transpile.PluginStorage(config.info.name.replace(/\s+/g, '_').toLowerCase(), config.defaultSettings);
            const BD = {
                Api: new window.v1transpile.PluginApi(config.info),
                Storage: storage,
                Events: {},
                Renderer: {}
            };

            const plugin = __webpack_require__(17)(window.v1transpile.Plugin, BD, window.v1transpile.Vendor, true);
            this.pluginInstance = new plugin(config.info);

            this.pluginInstance.internal = {
                storage,
                path: ''
            };
        }

        start() {
            this.pluginInstance.onStart();
            this.pluginInstance.storage.load();
        }

        stop() {
            this.pluginInstance.onStop();
        }

        load() {
        }

        unload() {
        }

        getName() {
            return this.pluginInstance.name
        }

        getDescription() {
            return this.pluginInstance.description
        }

        getVersion() {
            return this.pluginInstance.version
        }

        getAuthor() {
            return this.pluginInstance.authors.join(', ')
        }

        getSettingsPanel() {
            if (this.pluginInstance.storage.settings.length === 0)
                return '';
            const Settings = window.v1transpile.Settings;

            const panel = Settings.topPanel();
            const filterControls = Settings.controlGroups().appendTo(panel);

            const Control = Settings.controlGroup({label: this.pluginInstance.name + " settings"})
                .appendTo(filterControls);
            const saveAndReload = () => {
                this.pluginInstance.storage.save();
                if (window.pluginCookie && window.pluginCookie[this.pluginInstance.name]) {
                    this.pluginInstance.onStop();
                    Promise.resolve().then(() => {
                    }).then(() => {
                        this.pluginInstance.onStart();
                    });
                }
            };
            for (let item of this.pluginInstance.storage.settings) {
                let input;
                switch (item.type) {
                    case 'bool':
                        input = Settings.checkbox({
                            label: item.text,
                            help: item.description,
                            checked: item.value,
                            callback: state => {
                                this.pluginInstance.storage.setSetting(item.id, state);
                                saveAndReload();
                            },
                        });
                        break;
                    case 'text':
                        input = Settings.input({
                            label: item.text,
                            help: item.description,
                            value: item.value,
                            callback: state => {
                                this.pluginInstance.storage.setSetting(item.id, state);
                                saveAndReload();
                            },
                        });
                        break;
                }
                if (input)
                    Control.append(input)
            }

            return panel[0];
        }
    };

/***/ }),
/* 16 */
/***/ (function(module, exports) {

    module.exports = {
        "info": {
            "name": "SimpleFornite",
            "authors": [
                "Simple#0001",
                "samogot",
                "square#3880"
            ],
            "version": "0.0.1",
            "description": "Enhances the moderation of the Fortnite Discord server.",
            "repository": "",
            "homepage": "",
            "reloadable": true
        },
        "defaultSettings": [],
        "permissions": []
    };

/***/ }),
/* 17 */
/***/ (function(module, exports) {

    module.exports = (Plugin, BD) => {

        const {Api} = BD;

        const minDIVersion = '1.0';
        if (!window.DiscordInternals) {
            const message = `Lib Discord Internals v${minDIVersion} or higher not found! Please install or upgrade that utility plugin. See install instructions here https://goo.gl/kQ7UMV`;
            Api.log(message, 'warn');
            return (class EmptyStubPlugin extends Plugin {
                onStart() {
                    Api.log(message, 'warn');
                    alert(message);
                    return false;
                }

                onStop() {
                    return true;
                }
            });
        }

        const {monkeyPatch, WebpackModules, ReactComponents, getOwnerInstance, React, Renderer, Filters} = window.DiscordInternals;

        // Deffer module loading
        let moment, Constants, GuildsStore, UsersStore, MembersStore, SubMenuItem, UserSettingsStore, MessageActionsSend, MessageActions, MessageQueue, MessageParser, HistoryUtils, PermissionUtils, ContextMenuActions, ModalsStack, ContextMenuItemsGroup, ContextMenuItem, ExternalLink, ConfirmModal;
        function loadAllModules() {
            moment = WebpackModules.findByUniqueProperties(['parseZone']);

            Constants = WebpackModules.findByUniqueProperties(['Routes', 'ChannelTypes']);

            GuildsStore = WebpackModules.findByUniqueProperties(['getGuild']);
            UsersStore = WebpackModules.findByUniqueProperties(['getUser', 'getCurrentUser']);
            MembersStore = WebpackModules.findByUniqueProperties(['getNick']);
            UserSettingsStore = WebpackModules.findByUniqueProperties(['developerMode', 'locale']);

            MessageActionsSend = WebpackModules.findByUniqueProperties(["sendMessage"]);
            MessageActions = WebpackModules.findByUniqueProperties(['jumpToMessage', '_sendMessage']);
            MessageQueue = WebpackModules.findByUniqueProperties(['enqueue']);
            MessageParser = WebpackModules.findByUniqueProperties(['createMessage', 'parse', 'unparse']);
            HistoryUtils = WebpackModules.findByUniqueProperties(['transitionTo', 'replaceWith', 'getHistory']);
            PermissionUtils = WebpackModules.findByUniqueProperties(['getChannelPermissions', 'can']);
            ContextMenuActions = WebpackModules.find(Filters.byCode(/CONTEXT_MENU_CLOSE/, c => c.close));

            ModalsStack = WebpackModules.findByUniqueProperties(['push', 'update', 'pop', 'popWithKey']);

            ContextMenuItemsGroup = WebpackModules.find(Filters.byCode(/itemGroup/));
            ContextMenuItemsGroup.displayName = 'ContextMenuItemsGroup';
            ContextMenuItem = WebpackModules.find(Filters.byCode(/\.label\b.*\.hint\b.*\.action\b/));
            ContextMenuItem.displayName = 'ContextMenuItem';

            SubMenuItem = WebpackModules.findByDisplayName("SubMenuItem");

            ExternalLink = WebpackModules.find(Filters.byCode(/\.trusted\b/));
            ExternalLink.displayName = 'ExternalLink';
            ConfirmModal = WebpackModules.find(Filters.byPrototypeFields(['handleCancel', 'handleSubmit', 'handleMinorConfirm']));
            ConfirmModal.displayName = 'ConfirmModal';
            // const TooltipWrapper = WebpackModules.find(Filters.byPrototypeFields(['showDelayed']));
            // TooltipWrapper.displayName = 'TooltipWrapper';
        }

        // ReactComponents.setName('Message', Filters.byPrototypeFields(['renderOptionPopout', 'renderUserPopout', 'handleMessageContextMenu']));
        // ReactComponents.setName('ChannelTextAreaForm', Filters.byPrototypeFields(['handleTextareaChange', 'render']));
        // ReactComponents.setName('OptionPopout', Filters.byPrototypeFields(['handleCopyId', 'handleEdit', 'handleRetry', 'handleDelete', 'handleReactions', '', '', '', '']));
        ReactComponents.setName('Embed', Filters.byPrototypeFields(['isMaskedLinkTrusted', 'renderProvider', 'renderAuthor', 'renderFooter', 'renderTitle', 'renderDescription', 'renderFields', 'renderImage', 'renderVideo', 'renderGIFV', 'hasProvider', 'renderSpotify']));
        ReactComponents.setName('MessageContextMenu', Filters.byCode(/\.ContextMenuTypes\.MESSAGE_MAIN\b[\s\S]*\.ContextMenuTypes\.MESSAGE_SYSTEM\b/, c => c.prototype && c.prototype.render));
        ReactComponents.setName('MessageResendItem', Filters.byPrototypeFields(['handleResendMessage', 'render']));
        ReactComponents.setName('MessageGroup', Filters.byCode(/"message-group"[\s\S]*"has-divider"[\s\S]*"hide-overflow"[\s\S]*"is-local-bot-message"/, c => c.prototype && c.prototype.render));

        const BASE_JUMP_URL = 'https://github.com/samogot/betterdiscord-plugins/blob/master/v2/Quoter/link-stub.md';


        class SimpleFortnite extends Plugin {
            constructor(props) {
                super(props);
                this.cancelPatches = [];
                this.weatherManId = "341251034527825921";
            }

            onStart() {
                loadAllModules();
                this.produceContextMenu();

                return true;
            }

            sendMessage(channel, text) {
                MessageActions.sendMessage(channel.id, {content: text, invalidEmojis: [], tts: false});
            }

            /**
             * ***********************************
             * CREATE MENU
             * ***********************************
             */

            produceContextMenu() {
                ReactComponents.get('MessageContextMenu', MessageContextMenu => {
                    const cancel = Renderer.patchRender(MessageContextMenu, [
                        {
                            selector: {
                                type: ContextMenuItemsGroup,
                            },
                            method: 'prepend',
                            content: thisObject => React.createElement(SubMenuItem, {
                                    label: "Fortnite",
                                    render: this.renderSubMenu(thisObject, null),
                                    invertChildY: true
                                })
                        }
                    ]);
                    this.cancelPatches.push(cancel);
                });
            }

            renderSubMenu({props: {message, channel}}, category) {
                var elements = (() => { switch(category) {
                    case "lfg": return [
                        {
                            label: "Looking for Group",
                            action: this.onLFGClicked.bind(this, channel, message, 0)
                        },
                        {
                            label: "Looking for Group - PC",
                            action: this.onLFGClicked.bind(this, channel, message, 1)
                        },
                        {
                            label: "Looking for Group - PS4",
                            action: this.onLFGClicked.bind(this, channel, message, 2)
                        },
                        {
                            label: "Looking for Group - XB1",
                            action: this.onLFGClicked.bind(this, channel, message, 3)
                        }
                    ];

                    case "rules": return [
                        {
                            label: "Overview",
                            action: this.onRulesClicked.bind(this, channel, message, 0)
                        },
                        {
                            label: "Advertising",
                            action: this.onRulesClicked.bind(this, channel, message, 1)
                        },
                        {
                            label: "Spamming",
                            action: this.onRulesClicked.bind(this, channel, message, 2)
                        },
                        {
                            label: "Threats",
                            action: this.onRulesClicked.bind(this, channel, message, 3)
                        },
                        {
                            label: "Constructive Discussion",
                            action: this.onRulesClicked.bind(this, channel, message, 4)
                        },
                        {
                            label: "Hacking/Cheating",
                            action: this.onRulesClicked.bind(this, channel, message, 5)
                        },
                        {
                            label: "More...",
                            render: () => this.renderSubMenu(arguments[0], "rules_more"),
                            invertChildY: true
                        }
                    ];

                    case "rules_more": return [
                        {
                            label: "Hate Speech",
                            action: this.onRulesClicked.bind(this, channel, message, 6)
                        },
                        {
                            label: "Extreme Sexuality or Violence",
                            action: this.onRulesClicked.bind(this, channel, message, 7)
                        },
                        {
                            label: "Illegal Acts",
                            action: this.onRulesClicked.bind(this, channel, message, 8)
                        }
                    ];
                    
                    case "replies": return [
                        {
                            label: "Replies Tab",
                            action: this.onComingSoon.bind(this, channel, message)
                        }
                    ];

                    case "discord": return [
                        {
                            label: "Discord Tab",
                            action: this.onComingSoon.bind(this, channel, message)
                        }
                    ];
                            
                    case "announcements": return [
                        {
                            label: "Announcements Tab",
                            action: this.onComingSoon.bind(this, channel, message)
                        }
                    ];
                    
                    // MAIN MENU
                    default: return [
                        {
                            label: "LFG",
                            render: () => this.renderSubMenu(arguments[0], "lfg")
                        },
                        {
                            label: "Replies",
                            render: () => this.renderSubMenu(arguments[0], "replies"),
                            invertChildY: true
                        },
                        {
                            label: "Rules",
                            render: () => this.renderSubMenu(arguments[0], "rules"),
                            invertChildY: true
                        },
                        {
                            label: "Discord",
                            render: () => this.renderSubMenu(arguments[0], "discord"),
                            invertChildY: true
                        },
                        {
                            label: "Announcements",
                            render: () => this.renderSubMenu(arguments[0], "announcements"),
                            invertChildY: true
                        },
                        {
                            label: "Check for Update",
                            danger: true
                        }
                    ];
                }})();

                let ret = elements.map(e => { console.log(e); return React.createElement(e.render ? SubMenuItem : ContextMenuItem, e); });
                return ret;
            }

            /**
             * ***********************************
             * MENU FUNCTIONALITY
             * ***********************************
             */

            closeMenu(menu) {
                menu.preventDefault();
                menu.stopPropagation();
                ContextMenuActions.close();
            }

            async setChatInput(text) {
                let textarea = document.querySelector(".chat textarea");
                await getOwnerInstance(textarea, {include: ["ChannelTextAreaForm"]}).setState({
                    textValue: text
                });
            }

            async processCommand(channel, cmd) {
                await this.sendMessage(channel, cmd);
            }

            // LFG
            async onLFGClicked(c, m, i, e) {
                this.closeMenu(e);

                let lfgChannels = {
                    "br_squaduos_pc": "362236453771804683",
                    "br_squaduos_ps4": "362676778642178049",
                    "br_squaduos_xb1": "362676808975646732",

                    "stw_squaduos_pc": "322852071051231242",
                    "stw_squaduos_ps4": "362676713592717314",
                    "stw_squaduos_xb1": "362676802642247690"
                };

                let lfgs = [
                    /* 0 - LFG */
                    "Please use the Looking-for-Group (LFG) channels provided by <@!" + this.weatherManId + ">.",

                    /* 1 - LFG PC */
                    "Please use the Looking-for-Group (LFG) channels: <#" + lfgChannels["br_squaduos_pc"] + "> - <#" + lfgChannels["stw_squaduos_pc"] + ">",
                    
                    /* 2 - LFG PC */
                    "Please use the Looking-for-Group (LFG) channels: <#" + lfgChannels["br_squaduos_ps4"] + "> - <#" + lfgChannels["stw_squaduos_ps4"] + ">",
                    
                    /* 3 - LFG PC */
                    "Please use the Looking-for-Group (LFG) channels: <#" + lfgChannels["br_squaduos_xb1"] + "> - <#" + lfgChannels["stw_squaduos_xb1"] + ">"
                ];
                
                // Send Weatherman LFG Command
                if(i == 0) await this.processCommand(c, "!lfg");

                // Set chat input
                let authorId = m.author.id;
                this.sendMessage(c, `<@!${authorId}>, ${lfgs[i]}`);
                /*await this.setChatInput(`<@!${authorId}>, ${lfgs[i]}`);*/
            }

            // RULES
            async onRulesClicked(c, m, i, e) {
                this.closeMenu(e);

                let rules = [
                    /* 0 - Overview */
                    "We want all members of this server to openly discuss all aspects of the game while building relationships with fellow community members. "
                    + "That being said, we still need rules in place to make sure we maintain civil discussion on the server.",

                    /* 1 - Advertising */
                    "This is not the place to promote or sell your product or service. Posts attempting to solicit anything and everything will be removed. Repeat offenders will be banned. This includes but is not limited to:"
                    + "- Advertising services offered by you, another individual or companies."
                    + "- Advertising for product sales of any and all kinds.",

                    /* 2 - Spamming */
                    "Please do not post the same content in multiple channels. On a few occasions it may make sense to cross-post, but if we find it not to be appropriate the posts will be removed.",

                    /* 3 - Threats */
                    "We will not tolerate making threats. We will assess each instance, should they arrive, on a case-by-case basis. All posts with this type of behavior will be removed and in extreme cases we will contact the appropriate authorities.",

                    /* 4 - Constructive Discussion */
                    "Keep comments and discussion constructive. Disagreements can and will happen, however we will not tolerate posts that are severely out of line. "
                    + "Comments or posts that are extremely offensive, attack an individual or group, or are not relevant to a topic will be deleted.",

                    /* 5 - Hacking/Cheating */
                    "We do not allow the distribution of links or information related to illegal software. We will be removing all posts that contain links or how-tos on this information. "
                    + "Repeat offenders will be banned and in some circumstances, we'll escalate the penalty. Moderators will be on the lookout for:\n"
                    + "- Links to pirated content (movies, software, music, games)\n"
                    + "- Links to download software that provides an unfair advantage in-game",

                    /* 6 - Hate Speech */
                    "We will not tolerate attacks on any person or group of people on the basis of gender, religion, race, ethnicity, or sexual orientation. "
                    + "Posts that contain any form of hate speech will be immediately removed and the user banned",

                    /* 7 - Extreme Sexuality or Violence */
                    "Please be mindful that players of all ages play games and interact on discord. That means that we want our community to be a safe environment for children. "
                    + "We do not want any nudity or extreme, real life gore posted here. If you feel that something may be a risk to post, avoid posting that content! "
                    + "Violators will be dealt with in the harshest of penalties which can include losing your in-game account. DO NOT POST:\n"
                    + "- Pornographic content of any form\n"
                    + "- Real life depictions of gore, death, or extreme violent acts",

                    /* 8 - Illegal Acts */
                    "Please do not utilize this server as a haven to discuss criminal activity. Any posts indicating criminal activity will be sent to the appropriate authorities."
                ];

                // Set chat input
                let authorId = m.author.id;
                this.sendMessage(c, `<@!${authorId}>, ${rules[i]}`);
            }

            onComingSoon(c, m, e) {
                this.closeMenu(e);
                console.log("Coming soon :\)");
            }

            cancelAllPatches() {
                for (let cancel of this.cancelPatches)
                    cancel();
            }

            onStop() {
		        this.cancelAllPatches();
                return true;
            }

            checkUpdate(updateLink) {
                let updateLink = "https://raw.githubusercontent.com/reecebenson/FortniteModeration/master/options.json"
                let request = require("request");
                request(updateLink, (error, response, result) => {
                    if (error) return;
                    var remoteVersion = result.match(/['"][0-9]+\.[0-9]+\.[0-9]+['"]/i);
                    if (!remoteVersion) return;
                    remoteVersion = remoteVersion.toString().replace(/['"]/g, "");
                    var ver = remoteVersion.split(".").map((e) => {return parseInt(e);});
                    var lver = window.PluginUpdates.plugins[updateLink].version.split(".").map((e) => {return parseInt(e);});
                    var hasUpdate = false;
                    if (ver[0] > lver[0]) hasUpdate = true;
                    else if (ver[0] == lver[0] && ver[1] > lver[1]) hasUpdate = true;
                    else if (ver[0] == lver[0] && ver[1] == lver[1] && ver[2] > lver[2]) hasUpdate = true;
                    else hasUpdate = false;
                    if (hasUpdate) PluginUpdateUtilities.showUpdateNotice(pluginName, updateLink);
                    else PluginUpdateUtilities.removeUpdateNotice(pluginName);
                });
            };
        }

        return SimpleFortnite;
    };

/***/ })
/******/ ]);

/*@end @*/
