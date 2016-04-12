'use strict';

System.register('Davis/SocialProfile/components/IconSelectorComponent', ['flarum/components/Dropdown', 'flarum/utils/ItemList', 'flarum/helpers/icon'], function (_export, _context) {
  var Dropdown, ItemList, icon, IconSelectorComponent;
  return {
    setters: [function (_flarumComponentsDropdown) {
      Dropdown = _flarumComponentsDropdown.default;
    }, function (_flarumUtilsItemList) {
      ItemList = _flarumUtilsItemList.default;
    }, function (_flarumHelpersIcon) {
      icon = _flarumHelpersIcon.default;
    }],
    execute: function () {
      IconSelectorComponent = function (_Dropdown) {
        babelHelpers.inherits(IconSelectorComponent, _Dropdown);

        function IconSelectorComponent() {
          babelHelpers.classCallCheck(this, IconSelectorComponent);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(IconSelectorComponent).apply(this, arguments));
        }

        babelHelpers.createClass(IconSelectorComponent, [{
          key: 'init',
          value: function init() {
            babelHelpers.get(Object.getPrototypeOf(IconSelectorComponent.prototype), 'init', this).call(this);

            this.icons = {
              'social': ["fa-globe", 'fa-amazon', 'fa-angellist', 'fa-apple', 'fa-behance', 'fa-bitbucket', 'fa-codepen', 'fa-connectdevelop', 'fa-dashcube', 'fa-delicious', 'fa-deviantart', 'fa-digg', 'fa-dribbble', 'fa-dropbox', 'fa-drupal', 'fa-facebook', 'fa-flickr', 'fa-foursquare', 'fa-get-pocket', 'fa-git', 'fa-github', 'fa-github-alt', 'fa-gittip', 'fa-google', 'fa-google-plus', 'fa-google-wallet', 'fa-gratipay', 'fa-hacker-news', 'fa-instagram', 'fa-ioxhost', 'fa-joomla', 'fa-jsfiddle', 'fa-lastfm', 'fa-leanpub', 'fa-linkedin', 'fa-meanpath', 'fa-medium', 'fa-odnoklassniki', 'fa-opencart', 'fa-pagelines', 'fa-paypal', 'fa-pied-piper-alt', 'fa-pinterest-p', 'fa-qq', 'fa-reddit', 'fa-renren', 'fa-sellsy', 'fa-share-alt', 'fa-shirtsinbulk', 'fa-simplybuilt', 'fa-skyatlas', 'fa-skype', 'fa-slack', 'fa-slideshare', 'fa-soundcloud', 'fa-spotify', 'fa-stack-exchange', 'fa-stack-overflow', 'fa-steam', 'fa-stumbleupon', 'fa-tencent-weibo', 'fa-trello', 'fa-tripadvisor', 'fa-tumblr', 'fa-twitch', 'fa-twitter', 'fa-viacoin', 'fa-vimeo', 'fa-vine', 'fa-vk', 'fa-wechat', 'fa-weibo', 'fa-weixin', 'fa-whatsapp', 'fa-wordpress', 'fa-xing', 'fa-y-combinator', 'fa-yelp', 'fa-youtube-play']
            };
          }
        }, {
          key: 'view',
          value: function view() {
            var _this2 = this;

            $(".iconpicker-image-" + this.props.index()).error(function () {
              _this2.props.favicon('none');
              _this2.props.selection(_this2.icons['social'][0]);
              m.redraw();
            });

            this.props.children = this.items().toArray();

            return babelHelpers.get(Object.getPrototypeOf(IconSelectorComponent.prototype), 'view', this).call(this);
          }
        }, {
          key: 'getButtonContent',
          value: function getButtonContent() {
            return [/^favicon(-\w+)?$/.test(this.props.selection()) ? [m('img', { 'class': this.props.selection() == 'favicon-grey' ? 'social-greyscale-button' : 'social-button', style: 'width: 14px;height: 14px;', src: this.props.favicon() })] : icon(this.props.selection().replace('fa-', ''), {}), this.props.caretIcon ? icon(this.props.caretIcon, { className: 'Button-caret' }) : ''];
          }
        }, {
          key: 'items',
          value: function items() {
            var _this3 = this;

            var items = new ItemList();

            if (this.props.favicon() != 'none') {
              items.add('favicon', m('div', { onclick: function onclick() {
                  _this3.props.selection('favicon');m.redraw();
                }, role: "button", href: "#", class: "iconpicker-item " + (this.props.selection() == 'favicon' ? "iconpicker--highlighted" : ""), title: 'Favicon' }, [m('img', { 'class': "iconpicker-image-" + this.props.index(), style: 'width: 14px;height: 14px;margin: 0 2px 0 2px;', src: this.props.favicon() })]), 102);
              items.add('favicon-grey', m('div', { onclick: function onclick() {
                  _this3.props.selection('favicon-grey');m.redraw();
                }, role: "button", href: "#", class: "iconpicker-item-invt " + (this.props.selection() == 'favicon-grey' ? "iconpicker--highlighted" : ""), title: 'Grey Favicon' }, [m('img', { 'class': "social-greyscale-button iconpicker-image-" + this.props.index(), style: 'width: 14px;height: 14px;margin: 0 2px 0 2px;', src: this.props.favicon() })]), 101);
            }

            var _loop = function _loop(k) {
              highlighted = m.prop();

              if (_this3.props.selection() == _this3.icons['social'][k]) {
                highlighted('iconpicker--highlighted');
              }
              items.add(_this3.icons['social'][k], m('div', { onclick: function onclick() {
                  _this3.props.selection(_this3.icons['social'][k]);m.redraw();
                }, role: "button", href: "#", class: "iconpicker-item " + highlighted(), title: '.' + _this3.icons['social'][k] }, [icon(_this3.icons['social'][k].replace('fa-', ''), { className: 'social-icon' })]), 100);
            };

            for (var k in this.icons['social']) {
              var highlighted;

              _loop(k);
            }
            return items;
          }
        }], [{
          key: 'initProps',
          value: function initProps(props) {
            babelHelpers.get(Object.getPrototypeOf(IconSelectorComponent), 'initProps', this).call(this, props);

            props.className = 'icondropdown';
            props.buttonClassName = 'Button Button--icon';
            props.menuClassName = 'social-dropdown-menu';
          }
        }]);
        return IconSelectorComponent;
      }(Dropdown);

      _export('default', IconSelectorComponent);
    }
  };
});;
'use strict';

