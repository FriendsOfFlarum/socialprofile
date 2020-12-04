import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';
import Stream from 'flarum/utils/Stream';
import WebsiteInputComponent from './WebsiteInputComponent';

export default class SocialButtonsModal extends Modal {
    oninit(vnode) {
        super.oninit(vnode);

        this.buttons = [];
        const buttons = this.attrs.user.socialButtons();

        if (buttons.length) {
            buttons.forEach((button, index) => {
                if (button.title !== '') {
                    this.createButtonObject(index, button);
                }
            });
        } else {
            this.createButtonObject(0);
        }
    }

    className() {
        return 'SocialButtonsModal Modal--small';
    }

    title() {
        return app.translator.trans('fof-socialprofile.forum.edit.headtitle');
    }

    content() {
        return (
            <div className="Modal-body">
                <div className="Form">
                    {this.buttons.map((button) => WebsiteInputComponent.component({ button }))}

                    <div className="Form-group" id="submit-button-group">
                        <div
                            className="Button Button--primary EditSocialButtons-add"
                            style="margin-left: 1%;"
                            onclick={this.addSocialButton.bind(this)}
                        >
                            <i className="fas fa-fw fa-plus" />
                        </div>

                        <div
                            className="Button Button--primary EditSocialButtons-del"
                            style="margin-left: 1%;"
                            onclick={this.delSocialButton.bind(this)}
                        >
                            <i className="fas fa-fw fa-minus" />
                        </div>

                        {Button.component(
                            {
                                type: 'submit',
                                style: 'float: right;',
                                className: 'Button Button--primary EditSocialButtons-save',
                                loading: this.loading,
                            },
                            app.translator.trans('fof-socialprofile.forum.edit.submit')
                        )}
                    </div>
                </div>
            </div>
        );
    }

    data() {
        const buttons = [];

        this.buttons.forEach((button, index) => {
            if (button.title() !== '') {
                buttons[index] = {};
                buttons[index].title = button.title();
                buttons[index].url = button.url();
                buttons[index].icon = button.icon();
                buttons[index].favicon = button.favicon();
            }
        });

        return {
            socialButtons: JSON.stringify(buttons),
        };
    }

    onsubmit(e) {
        e.preventDefault();

        this.loading = true;

        this.attrs.user
            .save(this.data(), { errorHandler: this.onerror.bind(this) })
            .then(this.hide.bind(this))
            .then($('#app').trigger('refreshSocialButtons', [this.data().socialButtons]))
            .catch(() => {
                this.loading = false;
                m.redraw();
            });
    }

    addSocialButton() {
        this.createButtonObject(this.buttons.length);

        m.redraw();

        $('document').ready(() => {
            $(`#socialgroup-${this.buttons.length - 1}`).slideDown();
        });
    }

    delSocialButton() {
        const curdel = this.buttons.length - 1;

        $(`#socialgroup-${curdel}`).slideUp('normal', () => {
            this.buttons.splice(curdel, 1);
            m.redraw();
        });
    }

    createButtonObject(key, button = null) {
        if (button == null) {
            this.buttons[key] = {};
            this.buttons[key].index = Stream(key);
            this.buttons[key].favicon = Stream('none');
            this.buttons[key].title = Stream('');
            this.buttons[key].url = Stream('');
            this.buttons[key].icon = Stream('fas fa-globe');
        } else {
            this.buttons[key] = {};
            this.buttons[key].index = Stream(key);
            this.buttons[key].favicon = Stream(button.favicon);
            this.buttons[key].title = Stream(button.title);
            this.buttons[key].url = Stream(button.url);
            this.buttons[key].icon = Stream(button.icon);
        }
    }
}
