System.register('Davis/SocialProfile/components/SocialButtonsModal', ['flarum/components/Modal', 'flarum/components/Button', 'flarum/utils/string'], function (_export) {
  'use strict';

  var Modal, Button, slug, SocialButtonsModal;
  return {
    setters: [function (_flarumComponentsModal) {
      Modal = _flarumComponentsModal['default'];
    }, function (_flarumComponentsButton) {
      Button = _flarumComponentsButton['default'];
    }, function (_flarumUtilsString) {
      slug = _flarumUtilsString.slug;
    }],
    execute: function () {
      SocialButtonsModal = (function (_Modal) {
        babelHelpers.inherits(SocialButtonsModal, _Modal);

        function SocialButtonsModal() {
          babelHelpers.classCallCheck(this, SocialButtonsModal);
          babelHelpers.get(Object.getPrototypeOf(SocialButtonsModal.prototype), 'constructor', this).apply(this, arguments);
        }

        babelHelpers.createClass(SocialButtonsModal, [{
          key: 'init',
          value: function init() {
            var _this = this;

            babelHelpers.get(Object.getPrototypeOf(SocialButtonsModal.prototype), 'init', this).call(this);

            var userId = app.current.user.data.id;
            var apiUrl = app.forum.attribute('apiUrl') + '/profile/socialbutton/' + userId;
            this.buttonsArray = null;
            m.request({ method: "GET", url: apiUrl }).then(function (result) {
              if (result.data.attributes.hasOwnProperty("buttons")) {
                if (result.data.attributes.buttons == "[]") {
                  _this.createButtonObject(0);
                } else {
                  _this.socialaccs = JSON.parse(result.data.attributes.buttons);
                  _this.buttons = [];
                  for (var k in _this.socialaccs) {
                    if (_this.socialaccs[k]['title'] != "") {
                      var button = _this.socialaccs[k];
                      _this.createButtonObject(k, button);
                      _this.numberofinputs = k;
                    }
                  }
                }
              } else {
                _this.createButtonObject(0);
                _this.numberofinputs = 0;
              }
              for (var k in _this.buttons) {
                if (_this.buttons[k].favicon() != 'none') {
                  _this.buttons[k].color('transparent');
                }
                var urlpattern = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
                if (urlpattern.test(_this.buttons[k].url().toLowerCase())) {
                  var iconurl = _this.buttons[k].url().replace(/(:\/\/[^\/]+).*$/, '$1') + '/favicon.ico';
                  var iconstyle = 'a > .social-favicon-' + _this.buttons[k].index() + ' {background-image: url("' + iconurl + '"); background-position: center; background-repeat: no-repeat; background-size: 100% 100%;width:100%;height:100%;}a > .social-favicon-grey-' + _this.buttons[k].index() + ' {background-image: url("' + iconurl + '"); background-position: center; background-repeat: no-repeat; background-size: 100% 100%;width:100%;height:100%;-webkit-filter: grayscale(1) contrast(2) brightness(2);}';
                  _this.buttons[k].iconstyle(iconstyle);
                }
              }
              m.redraw();
              $('.form-group-social').delay(5).slideDown();
              $('#loading-main').delay(5).removeClass('fa-spin');
              $('#loading-main').delay(5).slideUp();
            });
            this.buttons = [];
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

            $(function () {
              $('.Modal-content').css('overflow', 'visible');
              $(document).on('click', '.action-placement', function (e) {
                $('.action-placement').removeClass('active');
                $(this).addClass('active');
                e.preventDefault();
                return false;
              });
              for (var k in _this2.buttons) {
                $('#social-favicon-' + _this2.buttons[k].index()).iconpicker({
                  icons: ['social-favicon-' + _this2.buttons[k].index(), 'social-favicon-grey-' + _this2.buttons[k].index(), "fa-globe", 'fa-amazon', 'fa-angellist', 'fa-apple', 'fa-behance', 'fa-bitbucket', 'fa-codepen', 'fa-connectdevelop', 'fa-dashcube', 'fa-delicious', 'fa-deviantart', 'fa-digg', 'fa-dribbble', 'fa-dropbox', 'fa-drupal', 'fa-facebook', 'fa-flickr', 'fa-foursquare', 'fa-get-pocket', 'fa-git', 'fa-github', 'fa-github-alt', 'fa-gittip', 'fa-google', 'fa-google-plus', 'fa-google-wallet', 'fa-gratipay', 'fa-hacker-news', 'fa-instagram', 'fa-ioxhost', 'fa-joomla', 'fa-jsfiddle', 'fa-lastfm', 'fa-leanpub', 'fa-linkedin', 'fa-meanpath', 'fa-medium', 'fa-odnoklassniki', 'fa-opencart', 'fa-pagelines', 'fa-paypal', 'fa-pied-piper-alt', 'fa-pinterest-p', 'fa-qq', 'fa-reddit', 'fa-renren', 'fa-sellsy', 'fa-share-alt', 'fa-shirtsinbulk', 'fa-simplybuilt', 'fa-skyatlas', 'fa-skype', 'fa-slack', 'fa-slideshare', 'fa-soundcloud', 'fa-spotify', 'fa-stack-exchange', 'fa-stack-overflow', 'fa-steam', 'fa-stumbleupon', 'fa-tencent-weibo', 'fa-trello', 'fa-tripadvisor', 'fa-tumblr', 'fa-twitch', 'fa-twitter', 'fa-viacoin', 'fa-vimeo', 'fa-vine', 'fa-vk', 'fa-wechat', 'fa-weibo', 'fa-weixin', 'fa-whatsapp', 'fa-wordpress', 'fa-xing', 'fa-y-combinator', 'fa-yelp', 'fa-youtube-play'],
                  hideOnSelect: true,
                  title: "Displayed Icon"
                });
                if (/social-favicon-grey-\d/.test(_this2.buttons[k].icon())) {
                  $('.button-' + k).addClass('social-greyscale-button');
                } else {
                  $('.button-' + k).removeClass('social-greyscale-button');
                }
              }
              $('.icp').on('iconpickerSelected', function (e) {
                var btn_group = /btn-group="(\d+)"/.exec(e.target.outerHTML)[1];
                $('#icon' + btn_group).val(e.iconpickerValue.replace("fa-", "")).change();
                if (e.iconpickerValue.replace("fa-", "") == 'social-favicon-' + _this2.buttons[btn_group].index() || e.iconpickerValue.replace("fa-", "") == 'social-favicon-grey-' + _this2.buttons[btn_group].index()) {
                  var urlpattern = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
                  if (urlpattern.test(_this2.buttons[btn_group].url().toLowerCase())) {
                    var iconurl = _this2.buttons[btn_group].url().replace(/(:\/\/[^\/]+).*$/, '$1') + '/favicon.ico';
                    _this2.buttons[btn_group].favicon(iconurl);
                    _this2.buttons[btn_group].color('transparent');
                    if (/social-favicon-grey-\d/.test(e.iconpickerValue.replace("fa-", ""))) {
                      $('.button-' + btn_group).addClass('social-greyscale-button');
                    } else {
                      $('.button-' + btn_group).removeClass('social-greyscale-button');
                    }
                  }
                } else {
                  _this2.buttons[btn_group].favicon('none');
                  _this2.buttons[btn_group].color('white');
                }
                m.redraw();
                $('.icp').attr("aria-expanded", "false");
                $('.btn-group').removeClass('open');
              });
            });
            return [m('div', { className: 'Modal-body' }, [m('div', { className: 'Form' }, [m('i', { className: 'fa fa-spinner fa-spin fa-align-center', id: 'loading-main', style: { 'font-size': '3em', 'margin-left': '47%' } }), this.buttons.map(function (button) {

              return [m('div', { className: 'Form-group form-group-social', id: 'socialgroup' + button.index() }, [m('input', { className: 'SocialFormControl SocialTitle',
                placeholder: app.translator.trans('davis-socialprofile.forum.edit.title'),
                value: button.title(),
                oninput: m.withAttr('value', button.title)
              }), m('div', { className: 'btn-group' }, [m('null', { className: 'action-create' }), m('button', { type: 'button',
                tabindex: '-1',
                className: 'btn btn-primary2 iconpicker-component button-' + button.index(),
                style: {
                  'background-image': button.favicon() != 'none' ? "url(" + button.favicon() + ')' : "none",
                  'background-position': 'center',
                  'background-repeat': 'no-repeat',
                  'background-size': '50% auto'
                }
              }, [m('i', { className: 'fa fa-fw fa-' + button.icon(),
                style: {
                  'color': button.color()
                }
              })]), m('button', { type: 'button',
                'btn-group': button.index(),
                className: 'form-control icp icp-dd btn btn-primary dropdown-toggle',
                id: 'social-favicon-' + button.index(),
                'data-selected': button.favicon() != 'none' ? button.icon().replace('fa-', '') : "fa-" + button.icon(),
                'data-toggle': 'dropdown'
              }, [m('span', { className: 'caret' }), m('span', { className: 'sr-only' }, ['Toggle Dropdown'])]), m('div', { className: 'social-dropdown-menu' })]), m('input', { className: 'SocialFormControl Socialurl',
                placeholder: app.translator.trans('davis-socialprofile.forum.edit.url'),
                value: button.url(),
                oninput: m.withAttr('value', function (value) {
                  button.url(value);
                  var urlpattern = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
                  if (urlpattern.test(button.url().toLowerCase())) {
                    var iconurl = button.url().replace(/(:\/\/[^\/]+).*$/, '$1') + '/favicon.ico';
                    var iconstyle = 'a > .social-favicon-' + button.index() + ' {background-image: url("' + iconurl + '"); background-position: center; background-repeat: no-repeat; background-size: 100% 100%;width:100%;height:100%;}a > .social-favicon-grey-' + button.index() + ' {background-image: url("' + iconurl + '"); background-position: center; background-repeat: no-repeat; background-size: 100% 100%;width:100%;height:100%;-webkit-filter: grayscale(1) contrast(2) brightness(2);}';
                    button.iconstyle(iconstyle);
                    button.favicon(iconurl);
                    button.color('transparent');
                    button.icon('fa-social-favicon-' + button.index());
                    $('#social-favicon-' + button.index()).attr('data-selected', button.icon().replace('fa-', '')).change();
                  }
                })
              }), m('input', { className: 'SocialFormControl SocialIcon',
                id: 'icon' + button.index(),
                style: 'display: none',
                value: button.icon(),
                onchange: m.withAttr('value', button.icon)
              }), m('input', { className: 'SocialFormControl Socialfavicon',
                id: 'favicon' + button.index(),
                style: 'display: none',
                value: button.favicon(),
                onchange: m.withAttr('value', button.favicon)
              }), m('style', {}, button.iconstyle())])];
            }), m('div', { className: 'Form-group', id: 'submit-button-group' }, [Button.component({
              type: 'submit',
              className: 'Button Button--primary EditSocialButtons-save',
              loading: this.loading,
              children: app.translator.trans('davis-socialprofile.forum.edit.submit')
            }), m('div', { className: 'Button Button--primary EditSocialButtons-add', style: 'margin-left: 1%;',
              onclick: function onclick() {
                var curadd = _this2.buttons.length;
                _this2.buttons[curadd] = {};
                _this2.buttons[curadd].index = m.prop(curadd);
                _this2.buttons[curadd].title = m.prop("");
                _this2.buttons[curadd].favicon = m.prop("none");
                _this2.buttons[curadd].iconstyle = m.prop("");
                _this2.buttons[curadd].color = m.prop("");
                _this2.buttons[curadd].url = m.prop("");
                _this2.buttons[curadd].icon = m.prop("globe");
                _this2.numberofinputs = curadd;

                m.redraw();
                $('#socialgroup' + curadd).delay(2).slideDown();
              } }, [m('i', { className: 'fa fa-fw fa-plus' })]), m('div', { className: 'Button Button--primary EditSocialButtons-add', style: 'margin-left: 1%;',
              onclick: function onclick() {
                var curdel = _this2.buttons.length - 1;
                $('#socialgroup' + curdel).slideUp('normal', function () {
                  _this2.buttons.splice(curdel, 1);
                  m.redraw();
                });
              } }, [m('i', { className: 'fa fa-fw fa-minus' })])])])])];
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
              button['favicon'] = '';
              button['title'] = '';
              button['url'] = '';
              button['icon'] = '';
            }
            this.buttons[key] = {};
            this.buttons[key].index = m.prop(key);
            this.buttons[key].iconstyle = m.prop();
            this.buttons[key].color = m.prop('white');
            this.buttons[key].favicon = m.prop(button["favicon"] || "none");
            this.buttons[key].title = m.prop(button["title"]);
            this.buttons[key].url = m.prop(button["url"]);
            this.buttons[key].icon = m.prop(button["icon"] || "globe");
            this.numberofinputs = key;
          }
        }]);
        return SocialButtonsModal;
      })(Modal);

      _export('default', SocialButtonsModal);
    }
  };
});;
System.register('Davis/SocialProfile/main', ['flarum/app', 'flarum/extend', 'flarum/components/UserCard', 'flarum/components/Badge', 'Davis/SocialProfile/components/SocialButtonsModal'], function (_export) {
    'use strict';

    var app, extend, UserCard, Badge, SocialButtonsModal;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp['default'];
        }, function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumComponentsUserCard) {
            UserCard = _flarumComponentsUserCard['default'];
        }, function (_flarumComponentsBadge) {
            Badge = _flarumComponentsBadge['default'];
        }, function (_DavisSocialProfileComponentsSocialButtonsModal) {
            SocialButtonsModal = _DavisSocialProfileComponentsSocialButtonsModal['default'];
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
                        var _loop = function (k) {
                            var selectedButton = _this2.buttonsArray[k]; //Set constant for easier selection
                            //Ensure the button has a title, icon, and url
                            if (selectedButton["title"] !== "" && selectedButton["icon"] !== "" && selectedButton["url"] !== "") {
                                //If the button is using a favicon, make sure it is displayed
                                if (selectedButton['favicon'] !== 'none') {
                                    buttonStyle = 'background-image: url("' + selectedButton['favicon'] + '");background-size: 60%;background-position: 50% 50%;background-repeat: no-repeat;';
                                    //If the favicon is set to greyscale, make sure it is displayed
                                    if (/social-favicon-grey-\d/.test(selectedButton['icon'])) {
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
                                    icon: selectedButton["icon"],
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
                                    app.modal.show(new SocialButtonsModal()); //Show the edit modal
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
                                        app.modal.show(new SocialButtonsModal());
                                    }
                                }), -1);
                            }
                        }
                });
            });
        }
    };
});