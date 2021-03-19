import Model from 'flarum/common/Model';
import User from 'flarum/common/models/User';
import { extend } from 'flarum/common/extend';
import UserCard from 'flarum/forum/components/UserCard';
import Badge from 'flarum/common/components/Badge';
import ItemList from 'flarum/common/utils/ItemList';
import classList from 'flarum/common/utils/classList';

import SocialButtonsModal from './components/SocialButtonsModal';
import DeleteButtonModal from './components/DeleteButtonModal';

app.initializers.add('fof/socialprofile', () => {
    User.prototype.socialButtons = Model.attribute('socialButtons', (str) => JSON.parse(str || '[]'));

    extend(UserCard.prototype, 'infoItems', function (items) {
        this.isSelf = app.session.user === this.attrs.user;
        this.canEdit = app.session.user ? app.session.user.data.attributes.canEdit : false;
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
                            className: classList({ [buttonClassName]: true, 'social-icon--deleting': this.deleting }),
                            type: `social`,
                            icon: button.icon,
                            label: button.title,
                            style: buttonStyle,
                            onclick: () => {
                                if (this.deleting) {
                                    app.modal.show(DeleteButtonModal, {
                                        user: this.attrs.user,
                                        index,
                                    });
                                } else {
                                    window.open(button.url, '_blank');
                                }
                            },
                        })
                    );
                }
            });

            if (this.isSelf) {
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
            } else if (this.canEdit) {
                buttonList.add(
                    'settings social-button',
                    Badge.component({
                        type: `social social-moderate ${this.deleting ? 'social-moderate--highlighted' : ''}`,
                        icon: 'fas fa-exclamation-triangle',
                        label: app.translator.trans('fof-socialprofile.forum.edit.delete'),
                        onclick: () => {
                            this.deleting = !this.deleting;
                        },
                    }),
                    -1
                );
            }
        } else if (this.isSelf) {
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
