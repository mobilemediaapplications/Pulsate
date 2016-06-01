module.exports = function(context) {

  var fs = context.requireCordovaModule('fs'),
    path = context.requireCordovaModule('path');

  var platformRoot = path.join(context.opts.projectRoot, 'platforms/android');


  var manifestFile = path.join(platformRoot, 'AndroidManifest.xml');
  var propertiesFile = path.join(platformRoot, 'project.properties');
  var gradleFile = path.join(platformRoot, 'build.gradle');
  if (fs.existsSync(manifestFile)) {

    fs.readFile(manifestFile, 'utf8', function (err,data) {
      if (err) {
        throw new Error('Unable to find AndroidManifest.xml: ' + err);
      }

      var attribute = 'android:launchMode="singleInstance"';

      var result = data.replace(/android:targetSdkVersion=".*"/g, 'android:targetSdkVersion="23"')
          //result = result.replace(/android:name="MainActivity"/g, 'android:name="MainApplication"');
          result = result.replace(/android:supportsRtl="true"/g, 'android:supportsRtl="false" android:name="cordova.plugin.pulsateIO.MainApplication" tools:replace="android:name"');

          result = result.replace(/<manifest android:hardwareAccelerated="true"/g, '<manifest android:hardwareAccelerated="true" xmlns:tools="http://schemas.android.com/tools"');

        fs.writeFile(manifestFile, result, 'utf8', function (err) {
          if (err) throw new Error('Unable to write into AndroidManifest.xml: ' + err);
        })
    });
  }

  if (fs.existsSync(propertiesFile)) {

    fs.readFile(propertiesFile, 'utf8', function (err,data) {
      if (err) {
        throw new Error('Unable to find project.properties: ' + err);
      }

      var result = data.replace(/target=android-22/g, 'target=android-23');

      fs.writeFile(propertiesFile, result, 'utf8', function (err) {
        if (err) throw new Error('Unable to write into project.properties: ' + err);
      })

    });
  }

  if (fs.existsSync(gradleFile)) {

    fs.readFile(gradleFile, 'utf8', function (err,data) {
      if (err) {
        throw new Error('Unable to find gradle.properties: ' + err);
      }

      var result = data.replace(/classpath '.*'/g, "classpath 'com.android.tools.build:gradle:1.3.1'")

      fs.writeFile(gradleFile, result, 'utf8', function (err) {
        if (err) throw new Error('Unable to write into gradle.properties: ' + err);
      })

    });
  }


};
