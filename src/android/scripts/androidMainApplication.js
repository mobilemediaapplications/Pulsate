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

      var result = data.replace(/target=android-(.*)/g, 'target=android-23');

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

      var result = data;
      //Gradle Version
      if(result.indexOf("classpath 'com.android.tools.build:gradle:1.3.1'") ==-1){
          result = result.replace(/classpath '.*'/g, "classpath 'com.android.tools.build:gradle:1.3.1'");
      }
      //Use Library
      if(result.indexOf('useLibrary "org.apache.http.legacy"') ==-1){
          result = result.replace("android {", 'android {\n\tuseLibrary "org.apache.http.legacy"');
      }
      //inject libs
      if(result.indexOf("compile 'com.pulsatehq.sdk:PulsateSdk:2.7.0'") ==-1){
        var libsDep = "compile fileTree(dir: 'libs', include: '*.jar')\n\tcompile 'com.google.android.gms:play-services-gcm:8.4.0'\n\tcompile 'com.android.support:cardview-v7:23.3.0'\n\tcompile 'com.android.support:appcompat-v7:23.3.0'\n\tcompile 'com.pulsatehq.sdk:PulsateSdk:2.7.0'"
        result = result.replace("compile fileTree(dir: 'libs', include: '*.jar')", libsDep);
      }

      //jcenter
      if(result.indexOf("jcenter") ==-1){
        result = result.replace(/mavenCentral/g, "jcenter");
      }


      fs.writeFile(gradleFile, result, 'utf8', function (err) {
        if (err) throw new Error('Unable to write into Gradle.File: ' + err);
      })

    });
  }


};
