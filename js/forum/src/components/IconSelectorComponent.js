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
      'social':
        ["fa-globe", 'fa-amazon', 'fa-angellist', 'fa-apple', 'fa-behance', 'fa-bitbucket', 'fa-codepen', 'fa-connectdevelop', 'fa-dashcube', 'fa-delicious', 'fa-deviantart', 'fa-digg', 'fa-dribbble', 'fa-dropbox', 'fa-drupal', 'fa-facebook', 'fa-flickr', 'fa-foursquare', 'fa-get-pocket', 'fa-git', 'fa-github', 'fa-github-alt', 'fa-gittip', 'fa-google', 'fa-google-plus', 'fa-google-wallet', 'fa-gratipay', 'fa-hacker-news', 'fa-instagram', 'fa-ioxhost', 'fa-joomla', 'fa-jsfiddle', 'fa-lastfm', 'fa-leanpub', 'fa-linkedin', 'fa-meanpath', 'fa-medium', 'fa-odnoklassniki', 'fa-opencart', 'fa-pagelines', 'fa-paypal', 'fa-pied-piper-alt', 'fa-pinterest-p', 'fa-qq', 'fa-reddit', 'fa-renren', 'fa-sellsy', 'fa-share-alt', 'fa-shirtsinbulk', 'fa-simplybuilt', 'fa-skyatlas', 'fa-skype', 'fa-slack', 'fa-slideshare', 'fa-soundcloud', 'fa-spotify', 'fa-stack-exchange', 'fa-stack-overflow', 'fa-steam', 'fa-stumbleupon', 'fa-tencent-weibo', 'fa-trello', 'fa-tripadvisor', 'fa-tumblr', 'fa-twitch', 'fa-twitter', 'fa-viacoin', 'fa-vimeo', 'fa-vine', 'fa-vk', 'fa-wechat', 'fa-weibo', 'fa-weixin', 'fa-whatsapp', 'fa-wordpress', 'fa-xing', 'fa-y-combinator', 'fa-yelp', 'fa-youtube-play' ],
    };
  }

  view() {
    
    $(".iconpicker-image-"+this.props.index()).error(() => {
      this.props.favicon('none');
      this.props.selection(this.icons['social'][0]);
      m.redraw();
    });
    
    this.props.children = this.items().toArray();

    return super.view();
  }

  getButtonContent() {
    return [
      (/^favicon(-\w+)?$/.test(this.props.selection())) ? [<img class={this.props.selection() == 'favicon-grey' ? 'social-greyscale-button' : 'social-button'} style="width: 14px;height: 14px;" src={this.props.favicon()}></img>] : icon(this.props.selection().replace('fa-', ''), {}),
      this.props.caretIcon ? icon(this.props.caretIcon, {className: 'Button-caret'}) : ''
    ];
  }
  
  items() {
    const items = new ItemList();
    
    if(this.props.favicon() != 'none') {
      items.add('favicon',(
        m('div', {onclick: () => {this.props.selection('favicon'); m.redraw();}, role: "button", href: "#", class: "iconpicker-item "+(this.props.selection() == 'favicon' ? "iconpicker--highlighted" : ""), title: 'Favicon'}, [<img class= {"iconpicker-image-" + this.props.index()} style="width: 14px;height: 14px;margin: 0 2px 0 2px;" src={this.props.favicon()}></img>])),
        102
      );
      items.add('favicon-grey',(
        m('div', {onclick: () => {this.props.selection('favicon-grey'); m.redraw();}, role: "button", href: "#", class: "iconpicker-item-invt "+(this.props.selection() == 'favicon-grey' ? "iconpicker--highlighted" : ""), title: 'Grey Favicon'}, [<img class= {"social-greyscale-button iconpicker-image-" + this.props.index()} style="width: 14px;height: 14px;margin: 0 2px 0 2px;" src={this.props.favicon()}></img>])),
        101
      );
    }
    
    for(const k in this.icons['social']) {
      var highlighted = m.prop();
      if (this.props.selection() == this.icons['social'][k]) { highlighted('iconpicker--highlighted'); }
      items.add(this.icons['social'][k],(
        m('div', {onclick: () => {this.props.selection(this.icons['social'][k]); m.redraw();}, role: "button", href: "#", class: "iconpicker-item " + highlighted(), title: '.'+this.icons['social'][k]}, [icon(this.icons['social'][k].replace('fa-', ''), {className: 'social-icon'})])),
        100
      );
    }
    return items;
  }
}