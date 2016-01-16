import SocialButtons from 'davis/socialprofile/models/SocialButtons';
import app from 'flarum/app';
import { extend } from 'flarum/extend';
import UserCard from 'flarum/components/UserCard';
import Badge from 'flarum/components/Badge';
import SocialButtonsModal from 'davis/socialprofile/components/SocialButtonsModal';

var socialaccs = {
    0: {
        icon: "twitter",
        label: "Twitter",
        url: "https://twitter.com",
    },
    1: {
        icon: "facebook",
        label: "Facebook",
        url: "https://facebook.com",
    },
    2: {
        icon: "github",
        label: "Github",
        url: "https://github.com",
    },
};
app.initializers.add('davis-socialprofile-forum', function() {
    
   app.store.models.socialbuttons = SocialButtons;
    
    extend(UserCard.prototype, 'infoItems', function(items) {
        const user = this.props.user;
        //console.log(user.data.id);
        for (var k in socialaccs) {
            if (socialaccs.hasOwnProperty(k)) {
                const curaccount = socialaccs[k];
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
            settingslabel = app.translator.trans('davis-socialprofile.forum.edit');
            
        } else {
            settingsclass = 'null-social-settings';
            settingsicon = 'plus';
            settingslabel = app.translator.trans('davis-socialprofile.forum.add');
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