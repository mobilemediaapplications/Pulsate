# Cordova Pulsate Plugin

The Cordova Pulsate Plugin provides ability to display pulsate feed within a Cordova/Ionic based application.

## Installation

to install the plugin, run this command

```sh
$ cordova plugin add https://bitbucket.org/rhilali/cordova-pulsate-plugin/
```

Please note that you need to add the `android` and `ios` platforms to your ionic project before adding the plugin.

## Usage

##### 1. Pulsate Initialization


```js
window.cordova.plugins.PulsateIO.init({
    appID: <PULSATE_APP_ID>,
    appKey: <PULSATE_APP_KEY>,
    GCM_ID: <Google_Cloud_Messaging_App_ID>
})
```

- **appID**: this is provided by Pulsate.
- **appKey**: this is provided by Pulsate.
- **GCM_ID**: This the Google Messaging APP ID, [How to find GCM ID](http://dev.tapjoy.com/faq/how-to-find-sender-id-and-api-key-for-gcm/).
- 

### 2. Show the Pulsate Feed 

To show the pulsate feed, call the method _showFeed_ form the plugin

```js
var options = {fromTop: 50, fromBottom: 60};
window.cordova.plugins.PulsateIO.showFeed(options);
```

- **fromTop:** specify the position from the top of the screen.
- **fromBottom:** specify the position from the bottom of the screen in px.

**IMPORTANT:** The current version of the plugin supports resizing only on `iOS`, in `Android` The feed will be full screen.

### Hide the Pulsate Feed.

In order to hide the pulsate feed, call the method _hideFeed_:

```js
window.cordova.plugins.PulsateIO.hideFeed();
```


