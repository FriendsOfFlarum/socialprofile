import app from 'flarum/forum/app';
import extendUserCard from './extenders/extendUserCard';

export { default as extend } from './extend';

app.initializers.add('fof-socialprofile', () => {
  extendUserCard();
});
