import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import UserCard from 'flarum/forum/components/UserCard';
import Badge from 'flarum/common/components/Badge';
import ItemList from 'flarum/common/utils/ItemList';
import classList from 'flarum/common/utils/classList';
import Mithril from 'mithril';

import SocialButtonsModal from '../components/SocialButtonsModal';
import getFaviconUrl from '../helpers/getFaviconUrl';
import type { SocialButton } from '../extend';

export default function extendUserCard() {
  extend(UserCard.prototype, 'infoItems', function (this: UserCard, items: ItemList<Mithril.Children>) {
    const user = this.attrs.user;

    if (!user.canViewSocialProfile()) {
      return;
    }

    const canEdit: boolean = user.canEditSocialProfile();
    const buttons: SocialButton[] = user.socialButtons();

    const buttonList = new ItemList<Mithril.Children>();

    if (buttons.length) {
      buttons.forEach((button, index) => {
        if (button && button.title && button.icon && button.url) {
          let buttonStyle: Partial<CSSStyleDeclaration> = {};
          let buttonClassName = classList({
            [`social-button ${button.icon}-${index} social-icon-${index}`]: true,
            'social-greyscale-button': button.icon === 'favicon-grey',
          });

          if (button.icon === 'favicon' || button.icon === 'favicon-grey') {
            if (app.forum.attribute<boolean>('fof-socialprofile.allow_external_favicons')) {
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
                className: classList({ [buttonClassName]: true }),
                type: `social`,
                icon: button.icon,
                label: button.title,
                style: buttonStyle,
              })}
            </a>
          );
        }
      });

      if (canEdit) {
        buttonList.add(
          'settings social-button',
          Badge.component({
            type: 'social social-settings',
            icon: 'fas fa-cog',
            label: app.translator.trans('fof-socialprofile.forum.edit.edit'),
            onclick: () => {
              app.modal.show(SocialButtonsModal, { user });
            },
          }),
          -1
        );
      }
    } else if (canEdit) {
      buttonList.add(
        'settings social-button',
        Badge.component({
          type: 'social null-social-settings',
          icon: 'fas fa-plus',
          label: app.translator.trans('fof-socialprofile.forum.edit.add'),
          onclick: () => {
            app.modal.show(SocialButtonsModal, { user });
          },
        }),
        -1
      );
    }

    if (buttonList.toArray().length > 0) {
      items.add('fofsocialprofile', buttonList.toArray(), 20);
    }
  });
}
