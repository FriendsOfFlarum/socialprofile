import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';
import { slug } from 'flarum/utils/string';

import tagLabel from 'flarum/tags/helpers/tagLabel';

export default class SocialButtonsModal extends Modal {
  init() {
    super.init();

    this.tag = this.props.tag || app.store.createRecord('tags');

    this.name = m.prop(this.tag.name() || '');
    this.slug = m.prop(this.tag.slug() || '');
    this.description = m.prop(this.tag.description() || '');
    this.color = m.prop(this.tag.color() || '');
    this.isHidden = m.prop(this.tag.isHidden() || false);
  }

  className() {
    return 'SocialButtonsModal Modal--small';
  }

  title() {
    return this.name()
      ? tagLabel({
        name: this.name,
        color: this.color
      })
      : app.translator.trans('davis-socialprofile.forum.test');
  }

  content() {
    return (
      <div className="Modal-body">
        <div className="Form">
          <div className="Form-group">
            <label>{app.translator.trans('davis-socialprofile.forum.test')}</label>
            <input className="FormControl" placeholder={app.translator.trans('davis-socialprofile.forum.test')} value={this.name()} oninput={e => {
              this.name(e.target.value);
              this.slug(slug(e.target.value));
            }}/>
          </div>


          <div className="Form-group">
            {Button.component({
              type: 'submit',
              className: 'Button Button--primary EditTagModal-save',
              loading: this.loading,
              children: app.translator.trans('davis-socialprofile.forum.test')
            })}
            {this.tag.exists ? (
              <button type="button" className="Button EditTagModal-delete" onclick={this.delete.bind(this)}>
                {app.translator.trans('davis-socialprofile.forum.test')}
              </button>
            ) : ''}
          </div>
        </div>
      </div>
    );
  }

  onsubmit(e) {
      
      e.preventDefault();

      this.loading = true;
    
      var testData = this.name();
      const data = new FormData();
      data.append('buttons', testData);

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

  delete() {
    if (confirm(app.translator.trans('flarum-tags.admin.edit_tag.delete_tag_confirmation'))) {
      this.tag.delete().then(() => m.redraw());
      this.hide();
    }
  }
}