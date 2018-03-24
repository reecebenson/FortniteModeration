//META{"name":"simple_fortnite"}*//

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

global.simple_fortnite = (function(){
  "use strict";
  var WebpackModules, ReactComponents, getOwnerInstance, React, Renderer, Filters, getInstanceFromNode;
  var ContextMenuActions, ContextMenuItemsGroup, ContextMenuItem, SubMenuItem, MessageContextMenu, ConfirmModal, ModalsStack, MessageActions, Parser;

  return class SimpleFortnite {
    getName() {
      return "SimpleFortnite";
    }

    getDescription() {
      return "Enhances the moderation of the Fortnite Discord server.";
    }

    getAuthor() {
      return [
        "Simple#0001",
        "samogot#4379",
        "square#3880"
      ].join(", ");
    }

    getVersion() {
      return "1.1.1";
    }

    load() {}

    start() {
      if( !global.DiscordInternals ) {
        return alert("Lib Discord Internals not found! Please install that utility plugin.\nSee install instructions here https://goo.gl/kQ7UMV.");
      }

      ({
        WebpackModules,
        ReactComponents,
        getOwnerInstance,
        React,
        Renderer,
        Filters
      } = global.DiscordInternals);
      ({getInstanceFromNode} = global.BDV2.reactDom.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactDOMComponentTree);

      this.cancels = [];
      this.options = null;
      this.optionsUrl = "https://raw.githubusercontent.com/reecebenson/FortniteModeration/master/options.json";

      this.loadAllModules();
      this.patchMessageContextMenu();
      this.requestAndSetOptions();

    }

    stop() {
      for( let i = 0; i < this.cancels.length; i++ ) {
        this.cancels[i]();
      }
      delete this.cancels;
      delete this.options;
      delete this.optionsUrl;
    }

    loadAllModules() {
      ContextMenuActions = WebpackModules.findByUniqueProperties(['closeContextMenu']);

      ContextMenuItemsGroup = WebpackModules.find(Filters.byCode(/itemGroup/));
      ContextMenuItemsGroup.displayName = 'ContextMenuItemsGroup';

      ContextMenuItem = WebpackModules.find(Filters.byCode(/\.label\b.*\.hint\b.*\.action\b/));
      ContextMenuItem.displayName = 'ContextMenuItem';

      ConfirmModal = WebpackModules.find(Filters.byPrototypeFields(['handleCancel', 'handleSubmit', 'handleMinorConfirm']));
      ConfirmModal.displayName = 'ConfirmModal';

      SubMenuItem = WebpackModules.findByDisplayName("SubMenuItem");

      // this became very unreliable in a recent discord update
      /* ReactComponents.setName('MessageContextMenu',
        Filters.byCode(/\.ContextMenuTypes\.MESSAGE_MAIN\b[\s\S]*\.ContextMenuTypes\.MESSAGE_SYSTEM\b/,
        c => c.prototype && c.prototype.render)
      );*/

      ModalsStack = WebpackModules.findByUniqueProperties(['push', 'update', 'pop', 'popWithKey']);

      MessageActions = WebpackModules.findByUniqueProperties(['sendMessage']);

      Parser = WebpackModules.findByUniqueProperties(["parserFor", "parse"]);
    }

    patchMessageContextMenu() {
      let patchIt = () => this.cancels.push(Renderer.patchRender(MessageContextMenu, [
        {
          selector: {
            type: ContextMenuItemsGroup,
          },
          method: "append",
          content: thisObject => !this.options ? null : React.createElement(SubMenuItem, {
            label: "Fortnite",
            render: () => this.renderMenu(thisObject)
            // invertChildY: true
          })
        }
      ]));

      if(MessageContextMenu) return patchIt();

      /* // see 103
      ReactComponents.get("MessageContextMenu", component => {
        MessageContextMenu = component;
        this.cancels.push(patchIt());
      });*/

      // workaround
      this.observer = ({addedNodes}) => {
        for(let i = 0; i < addedNodes.length; i++) {
          let element = addedNodes[i];
          if(element.classList && element.classList.contains("contextMenu-uoJTbz")) {
            let component = getInstanceFromNode(element);
            if(!(component && (component = component.return.type))) continue;
            if("MessageContextMenu" === component.displayName || component.prototype && /\.ContextMenuTypes\.MESSAGE_MAIN\b[\s\S]*\.ContextMenuTypes\.MESSAGE_SYSTEM\b/.test(component.prototype.render)) {
              delete this.observer;
              component.displayName = "MessageContextMenu"; // above check is for compatibility with other plugins patching this component (samogot's quoter for example)
              MessageContextMenu = component;
              return patchIt();
            }
          }
        }
      };
    }

    renderMenu({props: {message, channel}}, parent) {
      let {menu} = this.options;

      if(null != parent) {
        ({
          [parent]: {
            inner: menu
          }
        } = menu);
      }

      return Object.keys(menu).map(key => {
        let {
          [key]: {
            _subMenu,
            _menuRef,
            _doUpdate,
            label,
            response = null,
            mention = null,
            exec = null,
            _danger: danger,
            _flipY: invertChildY
          }
        } = menu;

        return React.createElement(_subMenu ? SubMenuItem : ContextMenuItem, {
          label: label ? label : key,
          render: !_subMenu ? void 0 : () => this.renderMenu(arguments[0], null != parent ? parent : key, _menuRef),
          action: !_subMenu && _doUpdate
            ? this.requestAndSetOptions.bind(this)
            : _doUpdate ? void 0
            : this.respond.bind(this, channel, message, response, mention, exec),
          danger: danger && true || void 0,
          invertChildY: invertChildY && true || void 0
        });
      });
    }

    closeMenu(event) {
      event.preventDefault();
      event.stopPropagation();
      ContextMenuActions.closeContextMenu();
    }

    respond(channel, message, response, mention, exec, event) {
      this.closeMenu(event);

      if(exec)
        this.processCommand(channel, exec);

      if(response) {
        if(mention) response = `<@!${message.author.id}>, ${response}`;
        this.sendMessage(channel, response);
      }
    }

    requestJson(url) {
      return new Promise((resolve, reject) => {
        require("request")(url, (err, {statusCode}, body) => {
          if(err || 200 !== statusCode) return reject(err || new Error("Request failed with status ${statusCode}."));
          resolve(JSON.parse(body));
        });
      });
    }

    processCommand() {
      return this.sendMessage(...arguments);
    }

    sendMessage(channel, text) {
      let {identifiers} = this.options;

      Object.keys(identifiers).forEach(identifier => {
        text = text.replace(`%${identifier}%`, identifiers[identifier]);
      });

      MessageActions.sendMessage(channel.id, {content: text, invalidEmojis: [], tts: false});
    }

    async requestAndSetOptions(event) {
      if(event)
        this.closeMenu(event);

      try {
        this.options = await this.requestJson(this.optionsUrl)
      } catch(error) {
        // either network or JSON.parse error
        return console.error(error);
      }

      if(this.semverCompare(this.getVersion(), this.options.info.version) < 0) {
        let {simple} = this.options.identifiers;
        ModalsStack.push(function(props) {
          let br = () => React.createElement("br", null);
          return React.createElement(ConfirmModal, Object.assign({
            title: "Updating SimpleFortnite",
            body: React.createElement(React.Fragment, null,
              "Hey!", br(), br(),
              "The new moderation options have been applied.", br(),
              "Additionally there is an update which requires manual installation.", br(),
              br(),
              "Please contact ",
              React.cloneElement(Parser.parse(`<@!${simple}>`)[0], {preventCloseFromModal: true}),   // <- still needs some work lol
              " to get it! :)"
            ),
            confirmText: "Oki Doki"
          }, props));
        });
      }
    }

    semverCompare(v1, v2) {
      // 0: equal, >0: v1 is newer, <0: v2 is newer
      v1 = v1.split(".");
      v2 = v2.split(".");
      for(let i = 0, max = Math.max(v1.length, v2.length); i < max; i++) {
        let _1 = (0|v1[i]) || 0,
          _2 = (0|v2[i]) || 0;
        if(_1 < _2) return -1;
        if(_1 > _2) return 1;
      }
      return 0;
    }

  }
})();

/*@end @*/
