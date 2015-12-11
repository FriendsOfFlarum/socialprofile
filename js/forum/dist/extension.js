System.register('connor0095/socialprofile/main', ['flarum/app', 'flarum/extend', 'flarum/components/UserCard', 'flarum/components/Badge', 'connor0095/socialprofile/components/SocialButtonsModal'], function (_export) {
    'use strict';

    var app, extend, UserCard, Badge, SocialButtonsModal, socialaccs;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp['default'];
        }, function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumComponentsUserCard) {
            UserCard = _flarumComponentsUserCard['default'];
        }, function (_flarumComponentsBadge) {
            Badge = _flarumComponentsBadge['default'];
        }, function (_connor0095SocialprofileComponentsSocialButtonsModal) {
            SocialButtonsModal = _connor0095SocialprofileComponentsSocialButtonsModal['default'];
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

            app.initializers.add('connor0095-socialprofile', function () {
                extend(UserCard.prototype, 'infoItems', function (items) {

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
                    if (app.session.user === app.current.user) {
                        items.add('settings' + ' social-button', Badge.component({
                            type: "social social-settings",
                            icon: "cog",
                            label: "Settings",
                            onclick: function onclick() {
                                app.modal.show(new SocialButtonsModal());
                            }
                        }), -1);
                    }
                });
            });
        }
    };
});;
System.register('connor0095/socialprofile/components/SocialButtonsSettingsModal', ['flarum/components/SettingsModal'], function (_export) {
  'use strict';

  var Modal, SocialButtonsSettingsModal;
  return {
    setters: [function (_flarumComponentsSettingsModal) {
      Modal = _flarumComponentsSettingsModal['default'];
    }],
    execute: function () {
      SocialButtonsSettingsModal = (function (_Modal) {
        babelHelpers.inherits(SocialButtonsSettingsModal, _Modal);

        function SocialButtonsSettingsModal() {
          babelHelpers.classCallCheck(this, SocialButtonsSettingsModal);
          babelHelpers.get(Object.getPrototypeOf(SocialButtonsSettingsModal.prototype), 'constructor', this).apply(this, arguments);
        }

        babelHelpers.createClass(SocialButtonsSettingsModal, [{
          key: 'className',
          value: function className() {
            return 'SocialButtonsSettingsModal Modal--small';
          }
        }, {
          key: 'title',
          value: function title() {
            return 'Social Buttons Settings';
          }
        }, {
          key: 'form',
          value: function form() {
            return [m(
              'div',
              { className: 'Form-group' },
              m(
                'label',
                null,
                'Imgur Client ID'
              ),
              m('input', { className: 'FormControl', bidi: this.setting('matpompili.imgur-upload.clientID') })
            )];
          }
        }]);
        return SocialButtonsSettingsModal;
      })(Modal);

      _export('default', SocialButtonsSettingsModal);
    }
  };
});;
System.register('connor0095/socialprofile/components/SocialButtonsModal', ['flarum/components/Modal', 'flarum/components/Button'], function (_export) {
  'use strict';

  var Modal, Button, SocialButtonsModal;
  return {
    setters: [function (_flarumComponentsModal) {
      Modal = _flarumComponentsModal['default'];
    }, function (_flarumComponentsButton) {
      Button = _flarumComponentsButton['default'];
    }],
    execute: function () {
      SocialButtonsModal = (function (_Modal) {
        babelHelpers.inherits(SocialButtonsModal, _Modal);

        function SocialButtonsModal() {
          babelHelpers.classCallCheck(this, SocialButtonsModal);
          babelHelpers.get(Object.getPrototypeOf(SocialButtonsModal.prototype), 'constructor', this).apply(this, arguments);
        }

        babelHelpers.createClass(SocialButtonsModal, [{
          key: 'form',
          value: function form() {
            return [m(
              'div',
              { className: 'Form-group' },
              m(
                'label',
                null,
                'Twitter Url'
              ),
              m('input', { className: 'FormControl' }),
              m(
                'label',
                null,
                'Facebook Url'
              ),
              m('input', { className: 'FormControl' }),
              m(
                'label',
                null,
                'Github Url'
              ),
              m('input', { className: 'FormControl' })
            )];
          }
        }, {
          key: 'isDismissible',
          value: function isDismissible() {
            return true;
          }
        }, {
          key: 'content',
          value: function content() {
            return [m(
              'div',
              { className: 'Modal-body' },
              m(
                'div',
                { className: 'Form' },
                this.form(),
                m(
                  'div',
                  { className: 'Form-group' },
                  this.submitButton()
                )
              )
            )];
          }
        }, {
          key: 'submitButton',
          value: function submitButton() {
            return m(
              Button,
              {
                type: 'submit',
                className: 'Button Button--primary',
                loading: this.loading,
                disabled: !this.changed() },
              'Save Changes'
            );
          }
        }, {
          key: 'changed',
          value: function changed() {
            return 1;
          }
        }, {
          key: 'className',
          value: function className() {
            return 'SocialButtonsModal';
          }
        }, {
          key: 'title',
          value: function title() {
            return 'Social Buttons Settings';
          }
        }, {
          key: 'onsubmit',
          value: function onsubmit() {
            this.test = "test";
            alert(this.test);
          }
        }]);
        return SocialButtonsModal;
      })(Modal);

      _export('default', SocialButtonsModal);
    }
  };
});