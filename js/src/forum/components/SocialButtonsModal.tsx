import Form from 'flarum/common/components/Form';
import app from 'flarum/forum/app';
import FormModal, { IFormModalAttrs } from 'flarum/common/components/FormModal';
import Button from 'flarum/common/components/Button';
import Stream from 'flarum/common/utils/Stream';
import User from 'flarum/common/models/User';
import type Mithril from 'mithril';

import WebsiteInputComponent, { ButtonData } from './WebsiteInputComponent';
import type { SocialButton } from '../extend';

export interface SocialButtonsModalAttrs extends IFormModalAttrs {
  user: User;
}

export default class SocialButtonsModal extends FormModal<SocialButtonsModalAttrs> {
  private buttons: ButtonData[] = [];

  oninit(vnode: Mithril.Vnode<SocialButtonsModalAttrs>) {
    super.oninit(vnode);

    this.buttons = [];
    const buttons = this.attrs.user.socialButtons();

    if (buttons.length) {
      buttons.forEach((button, index) => {
        if (button && button.title) {
          this.createButtonObject(index, button);
        }
      });
    } else {
      this.createButtonObject(0);
    }
  }

  className(): string {
    return 'SocialButtonsModal Modal--small';
  }

  title(): Mithril.Children {
    return app.translator.trans('fof-socialprofile.forum.edit.headtitle');
  }

  content(): Mithril.Children {
    const areAnyIconsBeingFetched = this.buttons.some((button) => button.icon() === 'fas fa-circle-notch fa-spin');

    return (
      <div className="Modal-body">
        <Form>
          {this.buttons.map((button) =>
            WebsiteInputComponent.component({
              button,
            })
          )}
          <div className="Form-group" id="submit-button-group">
            <div className="Button Button--primary EditSocialButtons-add" style="margin-left: 1%;" onclick={this.addSocialButton.bind(this)}>
              <i className="fas fa-fw fa-plus" />
            </div>
            <div className="Button Button--primary EditSocialButtons-del" style="margin-left: 1%;" onclick={this.delSocialButton.bind(this)}>
              <i className="fas fa-fw fa-minus" />
            </div>
            {Button.component(
              {
                type: 'submit',
                style: 'float: right;',
                className: 'Button Button--primary EditSocialButtons-save',
                loading: this.loading,
                disabled: areAnyIconsBeingFetched,
                title: areAnyIconsBeingFetched ? app.translator.trans('fof-socialprofile.forum.edit.save_disabled_fetching_favicons') : null,
              },
              app.translator.trans('fof-socialprofile.forum.edit.submit')
            )}
          </div>
        </Form>
      </div>
    );
  }

  data(): { socialButtons: string } {
    const buttons: SocialButton[] = [];

    this.buttons.forEach((button) => {
      if (button && button.title() && button.url()) {
        buttons.push({
          title: button.title(),
          url: button.url(),
          icon: button.icon(),
        });
      }
    });

    return {
      socialButtons: JSON.stringify(buttons),
    };
  }

  onsubmit(e: Event): void {
    e.preventDefault();

    this.loading = true;

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

  addSocialButton(): void {
    this.createButtonObject(this.buttons.length);

    m.redraw();

    $('document').ready(() => {
      $(`#socialgroup-${this.buttons.length - 1}`).slideDown();
    });
  }

  delSocialButton(): void {
    const curdel = this.buttons.length - 1;

    $(`#socialgroup-${curdel}`).slideUp('normal', () => {
      this.buttons.splice(curdel, 1);
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
