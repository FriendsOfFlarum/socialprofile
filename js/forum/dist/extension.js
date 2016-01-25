System.register('davis/socialprofile/components/SocialButtonsModal', ['flarum/components/Modal', 'flarum/components/Button', 'flarum/utils/string'], function (_export) {
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
                _this.socialaccs = JSON.parse(result.data.attributes.buttons);

                if (typeof _this.socialaccs["0"] !== 'undefined') {
                  _this.urltitle1 = m.prop(_this.socialaccs["0"]["title"] || "");
                  _this.url1 = m.prop(_this.socialaccs["0"]["url"] || "");
                  _this.icon1 = m.prop(_this.socialaccs["0"]["icon"] || "globe");
                }
                if (typeof _this.socialaccs["1"] !== 'undefined') {
                  _this.urltitle2 = m.prop(_this.socialaccs["1"]["title"] || "");
                  _this.url2 = m.prop(_this.socialaccs["1"]["url"] || "");
                  _this.icon2 = m.prop(_this.socialaccs["1"]["icon"] || "globe");
                }
                if (typeof _this.socialaccs["2"] !== 'undefined') {
                  _this.urltitle3 = m.prop(_this.socialaccs["2"]["title"] || "");
                  _this.url3 = m.prop(_this.socialaccs["2"]["url"] || "");
                  _this.icon3 = m.prop(_this.socialaccs["2"]["icon"] || "globe");
                }
                if (typeof _this.socialaccs["3"] !== 'undefined') {
                  _this.urltitle4 = m.prop(_this.socialaccs["3"]["title"] || "");
                  _this.url4 = m.prop(_this.socialaccs["3"]["url"] || "");
                  _this.icon4 = m.prop(_this.socialaccs["3"]["icon"] || "globe");
                }
                if (typeof _this.socialaccs["4"] !== 'undefined') {
                  _this.urltitle5 = m.prop(_this.socialaccs["4"]["title"] || "");
                  _this.url5 = m.prop(_this.socialaccs["4"]["url"] || "");
                  _this.icon5 = m.prop(_this.socialaccs["4"]["icon"] || "globe");
                }
                if (typeof _this.socialaccs["5"] !== 'undefined') {
                  _this.urltitle6 = m.prop(_this.socialaccs["5"]["title"] || "");
                  _this.url6 = m.prop(_this.socialaccs["5"]["url"] || "");
                  _this.icon6 = m.prop(_this.socialaccs["5"]["icon"] || "globe");
                }
                if (typeof _this.socialaccs["6"] !== 'undefined') {
                  _this.urltitle7 = m.prop(_this.socialaccs["6"]["title"] || "");
                  _this.url7 = m.prop(_this.socialaccs["6"]["url"] || "");
                  _this.icon7 = m.prop(_this.socialaccs["6"]["icon"] || "globe");
                }
              } else {
                _this.socialaccs = "";
              }
              m.redraw();
            });
            this.urltitle1 = m.prop('');
            this.url1 = m.prop('');
            this.icon1 = m.prop('');

            this.urltitle2 = m.prop('');
            this.url2 = m.prop('');
            this.icon2 = m.prop('');

            this.urltitle3 = m.prop('');
            this.url3 = m.prop('');
            this.icon3 = m.prop('');

            this.urltitle4 = m.prop('');
            this.url4 = m.prop('');
            this.icon4 = m.prop('');

            this.urltitle5 = m.prop('');
            this.url5 = m.prop('');
            this.icon5 = m.prop('');

            this.urltitle6 = m.prop('');
            this.url6 = m.prop('');
            this.icon6 = m.prop('');

            this.urltitle7 = m.prop('');
            this.url7 = m.prop('');
            this.icon7 = m.prop('');
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

            $(function () {
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
            return m(
              'div',
              { className: 'Modal-body' },
              m(
                'div',
                { className: 'Form' },
                m(
                  'div',
                  { className: 'Form-group form-group-social' },
                  m('input', { className: 'SocialFormControl', placeholder: app.translator.trans('davis-socialprofile.forum.edit.title'), value: this.urltitle1(), oninput: m.withAttr('value', this.urltitle1) }),
                  m(
                    'div',
                    { 'class': 'btn-group' },
                    m('null', { 'class': 'action-create' }),
                    m(
                      'button',
                      { type: 'button', tabindex: '-1', 'class': 'btn btn-primary2 iconpicker-component' },
                      m('i', { 'class': "fa fa-fw fa-" + this.icon1() })
                    ),
                    m(
                      'button',
                      { type: 'button', 'btn-group': '1', 'class': 'form-control icp icp-dd btn btn-primary dropdown-toggle', 'data-selected': 'fa-' + this.icon1(), 'data-toggle': 'dropdown' },
                      m('span', { 'class': 'caret' }),
                      m(
                        'span',
                        { 'class': 'sr-only' },
                        'Toggle Dropdown'
                      )
                    ),
                    m('div', { 'class': 'dropdown-menu' })
                  ),
                  m('input', { className: 'SocialFormControl Socialurl', placeholder: app.translator.trans('davis-socialprofile.forum.edit.url'), value: this.url1(), oninput: m.withAttr('value', this.url1) }),
                  m('input', { id: 'icon1', style: 'display: none;', value: this.icon1(), onchange: m.withAttr('value', this.icon1) })
                ),
                m(
                  'div',
                  { className: 'Form-group form-group-social' },
                  m('input', { className: 'SocialFormControl', placeholder: app.translator.trans('davis-socialprofile.forum.edit.title'), value: this.urltitle2(), oninput: m.withAttr('value', this.urltitle2) }),
                  m(
                    'div',
                    { 'class': 'btn-group' },
                    m('null', { 'class': 'action-create' }),
                    m(
                      'button',
                      { type: 'button', tabindex: '-1', 'class': 'btn btn-primary2 iconpicker-component' },
                      m('i', { 'class': "fa fa-fw fa-" + this.icon2() })
                    ),
                    m(
                      'button',
                      { type: 'button', 'btn-group': '2', 'class': 'icp icp-dd btn btn-primary dropdown-toggle', 'data-selected': 'fa-' + this.icon2(), 'data-toggle': 'dropdown' },
                      m('span', { 'class': 'caret' }),
                      m(
                        'span',
                        { 'class': 'sr-only' },
                        'Toggle Dropdown'
                      )
                    ),
                    m('div', { 'class': 'dropdown-menu' })
                  ),
                  m('input', { className: 'SocialFormControl Socialurl', placeholder: app.translator.trans('davis-socialprofile.forum.edit.url'), value: this.url2(), oninput: m.withAttr('value', this.url2) }),
                  m('input', { id: 'icon2', style: 'display: none;', value: this.icon2(), onchange: m.withAttr('value', this.icon2) })
                ),
                m(
                  'div',
                  { className: 'Form-group form-group-social' },
                  m('input', { className: 'SocialFormControl', placeholder: app.translator.trans('davis-socialprofile.forum.edit.title'), value: this.urltitle3(), oninput: m.withAttr('value', this.urltitle3) }),
                  m(
                    'div',
                    { 'class': 'btn-group' },
                    m('null', { 'class': 'action-create' }),
                    m(
                      'button',
                      { type: 'button', tabindex: '-1', 'class': 'btn btn-primary2 iconpicker-component' },
                      m('i', { 'class': "fa fa-fw fa-" + this.icon3() })
                    ),
                    m(
                      'button',
                      { type: 'button', 'btn-group': '3', 'class': 'icp icp-dd btn btn-primary dropdown-toggle', 'data-selected': 'fa-' + this.icon3(), 'data-toggle': 'dropdown' },
                      m('span', { 'class': 'caret' }),
                      m(
                        'span',
                        { 'class': 'sr-only' },
                        'Toggle Dropdown'
                      )
                    ),
                    m('div', { 'class': 'dropdown-menu' })
                  ),
                  m('input', { className: 'SocialFormControl Socialurl', placeholder: app.translator.trans('davis-socialprofile.forum.edit.url'), value: this.url3(), oninput: m.withAttr('value', this.url3) }),
                  m('input', { id: 'icon3', style: 'display: none;', value: this.icon3(), onchange: m.withAttr('value', this.icon3) })
                ),
                m(
                  'div',
                  { className: 'Form-group form-group-social' },
                  m('input', { className: 'SocialFormControl', placeholder: app.translator.trans('davis-socialprofile.forum.edit.title'), value: this.urltitle4(), oninput: m.withAttr('value', this.urltitle4) }),
                  m(
                    'div',
                    { 'class': 'btn-group' },
                    m('null', { 'class': 'action-create' }),
                    m(
                      'button',
                      { type: 'button', tabindex: '-1', 'class': 'btn btn-primary2 iconpicker-component' },
                      m('i', { 'class': "fa fa-fw fa-" + this.icon4() })
                    ),
                    m(
                      'button',
                      { type: 'button', 'btn-group': '4', 'class': 'icp icp-dd btn btn-primary dropdown-toggle', 'data-selected': 'fa-' + this.icon4(), 'data-toggle': 'dropdown' },
                      m('span', { 'class': 'caret' }),
                      m(
                        'span',
                        { 'class': 'sr-only' },
                        'Toggle Dropdown'
                      )
                    ),
                    m('div', { 'class': 'dropdown-menu' })
                  ),
                  m('input', { className: 'SocialFormControl Socialurl', placeholder: app.translator.trans('davis-socialprofile.forum.edit.url'), value: this.url4(), oninput: m.withAttr('value', this.url4) }),
                  m('input', { id: 'icon4', style: 'display: none;', value: this.icon4(), onchange: m.withAttr('value', this.icon4) })
                ),
                m(
                  'div',
                  { className: 'Form-group form-group-social' },
                  m('input', { className: 'SocialFormControl', placeholder: app.translator.trans('davis-socialprofile.forum.edit.title'), value: this.urltitle5(), oninput: m.withAttr('value', this.urltitle5) }),
                  m(
                    'div',
                    { 'class': 'btn-group' },
                    m('null', { 'class': 'action-create' }),
                    m(
                      'button',
                      { type: 'button', tabindex: '-1', 'class': 'btn btn-primary2 iconpicker-component' },
                      m('i', { 'class': "fa fa-fw fa-" + this.icon5() })
                    ),
                    m(
                      'button',
                      { type: 'button', 'btn-group': '5', 'class': 'icp icp-dd btn btn-primary dropdown-toggle', 'data-selected': 'fa-' + this.icon5(), 'data-toggle': 'dropdown' },
                      m('span', { 'class': 'caret' }),
                      m(
                        'span',
                        { 'class': 'sr-only' },
                        'Toggle Dropdown'
                      )
                    ),
                    m('div', { 'class': 'dropdown-menu' })
                  ),
                  m('input', { className: 'SocialFormControl Socialurl', placeholder: app.translator.trans('davis-socialprofile.forum.edit.url'), value: this.url5(), oninput: m.withAttr('value', this.url5) }),
                  m('input', { id: 'icon5', style: 'display: none;', value: this.icon5(), onchange: m.withAttr('value', this.icon5) })
                ),
                m(
                  'div',
                  { className: 'Form-group form-group-social' },
                  m('input', { className: 'SocialFormControl', placeholder: app.translator.trans('davis-socialprofile.forum.edit.title'), value: this.urltitle6(), oninput: m.withAttr('value', this.urltitle6) }),
                  m(
                    'div',
                    { 'class': 'btn-group' },
                    m('null', { 'class': 'action-create' }),
                    m(
                      'button',
                      { type: 'button', tabindex: '-1', 'class': 'btn btn-primary2 iconpicker-component' },
                      m('i', { 'class': "fa fa-fw fa-" + this.icon6() })
                    ),
                    m(
                      'button',
                      { type: 'button', 'btn-group': '6', 'class': 'icp icp-dd btn btn-primary dropdown-toggle', 'data-selected': 'fa-' + this.icon6(), 'data-toggle': 'dropdown' },
                      m('span', { 'class': 'caret' }),
                      m(
                        'span',
                        { 'class': 'sr-only' },
                        'Toggle Dropdown'
                      )
                    ),
                    m('div', { 'class': 'dropdown-menu' })
                  ),
                  m('input', { className: 'SocialFormControl Socialurl', placeholder: app.translator.trans('davis-socialprofile.forum.edit.url'), value: this.url6(), oninput: m.withAttr('value', this.url6) }),
                  m('input', { id: 'icon6', style: 'display: none;', value: this.icon6(), onchange: m.withAttr('value', this.icon6) })
                ),
                m(
                  'div',
                  { className: 'Form-group form-group-social' },
                  m('input', { className: 'SocialFormControl', placeholder: app.translator.trans('davis-socialprofile.forum.edit.title'), value: this.urltitle7(), oninput: m.withAttr('value', this.urltitle7) }),
                  m(
                    'div',
                    { 'class': 'btn-group' },
                    m('null', { 'class': 'action-create' }),
                    m(
                      'button',
                      { type: 'button', tabindex: '-1', 'class': 'btn btn-primary2 iconpicker-component' },
                      m('i', { 'class': "fa fa-fw fa-" + this.icon7() })
                    ),
                    m(
                      'button',
                      { type: 'button', 'btn-group': '7', 'class': 'icp icp-dd btn btn-primary dropdown-toggle', 'data-selected': 'fa-' + this.icon7(), 'data-toggle': 'dropdown' },
                      m('span', { 'class': 'caret' }),
                      m(
                        'span',
                        { 'class': 'sr-only' },
                        'Toggle Dropdown'
                      )
                    ),
                    m('div', { 'class': 'dropdown-menu' })
                  ),
                  m('input', { className: 'SocialFormControl Socialurl', placeholder: app.translator.trans('davis-socialprofile.forum.edit.url'), value: this.url7(), oninput: m.withAttr('value', this.url7) }),
                  m('input', { id: 'icon7', style: 'display: none;', value: this.icon7(), onchange: m.withAttr('value', this.icon7) })
                ),
                m(
                  'div',
                  { className: 'Form-group', id: 'submit-button-group' },
                  Button.component({
                    type: 'submit',
                    className: 'Button Button--primary EditSocialButtons-save',
                    loading: this.loading,
                    children: app.translator.trans('davis-socialprofile.forum.edit.submit')
                  })
                )
              )
            );
          }
        }, {
          key: 'onsubmit',
          value: function onsubmit(e) {
            var _this2 = this;

            e.preventDefault();

            this.loading = true;
            var buttonData = {
              0: {
                "title": this.urltitle1(),
                "url": this.url1(),
                "icon": this.icon1()
              },
              1: {
                "title": this.urltitle2(),
                "url": this.url2(),
                "icon": this.icon2()
              },
              2: {
                "title": this.urltitle3(),
                "url": this.url3(),
                "icon": this.icon3()
              },
              3: {
                "title": this.urltitle4(),
                "url": this.url4(),
                "icon": this.icon4()
              },
              4: {
                "title": this.urltitle5(),
                "url": this.url5(),
                "icon": this.icon5()
              },
              5: {
                "title": this.urltitle6(),
                "url": this.url6(),
                "icon": this.icon6()
              },
              6: {
                "title": this.urltitle7(),
                "url": this.url7(),
                "icon": this.icon7()
              }
            };
            buttonData = JSON.stringify(buttonData);
            var data = new FormData();
            data.append('buttons', buttonData);
            app.request({
              method: 'POST',
              url: app.forum.attribute('apiUrl') + '/profile/socialbuttons',
              serialize: function serialize(raw) {
                return raw;
              },
              data: data
            }).then(function () {
              return _this2.hide();
            }, function (response) {
              _this2.loading = false;
              _this2.handleErrors(response);
            });
          }
        }]);
        return SocialButtonsModal;
      })(Modal);

      _export('default', SocialButtonsModal);
    }
  };
});;
System.register('davis/socialprofile/main', ['davis/socialprofile/models/SocialButtons', 'flarum/app', 'flarum/extend', 'flarum/components/UserCard', 'flarum/components/Badge', 'davis/socialprofile/components/SocialButtonsModal'], function (_export) {
    'use strict';

    var SocialButtons, app, extend, UserCard, Badge, SocialButtonsModal;
    return {
        setters: [function (_davisSocialprofileModelsSocialButtons) {
            SocialButtons = _davisSocialprofileModelsSocialButtons['default'];
        }, function (_flarumApp) {
            app = _flarumApp['default'];
        }, function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumComponentsUserCard) {
            UserCard = _flarumComponentsUserCard['default'];
        }, function (_flarumComponentsBadge) {
            Badge = _flarumComponentsBadge['default'];
        }, function (_davisSocialprofileComponentsSocialButtonsModal) {
            SocialButtonsModal = _davisSocialprofileComponentsSocialButtonsModal['default'];
        }],
        execute: function () {

            app.initializers.add('davis-socialprofile-forum', function () {

                app.store.models.socialbuttons = SocialButtons;

                extend(UserCard.prototype, 'init', function () {
                    var _this = this;

                    var theuser = this.props.user;
                    var theurl = app.forum.attribute('apiUrl') + '/profile/socialbutton/' + theuser.data.id;
                    this.socialaccs = null;
                    app.request({ method: "GET", url: theurl }).then(function (result) {
                        if (result.data.attributes.hasOwnProperty("buttons")) {
                            _this.socialaccs = JSON.parse(result.data.attributes.buttons);
                            _this.newuser = false;
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