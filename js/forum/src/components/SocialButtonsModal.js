import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';
import { slug } from 'flarum/utils/string';
import WebsiteInputComponent from 'Davis/SocialProfile/components/WebsiteInputComponent';

export default class SocialButtonsModal extends Modal {
  init() {
    
    super.init();
    
    const userId = app.current.user.data.id;
    var apiUrl = app.forum.attribute('apiUrl') + '/profile/socialbutton/'+userId;
    this.buttonsArray = null;
      m.request({method: "GET", url: apiUrl}).then(result => {
        if(result.data.attributes.hasOwnProperty("buttons")) {
          if(result.data.attributes.buttons == "[]"){
            this.createButtonObject(0);
          } else {
            this.socialaccs = JSON.parse(result.data.attributes.buttons);
            this.buttons = [];
            for(var k in this.socialaccs) {
              if(this.socialaccs[k]['title'] != "") {
                const button = this.socialaccs[k];
                this.createButtonObject(k, button);
                this.numberofinputs = k;
              }
            }
          }
        } else {
            this.createButtonObject(0);
            this.numberofinputs = 0;
        }
        for(var k in this.buttons) {
          if (this.buttons[k].favicon() != 'none') {
            this.buttons[k].color('transparent');
          }
          var urlpattern = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
          if(urlpattern.test(this.buttons[k].url().toLowerCase())) {
            var iconurl = (this.buttons[k].url().replace(/(:\/\/[^\/]+).*$/, '$1') + '/favicon.ico');
            var iconstyle = 'a > .social-favicon-'+this.buttons[k].index()+' {background-image: url("'+iconurl+'"); background-position: center; background-repeat: no-repeat; background-size: 100% 100%;width:100%;height:100%;}a > .social-favicon-grey-'+this.buttons[k].index()+' {background-image: url("'+iconurl+'"); background-position: center; background-repeat: no-repeat; background-size: 100% 100%;width:100%;height:100%;-webkit-filter: grayscale(1) contrast(2) brightness(2);}';
            this.buttons[k].iconstyle(iconstyle);
          }
        }
        m.redraw()
        $('.form-group-social').delay(5).slideDown();
    });
    this.buttons = [];
  }

  className() {
    return 'SocialButtonsModal Modal--small';
  }

  title() {
    return app.translator.trans('davis-socialprofile.forum.edit.headtitle');
  }

