import Component from 'flarum/Component';
import withAttr from 'flarum/utils/withAttr';
import IconSelectorComponent from './IconSelectorComponent';

export default class WebsiteInputComponent extends Component {
    oninit(vnode) {
        super.oninit(vnode);

        this.button = this.attrs.button;
    }

    view() {
        return (
            <div className="Form-group form-group-social" id={`socialgroup-${this.button.index()}`}>
                <input
                    type="text"
                    className="SocialFormControl SocialTitle"
                    placeholder={app.translator.trans('fof-socialprofile.forum.edit.title')}
                    tabIndex={(this.button.index() + 1) * 2 - 1}
                    bidi={this.button.title}
                />

                {IconSelectorComponent.component({
                    selection: this.button.icon,
                    favicon: this.button.favicon,
                    index: this.button.index,
                })}

                <input
                    type="text"
                    className="SocialFormControl Socialurl"
                    placeholder={app.translator.trans('fof-socialprofile.forum.edit.url')}
                    tabIndex={(this.button.index() + 1) * 2}
                    value={this.button.url()}
                    onchange={withAttr('value', this.onUrlChange.bind(this))}
                />

                <input type="hidden" className="SocialFormControl SocialIcon" id={`icon${this.button.index()}`} bidi={this.button.icon} />

                <input type="hidden" className="SocialFormControl Socialfavicon" id={`icon${this.button.index()}`} bidi={this.button.favicon} />
            </div>
        );
    }

    onUrlChange(value) {
        this.button.url(value);

        clearTimeout(this.waittilfinsihed);

        if (this.button.icon() !== 'fas fa-circle-notch fa-spin') {
            this.button.icon('fas fa-circle-notch fa-spin');
            this.button.favicon('none');
        }

        this.waittilfinsihed = setTimeout(() => {
            const urlpattern = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;

            if (urlpattern.test(this.button.url().toLowerCase())) {
                const iconurl = `${this.button.url().replace(/(:\/\/[^\/]+).*$/, '$1')}/favicon.ico`;
                this.button.favicon(iconurl);
                this.button.icon('favicon');
                m.redraw();
            } else {
                this.button.icon('fas fa-fa-globe');
                this.button.favicon('none');
                m.redraw();
            }
        }, 1000);
    }
}
