import SettingsModal from 'flarum/components/SettingsModal';

export default class SocialProfileSettingsModal extends SettingsModal {
  className() {
    return 'SocialProfileSettingsModal Modal--small';
  }

  title() {
    return 'Social Profile Settings';
  }

  form() {
    return [
      <div className="Form-group">
        <label>Limit Number of Websites</label>
        <input className="FormControl" bidi={this.setting('davis.socialprofile.limit')}/>
      </div>
    ];
  }
}
