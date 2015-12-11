var flarum = require('flarum-gulp');

flarum({
  modules: {
    'connor0095/socialprofile': [
      'src/**/*.js'
    ]
  }
});