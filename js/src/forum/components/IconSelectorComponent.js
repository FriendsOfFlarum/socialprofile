import Dropdown from 'flarum/components/Dropdown';
import ItemList from 'flarum/utils/ItemList';
import icon from 'flarum/helpers/icon';

export default class IconSelectorComponent extends Dropdown {
    static initProps(props) {
        super.initProps(props);

        props.className = 'icondropdown';
        props.buttonClassName = 'Button Button--icon';
        props.menuClassName = 'social-dropdown-menu';
    }

    init() {
        super.init();

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
                'fab fa-xing',
                'fab fa-y-combinator',
                'fab fa-yelp',
                'fab fa-youtube',
            ],
        };
    }

    view() {
        this.props.children = this.items().toArray();

        return super.view();
    }

    getButtonContent() {
        return [
            /^favicon(-\w+)?$/.test(this.props.selection())
                ? [
                      <img
                          className={this.props.selection() === 'favicon-grey' ? 'social-greyscale-button' : 'social-button'}
                          style={{ width: '14px', height: '14px' }}
                          alt="favicon"
                          src={this.props.favicon()}
                          onerror={() => {
                              this.props.favicon('none');
                              this.select(this.icons.social[0]);
                          }}
                      />,
                  ]
                : icon(this.props.selection(), {}),
            this.props.caretIcon ? icon(this.props.caretIcon, { className: 'Button-caret' }) : '',
        ];
    }

    items() {
        const items = new ItemList();

        if (this.props.favicon() !== 'none') {
            items.add(
                'favicon',
                <div
                    onclick={() => this.select('favicon')}
                    role="button"
                    className={`iconpicker-item ${this.props.selection() === 'favicon' ? 'iconpicker--highlighted' : ''}`}
                    title="Favicon"
                >
                    <img
                        className={`iconpicker-image-${this.props.index()}`}
                        alt="favicon"
                        style={{ width: '14px', height: '14px', margin: '0 2px 0 2px' }}
                        src={this.props.favicon()}
                    />
                </div>,
                102
            );

            items.add(
                'favicon-grey',
                <div
                    onclick={() => this.select('favicon-grey')}
                    role="button"
                    className={`iconpicker-item-invt ${this.props.selection() === 'favicon-grey' ? 'iconpicker--highlighted' : ''}`}
                    title="Grey Favicon"
                >
                    <img
                        className={`social-greyscale-button iconpicker-image-${this.props.index()}`}
                        alt="favicon"
                        style={{ width: '14px', height: '14px', margin: '0 2px 0 2px' }}
                        src={this.props.favicon()}
                    />
                </div>,
                101
            );
        }

        this.icons.social.forEach(curIcon => {
            const highlighted = m.prop();

            if (this.props.selection() === curIcon) {
                highlighted('iconpicker--highlighted');
            }

            items.add(
                curIcon.replace(/ /, '-'),
                <div onclick={() => this.select(curIcon)} className={`iconpicker-item ${highlighted()}`} role="button" title={`.${curIcon}`}>
                    {icon(curIcon, { className: 'social-icon' })}
                </div>,
                100
            );
        });

        return items;
    }

    select(icon) {
        this.props.selection(icon);
    }
}
