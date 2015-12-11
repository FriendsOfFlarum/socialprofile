System.register('davis/socialprofile/components/SocialButtonsModal', ['flarum/components/Modal', 'flarum/components/Button'], function (_export) {
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
});;
System.register('davis/socialprofile/main', ['flarum/app', 'flarum/extend', 'flarum/components/UserCard', 'flarum/components/Badge', 'davis/socialprofile/components/SocialButtonsModal'], function (_export) {
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
        }, function (_davisSocialprofileComponentsSocialButtonsModal) {
            SocialButtonsModal = _davisSocialprofileComponentsSocialButtonsModal['default'];
        }],
        execute: function () {
            alert();
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
});