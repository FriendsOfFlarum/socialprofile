import Dropdown from 'flarum/components/Dropdown';
import ItemList from 'flarum/utils/ItemList';
import icon from 'flarum/helpers/icon';
import classList from 'flarum/utils/classList';

export default class IconSelectorComponent extends Dropdown {
    static initAttrs(attrs) {
        super.initAttrs(attrs);

        attrs.className = 'icondropdown';
        attrs.buttonClassName = 'Button Button--icon';
        attrs.menuClassName = 'social-dropdown-menu';
    }

    oninit(vnode) {
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

    view(vnode) {
        vnode.children = this.items().toArray();

        return super.view(vnode);
    }

    getButtonContent() {
        return [
            /^favicon(-\w+)?$/.test(this.attrs.selection())
                ? [
                      <img
                          className={classList({
                              'icondropdown-activeIcon': true,
                              'social-greyscale-button': this.attrs.selection() === 'favicon-grey',
                              'social-button': !this.attrs.selection() === 'favicon-grey',
                          })}
                          alt=""
                          src={this.attrs.favicon()}
                          onerror={() => {
                              this.attrs.favicon('none');
                              this.select(this.icons.social[0]);
                          }}
                      />,
                  ]
                : icon(this.attrs.selection(), { className: 'icondropdown-activeIcon fa-fw' }),
            this.attrs.caretIcon ? icon(this.attrs.caretIcon, { className: 'Button-caret' }) : '',
        ];
    }

    items() {
        const items = new ItemList();

        if (this.attrs.favicon() !== 'none') {
            items.add(
                'favicon',
                <div
                    onclick={() => this.select('favicon')}
                    role="button"
                    className={classList({
                        'iconpicker-item': true,
                        'iconpicker--highlighted': this.attrs.selection() === 'favicon',
                    })}
                    title="Favicon"
                >
                    <img
                        className={`iconpicker-image-${this.attrs.index()}`}
                        alt="favicon"
                        style={{ width: '14px', height: '14px', margin: '0 2px 0 2px' }}
                        src={this.attrs.favicon()}
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
                        'iconpicker-item iconpicker-item--invt': true,
                        'iconpicker--highlighted': this.attrs.selection() === 'favicon-grey',
                    })}
                    title="Grey Favicon"
                >
                    <img
                        className={`social-greyscale-button iconpicker-image-${this.attrs.index()}`}
                        alt="favicon"
                        style={{ width: '14px', height: '14px', margin: '0 2px 0 2px' }}
                        src={this.attrs.favicon()}
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
                    className={classList({ 'iconpicker-item': true, 'iconpicker--highlighted': this.attrs.selection() === curIcon })}
                    role="button"
                    title={`.${curIcon}`}
                >
                    {icon(curIcon, { className: 'social-icon fa-fw' })}
                </div>,
                100
            );
        });

        return items;
    }

    select(icon) {
        this.attrs.selection(icon);
    }
}
