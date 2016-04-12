import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';
import { slug } from 'flarum/utils/string';
import WebsiteInputComponent from 'Davis/SocialProfile/components/WebsiteInputComponent';

export default class SocialButtonsModal extends Modal {
  init() {

    super.init();

    this.buttons = [];
    if (this.props.data == true) {
      this.createButtonObject(0);
    } else {
      for(var k in this.props.data) {
        if(this.props.data[k]['title'] != "") {
          const button = this.props.data[k];
          this.createButtonObject(k, button);
        }
      }
    }
  }

  className() {
    return 'SocialButtonsModal Modal--small';
  }

  title() {
    return app.translator.trans('davis-socialprofile.forum.edit.headtitle');
  }

  content() {
    $('.Modal-content').css('overflow', 'visible');
       return [
            m('div', {className: 'Modal-body'}, [
                m('div', {className: 'Form'}, [
                    this.buttons.map((button) => {
                      return [
                        WebsiteInputComponent.component({
                          button: button, 
                        }),
                      ];
                    }),
                    m('div', {className: 'Form-group', id: 'submit-button-group'}, [
                      m('div', {className: 'Button Button--primary EditSocialButtons-add', style: 'margin-left: 1%;', 
                        onclick: () => { 
                          this.createButtonObject(this.buttons.length);
      
                          m.redraw();
                          $('#socialgroup'+(this.buttons.length - 1)).delay(150).slideDown();
                        }}, [
                        m('i', {className: 'fa fa-fw fa-plus'})
                      ]),
                      m('div', {className: 'Button Button--primary EditSocialButtons-del', style: 'margin-left: 1%;', 
                        onclick: () => { 
                          var curdel = (this.buttons.length - 1); 
                          $('#socialgroup'+curdel).slideUp('normal', () => {
                            this.buttons.splice(curdel, 1);
                            m.redraw();
                          });
                        }}, [
                        m('i', {className: 'fa fa-fw fa-minus'})
                      ]),
                      Button.component({
                        type: 'submit',
                        style: 'float: right;',
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
      button['favicon'] = 'none';
      button['title'] = '';
      button['url'] = '';
      button['icon'] = 'globe';
    }
    this.buttons[key] = {};
    this.buttons[key].index = m.prop(key);
    this.buttons[key].favicon = m.prop(button["favicon"]);
    this.buttons[key].title = m.prop(button["title"]);
    this.buttons[key].url = m.prop(button["url"]);
    this.buttons[key].icon = m.prop(button["icon"]);
  }
}