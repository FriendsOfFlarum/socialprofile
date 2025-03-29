import app from 'flarum/forum/app';
import Model from 'flarum/common/Model';
import User from 'flarum/common/models/User';
import { extend } from 'flarum/common/extend';
import UserCard from 'flarum/forum/components/UserCard';
import Badge from 'flarum/common/components/Badge';
import ItemList from 'flarum/common/utils/ItemList';
import classList from 'flarum/common/utils/classList';

import SocialButtonsModal from './components/SocialButtonsModal';
import getFaviconUrl from './helpers/getFaviconUrl';

app.initializers.add('fof/socialprofile', () => {
  User.prototype.socialButtons = Model.attribute('socialButtons', (str) => JSON.parse(str || '[]'));
  User.prototype.canViewSocialProfile = Model.attribute('canViewSocialProfile');
  User.prototype.canEditSocialProfile = Model.attribute('canEditSocialProfile');

  extend(UserCard.prototype, 'infoItems', function (items) {
    const user = this.attrs.user;

    if (!user.canViewSocialProfile()) {
      return;
    }

    this.canEdit = user.canEditSocialProfile();
    this.buttons = this.attrs.user.socialButtons();

    const buttonList = new ItemList();

    if (this.buttons.length) {
      this.buttons.forEach((button, index) => {
        if (button && button.title && button.icon && button.url) {
          let buttonStyle = {};
          let buttonClassName = classList({
            [`social-button ${button.icon}-${index} social-icon-${index}`]: true,
            'social-greyscale-button': button.icon === 'favicon-grey',
          });

          if (button.icon === 'favicon' || button.icon === 'favicon-grey') {
            if (app.forum.attribute('fof-socialprofile.allow_external_favicons')) {
              buttonStyle = {
                backgroundImage: `url("${getFaviconUrl(button.url)}")`,
                backgroundSize: '60%',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              };
            } else {
              buttonClassName += ' fas fa-globe';
            }
          }

          buttonList.add(
            `social-icon-${index}`,
            <a href={button.url} target="_blank" rel="noreferrer noopener nofollow">
              {Badge.component({
                className: classList({ [buttonClassName]: true, 'social-icon--deleting': this.deleting }),
                type: `social`,
                icon: button.icon,
                label: button.title,
                style: buttonStyle,
              })}
            </a>
          );
        }
      });

      if (this.canEdit) {
        buttonList.add(
          'settings social-button',
          Badge.component({
            type: 'social social-settings',
            icon: 'fas fa-cog',
            label: app.translator.trans('fof-socialprofile.forum.edit.edit'),
            onclick: () => {
              app.modal.show(SocialButtonsModal, { user: this.attrs.user });
            },
          }),
          -1
        );
      }
    } else if (this.canEdit) {
      buttonList.add(
        'settings social-button',
        Badge.component({
          type: 'social null-social-settings',
          icon: 'fas fa-plus',
          label: app.translator.trans('fof-socialprofile.forum.edit.add'),
          onclick: () => {
            app.modal.show(SocialButtonsModal, { user: this.attrs.user });
          },
        }),
        -1
      );
    }

    if (buttonList.toArray().length > 0) {
      items.add('fofsocialprofile', buttonList.toArray(), 20);
    }
  });
});
