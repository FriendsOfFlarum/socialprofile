import Model from 'flarum/Model';
import User from 'flarum/models/User';
import { extend } from 'flarum/extend';
import UserCard from 'flarum/components/UserCard';
import Badge from 'flarum/components/Badge';

import SocialButtonsModal from './components/SocialButtonsModal';
import DeleteButtonModal from './components/DeleteButtonModal';

app.initializers.add('fof/socialprofile', () => {
    User.prototype.socialButtons = Model.attribute('socialButtons', str => JSON.parse(str || '[]'));

    // extend(UserCard.prototype, 'init', function () {
    //     $('#app').on('refreshSocialButtons', (e, buttons) => {
    //         this.buttons = JSON.parse(buttons || '[]');
    //         this.props.user.socialButtons(this.buttons);
    //         this.props.user.freshness = new Date();
    //         m.redraw();
    //     });
    // });

    extend(UserCard.prototype, 'infoItems', function(items) {
        this.isSelf = app.session.user === this.props.user;
        this.canEdit = app.session.user ? app.session.user.data.attributes.canEdit : false;
        this.buttons = this.props.user.socialButtons();

        if (this.buttons.length) {
            this.buttons.forEach((button, index) => {
                if (button.title !== '' && button.icon !== '' && button.url !== '') {
                    let buttonStyle = '';
                    let buttonClassName = '';

                    if (button.icon === 'favicon' || button.icon === 'favicon-grey') {
                        buttonStyle = `background-image: url("${
                            button.favicon
                        }");background-size: 60%;background-position: 50% 50%;background-repeat: no-repeat;`;
                        if (button.icon === 'favicon-grey') {
                            buttonClassName = `${button.icon}-${index} social-button social-greyscale-button`;
                        } else {
                            buttonClassName = `${button.icon}-${index} social-button`;
                        }
                    } else {
                        buttonStyle = '';
                        buttonClassName = `${button.icon}-${index} social-button`;
                    }
                    items.add(
                        `${buttonClassName}${this.deleting ? ' social-button--highlightable' : ''}`,
                        Badge.component({
                            type: `social social-icon-${index}`,
                            icon: button.icon,
                            label: button.title,
                            style: buttonStyle,
                            onclick: () => {
                                if (this.deleting) {
                                    app.modal.show(new DeleteButtonModal({ user: this.props.user, index }));
                                } else {
                                    window.open(button.url, '_blank');
                                }
                            },
                        })
                    );
                }
            });

            if (this.isSelf) {
                items.add(
                    'settings social-button',
                    Badge.component({
                        type: 'social social-settings',
                        icon: 'fas fa-cog',
                        label: app.translator.trans('fof-socialprofile.forum.edit.edit'),
                        onclick: () => {
                            app.modal.show(new SocialButtonsModal({ user: this.props.user }));
                        },
                    }),
                    -1
                );
            } else if (this.canEdit) {
                items.add(
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
            items.add(
                'settings social-button',
                Badge.component({
                    type: 'social null-social-settings',
                    icon: 'fas fa-plus',
                    label: app.translator.trans('fof-socialprofile.forum.edit.add'),
                    onclick: () => {
                        app.modal.show(new SocialButtonsModal({ user: this.props.user }));
                    },
                }),
                -1
            );
        }
    });
});
