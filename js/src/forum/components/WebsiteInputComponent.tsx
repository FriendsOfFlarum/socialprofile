import app from 'flarum/forum/app';
import Component, { ComponentAttrs } from 'flarum/common/Component';
import withAttr from 'flarum/common/utils/withAttr';
import Stream from 'flarum/common/utils/Stream';
import Mithril from 'mithril';

import extractUriHost from '../helpers/extractUriHost';
import isValidUrl from '../helpers/isValidUrl';
import IconSelectorComponent from './IconSelectorComponent';

export interface ButtonData {
  index: Stream<number>;
  favicon: Stream<string>;
  title: Stream<string>;
  url: Stream<string>;
  icon: Stream<string>;
}

export interface WebsiteInputAttrs extends ComponentAttrs {
  button: ButtonData;
}

export default class WebsiteInputComponent extends Component<WebsiteInputAttrs> {
  private button!: ButtonData;
  private allowsExternal!: boolean;
  private waitUntilFinished?: number;

  oninit(vnode: Mithril.Vnode<WebsiteInputAttrs>) {
    super.oninit(vnode);

    this.button = this.attrs.button;

    this.allowsExternal = app.forum.attribute<boolean>('fof-socialprofile.allow_external_favicons') || false;
  }

  view(vnode: Mithril.Vnode<WebsiteInputAttrs>) {
    return (
      <div className="Form-group form-group-social" id={`socialgroup-${this.button.index()}`}>
        <input
          type="text"
          className="FormControl SocialFormControl SocialFormControl-title"
          placeholder={app.translator.trans('fof-socialprofile.forum.edit.title')}
          tabIndex={(this.button.index() + 1) * 2 - 1}
          bidi={this.button.title}
        />

        {IconSelectorComponent.component({
          selection: this.button.icon,
          favicon: this.button.favicon,
          index: this.button.index,
          allowsExternal: this.allowsExternal,
          url: this.button.url,
        })}

        <input
          type="text"
          className="FormControl SocialFormControl SocialFormControl-url"
          placeholder={app.translator.trans('fof-socialprofile.forum.edit.url')}
          tabIndex={(this.button.index() + 1) * 2}
          value={this.button.url()}
          onchange={withAttr('value', this.onUrlChange.bind(this))}
        />

        <input
          type="hidden"
          className="FormControl SocialFormControl SocialFormControl-icon"
          id={`icon${this.button.index()}-icon`}
          bidi={this.button.icon}
        />

        <input
          type="hidden"
          className="SocialFormControl SocialFormControl-favicon"
          id={`icon${this.button.index()}-favicon`}
          bidi={this.button.favicon}
        />
      </div>
    );
  }

  onUrlChange(value: string): void {
    this.button.url(value);

    if (!this.allowsExternal) {
      return;
    }

    clearTimeout(this.waitUntilFinished);

    if (this.button.icon() !== 'fas fa-circle-notch fa-spin') {
      this.button.icon('fas fa-circle-notch fa-spin');
      this.button.favicon('none');
    }

    this.waitUntilFinished = setTimeout(() => {
      if (isValidUrl(this.button.url())) {
        this.button.icon('favicon');
        this.button.favicon('external');
      } else {
        this.button.icon('fas fa-globe');
        this.button.favicon('none');
      }

      m.redraw();
    }, 1000) as any;
  }
}
