var exec = require('cordova/exec');

exports.init = function(pulsateConfig, success, error){
  exec(success, error, "PulsateIO", "init", [pulsateConfig.appID, pulsateConfig.appKey, pulsateConfig.GCM_ID]);
}

exports.showFeed = function(options, success, error) {
    var positions = {
      fromTop: options.fromTop || 0,
      fromBottom: options.fromBottom || 0
    }
    exec(success, error, "PulsateIO", "showFeed", [positions.fromTop, positions.fromBottom]);
};

exports.hideFeed = function(arg0, success, error) {
    exec(success, error, "PulsateIO", "hideFeed", ["hideFeed"]);
};
