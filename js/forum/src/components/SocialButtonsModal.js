import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';

export default class SocialButtonsModal extends Modal {

  form() {
    return [
    <div className="Form-group">
        <label>Twitter Url</label>
        <input className="FormControl"/>
        <label>Facebook Url</label>
        <input className="FormControl"/>
        <label>Github Url</label>
        <input className="FormControl"/>
    </div>
      ];
  }
  
 isDismissible() {
     return true;
 }
  content() {
    return [
      <div className="Modal-body">
        <div className="Form">
          {this.form()}
          
          <div className="Form-group">
            {this.submitButton()}
          </div>
        </div>
      </div>
    ];
  }
 
  submitButton() {
    return (
      <Button
        type="submit"
        className="Button Button--primary"
        loading={this.loading}
        disabled={!this.changed()}>
        Save Changes
      </Button>
    );
  }

  changed(){
      return 1;
  }
  
  className() {
    return 'SocialButtonsModal';
  }

  title() {
    return 'Social Buttons Settings';
  }
  onsubmit(){
      this.test = "test";
      alert(this.test);
  }
}