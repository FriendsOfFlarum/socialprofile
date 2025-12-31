import Form from 'flarum/common/components/Form';
import app from 'flarum/forum/app';
import FormModal, { IFormModalAttrs } from 'flarum/common/components/FormModal';
import Button from 'flarum/common/components/Button';
import Stream from 'flarum/common/utils/Stream';
import User from 'flarum/common/models/User';
import type Mithril from 'mithril';

import type { SocialButton } from '../extend';
import type { ButtonData } from './WebsiteInputComponent';

export interface DeleteButtonModalAttrs extends IFormModalAttrs {
  user: User;
  index: number;
}

export default class DeleteButtonModal extends FormModal<DeleteButtonModalAttrs> {
  private buttons: ButtonData[] = [];
  private index!: number;
  private button!: SocialButton;

  oninit(vnode: Mithril.Vnode<DeleteButtonModalAttrs>) {
    super.oninit(vnode);

    this.buttons = [];
    this.index = this.attrs.index;
    const buttons = this.attrs.user.socialButtons();
    this.button = buttons[this.index];

    buttons.forEach((button, index) => {
      this.createButtonObject(index, button);
    });
  }

  className(): string {
    return 'SocialButtonsModal Modal--small';
  }

  title(): Mithril.Children {
    return app.translator.trans('fof-socialprofile.forum.edit.deletetitle');
  }

  content(): Mithril.Children {
    return (
      <div className="Modal-body">
        <Form>
          <h3 className="SocialProfile-title">{this.button.title}</h3>
          <p className="SocialProfile-url">{this.button.url}</p>
          <div className="Form-group" id="submit-button-group">
            {Button.component(
              {
                type: 'submit',
                className: 'Button Button--primary EditSocialButtons-delete',
                loading: this.loading,
              },
              app.translator.trans('fof-socialprofile.forum.edit.delete')
            )}
          </div>
        </Form>
      </div>
    );
  }

  data(): { socialButtons: string } {
    const buttons: (SocialButton | undefined)[] = [];

    this.buttons.forEach((button, index) => {
      if (button.title() !== '') {
        buttons[index] = {
          title: button.title(),
          url: button.url(),
          icon: button.icon(),
        };
      }
    });

    return {
      socialButtons: JSON.stringify(buttons.filter(Boolean)),
    };
  }

  onsubmit(e: Event): void {
    e.preventDefault();

    this.loading = true;
    this.buttons.splice(this.index, 1);

    this.attrs.user
      .save(this.data(), { errorHandler: this.onerror.bind(this) })
      .then(this.hide.bind(this))
      .then(() => {
        $('#app').trigger('refreshSocialButtons', [this.data().socialButtons]);
      })
      .catch(() => {
        this.loading = false;
        m.redraw();
      });
  }

  createButtonObject(key: number, button: SocialButton | null = null): void {
    if (button == null) {
      this.buttons[key] = {
        index: Stream(key),
        favicon: Stream('none'),
        title: Stream(''),
        url: Stream(''),
        icon: Stream('fas fa-globe'),
      };
    } else {
      this.buttons[key] = {
        index: Stream(key),
        favicon: Stream(button.icon?.startsWith('favicon') ? 'external' : 'none'),
        title: Stream(button.title),
        url: Stream(button.url),
        icon: Stream(button.icon),
      };
    }
  }
}
