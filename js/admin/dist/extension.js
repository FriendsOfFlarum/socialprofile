System.register('davis/socialprofile/components/SocialProfileSettingsModal', ['flarum/components/SettingsModal'], function (_export) {
  'use strict';

  var SettingsModal, SocialProfileSettingsModal;
  return {
    setters: [function (_flarumComponentsSettingsModal) {
      SettingsModal = _flarumComponentsSettingsModal['default'];
    }],
    execute: function () {
      SocialProfileSettingsModal = (function (_SettingsModal) {
        babelHelpers.inherits(SocialProfileSettingsModal, _SettingsModal);

        function SocialProfileSettingsModal() {
          babelHelpers.classCallCheck(this, SocialProfileSettingsModal);
          babelHelpers.get(Object.getPrototypeOf(SocialProfileSettingsModal.prototype), 'constructor', this).apply(this, arguments);
        }

        babelHelpers.createClass(SocialProfileSettingsModal, [{
          key: 'className',
          value: function className() {
            return 'SocialProfileSettingsModal Modal--small';
          }
        }, {
          key: 'title',
          value: function title() {
            return 'Social Profile Settings';
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
                'Limit Number of Websites'
              ),
              m('input', { className: 'FormControl', bidi: this.setting('davis.socialprofile.limit') })
            )];
          }
        }]);
        return SocialProfileSettingsModal;
      })(SettingsModal);

      _export('default', SocialProfileSettingsModal);
    }
  };
});;
System.register('davis/socialprofile/main', ['flarum/extend', 'flarum/app', 'davis/socialprofile/components/SocialProfileSettingsModal'], function (_export) {
  'use strict';

  var extend, app, SocialProfileSettingsModal;
  return {
    setters: [function (_flarumExtend) {
      extend = _flarumExtend.extend;
    }, function (_flarumApp) {
      app = _flarumApp['default'];
    }, function (_davisSocialprofileComponentsSocialProfileSettingsModal) {
      SocialProfileSettingsModal = _davisSocialprofileComponentsSocialProfileSettingsModal['default'];
    }],
    execute: function () {

      app.initializers.add('davis-socialprofile', function (app) {
        app.extensionSettings['davis-socialprofile'] = function () {
          return app.modal.show(new SocialProfileSettingsModal());
        };
      });
    }
  };
});