import Component from 'flarum/Component';
import extract from 'flarum/utils/extract';
import IconSelectorComponent from 'Davis/SocialProfile/components/IconSelectorComponent';
 
export default class WebsiteInputComponent extends Component {
  init(){
    this.attrs = Object.assign({}, this.props);
    this.button = extract(this.attrs, 'button');
  }
  view() {
    
    return (
      <div className = {'Form-group form-group-social'} id = {'socialgroup' + this.button.index()}>
        <input className = {'SocialFormControl SocialTitle'} placeholder = {app.translator.trans('davis-socialprofile.forum.edit.title')} value = {this.button.title()} oninput = {m.withAttr('value', this.button.title)}></input>
        {IconSelectorComponent.component({selection: this.button.icon, favicon: this.button.favicon})}
        <input className = {'SocialFormControl Socialurl'}
          placeholder = {app.translator.trans('davis-socialprofile.forum.edit.url')}
          value = {this.button.url()}
          oninput = {m.withAttr('value', (value) => {
            this.button.url(value);
            var urlpattern = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
            if(urlpattern.test(this.button.url().toLowerCase())) {
              var iconurl = (this.button.url().replace(/(:\/\/[^\/]+).*$/, '$1') + '/favicon.ico');
              this.button.favicon(iconurl);
              this.button.icon('favicon');
              m.redraw();
            } else if (this.button.icon() == 'favicon') {
                this.button.icon('fa-globe');
                this.button.favicon('none');
                m.redraw();
            }
          })}
        ></input>
        <input className = {'SocialFormControl SocialIcon'}
          id = {'icon'+this.button.index()}
          style = {'display: none'}
          value = {this.button.icon()}
          onchange = {m.withAttr('value', this.button.icon)}
        ></input>
        <input className = {'SocialFormControl Socialfavicon'}
          id = {'favicon'+this.button.index()}
          style = {'display: none'}
          value = {this.button.favicon()}
          onchange = {m.withAttr('value', this.button.favicon)}
        ></input>
      </div>
);

}
}