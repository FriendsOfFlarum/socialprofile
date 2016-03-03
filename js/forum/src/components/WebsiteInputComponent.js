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
        {IconSelectorComponent.component({selection: this.button.icon})}
        <input className = {'SocialFormControl Socialurl'}
          placeholder = {app.translator.trans('davis-socialprofile.forum.edit.url')}
          value = {this.button.url()}
          oninput = {m.withAttr('value', (value) => {
            this.button.url(value);
            var urlpattern = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
            if(urlpattern.test(this.button.url().toLowerCase())) {
              var iconurl = (this.button.url().replace(/(:\/\/[^\/]+).*$/, '$1') + '/favicon.ico');
              var iconstyle = 'a > .social-favicon-'+this.button.index()+' {background-image: url("'+iconurl+'"); background-position: center; background-repeat: no-repeat; background-size: 100% 100%;width:100%;height:100%;}a > .social-favicon-grey-'+this.button.index()+' {background-image: url("'+iconurl+'"); background-position: center; background-repeat: no-repeat; background-size: 100% 100%;width:100%;height:100%;-webkit-filter: grayscale(1) contrast(2) brightness(2);}';
              this.button.iconstyle(iconstyle);
              this.button.favicon(iconurl);
              this.button.color('transparent');
              this.button.icon('fa-social-favicon-'+this.button.index());
              $('#social-favicon-'+this.button.index()).attr('data-selected', this.button.icon().replace('fa-', '')).change();
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