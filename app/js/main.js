var Server = require('upnpserver');
var path = require('path');
window.$ = window.jQuery = require('./js/jquery-1.11.3.min.js');
//default server settings
var dlna = true;
var serverName = "streamify";
var serverPort = 1337;

var server;
var list;
window.ondragover = function(e) {
  e.preventDefault();
  return false
};
window.ondrop = function(e) {
  e.preventDefault();
  return false
};

var holder = document.getElementById('holder');
holder.ondragover = function() {
  this.className = 'hover';
  return false;
};

holder.ondragleave = function() {
  this.className = '';
  return false;
};

holder.ondrop = function(e) {
  e.preventDefault();
  this.className = 'active';
  //show hide div text
  $('#before').hide();
  $('#after').show();
  $('#error').hide();
  list = [];
  for (var i = 0; i < e.dataTransfer.files.length; ++i) {
    console.log(e.dataTransfer.files[i].path);
    var file = {
      path: e.dataTransfer.files[i].path,
      mountPoint: e.dataTransfer.files[i].name
    };
    list.push(file);
    console.log(list);
  }
  return list;
};

//running the server!
function startServer() {
  //make sure the users actually uploaded a list!
  if (typeof list == 'undefined' && list == null) {
    console.log('no files selected!');
    //front end message
    $('#before').hide();
    $('#after').hide();
    $('#error').show();
  } else {
    console.log('staring server..');
    $('#start').prop('disabled', true);
    $('#stop').prop('disabled', false);
    serverName = document.getElementById('serverName').value;
    serverPort = document.getElementById('serverPort').value;
    if (document.getElementById('cleanFolder').checked) {
      console.log("cleaning folders..");
    }
    //if users want dlna of
    if (document.getElementById('dlnaSupport').checked) {
      dlna = true;
    } else {
      dlna = false;
    }
    //creating the settings
    var serverSettings = {
        name: serverName,
        dlnaSupport: dlna,
        httpPort: serverPort
      }
      //staring the server
    server = new Server(serverSettings, list);
    server.start();
  }
}

function stopServer() {
  if (typeof server == 'undefined' && server == null) {
    console.log('there is no server running');
    list = [];
  } else {
    //should terminate the server (does not work yet!)
    //  server.exit();
  }
}

//alternative NYI
function openfileDialog() {
  console.log('open dialog..');
  $('#fileLoader').click();
  list = [];

  var file = document.getElementById('fileLoader').value;
  console.log(file);

}
window.onload = function() {
  $('#start').click(function() {
    $('#start').prop("disabled", true);
    $('#stop').prop("disabled", false);
  });

  $('#stop').click(function() {
    $('#stop').prop("disabled", true);
    $('#start').prop("disabled", false);
    $('#before').show();
    $('#after').hide();
  });
}