System.register('Davis/SocialProfile/components/SocialButtonsModal', ['flarum/components/Modal', 'flarum/components/Button', 'flarum/utils/string', 'Davis/SocialProfile/components/WebsiteInputComponent'], function (_export, _context) {
  var Modal, Button, slug, WebsiteInputComponent, SocialButtonsModal;
  return {
    setters: [function (_flarumComponentsModal) {
      Modal = _flarumComponentsModal.default;
    }, function (_flarumComponentsButton) {
      Button = _flarumComponentsButton.default;
    }, function (_flarumUtilsString) {
      slug = _flarumUtilsString.slug;
    }, function (_DavisSocialProfileComponentsWebsiteInputComponent) {
      WebsiteInputComponent = _DavisSocialProfileComponentsWebsiteInputComponent.default;
    }],
    execute: function () {
      SocialButtonsModal = function (_Modal) {
        babelHelpers.inherits(SocialButtonsModal, _Modal);

        function SocialButtonsModal() {
          babelHelpers.classCallCheck(this, SocialButtonsModal);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(SocialButtonsModal).apply(this, arguments));
        }

        babelHelpers.createClass(SocialButtonsModal, [{
          key: 'init',
          value: function init() {

            babelHelpers.get(Object.getPrototypeOf(SocialButtonsModal.prototype), 'init', this).call(this);

            this.buttons = [];
            if (this.props.data == true) {
              this.createButtonObject(0);
            } else {
              for (var k in this.props.data) {
                if (this.props.data[k]['title'] != "") {
                  var button = this.props.data[k];
                  this.createButtonObject(k, button);
                }
              }
            }
          }
        }, {
          key: 'className',
          value: function className() {
            return 'SocialButtonsModal Modal--small';
          }
        }, {
          key: 'title',
          value: function title() {
            return app.translator.trans('davis-socialprofile.forum.edit.headtitle');
          }
        }, {
          key: 'content',
          value: function content() {
            var _this2 = this;

            $('.Modal-content').css('overflow', 'visible');
            return [m('div', { className: 'Modal-body' }, [m('div', { className: 'Form' }, [this.buttons.map(function (button) {
              return [WebsiteInputComponent.component({
                button: button
              })];
            }), m('div', { className: 'Form-group', id: 'submit-button-group' }, [m('div', { className: 'Button Button--primary EditSocialButtons-add', style: 'margin-left: 1%;',
              onclick: function onclick() {
                _this2.createButtonObject(_this2.buttons.length);

                m.redraw();
                $('#socialgroup' + (_this2.buttons.length - 1)).delay(150).slideDown();
              } }, [m('i', { className: 'fa fa-fw fa-plus' })]), m('div', { className: 'Button Button--primary EditSocialButtons-del', style: 'margin-left: 1%;',
              onclick: function onclick() {
                var curdel = _this2.buttons.length - 1;
                $('#socialgroup' + curdel).slideUp('normal', function () {
                  _this2.buttons.splice(curdel, 1);
                  m.redraw();
                });
              } }, [m('i', { className: 'fa fa-fw fa-minus' })]), Button.component({
              type: 'submit',
              style: 'float: right;',
              className: 'Button Button--primary EditSocialButtons-save',
              loading: this.loading,
              children: app.translator.trans('davis-socialprofile.forum.edit.submit')
            })])])])];
          }
        }, {
          key: 'onsubmit',
          value: function onsubmit(e) {
            var _this3 = this;

            e.preventDefault();

            this.loading = true;
            this.finbuttons = [];
            for (var k in this.buttons) {
              if (this.buttons[k].title() != "") {
                var number = this.finbuttons.length;
                this.finbuttons[number] = {};
                this.finbuttons[number].title = m.prop(this.buttons[k].title());
                this.finbuttons[number].url = m.prop(this.buttons[k].url());
                this.finbuttons[number].icon = m.prop(this.buttons[k].icon());
                this.finbuttons[number].favicon = m.prop(this.buttons[k].favicon());
              }
            }
            this.finbuttons = JSON.stringify(this.finbuttons);
            var data = new FormData();
            data.append('buttons', this.finbuttons);
            app.request({
              method: 'POST',
              url: app.forum.attribute('apiUrl') + '/profile/socialbuttons',
              serialize: function serialize(raw) {
                return raw;
              },
              data: data
            }).then(function () {
              $('#app').trigger("refreshSocialButtons", [_this3.finbuttons]);
              _this3.hide();
            }, function (response) {
              _this3.loading = false;
              _this3.handleErrors(response);
            });
          }
        }, {
          key: 'createButtonObject',
          value: function createButtonObject(key) {
            var button = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

            if (button == null) {
              button = {};
              button['favicon'] = 'none';
              button['title'] = '';
              button['url'] = '';
              button['icon'] = 'globe';
            }
            this.buttons[key] = {};
            this.buttons[key].index = m.prop(key);
            this.buttons[key].favicon = m.prop(button["favicon"]);
            this.buttons[key].title = m.prop(button["title"]);
            this.buttons[key].url = m.prop(button["url"]);
            this.buttons[key].icon = m.prop(button["icon"]);
          }
        }]);
        return SocialButtonsModal;
      }(Modal);

      _export('default', SocialButtonsModal);
    }
  };
});;
'use strict';

