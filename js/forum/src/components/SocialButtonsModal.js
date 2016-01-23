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
            
            this.urltitle1 = m.prop(this.socialaccs["0"]["title"]);
            this.url1 = m.prop(this.socialaccs["0"]["url"]);
            this.icon1 = m.prop(this.socialaccs["0"]["icon"]);
            
            this.urltitle2 = m.prop(this.socialaccs["1"]["title"]);
            this.url2 = m.prop(this.socialaccs["1"]["url"]);
            this.icon2 = m.prop(this.socialaccs["1"]["icon"]);
            
            this.urltitle3 = m.prop(this.socialaccs["2"]["title"]);
            this.url3 = m.prop(this.socialaccs["2"]["url"]);
            this.icon3 = m.prop(this.socialaccs["2"]["icon"]);
            
            this.urltitle4 = m.prop(this.socialaccs["3"]["title"]);
            this.url4 = m.prop(this.socialaccs["3"]["url"]);
            this.icon4 = m.prop(this.socialaccs["3"]["icon"]);
        } else {
            this.socialaccs = "";
        }
        m.redraw();
    });
    
    //this.name = m.prop(this.social.name() || '');
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
  }

  className() {
    return 'SocialButtonsModal Modal--small';
  }

  title() {
    return app.translator.trans('davis-socialprofile.forum.edit.headtitle');
  }

  content() {
    return (
      <div className="Modal-body">
        <div className="Form">
          <div className="Form-group form-group-social">
            
            <label>{app.translator.trans('davis-socialprofile.forum.edit.title.m')}</label>
            <input className="FormControl" placeholder={app.translator.trans('davis-socialprofile.forum.edit.title.pl')} value={this.urltitle1()} oninput={m.withAttr('value', this.urltitle1)}/>
            
            <label>{app.translator.trans('davis-socialprofile.forum.edit.url.m')}</label>
            <input className="FormControl" placeholder={app.translator.trans('davis-socialprofile.forum.edit.url.pl')} value={this.url1()} oninput={m.withAttr('value', this.url1)}/>
            
            <label>{app.translator.trans('davis-socialprofile.forum.edit.icon.m')}</label>
            <input className="FormControl" placeholder={app.translator.trans('davis-socialprofile.forum.edit.icon.pl')} value={this.icon1()} oninput={m.withAttr('value', this.icon1)}/>
            
          </div>
          
          <div className="Form-group form-group-social">
            
            <label>{app.translator.trans('davis-socialprofile.forum.edit.title.m')}</label>
            <input className="FormControl" placeholder={app.translator.trans('davis-socialprofile.forum.edit.title.pl')} value={this.urltitle2()} oninput={m.withAttr('value', this.urltitle2)}/>
            
            <label>{app.translator.trans('davis-socialprofile.forum.edit.url.m')}</label>
            <input className="FormControl" placeholder={app.translator.trans('davis-socialprofile.forum.edit.url.pl')} value={this.url2()} oninput={m.withAttr('value', this.url2)}/>
            
            <label>{app.translator.trans('davis-socialprofile.forum.edit.icon.m')}</label>
            <input className="FormControl" placeholder={app.translator.trans('davis-socialprofile.forum.edit.icon.pl')} value={this.icon2()} oninput={m.withAttr('value', this.icon2)}/>
            
          </div>
          
          <div className="Form-group form-group-social">
            
            <label>{app.translator.trans('davis-socialprofile.forum.edit.title.m')}</label>
            <input className="FormControl" placeholder={app.translator.trans('davis-socialprofile.forum.edit.title.pl')} value={this.urltitle3()} oninput={m.withAttr('value', this.urltitle3)}/>
            
            <label>{app.translator.trans('davis-socialprofile.forum.edit.url.m')}</label>
            <input className="FormControl" placeholder={app.translator.trans('davis-socialprofile.forum.edit.url.pl')} value={this.url3()} oninput={m.withAttr('value', this.url3)}/>
            
            <label>{app.translator.trans('davis-socialprofile.forum.edit.icon.m')}</label>
            <input className="FormControl" placeholder={app.translator.trans('davis-socialprofile.forum.edit.icon.pl')} value={this.icon3()} oninput={m.withAttr('value', this.icon3)}/>
            
          </div>
          
          <div className="Form-group form-group-social">
            
            <label>{app.translator.trans('davis-socialprofile.forum.edit.title.m')}</label>
            <input className="FormControl" placeholder={app.translator.trans('davis-socialprofile.forum.edit.title.pl')} value={this.urltitle4()} oninput={m.withAttr('value', this.urltitle4)}/>
            
            <label>{app.translator.trans('davis-socialprofile.forum.edit.url.m')}</label>
            <input className="FormControl" placeholder={app.translator.trans('davis-socialprofile.forum.edit.url.pl')} value={this.url4()} oninput={m.withAttr('value', this.url4)}/>
            
            <label>{app.translator.trans('davis-socialprofile.forum.edit.icon.m')}</label>
            <input className="FormControl" placeholder={app.translator.trans('davis-socialprofile.forum.edit.icon.pl')} value={this.icon4()} oninput={m.withAttr('value', this.icon4)}/>
            
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