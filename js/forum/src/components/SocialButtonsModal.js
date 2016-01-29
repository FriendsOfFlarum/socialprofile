import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';
import { slug } from 'flarum/utils/string';

export default class SocialButtonsModal extends Modal {
  init() {
    
    super.init();

    const curuserid = app.current.user.data.id;
    var url = app.forum.attribute('apiUrl') + '/profile/socialbutton/'+curuserid;
      this.socialaccs = null;
      m.request({method: "GET", url: url}).then(result => {
        if(result.data.attributes.hasOwnProperty("buttons")) {
            this.socialaccs = JSON.parse(result.data.attributes.buttons);
            this.buttons = [];
            for(var k in this.socialaccs) {
              if(this.socialaccs[k]['title'] != "") {
                this.buttons[k] = {};
                this.buttons[k].index = m.prop(k);
                this.buttons[k].title = m.prop(this.socialaccs[k]["title"] || "");
                this.buttons[k].url = m.prop(this.socialaccs[k]["url"] || "");
                this.buttons[k].icon = m.prop(this.socialaccs[k]["icon"] || "globe");
                this.numberofinputs = k;
              }
            }
        } else {
            this.buttons[0] = {};
            this.buttons[0].index = m.prop(0);
            this.buttons[0].title = m.prop("");
            this.buttons[0].url = m.prop("");
            this.buttons[0].icon = m.prop("globe");
        }
        for (var i=0; i < this.numberextras; i++) {
          var currentinput = this.numberofinputs + (i + 1);
          this.buttons[currentinput] = {};
          this.buttons[currentinput].title = m.prop("");
          this.buttons[currentinput].url = m.prop("");
          this.buttons[currentinput].icon = m.prop("globe");
        }
        console.log(this.buttons);
        m.redraw()
        $('.form-group-social').delay(5).slideDown();
    });
    this.buttons = [];
    if(this.numberextras == ""){
      this.numberextras = 0;
    }
  }

  className() {
    return 'SocialButtonsModal Modal--small';
  }

  title() {
    return app.translator.trans('davis-socialprofile.forum.edit.headtitle');
  }

  content() {
    
     $(function() {
                $(document).on('click', '.action-placement', function(e) {
                    $('.action-placement').removeClass('active');
                    $(this).addClass('active');
                    e.preventDefault();
                    return false;
                });
               $('.action-create').on('click', function() {
                    $('.icp-dd').iconpicker({ 
                        icons:["fa-globe", 'fa-amazon', 'fa-angellist', 'fa-apple', 'fa-behance', 'fa-bitbucket', 'fa-codepen', 'fa-connectdevelop', 'fa-dashcube', 'fa-delicious', 'fa-deviantart', 'fa-digg', 'fa-dribbble', 'fa-dropbox', 'fa-drupal', 'fa-facebook', 'fa-flickr', 'fa-foursquare', 'fa-get-pocket', 'fa-git', 'fa-github', 'fa-github-alt', 'fa-gittip', 'fa-google', 'fa-google-plus', 'fa-google-wallet', 'fa-gratipay', 'fa-hacker-news', 'fa-instagram', 'fa-ioxhost', 'fa-joomla', 'fa-jsfiddle', 'fa-lastfm', 'fa-leanpub', 'fa-linkedin', 'fa-meanpath', 'fa-medium', 'fa-odnoklassniki', 'fa-opencart', 'fa-pagelines', 'fa-paypal', 'fa-pied-piper-alt', 'fa-pinterest-p', 'fa-qq', 'fa-reddit', 'fa-renren', 'fa-sellsy', 'fa-share-alt', 'fa-shirtsinbulk', 'fa-simplybuilt', 'fa-skyatlas', 'fa-skype', 'fa-slack', 'fa-slideshare', 'fa-soundcloud', 'fa-spotify', 'fa-stack-exchange', 'fa-stack-overflow', 'fa-steam', 'fa-stumbleupon', 'fa-tencent-weibo', 'fa-trello', 'fa-tripadvisor', 'fa-tumblr', 'fa-twitch', 'fa-twitter', 'fa-viacoin', 'fa-vimeo', 'fa-vine', 'fa-vk', 'fa-wechat', 'fa-weibo', 'fa-weixin', 'fa-whatsapp', 'fa-wordpress', 'fa-xing', 'fa-y-combinator', 'fa-yelp', 'fa-youtube-play' ],
                        hideOnSelect: true,
                        title: "Displayed Icon",
                    });
                }).trigger('click');
                $('.icp').on('iconpickerSelected', function(e) {
                    var btn_group = $(this).attr("btn-group");
                    $('#icon'+btn_group).val(e.iconpickerValue.replace("fa-", "")).change();
                    $('.icp').attr("aria-expanded","false");
                    $('.btn-group').removeClass('open');
                });
            });
            
       return [
            m('div', {className: 'Modal-body'}, [
                m('div', {className: 'Form'}, [
                 m("button", {}, "Redraw"),
                    this.buttons.map(function(button) {
                      return [
                          m('div', {className: 'Form-group form-group-social'}, [
                            m('input', {className: 'SocialFormControl',
                              placeholder: app.translator.trans('davis-socialprofile.forum.edit.title'),
                              value: button.title(), 
                              oninput: m.withAttr('value', button.title)
                            }),
                            m('div', {className: 'btn-group'}, [
                              m('null', {className: 'action-create'}),
                              m('button', {type: 'button',
                                tabindex: '-1',
                                className: 'btn btn-primary2 iconpicker-component'
                              }, [
                                m('i', {className: 'fa fa-fw fa-'+button.icon(),})
                              ]),
                              m('button', {type: 'button',
                                'btn-group': button.index(),
                                className: 'form-control icp icp-dd btn btn-primary dropdown-toggle',
                                'data-selected': 'fa-'+button.icon(),
                                'data-toggle': 'dropdown'
                              }, [
                                m('span', {className: 'caret'}),
                                m('span', {className: 'sr-only'}, ['Toggle Dropdown'])
                              ]),
                              m('div', {className: 'dropdown-menu'})
                            ]),
                            m('input', {className: 'SocialFormControl Socialurl',
                              placeholder: app.translator.trans('davis-socialprofile.forum.edit.url'),
                              value: button.url(),
                              oninput: m.withAttr('value', button.url)
                            }),
                            m('input', {className: 'SocialFormControl Socialurl',
                              id: 'icon'+button.index(),
                              style: 'display: none',
                              value: button.icon(),
                              onchange: m.withAttr('value', button.icon)
                            }),
                          ]),
                      ];
                    }),
                    m('div', {className: 'Form-group', id: 'submit-button-group'}, [
                      Button.component({
                        type: 'submit',
                        className: 'Button Button--primary EditSocialButtons-save',
                        loading: this.loading,
                        children: app.translator.trans('davis-socialprofile.forum.edit.submit')
                      }),
                    ]),
                  ]),
                ]),
              ];
  }

  onsubmit(e) {
      
      e.preventDefault();

      this.loading = true;
      this.buttons = JSON.stringify(this.buttons);
      const data = new FormData();
      data.append('buttons', this.buttons);
      app.request({
          method: 'POST',
          url: app.forum.attribute('apiUrl') + '/profile/socialbuttons',
          serialize: raw => raw,
          data
      }).then(
          () => this.hide(),
          response => {
            this.loading = false;
            this.handleErrors(response);
          }
      );

  }
}