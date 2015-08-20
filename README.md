# Streamify
Simple app to stream a folder, made with atom electron and nodejs.

![alt text](http://i.imgur.com/jQ3tgIy.png "Logo Title Text 1")



For now basic settings are implented (including the default settings)
```javascript
  //creating the settings
    var serverSettings = {
        name: serverName,
        dlnaSupport: dlna,
        httpPort: serverPort
      }

 ```
 
 because we wrap the app with electron it's needed to load jQuery to the window 
 ```javascript
 window.$ = window.jQuery = require('./js/jquery-1.11.3.min.js');
 ```
 We use HTML drag and drop file upload
  ```javascript
  for (var i = 0; i < e.dataTransfer.files.length; ++i) {
    var file = {
      path: e.dataTransfer.files[i].path,
      mountPoint: e.dataTransfer.files[i].name
    };
    list.push(file);
  }
 ```
 Dependencies
 * [Upnpserver](https://github.com/oeuillot/upnpserver)
 * [Topcoat](https://github.com/topcoat/topcoat)
