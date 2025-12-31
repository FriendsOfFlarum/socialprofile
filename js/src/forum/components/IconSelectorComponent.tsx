import Dropdown, { IDropdownAttrs } from 'flarum/common/components/Dropdown';
import ItemList from 'flarum/common/utils/ItemList';
import Icon from 'flarum/common/components/Icon';
import classList from 'flarum/common/utils/classList';
import Stream from 'flarum/common/utils/Stream';
import Mithril from 'mithril';

import getFaviconUrl from '../helpers/getFaviconUrl';

export interface IconSelectorAttrs extends IDropdownAttrs {
  selection: Stream<string>;
  favicon: Stream<string>;
  url: Stream<string>;
  index: Stream<number>;
  allowsExternal: boolean;
}

export default class IconSelectorComponent extends Dropdown<IconSelectorAttrs> {
  private icons!: { social: string[] };
  private faviconUrl: string | null = null;

  static initAttrs(attrs: IconSelectorAttrs) {
    super.initAttrs(attrs);

    (attrs as any).className = 'icondropdown';
    attrs.buttonClassName = 'Button Button--icon';
    attrs.menuClassName = 'social-dropdown-menu';
  }

  oninit(vnode: Mithril.Vnode<IconSelectorAttrs>) {
    super.oninit(vnode);

    this.icons = {
      social: [
        'fas fa-envelope',
        'fas fa-globe',
        'fab fa-amazon',
        'fab fa-angellist',
        'fab fa-apple',
        'fab fa-behance',
        'fab fa-bitbucket',
        'fab fa-codepen',
        'fab fa-connectdevelop',
        'fab fa-dashcube',
        'fab fa-delicious',
        'fab fa-deviantart',
        'fab fa-digg',
        'fab fa-discord',
        'fab fa-dribbble',
        'fab fa-dropbox',
        'fab fa-drupal',
        'fab fa-facebook',
        'fab fa-flickr',
        'fab fa-foursquare',
        'fab fa-get-pocket',
        'fab fa-git',
        'fab fa-github',
        'fab fa-github-alt',
        'fab fa-google',
        'fab fa-google-plus',
        'fab fa-google-wallet',
        'fab fa-hacker-news',
        'fab fa-instagram',
        'fab fa-ioxhost',
        'fab fa-joomla',
        'fab fa-jsfiddle',
        'fab fa-lastfm',
        'fab fa-leanpub',
        'fab fa-linkedin',
        'fab fa-mastodon',
        'fab fa-medium',
        'fab fa-odnoklassniki',
        'fab fa-opencart',
        'fab fa-pagelines',
        'fab fa-paypal',
        'fab fa-pied-piper-alt',
        'fab fa-pinterest-p',
        'fab fa-playstation',
        'fab fa-qq',
        'fab fa-reddit',
        'fab fa-renren',
        'fab fa-sellsy',
        'fas fa-share-alt',
        'fab fa-shirtsinbulk',
        'fab fa-simplybuilt',
        'fab fa-skyatlas',
        'fab fa-skype',
        'fab fa-slack',
        'fab fa-slideshare',
        'fab fa-soundcloud',
        'fab fa-spotify',
        'fab fa-stack-exchange',
        'fab fa-stack-overflow',
        'fab fa-steam',
        'fab fa-stumbleupon',
        'fab fa-telegram',
        'fab fa-tencent-weibo',
        'fab fa-trello',
        'fab fa-tripadvisor',
        'fab fa-tumblr',
        'fab fa-twitch',
        'fab fa-twitter',
        'fab fa-viacoin',
        'fab fa-vimeo',
        'fab fa-vine',
        'fab fa-vk',
        'fab fa-weibo',
        'fab fa-weixin',
        'fab fa-whatsapp',
        'fab fa-wordpress',
        'fab fa-xbox',
        'fab fa-xing',
        'fab fa-y-combinator',
        'fab fa-yandex',
        'fab fa-yandex-international',
        'fab fa-yelp',
        'fab fa-youtube',
      ],
    };
  }

  view(vnode: Mithril.Vnode<IconSelectorAttrs>) {
    this.faviconUrl = getFaviconUrl(this.attrs.url());

    vnode.children = this.items().toArray() as any;

    return super.view(vnode);
  }

  getButtonContent() {
    const ic = (str: string) => <Icon name={str} className="icondropdown-activeIcon fa-fw" />;

    return [
      /^favicon(-\w+)?$/.test(this.attrs.selection())
        ? this.attrs.allowsExternal
          ? [
              <img
                className={classList({
                  'icondropdown-activeIcon': true,
                  'social-greyscale-button': this.attrs.selection() === 'favicon-grey',
                  'social-button': this.attrs.selection() !== 'favicon-grey',
                })}
                alt=""
                src={this.faviconUrl}
                onerror={() => {
                  this.attrs.favicon('none');
                  this.select(this.icons.social[0]);
                }}
              />,
            ]
          : ic('fas fa-globe')
        : ic(this.attrs.selection()),
      this.attrs.caretIcon ? <Icon name={this.attrs.caretIcon} className="Button-caret" /> : '',
    ];
  }

  items(): ItemList<Mithril.Children> {
    const items = new ItemList<Mithril.Children>();

    // Previously, favicon() would be the URL to the favicon or 'none'.
    // Now, it is either 'none' or 'external'.
    if (this.attrs.favicon() !== 'none' && this.attrs.allowsExternal) {
      items.add(
        'favicon',
        <div
          onclick={() => this.select('favicon')}
          role="button"
          className={classList({
            'iconpicker-item': true,
            'iconpicker-item--highlighted': this.attrs.selection() === 'favicon',
          })}
          title="Favicon"
        >
          <img
            className={`iconpicker-image-${this.attrs.index()}`}
            alt="favicon"
            style={{ width: '14px', height: '14px', margin: '0 2px 0 2px' }}
            src={this.faviconUrl}
          />
        </div>,
        102
      );

      items.add(
        'favicon-grey',
        <div
          onclick={() => this.select('favicon-grey')}
          role="button"
          className={classList({
            'iconpicker-item iconpicker-item--invertColors': true,
            'iconpicker-item--highlighted': this.attrs.selection() === 'favicon-grey',
          })}
          title="Grey Favicon"
        >
          <img
            className={`social-greyscale-button iconpicker-image-${this.attrs.index()}`}
            alt="favicon"
            style={{ width: '14px', height: '14px', margin: '0 2px 0 2px' }}
            src={this.faviconUrl}
          />
        </div>,
        101
      );
    }

    this.icons.social.forEach((curIcon) => {
      items.add(
        curIcon.replace(/ /, '-'),
        <div
          onclick={() => this.select(curIcon)}
          className={classList({ 'iconpicker-item': true, 'iconpicker-item--highlighted': this.attrs.selection() === curIcon })}
          role="button"
          title={`.${curIcon}`}
        >
          <Icon name={curIcon} className="social-icon fa-fw" />
        </div>,
        100
      );
    });

    return items;
  }

  select(icon: string): void {
    this.attrs.selection(icon);
  }
}
