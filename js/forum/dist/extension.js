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

            var curuserid = app.current.user.data.id;
            var url = app.forum.attribute('apiUrl') + '/profile/socialbutton/' + curuserid;
            this.socialaccs = null;
            m.request({ method: "GET", url: url }).then(function (result) {
              if (result.data.attributes.hasOwnProperty("buttons")) {
                if (result.data.attributes.buttons == "[]") {
                  _this.buttons[0] = {};
                  _this.buttons[0].index = m.prop(0);
                  _this.buttons[0].title = m.prop("");
                  _this.buttons[0].url = m.prop("");
                  _this.buttons[0].icon = m.prop("globe");
                  _this.numberofinputs = 0;
                } else {
                  _this.socialaccs = JSON.parse(result.data.attributes.buttons);
                  _this.buttons = [];
                  for (var k in _this.socialaccs) {
                    if (_this.socialaccs[k]['title'] != "") {
                      _this.buttons[k] = {};
                      _this.buttons[k].index = m.prop(k);
                      _this.buttons[k].title = m.prop(_this.socialaccs[k]["title"] || "");
                      _this.buttons[k].url = m.prop(_this.socialaccs[k]["url"] || "");
                      _this.buttons[k].icon = m.prop(_this.socialaccs[k]["icon"] || "globe");
                      _this.numberofinputs = k;
                    }
                  }
                }
              } else {
                _this.buttons[0] = {};
                _this.buttons[0].index = m.prop(0);
                _this.buttons[0].title = m.prop("");
                _this.buttons[0].url = m.prop("");
                _this.buttons[0].icon = m.prop("globe");
                _this.numberofinputs = 0;
              }
              m.redraw();
              $('.form-group-social').delay(5).slideDown();
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
              $('.action-create').on('click', function () {
                $('.icp-dd').iconpicker({
                  icons: ["fa-globe", 'fa-amazon', 'fa-angellist', 'fa-apple', 'fa-behance', 'fa-bitbucket', 'fa-codepen', 'fa-connectdevelop', 'fa-dashcube', 'fa-delicious', 'fa-deviantart', 'fa-digg', 'fa-dribbble', 'fa-dropbox', 'fa-drupal', 'fa-facebook', 'fa-flickr', 'fa-foursquare', 'fa-get-pocket', 'fa-git', 'fa-github', 'fa-github-alt', 'fa-gittip', 'fa-google', 'fa-google-plus', 'fa-google-wallet', 'fa-gratipay', 'fa-hacker-news', 'fa-instagram', 'fa-ioxhost', 'fa-joomla', 'fa-jsfiddle', 'fa-lastfm', 'fa-leanpub', 'fa-linkedin', 'fa-meanpath', 'fa-medium', 'fa-odnoklassniki', 'fa-opencart', 'fa-pagelines', 'fa-paypal', 'fa-pied-piper-alt', 'fa-pinterest-p', 'fa-qq', 'fa-reddit', 'fa-renren', 'fa-sellsy', 'fa-share-alt', 'fa-shirtsinbulk', 'fa-simplybuilt', 'fa-skyatlas', 'fa-skype', 'fa-slack', 'fa-slideshare', 'fa-soundcloud', 'fa-spotify', 'fa-stack-exchange', 'fa-stack-overflow', 'fa-steam', 'fa-stumbleupon', 'fa-tencent-weibo', 'fa-trello', 'fa-tripadvisor', 'fa-tumblr', 'fa-twitch', 'fa-twitter', 'fa-viacoin', 'fa-vimeo', 'fa-vine', 'fa-vk', 'fa-wechat', 'fa-weibo', 'fa-weixin', 'fa-whatsapp', 'fa-wordpress', 'fa-xing', 'fa-y-combinator', 'fa-yelp', 'fa-youtube-play'],
                  hideOnSelect: true,
                  title: "Displayed Icon"
                });
              }).trigger('click');
              $('.icp').on('iconpickerSelected', function (e) {
                var btn_group = $(this).attr("btn-group");
                $('#icon' + btn_group).val(e.iconpickerValue.replace("fa-", "")).change();
                $('.icp').attr("aria-expanded", "false");
                $('.btn-group').removeClass('open');
              });
            });
            return [m('div', { className: 'Modal-body' }, [m('div', { className: 'Form' }, [this.buttons.map(function (button) {
              return [m('div', { className: 'Form-group form-group-social', id: 'socialgroup' + button.index() }, [m('input', { className: 'SocialFormControl',
                placeholder: app.translator.trans('davis-socialprofile.forum.edit.title'),
                value: button.title(),
                oninput: m.withAttr('value', button.title)
              }), m('div', { className: 'btn-group' }, [m('null', { className: 'action-create' }), m('button', { type: 'button',
                tabindex: '-1',
                className: 'btn btn-primary2 iconpicker-component'
              }, [m('i', { className: 'fa fa-fw fa-' + button.icon() })]), m('button', { type: 'button',
                'btn-group': button.index(),
                className: 'form-control icp icp-dd btn btn-primary dropdown-toggle',
                'data-selected': 'fa-' + button.icon(),
                'data-toggle': 'dropdown'
              }, [m('span', { className: 'caret' }), m('span', { className: 'sr-only' }, ['Toggle Dropdown'])]), m('div', { className: 'dropdown-menu' })]), m('input', { className: 'SocialFormControl Socialurl',
                placeholder: app.translator.trans('davis-socialprofile.forum.edit.url'),
                value: button.url(),
                oninput: m.withAttr('value', button.url)
              }), m('input', { className: 'SocialFormControl Socialurl',
                id: 'icon' + button.index(),
                style: 'display: none',
                value: button.icon(),
                onchange: m.withAttr('value', button.icon)
              })])];
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
              return _this3.hide();
            }, function (response) {
              _this3.loading = false;
              _this3.handleErrors(response);
            });
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

                    var theuser = this.props.user;
                    var theurl = app.forum.attribute('apiUrl') + '/profile/socialbutton/' + theuser.data.id;
                    this.socialaccs = null;
                    app.request({ method: "GET", url: theurl }).then(function (result) {
                        if (result.data.attributes.hasOwnProperty("buttons")) {
                            if (result.data.attributes.buttons == "[]") {
                                _this.socialaccs = true;
                                _this.newuser = true;
                            } else {
                                _this.socialaccs = JSON.parse(result.data.attributes.buttons);
                                _this.newuser = false;
                            }
                        } else {
                            _this.socialaccs = true;
                            _this.newuser = true;
                        }
                        m.redraw();
                    });
                });

                extend(UserCard.prototype, 'infoItems', function (items) {
                    var _this2 = this;

                    // If request hasn't loaded yet, don't add any items.
                    if (!this.socialaccs) return;

                    if (!this.newuser) {
                        var _loop = function (k) {
                            var curaccount = _this2.socialaccs[k];
                            if (curaccount["title"] !== "") {
                                items.add(curaccount["icon"] + k + ' social-button', Badge.component({
                                    type: "social",
                                    icon: curaccount["icon"],
                                    label: curaccount["title"],
                                    onclick: function onclick() {
                                        window.open(curaccount["url"], '_blank');
                                    }
                                }));
                            }
                        };

                        for (var k in this.socialaccs) {
                            _loop(k);
                        }
                        var settingsclass;
                        var settingsicon;
                        var settingslabel;
                        if (this.socialaccs["0"]["title"] !== '' || this.socialaccs["1"]["title"] !== '' || this.socialaccs["2"]["title"] !== '' || this.socialaccs["3"]["title"] !== '' || this.socialaccs["4"]["title"] !== '' || this.socialaccs["5"]["title"] !== '' || this.socialaccs["6"]["title"] !== '') {
                            settingsclass = 'social-settings';
                            settingsicon = 'cog';
                            settingslabel = app.translator.trans('davis-socialprofile.forum.edit.edit');
                        } else {
                            settingsclass = 'null-social-settings';
                            settingsicon = 'plus';
                            settingslabel = app.translator.trans('davis-socialprofile.forum.edit.add');
                        }
                        if (app.session.user === app.current.user) {
                            items.add('settings' + ' social-button', Badge.component({
                                type: "social " + settingsclass,
                                icon: settingsicon,
                                label: settingslabel,
                                onclick: function onclick() {
                                    app.modal.show(new SocialButtonsModal());
                                }
                            }), -1);
                        }
                    } else {
                        if (app.session.user === app.current.user) {
                            items.add('settings' + ' social-button', Badge.component({
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