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
  
  view() {
    this.props.children = this.items().toArray();

    return super.view();
  }

  getButtonContent() {
    return [
      this.props.selection() ? icon(this.props.selection().replace('fa-', ''), {}) : '',
      this.props.caretIcon ? icon(this.props.caretIcon, {className: 'Button-caret'}) : ''
    ];
  }
  
  items() {
    const items = new ItemList();
    
    var icons = {
      'social':
        ["fa-globe", 'fa-amazon', 'fa-angellist', 'fa-apple', 'fa-behance', 'fa-bitbucket', 'fa-codepen', 'fa-connectdevelop', 'fa-dashcube', 'fa-delicious', 'fa-deviantart', 'fa-digg', 'fa-dribbble', 'fa-dropbox', 'fa-drupal', 'fa-facebook', 'fa-flickr', 'fa-foursquare', 'fa-get-pocket', 'fa-git', 'fa-github', 'fa-github-alt', 'fa-gittip', 'fa-google', 'fa-google-plus', 'fa-google-wallet', 'fa-gratipay', 'fa-hacker-news', 'fa-instagram', 'fa-ioxhost', 'fa-joomla', 'fa-jsfiddle', 'fa-lastfm', 'fa-leanpub', 'fa-linkedin', 'fa-meanpath', 'fa-medium', 'fa-odnoklassniki', 'fa-opencart', 'fa-pagelines', 'fa-paypal', 'fa-pied-piper-alt', 'fa-pinterest-p', 'fa-qq', 'fa-reddit', 'fa-renren', 'fa-sellsy', 'fa-share-alt', 'fa-shirtsinbulk', 'fa-simplybuilt', 'fa-skyatlas', 'fa-skype', 'fa-slack', 'fa-slideshare', 'fa-soundcloud', 'fa-spotify', 'fa-stack-exchange', 'fa-stack-overflow', 'fa-steam', 'fa-stumbleupon', 'fa-tencent-weibo', 'fa-trello', 'fa-tripadvisor', 'fa-tumblr', 'fa-twitch', 'fa-twitter', 'fa-viacoin', 'fa-vimeo', 'fa-vine', 'fa-vk', 'fa-wechat', 'fa-weibo', 'fa-weixin', 'fa-whatsapp', 'fa-wordpress', 'fa-xing', 'fa-y-combinator', 'fa-yelp', 'fa-youtube-play' ],
    };
    
    for(const k in icons['social']) {
      var highlighted = m.prop();
      if (this.props.selection() == icons['social'][k]) { highlighted('iconpicker--highlighted'); }
      items.add(icons['social'][k],(
        m('div', {onclick: () => {this.props.selection(icons['social'][k]); m.redraw();}, role: "button", href: "#", class: "iconpicker-item " + highlighted(), title: '.'+icons['social'][k]}, [icon(icons['social'][k].replace('fa-', ''), {className: 'social-icon'})])),
        100
      );
    }
    return items;
  }
}