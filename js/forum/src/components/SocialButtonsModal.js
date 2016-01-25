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
            
            if (typeof this.socialaccs["0"] !== 'undefined') {
            this.urltitle1 = m.prop(this.socialaccs["0"]["title"] || "");
            this.url1 = m.prop(this.socialaccs["0"]["url"] || "");
            this.icon1 = m.prop(this.socialaccs["0"]["icon"] || "globe");
            }
            if (typeof this.socialaccs["1"] !== 'undefined') {
            this.urltitle2 = m.prop(this.socialaccs["1"]["title"] || "");
            this.url2 = m.prop(this.socialaccs["1"]["url"] || "");
            this.icon2 = m.prop(this.socialaccs["1"]["icon"] || "globe");
            }
            if (typeof this.socialaccs["2"] !== 'undefined') {
            this.urltitle3 = m.prop(this.socialaccs["2"]["title"] || "");
            this.url3 = m.prop(this.socialaccs["2"]["url"] || "");
            this.icon3 = m.prop(this.socialaccs["2"]["icon"] || "globe");
            }
            if (typeof this.socialaccs["3"] !== 'undefined') {
            this.urltitle4 = m.prop(this.socialaccs["3"]["title"] || "");
            this.url4 = m.prop(this.socialaccs["3"]["url"] || "");
            this.icon4 = m.prop(this.socialaccs["3"]["icon"] || "globe");
            }
            if (typeof this.socialaccs["4"] !== 'undefined') {
            this.urltitle5 = m.prop(this.socialaccs["4"]["title"] || "");
            this.url5 = m.prop(this.socialaccs["4"]["url"] || "");
            this.icon5 = m.prop(this.socialaccs["4"]["icon"] || "globe");
            }
            if (typeof this.socialaccs["5"] !== 'undefined') {
            this.urltitle6 = m.prop(this.socialaccs["5"]["title"] || "");
            this.url6 = m.prop(this.socialaccs["5"]["url"] || "");
            this.icon6 = m.prop(this.socialaccs["5"]["icon"] || "globe");
            }
            if (typeof this.socialaccs["6"] !== 'undefined') {
            this.urltitle7 = m.prop(this.socialaccs["6"]["title"] || "");
            this.url7 = m.prop(this.socialaccs["6"]["url"] || "");
            this.icon7 = m.prop(this.socialaccs["6"]["icon"] || "globe");
            }
        } else {
            this.socialaccs = "";
        }
        m.redraw();
    });
    this.urltitle1 = m.prop('');
    this.url1 = m.prop('');
    this.icon1 = m.prop('');
    
    this.urltitle2 = m.prop('');
    this.url2 = m.prop('');
    this.icon2 = m.prop('');
    
    this.urltitle3 = m.prop('');
    this.url3 = m.prop('');
    this.icon3 = m.prop('');
    
    this.urltitle4 = m.prop('');
    this.url4 = m.prop('');
    this.icon4 = m.prop('');
    
    this.urltitle5 = m.prop('');
    this.url5 = m.prop('');
    this.icon5 = m.prop('');
    
    this.urltitle6 = m.prop('');
    this.url6 = m.prop('');
    this.icon6 = m.prop('');
    
    this.urltitle7 = m.prop('');
    this.url7 = m.prop('');
    this.icon7 = m.prop('');
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
                        icons: ["fa-globe",
                               'fa-amazon',
                               'fa-angellist',
                               'fa-apple',
                               'fa-behance',
                               'fa-bitbucket',
                               'fa-codepen',
                               'fa-connectdevelop',
                               'fa-dashcube',
                               'fa-delicious',
                               'fa-deviantart',
                               'fa-digg',
                               'fa-dribbble',
                               'fa-dropbox',
                               'fa-drupal',
                               'fa-facebook',
                               'fa-flickr',
                               'fa-foursquare',
                               'fa-get-pocket',
                               'fa-git',
                               'fa-github',
                               'fa-github-alt',
                               'fa-gittip',
                               'fa-google',
                               'fa-google-plus',
                               'fa-google-wallet',
                               'fa-gratipay',
                               'fa-hacker-news',
                               'fa-instagram',
                               'fa-ioxhost',
                               'fa-joomla',
                               'fa-jsfiddle',
                               'fa-lastfm',
                               'fa-leanpub',
                               'fa-linkedin',
                               'fa-meanpath',
                               'fa-medium',
                               'fa-odnoklassniki',
                               'fa-opencart',
                               'fa-pagelines',
                               'fa-paypal',
                               'fa-pied-piper-alt',
                               'fa-pinterest-p',
                               'fa-qq',
                               'fa-reddit',
                               'fa-renren',
                               'fa-sellsy',
                               'fa-share-alt',
                               'fa-shirtsinbulk',
                               'fa-simplybuilt',
                               'fa-skyatlas',
                               'fa-skype',
                               'fa-slack',
                               'fa-slideshare',
                               'fa-soundcloud',
                               'fa-spotify',
                               'fa-stack-exchange',
                               'fa-stack-overflow',
                               'fa-steam',
                               'fa-stumbleupon',
                               'fa-tencent-weibo',
                               'fa-trello',
                               'fa-tripadvisor',
                               'fa-tumblr',
                               'fa-twitch',
                               'fa-twitter',
                               'fa-viacoin',
                               'fa-vimeo',
                               'fa-vine',
                               'fa-vk',
                               'fa-wechat',
                               'fa-weibo',
                               'fa-weixin',
                               'fa-whatsapp',
                               'fa-wordpress',
                               'fa-xing',
                               'fa-y-combinator',
                               'fa-yelp',
                               'fa-youtube-play'
                               ],
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
    return (
      <div className="Modal-body">
        <div className="Form">
        
          <div className="Form-group form-group-social">
            
            <input className="SocialFormControl" placeholder={app.translator.trans('davis-socialprofile.forum.edit.title')} value={this.urltitle1()} oninput={m.withAttr('value', this.urltitle1)}/>
            
            <div class="btn-group">
              <null class="action-create"></null>
              <button type="button" tabindex="-1" class="btn btn-primary2 iconpicker-component"><i class={"fa fa-fw fa-"+this.icon1()}></i></button>
              <button type="button" btn-group="1" class="form-control icp icp-dd btn btn-primary dropdown-toggle" data-selected={'fa-'+this.icon1()} data-toggle="dropdown">
                <span class="caret"></span>
                <span class="sr-only">Toggle Dropdown</span>
              </button>
              <div class="dropdown-menu"></div>
            </div>
      
            <input className="SocialFormControl Socialurl" placeholder={app.translator.trans('davis-socialprofile.forum.edit.url')} value={this.url1()} oninput={m.withAttr('value', this.url1)}/>
            
            <input id="icon1" style="display: none;" value={this.icon1()} onchange={m.withAttr('value', this.icon1)}/>
            
          </div>
          
          <div className="Form-group form-group-social">
            
            <input className="SocialFormControl" placeholder={app.translator.trans('davis-socialprofile.forum.edit.title')} value={this.urltitle2()} oninput={m.withAttr('value', this.urltitle2)}/>
            
            <div class="btn-group">
              <null class="action-create"></null>
              <button type="button" tabindex="-1" class="btn btn-primary2 iconpicker-component"><i class={"fa fa-fw fa-"+this.icon2()}></i></button>
              <button type="button" btn-group="2" class="icp icp-dd btn btn-primary dropdown-toggle" data-selected={'fa-'+this.icon2()} data-toggle="dropdown">
                <span class="caret"></span>
                <span class="sr-only">Toggle Dropdown</span>
              </button>
              <div class="dropdown-menu"></div>
            </div>
      
            <input className="SocialFormControl Socialurl" placeholder={app.translator.trans('davis-socialprofile.forum.edit.url')} value={this.url2()} oninput={m.withAttr('value', this.url2)}/>
            
            <input id="icon2" style="display: none;" value={this.icon2()} onchange={m.withAttr('value', this.icon2)}/>
            
          </div>
          
          <div className="Form-group form-group-social">
            
            <input className="SocialFormControl" placeholder={app.translator.trans('davis-socialprofile.forum.edit.title')} value={this.urltitle3()} oninput={m.withAttr('value', this.urltitle3)}/>
            
            <div class="btn-group">
              <null class="action-create"></null>
              <button type="button" tabindex="-1" class="btn btn-primary2 iconpicker-component"><i class={"fa fa-fw fa-"+this.icon3()}></i></button>
              <button type="button" btn-group="3" class="icp icp-dd btn btn-primary dropdown-toggle" data-selected={'fa-'+this.icon3()} data-toggle="dropdown">
                <span class="caret"></span>
                <span class="sr-only">Toggle Dropdown</span>
              </button>
              <div class="dropdown-menu"></div>
            </div>
      
            <input className="SocialFormControl Socialurl" placeholder={app.translator.trans('davis-socialprofile.forum.edit.url')} value={this.url3()} oninput={m.withAttr('value', this.url3)}/>
            
            <input id="icon3" style="display: none;" value={this.icon3()} onchange={m.withAttr('value', this.icon3)}/>
            
          </div>
          
          <div className="Form-group form-group-social">
            
            <input className="SocialFormControl" placeholder={app.translator.trans('davis-socialprofile.forum.edit.title')} value={this.urltitle4()} oninput={m.withAttr('value', this.urltitle4)}/>
            
            <div class="btn-group">
              <null class="action-create"></null>
              <button type="button" tabindex="-1" class="btn btn-primary2 iconpicker-component"><i class={"fa fa-fw fa-"+this.icon4()}></i></button>
              <button type="button" btn-group="4" class="icp icp-dd btn btn-primary dropdown-toggle" data-selected={'fa-'+this.icon4()} data-toggle="dropdown">
                <span class="caret"></span>
                <span class="sr-only">Toggle Dropdown</span>
              </button>
              <div class="dropdown-menu"></div>
            </div>
      
            <input className="SocialFormControl Socialurl" placeholder={app.translator.trans('davis-socialprofile.forum.edit.url')} value={this.url4()} oninput={m.withAttr('value', this.url4)}/>
            
            <input id="icon4" style="display: none;" value={this.icon4()} onchange={m.withAttr('value', this.icon4)}/>
            
          </div>
          
          <div className="Form-group form-group-social">
            
            <input className="SocialFormControl" placeholder={app.translator.trans('davis-socialprofile.forum.edit.title')} value={this.urltitle5()} oninput={m.withAttr('value', this.urltitle5)}/>
            
            <div class="btn-group">
              <null class="action-create"></null>
              <button type="button" tabindex="-1" class="btn btn-primary2 iconpicker-component"><i class={"fa fa-fw fa-"+this.icon5()}></i></button>
              <button type="button" btn-group="5" class="icp icp-dd btn btn-primary dropdown-toggle" data-selected={'fa-'+this.icon5()} data-toggle="dropdown">
                <span class="caret"></span>
                <span class="sr-only">Toggle Dropdown</span>
              </button>
              <div class="dropdown-menu"></div>
            </div>
      
            <input className="SocialFormControl Socialurl" placeholder={app.translator.trans('davis-socialprofile.forum.edit.url')} value={this.url5()} oninput={m.withAttr('value', this.url5)}/>
            
            <input id="icon5" style="display: none;" value={this.icon5()} onchange={m.withAttr('value', this.icon5)}/>
            
          </div>
          
          <div className="Form-group form-group-social">
            
            <input className="SocialFormControl" placeholder={app.translator.trans('davis-socialprofile.forum.edit.title')} value={this.urltitle6()} oninput={m.withAttr('value', this.urltitle6)}/>
            
            <div class="btn-group">
              <null class="action-create"></null>
              <button type="button" tabindex="-1" class="btn btn-primary2 iconpicker-component"><i class={"fa fa-fw fa-"+this.icon6()}></i></button>
              <button type="button" btn-group="6" class="icp icp-dd btn btn-primary dropdown-toggle" data-selected={'fa-'+this.icon6()} data-toggle="dropdown">
                <span class="caret"></span>
                <span class="sr-only">Toggle Dropdown</span>
              </button>
              <div class="dropdown-menu"></div>
            </div>
      
            <input className="SocialFormControl Socialurl" placeholder={app.translator.trans('davis-socialprofile.forum.edit.url')} value={this.url6()} oninput={m.withAttr('value', this.url6)}/>
            
            <input id="icon6" style="display: none;" value={this.icon6()} onchange={m.withAttr('value', this.icon6)}/>
            
          </div>
          
          <div className="Form-group form-group-social">
            
            <input className="SocialFormControl" placeholder={app.translator.trans('davis-socialprofile.forum.edit.title')} value={this.urltitle7()} oninput={m.withAttr('value', this.urltitle7)}/>
            
            <div class="btn-group">
              <null class="action-create"></null>
              <button type="button" tabindex="-1" class="btn btn-primary2 iconpicker-component"><i class={"fa fa-fw fa-"+this.icon7()}></i></button>
              <button type="button" btn-group="7" class="icp icp-dd btn btn-primary dropdown-toggle" data-selected={'fa-'+this.icon7()} data-toggle="dropdown">
                <span class="caret"></span>
                <span class="sr-only">Toggle Dropdown</span>
              </button>
              <div class="dropdown-menu"></div>
            </div>
      
            <input className="SocialFormControl Socialurl" placeholder={app.translator.trans('davis-socialprofile.forum.edit.url')} value={this.url7()} oninput={m.withAttr('value', this.url7)}/>
            
            <input id="icon7" style="display: none;" value={this.icon7()} onchange={m.withAttr('value', this.icon7)}/>
            
          </div>


          <div className="Form-group" id="submit-button-group">
            {Button.component({
              type: 'submit',
              className: 'Button Button--primary EditSocialButtons-save',
              loading: this.loading,
              children: app.translator.trans('davis-socialprofile.forum.edit.submit')
            })}
          </div>
        </div>
      </div>
    );
  }

  onsubmit(e) {
      
      e.preventDefault();

      this.loading = true;
      var buttonData = {
        0: {
          "title": this.urltitle1(),
          "url": this.url1(),
          "icon": this.icon1(),
        },
        1: {
          "title": this.urltitle2(),
          "url": this.url2(),
          "icon": this.icon2(),
        },
        2: {
          "title": this.urltitle3(),
          "url": this.url3(),
          "icon": this.icon3(),
        },
        3: {
          "title": this.urltitle4(),
          "url": this.url4(),
          "icon": this.icon4(),
        },
        4: {
          "title": this.urltitle5(),
          "url": this.url5(),
          "icon": this.icon5(),
        },
        5: {
          "title": this.urltitle6(),
          "url": this.url6(),
          "icon": this.icon6(),
        },
        6: {
          "title": this.urltitle7(),
          "url": this.url7(),
          "icon": this.icon7(),
        },
      };
      buttonData = JSON.stringify(buttonData);
      const data = new FormData();
      data.append('buttons', buttonData);
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