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
            babelHelpers.get(Object.getPrototypeOf(SocialButtonsModal.prototype), 'init', this).call(this);

            //this.social = this.props.social || app.store.createRecord('tags');

            //this.name = m.prop(this.social.name() || '');
            this.urltitle = m.prop('');
            this.url = m.prop('');
            this.icon = m.prop('');
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

            return m(
              'div',
              { className: 'Modal-body' },
              m(
                'div',
                { className: 'Form' },
                m(
                  'div',
                  { className: 'Form-group' },
                  m(
                    'label',
                    null,
                    app.translator.trans('davis-socialprofile.forum.edit.title.m')
                  ),
                  m('input', { className: 'FormControl', placeholder: app.translator.trans('davis-socialprofile.forum.edit.title.pl'), value: this.urltitle(), oninput: m.withAttr('value', this.urltitle) }),
                  m(
                    'label',
                    null,
                    app.translator.trans('davis-socialprofile.forum.edit.url.m')
                  ),
                  m('input', { className: 'FormControl', placeholder: app.translator.trans('davis-socialprofile.forum.edit.url.pl'), value: this.url(), oninput: m.withAttr('value', this.url) }),
                  m(
                    'label',
                    null,
                    app.translator.trans('davis-socialprofile.forum.edit.icon.m')
                  ),
                  m('input', { className: 'FormControl', placeholder: app.translator.trans('davis-socialprofile.forum.edit.icon.pl'), value: this.icon(), oninput: m.withAttr('value', this.icon) })
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
            var _this = this;

            e.preventDefault();

            this.loading = true;
            var buttonData = {};
            buttonData[0] = {
              "title": this.urltitle(),
              "url": this.url(),
              "icon": this.icon()
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
              return _this.hide();
            }, function (response) {
              _this.loading = false;
              _this.handleErrors(response);
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

    var SocialButtons, app, extend, UserCard, Badge, SocialButtonsModal, socialaccs;
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
            socialaccs = {
                0: {
                    icon: "twitter",
                    label: "Twitter",
                    url: "https://twitter.com"
                },
                1: {
                    icon: "facebook",
                    label: "Facebook",
                    url: "https://facebook.com"
                },
                2: {
                    icon: "github",
                    label: "Github",
                    url: "https://github.com"
                }
            };

            app.initializers.add('davis-socialprofile-forum', function () {

                app.store.models.socialbuttons = SocialButtons;

                extend(UserCard.prototype, 'infoItems', function (items) {
                    var user = this.props.user;
                    //console.log(user.data.id);
                    for (var k in socialaccs) {
                        if (socialaccs.hasOwnProperty(k)) {
                            (function () {
                                var curaccount = socialaccs[k];
                                items.add(curaccount["icon"] + ' social-button', Badge.component({
                                    type: "social",
                                    icon: curaccount["icon"],
                                    label: curaccount["label"],
                                    onclick: function onclick() {
                                        window.open(curaccount["url"], '_blank');
                                    }
                                }));
                            })();
                        }
                    }
                    var settingsclass;
                    var settingsicon;
                    var settingslabel;
                    if (typeof socialaccs !== 'undefined') {
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
                });
            });
        }
    };
});