System.register('Davis/SocialProfile/components/WebsiteInputComponent', ['flarum/Component', 'flarum/utils/extract', 'Davis/SocialProfile/components/IconSelectorComponent'], function (_export, _context) {
  var Component, extract, IconSelectorComponent, WebsiteInputComponent;
  return {
    setters: [function (_flarumComponent) {
      Component = _flarumComponent.default;
    }, function (_flarumUtilsExtract) {
      extract = _flarumUtilsExtract.default;
    }, function (_DavisSocialProfileComponentsIconSelectorComponent) {
      IconSelectorComponent = _DavisSocialProfileComponentsIconSelectorComponent.default;
    }],
    execute: function () {
      WebsiteInputComponent = function (_Component) {
        babelHelpers.inherits(WebsiteInputComponent, _Component);

        function WebsiteInputComponent() {
          babelHelpers.classCallCheck(this, WebsiteInputComponent);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(WebsiteInputComponent).apply(this, arguments));
        }

        babelHelpers.createClass(WebsiteInputComponent, [{
          key: 'init',
          value: function init() {
            babelHelpers.get(Object.getPrototypeOf(WebsiteInputComponent.prototype), 'init', this).call(this);

            this.button = this.props.button;
          }
        }, {
          key: 'view',
          value: function view() {
            var _this2 = this;

            return m(
              'div',
              {
                className: 'Form-group form-group-social',
                id: 'socialgroup' + this.button.index()
              },
              m('input', {
                className: 'SocialFormControl SocialTitle',
                placeholder: app.translator.trans('davis-socialprofile.forum.edit.title'),
                value: this.button.title(),
                oninput: m.withAttr('value', this.button.title) }),
              IconSelectorComponent.component({
                selection: this.button.icon,
                favicon: this.button.favicon,
                index: this.button.index
              }),
              m('input', {
                className: 'SocialFormControl Socialurl',
                placeholder: app.translator.trans('davis-socialprofile.forum.edit.url'),
                value: this.button.url(),
                oninput: m.withAttr('value', function (value) {
                  _this2.button.url(value);
                  var urlpattern = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
                  if (urlpattern.test(_this2.button.url().toLowerCase())) {
                    var iconurl = _this2.button.url().replace(/(:\/\/[^\/]+).*$/, '$1') + '/favicon.ico';
                    _this2.button.favicon(iconurl);
                    _this2.button.icon('favicon');
                    m.redraw();
                  } else if (_this2.button.icon() == 'favicon') {
                    _this2.button.icon('fa-globe');
                    _this2.button.favicon('none');
                    m.redraw();
                  }
                })
              }),
              m('input', {
                className: 'SocialFormControl SocialIcon',
                id: 'icon' + this.button.index(),
                style: 'display: none',
                value: this.button.icon(),
                onchange: m.withAttr('value', this.button.icon)
              }),
              m('input', {
                className: 'SocialFormControl Socialfavicon',
                id: 'favicon' + this.button.index(),
                style: 'display: none',
                value: this.button.favicon(),
                onchange: m.withAttr('value', this.button.favicon)
              })
            );
          }
        }]);
        return WebsiteInputComponent;
      }(Component);

      _export('default', WebsiteInputComponent);
    }
  };
});;
'use strict';

