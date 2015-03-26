/* jshint node: true */
'use strict';

var readConfig = require('./lib/config');

module.exports = {
  name: 'ember-cli-bugsnag',

  contentFor: function(type, config) {
    var content = '';
    var bugsnagConfig;
    var envArray;

    if (type === 'head' && config.environment !== 'test') {
      // returns `null` if `.bugsnag` does not exist
      bugsnagConfig = readConfig();

      if (!bugsnagConfig) {
        console.warn('`.bugsnag` config file does not exist, using `config/environment` instead.');
        bugsnagConfig = config.bugsnag;
      }

      envArray = bugsnagConfig.notifyReleaseStages ? bugsnagConfig.notifyReleaseStages : [];

      content = [
        '<script ',
        'src="//d2wy8f7a9ursnm.cloudfront.net/bugsnag-2.min.js" ',
        'data-appversion="' + config.currentRevision + '" ',
        'data-apikey="' + bugsnagConfig.apiKey + '">',
        '</script>',
        '<script>',
        'Bugsnag.releaseStage = "' + config.environment + '";',
        'Bugsnag.notifyReleaseStages = ["' + envArray.join('","') + '"];',
        '</script>'
      ];
    }

    return content;
  }
};