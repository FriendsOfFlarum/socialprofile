import Model from 'flarum/common/Model';
import User from 'flarum/common/models/User';
import { extend } from 'flarum/common/extend';
import UserCard from 'flarum/forum/components/UserCard';
import Badge from 'flarum/common/components/Badge';
import ItemList from 'flarum/common/utils/ItemList';
import classList from 'flarum/common/utils/classList';

import SocialButtonsModal from './components/SocialButtonsModal';

app.initializers.add('fof/socialprofile', () => {
    User.prototype.socialButtons = Model.attribute('socialButtons', (str) => JSON.parse(str || '[]'));

    extend(UserCard.prototype, 'infoItems', function (items) {
        const user = this.attrs.user;

        if (!user.attribute('canViewSocialProfile')) {
            return;
        }

        this.canEdit = user.attribute('canEditSocialProfile');
        this.buttons = this.attrs.user.socialButtons();

        const buttonList = new ItemList();

        if (this.buttons.length) {
            this.buttons.forEach((button, index) => {
                if (button.title !== '' && button.icon !== '' && button.url !== '') {
                    let buttonStyle = '';
                    let buttonClassName = classList({
                        [`social-button ${button.icon}-${index} social-icon-${index}`]: true,
                        'social-greyscale-button': button.icon === 'favicon-grey',
                    });

                    if (button.icon === 'favicon' || button.icon === 'favicon-grey') {
                        buttonStyle = `
                            background-image: url("${button.favicon}");
                            background-size: 60%;
                            background-position: center;
                            background-repeat: no-repeat;
                        `;
                    }

                    buttonList.add(
                        `social-icon-${index}`,
                        Badge.component({
                            className: buttonClassName,
                            type: `social`,
                            icon: button.icon,
                            label: button.title,
                            style: buttonStyle,
                            onclick: () => {
                                window.open(button.url, '_blank');
                            },
                        })
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
            if (items.has('lastSeen')) {
                items.replace('lastSeen', items['lastSeen'], 50);
            }
            if (items.has('joined')) {
                items.replace('joined', items['joined'], 40);
            }

            items.add('fofsocialprofile', buttonList.toArray(), 20);
        }
    });
});
