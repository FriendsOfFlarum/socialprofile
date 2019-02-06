import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';

export default class DeleteButtonModal extends Modal {
    init() {
        super.init();

        this.buttons = [];
        this.index = this.props.index;
        const buttons = this.props.user.socialButtons();
        this.button = buttons[this.index];

        buttons.forEach((button, index) => {
            this.createButtonObject(index, button);
        });
    }

    className() {
        return 'SocialButtonsModal Modal--small';
    }

    title() {
        return app.translator.trans('fof-socialprofile.forum.edit.deletetitle');
    }

    content() {
        return (
            <div className="Modal-body">
                <div className="Form">
                    <h3 className="SocialProfile-title">{this.button.title}</h3>
                    <p className="SocialProfile-url">{this.button.url}</p>

                    <div className="Form-group" id="submit-button-group">
                        {Button.component({
                            type: 'submit',
                            className: 'Button Button--primary EditSocialButtons-delete',
                            loading: this.loading,
                            children: app.translator.trans('fof-socialprofile.forum.edit.delete'),
                        })}
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
        this.buttons.splice(this.index, 1);

        this.props.user
            .save(this.data(), { errorHandler: this.onerror.bind(this) })
            .then(this.hide.bind(this))
            .then($('#app').trigger('refreshSocialButtons', [this.data().socialButtons]))
            .catch(() => {
                this.loading = false;
                m.redraw();
            });
    }

    createButtonObject(key, button = null) {
        if (button == null) {
            this.buttons[key] = {};
            this.buttons[key].index = m.prop(key);
            this.buttons[key].favicon = m.prop('none');
            this.buttons[key].title = m.prop('');
            this.buttons[key].url = m.prop('');
            this.buttons[key].icon = m.prop('globe');
        } else {
            this.buttons[key] = {};
            this.buttons[key].index = m.prop(key);
            this.buttons[key].favicon = m.prop(button.favicon);
            this.buttons[key].title = m.prop(button.title);
            this.buttons[key].url = m.prop(button.url);
            this.buttons[key].icon = m.prop(button.icon);
        }
    }
}
