var flarum = require('flarum-gulp');

flarum({
  modules: {
    'davis/socialprofile': [
      'src/**/*.js'
    ]
  }
});