  content() {
     $(() => {
                $('.Modal-content').css('overflow', 'visible');
                $(document).on('click', '.action-placement', function (e) {
                    $('.action-placement').removeClass('active');
                    $(this).addClass('active');
                    e.preventDefault();
                    return false;
                });
                for(var k in this.buttons) {
                  $('#social-favicon-'+this.buttons[k].index()).iconpicker({ 
                        icons:['social-favicon-'+this.buttons[k].index(), 'social-favicon-grey-'+this.buttons[k].index(), "fa-globe", 'fa-amazon', 'fa-angellist', 'fa-apple', 'fa-behance', 'fa-bitbucket', 'fa-codepen', 'fa-connectdevelop', 'fa-dashcube', 'fa-delicious', 'fa-deviantart', 'fa-digg', 'fa-dribbble', 'fa-dropbox', 'fa-drupal', 'fa-facebook', 'fa-flickr', 'fa-foursquare', 'fa-get-pocket', 'fa-git', 'fa-github', 'fa-github-alt', 'fa-gittip', 'fa-google', 'fa-google-plus', 'fa-google-wallet', 'fa-gratipay', 'fa-hacker-news', 'fa-instagram', 'fa-ioxhost', 'fa-joomla', 'fa-jsfiddle', 'fa-lastfm', 'fa-leanpub', 'fa-linkedin', 'fa-meanpath', 'fa-medium', 'fa-odnoklassniki', 'fa-opencart', 'fa-pagelines', 'fa-paypal', 'fa-pied-piper-alt', 'fa-pinterest-p', 'fa-qq', 'fa-reddit', 'fa-renren', 'fa-sellsy', 'fa-share-alt', 'fa-shirtsinbulk', 'fa-simplybuilt', 'fa-skyatlas', 'fa-skype', 'fa-slack', 'fa-slideshare', 'fa-soundcloud', 'fa-spotify', 'fa-stack-exchange', 'fa-stack-overflow', 'fa-steam', 'fa-stumbleupon', 'fa-tencent-weibo', 'fa-trello', 'fa-tripadvisor', 'fa-tumblr', 'fa-twitch', 'fa-twitter', 'fa-viacoin', 'fa-vimeo', 'fa-vine', 'fa-vk', 'fa-wechat', 'fa-weibo', 'fa-weixin', 'fa-whatsapp', 'fa-wordpress', 'fa-xing', 'fa-y-combinator', 'fa-yelp', 'fa-youtube-play' ],
                        hideOnSelect: true,
                        title: "Displayed Icon",
                  });
                  if (/social-favicon-grey-\d/.test(this.buttons[k].icon())) {
                            $('.button-'+k).addClass('social-greyscale-button');
                          } else {
                            $('.button-'+k).removeClass('social-greyscale-button');
                          }
                }
                $('.icp').on('iconpickerSelected', (e) => {
                    var btn_group = /btn-group="(\d+)"/.exec(e.target.outerHTML)[1];
                    $('#icon'+btn_group).val(e.iconpickerValue.replace("fa-", "")).change();
                    if (e.iconpickerValue.replace("fa-", "") == 'social-favicon-'+this.buttons[btn_group].index() || e.iconpickerValue.replace("fa-", "") == 'social-favicon-grey-'+this.buttons[btn_group].index()) {
                        var urlpattern = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
                        if(urlpattern.test(this.buttons[btn_group].url().toLowerCase())) {
                          var iconurl = (this.buttons[btn_group].url().replace(/(:\/\/[^\/]+).*$/, '$1') + '/favicon.ico');
                          this.buttons[btn_group].favicon(iconurl);
                          this.buttons[btn_group].color('transparent');
                          if (/social-favicon-grey-\d/.test(e.iconpickerValue.replace("fa-", ""))) {
                            $('.button-'+btn_group).addClass('social-greyscale-button');
                          } else {
                            $('.button-'+btn_group).removeClass('social-greyscale-button');
                          }
                      }
                    } else {
                      this.buttons[btn_group].favicon('none');
                      this.buttons[btn_group].color('white');
                    }
                    //m.redraw();
                    $('.icp').attr("aria-expanded","false");
                    $('.btn-group').removeClass('open');
                });
            });
       return [
            m('div', {className: 'Modal-body'}, [
                m('div', {className: 'Form'}, [
                    this.buttons.map((button) => {
                      return [
                        WebsiteInputComponent.component({
                          button: button, //MAY BE REDRAWING AT SIMPLE CHANGES!!!
                        }),
                      ];
                    }),
                    m('div', {className: 'Form-group', id: 'submit-button-group'}, [
                      Button.component({
                        type: 'submit',
                        className: 'Button Button--primary EditSocialButtons-save',
                        loading: this.loading,
                        children: app.translator.trans('davis-socialprofile.forum.edit.submit')
                      }),
                      m('div', {className: 'Button Button--primary EditSocialButtons-add', style: 'margin-left: 1%;', 
                        onclick: () => { 
                          this.createButtonObject(this.buttons.length);
      
                          m.redraw();
                          $('#socialgroup'+this.buttons.length).delay(5).slideDown();
                        }}, [
                        m('i', {className: 'fa fa-fw fa-plus'})
                      ]),
                      m('div', {className: 'Button Button--primary EditSocialButtons-add', style: 'margin-left: 1%;', 
                        onclick: () => { 
                          var curdel = (this.buttons.length - 1); 
                          $('#socialgroup'+curdel).slideUp('normal', () => {
                            this.buttons.splice(curdel, 1);
                            m.redraw();
                          });
                        }}, [
                        m('i', {className: 'fa fa-fw fa-minus'})
                      ]),
                    ]),
                  ]),
                ]),
              ];
  }

  onsubmit(e) {
      
      e.preventDefault();
      
      this.loading = true;
      this.finbuttons = [];
      for(var k in this.buttons) {
        if (this.buttons[k].title() != "") {
          var number = this.finbuttons.length
          this.finbuttons[number] = {};
          this.finbuttons[number].title = m.prop(this.buttons[k].title());
          this.finbuttons[number].url = m.prop(this.buttons[k].url());
          this.finbuttons[number].icon = m.prop(this.buttons[k].icon());
          this.finbuttons[number].favicon = m.prop(this.buttons[k].favicon());
        }
      }
      this.finbuttons = JSON.stringify(this.finbuttons);
      const data = new FormData();
      data.append('buttons', this.finbuttons);
      app.request({
          method: 'POST',
          url: app.forum.attribute('apiUrl') + '/profile/socialbuttons',
          serialize: raw => raw,
          data
      }).then(
          () => {
            $('#app').trigger("refreshSocialButtons", [this.finbuttons]);
            this.hide();
          },
          response => {
            this.loading = false;
            this.handleErrors(response);
          }
      );

  }
  
  createButtonObject(key, button = null) {
    if (button == null) {
      button = {};
      button['favicon'] = '';
      button['title'] = '';
      button['url'] = '';
      button['icon'] = '';
    }
    this.buttons[key] = {};
    this.buttons[key].index = m.prop(key);
    this.buttons[key].iconstyle = m.prop();
    this.buttons[key].color = m.prop('white');
    this.buttons[key].favicon = m.prop(button["favicon"] || "none");
    this.buttons[key].title = m.prop(button["title"]);
    this.buttons[key].url = m.prop(button["url"]);
    this.buttons[key].icon = m.prop(button["icon"] || "globe");
    this.numberofinputs = key;
  }
}