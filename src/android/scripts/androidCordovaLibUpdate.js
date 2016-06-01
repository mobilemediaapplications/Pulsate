module.exports = function(context) {

  var fs = context.requireCordovaModule('fs'),
    path = context.requireCordovaModule('path');

  var platformRoot = path.join(context.opts.projectRoot, 'platforms/android/CordovaLib');


  var gradleFile = path.join(platformRoot, 'build.gradle');
  var propertiesFile = path.join(platformRoot, 'project.properties');
  if (fs.existsSync(gradleFile)) {

    fs.readFile(gradleFile, 'utf8', function (err,data) {
      if (err) {
        throw new Error('Unable to find Build.Gradle: ' + err);
      }

      var result = data.replace(/classpath '.*'/g, "classpath 'com.android.tools.build:gradle:1.3.1'")
          //result = result.replace(/android:name="MainActivity"/g, 'android:name="MainApplication"');
          result = result.replace(/publishNonDefault true/g, 'publishNonDefault true\nuseLibrary "org.apache.http.legacy"');

        fs.writeFile(gradleFile, result, 'utf8', function (err) {
          if (err) throw new Error('Unable to write into Gradle.File: ' + err);
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


};
