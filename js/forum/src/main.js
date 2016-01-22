import SocialButtons from 'davis/socialprofile/models/SocialButtons';
import app from 'flarum/app';
import { extend } from 'flarum/extend';
import UserCard from 'flarum/components/UserCard';
import Badge from 'flarum/components/Badge';
import SocialButtonsModal from 'davis/socialprofile/components/SocialButtonsModal';

app.initializers.add('davis-socialprofile-forum', function() {
    
   app.store.models.socialbuttons = SocialButtons;
    
    extend(UserCard.prototype, 'infoItems', function(items) {
        const user = this.props.user;
        $.get( app.forum.attribute('apiUrl') + '/profile/socialbutton/'+user.data.id, function(data){
            var socialaccs = JSON.parse(data.data.attributes.buttons);
            for (var k in socialaccs) {
                const curaccount = socialaccs[k];
                if (curaccount["icon"] !== "") {
                    items.add(curaccount["icon"] + ' social-button', Badge.component({
                        type: "social",
                        icon: curaccount["icon"],
                        label: curaccount["label"],
                        onclick: function() {
                            window.open(curaccount["url"],'_blank');
                        }
                    }));
                }
            }
            var settingsclass;
            var settingsicon;
            var settingslabel;
            if (typeof socialaccs !== 'undefined') {
                settingsclass = 'social-settings';
                settingsicon = 'cog';
                settingslabel = app.translator.trans('davis-socialprofile.forum.edit.edit');
                
            } else {
                settingsclass = 'null-social-settings';
                settingsicon = 'plus';
                settingslabel = app.translator.trans('davis-socialprofile.forum.edit.add');
            }
            if (app.session.user === app.current.user) {
                items.add('settings' + ' social-button', Badge.component({
                    type: "social "+settingsclass,
                    icon: settingsicon,
                    label: settingslabel,
                    onclick: function(){app.modal.show(new SocialButtonsModal())}
                }), -1);
            }
        });
    });
});