System.register('Davis/SocialProfile/main', ['flarum/app', 'flarum/extend', 'flarum/components/UserCard', 'flarum/components/Badge', 'Davis/SocialProfile/components/SocialButtonsModal'], function (_export, _context) {
    var app, extend, UserCard, Badge, SocialButtonsModal;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumComponentsUserCard) {
            UserCard = _flarumComponentsUserCard.default;
        }, function (_flarumComponentsBadge) {
            Badge = _flarumComponentsBadge.default;
        }, function (_DavisSocialProfileComponentsSocialButtonsModal) {
            SocialButtonsModal = _DavisSocialProfileComponentsSocialButtonsModal.default;
        }],
        execute: function () {

            app.initializers.add('davis-socialprofile-forum', function () {

                extend(UserCard.prototype, 'init', function () {
                    var _this = this;

                    var user = this.props.user;
                    var apiUrl = app.forum.attribute('apiUrl') + '/profile/socialbutton/' + user.data.id;
                    this.buttonsArray = null; //Indicate we haven't retrieved the user's buttons
                    //Get buttons from database
                    app.request({ method: "GET", url: apiUrl }).then(function (result) {
                        //Test if user has set their buttons up already
                        if (result.data.attributes.hasOwnProperty("buttons")) {
                            //Test if buttons have been set up, but the array is empty
                            if (result.data.attributes.buttons == "[]") {
                                //Since there are no buttons set, we have a blank slate
                                _this.buttonsArray = true; //Indicate we have retrieved the user's buttons
                                _this.isBlankSlate = true; //Indicate we don't have any buttons
                            } else {
                                    //The buttons array must not be empty, so lets set it
                                    _this.buttonsArray = JSON.parse(result.data.attributes.buttons);
                                    _this.isBlankSlate = false; //Indicate we do have buttons
                                }
                        } else {
                                //This user has never set their buttons
                                _this.buttonsArray = true; //Indicate we have retrieved the user's buttons
                                _this.isBlankSlate = true; //Indicate we don't have any buttons
                            }
                        user.freshness = new Date(); //Tell Mithril we have new data
                        m.redraw(); //Refresh the DOM
                    });

                    //If the buttons have been edited, we need to refresh them
                    $('#app').on('refreshSocialButtons', function (e, buttons) {
                        var user = _this.props.user; //Then is our user
                        _this.buttonsArray = JSON.parse(buttons); //Parse the saved array from editing
                        _this.isBlankSlate = false; //Indicate we do really have buttons
                        user.freshness = new Date(); //Tell Mithril we have new data
                        m.redraw(); //Refresh DOM
                    });
                });

                extend(UserCard.prototype, 'infoItems', function (items) {
                    var _this2 = this;

                    // If request hasn't loaded yet, don't add any items.
                    if (!this.buttonsArray) return;

                    //If there are buttons, add them
                    if (!this.isBlankSlate) {
                        var _loop = function _loop(k) {
                            var selectedButton = _this2.buttonsArray[k]; //Set constant for easier selection
                            //Ensure the button has a title, icon, and url
                            if (selectedButton["title"] !== "" && selectedButton["icon"] !== "" && selectedButton["url"] !== "") {
                                //If the button is using a favicon, make sure it is displayed
                                if (selectedButton['icon'] == 'favicon' || selectedButton['icon'] == 'favicon-grey') {
                                    buttonStyle = 'background-image: url("' + selectedButton['favicon'] + '");background-size: 60%;background-position: 50% 50%;background-repeat: no-repeat;';
                                    //If the favicon is set to greyscale, make sure it is displayed
                                    if (selectedButton['icon'] == 'favicon-grey') {
                                        buttonClass = selectedButton["icon"] + '-' + k + ' social-button social-greyscale-button';
                                    } else {
                                        buttonClass = selectedButton["icon"] + '-' + k + ' social-button';
                                    }
                                } else {
                                    buttonStyle = '';
                                    buttonClass = selectedButton["icon"] + '-' + k + ' social-button';
                                }
                                //Acctually add the button
                                items.add(buttonClass, Badge.component({
                                    type: "social social-icon-" + k,
                                    icon: selectedButton["icon"].replace('fa-', ''),
                                    label: selectedButton["title"],
                                    style: buttonStyle,
                                    onclick: function onclick() {
                                        window.open(selectedButton["url"], '_blank');
                                    }
                                }));
                            }
                        };

                        //Loop through the buttonsArray
                        for (var k in this.buttonsArray) {
                            var buttonStyle, buttonClass;

                            _loop(k);
                        }
                        //Add the edit buttons at the end, as long as it's their own profile
                        if (app.session.user === app.current.user) {
                            //Add the settings button
                            items.add('settings social-button', Badge.component({
                                type: "social social-settings",
                                icon: 'cog',
                                label: app.translator.trans('davis-socialprofile.forum.edit.edit'),
                                onclick: function onclick() {
                                    app.modal.show(new SocialButtonsModal({ data: _this2.buttonsArray })); //Show the edit modal
                                }
                            }), -1);
                        }
                        //It turns out they don't have any buttons
                    } else {
                            //Add an add button only if its their own profile
                            if (app.session.user === app.current.user) {
                                //Add the add button
                                items.add('settings social-button', Badge.component({
                                    type: "social null-social-settings",
                                    icon: "plus",
                                    label: app.translator.trans('davis-socialprofile.forum.edit.add'),
                                    onclick: function onclick() {
                                        app.modal.show(new SocialButtonsModal({ data: _this2.buttonsArray }));
                                    }
                                }), -1);
                            }
                        }
                });
            });
        }
    };
});