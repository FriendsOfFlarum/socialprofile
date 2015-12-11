import { extend } from 'flarum/extend';
import app from 'flarum/app';
import SocialProfileSettingsModal from 'davis/socialprofile/components/SocialProfileSettingsModal';

app.initializers.add('davis-socialprofile', app => {
  app.extensionSettings['davis-socialprofile'] = () => app.modal.show(new SocialProfileSettingsModal());
});
