import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';
import { slug } from 'flarum/utils/string';

export default class SocialButtonsModal extends Modal {
  init() {
    super.init();

    //this.social = this.props.social || app.store.createRecord('tags');

    //this.name = m.prop(this.social.name() || '');
    this.urltitle = m.prop('');
    this.url = m.prop('');
    this.icon = m.prop('');
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
          <div className="Form-group">
            
            <label>{app.translator.trans('davis-socialprofile.forum.edit.title.m')}</label>
            <input className="FormControl" placeholder={app.translator.trans('davis-socialprofile.forum.edit.title.pl')} value={this.urltitle()} oninput={m.withAttr('value', this.urltitle)}/>
            
            <label>{app.translator.trans('davis-socialprofile.forum.edit.url.m')}</label>
            <input className="FormControl" placeholder={app.translator.trans('davis-socialprofile.forum.edit.url.pl')} value={this.url()} oninput={m.withAttr('value', this.url)}/>
            
            <label>{app.translator.trans('davis-socialprofile.forum.edit.icon.m')}</label>
            <input className="FormControl" placeholder={app.translator.trans('davis-socialprofile.forum.edit.icon.pl')} value={this.icon()} oninput={m.withAttr('value', this.icon)}/>
            
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
      var buttonData = {};
      buttonData[0] = {
          "title": this.urltitle(),
          "url": this.url(),
          "icon": this.icon(),
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