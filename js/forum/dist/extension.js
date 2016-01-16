System.register('davis/socialprofile/components/SocialButtonsModal', ['flarum/components/Modal', 'flarum/components/Button', 'flarum/utils/string', 'flarum/tags/helpers/tagLabel'], function (_export) {
  'use strict';

  var Modal, Button, slug, tagLabel, SocialButtonsModal;
  return {
    setters: [function (_flarumComponentsModal) {
      Modal = _flarumComponentsModal['default'];
    }, function (_flarumComponentsButton) {
      Button = _flarumComponentsButton['default'];
    }, function (_flarumUtilsString) {
      slug = _flarumUtilsString.slug;
    }, function (_flarumTagsHelpersTagLabel) {
      tagLabel = _flarumTagsHelpersTagLabel['default'];
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

            this.tag = this.props.tag || app.store.createRecord('tags');

            this.name = m.prop(this.tag.name() || '');
            this.slug = m.prop(this.tag.slug() || '');
            this.description = m.prop(this.tag.description() || '');
            this.color = m.prop(this.tag.color() || '');
            this.isHidden = m.prop(this.tag.isHidden() || false);
          }
        }, {
          key: 'className',
          value: function className() {
            return 'SocialButtonsModal Modal--small';
          }
        }, {
          key: 'title',
          value: function title() {
            return this.name() ? tagLabel({
              name: this.name,
              color: this.color
            }) : app.translator.trans('davis-socialprofile.forum.test');
          }
        }, {
          key: 'content',
          value: function content() {
            var _this = this;

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
                    app.translator.trans('davis-socialprofile.forum.test')
                  ),
                  m('input', { className: 'FormControl', placeholder: app.translator.trans('davis-socialprofile.forum.test'), value: this.name(), oninput: function (e) {
                      _this.name(e.target.value);
                      _this.slug(slug(e.target.value));
                    } })
                ),
                m(
                  'div',
                  { className: 'Form-group' },
                  Button.component({
                    type: 'submit',
                    className: 'Button Button--primary EditTagModal-save',
                    loading: this.loading,
                    children: app.translator.trans('davis-socialprofile.forum.test')
                  }),
                  this.tag.exists ? m(
                    'button',
                    { type: 'button', className: 'Button EditTagModal-delete', onclick: this['delete'].bind(this) },
                    app.translator.trans('davis-socialprofile.forum.test')
                  ) : ''
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

            var testData = this.name();
            var data = new FormData();
            data.append('buttons', testData);

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
        }, {
          key: 'delete',
          value: function _delete() {
            if (confirm(app.translator.trans('flarum-tags.admin.edit_tag.delete_tag_confirmation'))) {
              this.tag['delete']().then(function () {
                return m.redraw();
              });
              this.hide();
            }
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
                        settingslabel = app.translator.trans('davis-socialprofile.forum.edit');
                    } else {
                        settingsclass = 'null-social-settings';
                        settingsicon = 'plus';
                        settingslabel = app.translator.trans('davis-socialprofile.forum.add');
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