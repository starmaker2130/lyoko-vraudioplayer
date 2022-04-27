"use strict";
// author(s):  Patrice-Morgan Ongoly de Goma
// version: 1.0.0
// last modified: Tuesday, April 26, 2022 21:27 EST
// description:

// required modules
var bodyParser = require('body-parser');
var express = require('express');
var WhichBrowser = require('which-browser');

const http = require('http');
// main application instance

var app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// main application settings

var config = {
    PORT: 8008, //process.env.PORT ||
    DIRECTORY: [
        './',  //0
        './css',  //1
        './js', //2
        './media/audio', //3
        './media/icon', //4
        './media/img', //5
        './media/pattern', //6
        './media/model', //7
        './media/texture', //8
        './room' //9
    ],
    deviceType: null
};

var dir = config.DIRECTORY;

app.engine('html', require('ejs').renderFile);

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(express.static('/'));


function checkInitialDeviceConnectionType(headers, ip){
    var result = new WhichBrowser(headers);
    console.log(result.toString());

    if(result.isType('desktop')){
        console.log('This is a desktop computer. \n User is most likely streaming firectly from eV quARk.');
        config.deviceType = 'desktop';
    }
    else{
        console.log('This is a mobile device. \n User is most likely connecting her remote.');
        config.deviceType = 'mobile';
    }
}

/////////// EXPRESS APP FUNCTIONS ////////
app.get('/', function(req, res){
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    var headers = req.headers;
    checkInitialDeviceConnectionType(headers, ip);

    res.render('index.html',{root: dir[0]});
});

app.get('/css/:stylesheet_id', function(req, res){
    var stylesheet_id = req.params.stylesheet_id;
    res.sendFile(stylesheet_id, {root: dir[1]});
});

app.get('/js/:script_id', function(req, res){
    var script_id = req.params.script_id;
    res.sendFile(script_id, {root: dir[2]});
});

app.get('/media/audio/:audio_id', function(req, res){
    var audio_id = req.params.audio_id;
    res.sendFile(audio_id, {root: dir[3]});
});

app.get('/media/icon/:icon_id', function(req, res){
    var icon_id = req.params.icon_id;
    res.sendFile(icon_id, {root: dir[4]});
});

app.get('/media/img/:img_id', function(req, res){
    var img_id = req.params.img_id;
    res.sendFile(img_id, {root: dir[5]});
});

app.get('/media/pattern/:pattern_id', function(req, res){
    var pattern_id = req.params.pattern_id;
    res.sendFile(pattern_id, {root: dir[6]});
});

app.get('/media/model/:model_id', function(req, res){
    var model_id = req.params.model_id;
    res.sendFile(model_id, {root: dir[7]});
});

app.get('/media/texture/:texture_id', function(req, res){
    var texture_id = req.params.texture_id;
    res.sendFile(texture_id, {root: dir[8]});
});

app.get('/room/:room_id', function(req, res){
    var room = req.params.room_id
    console.log(`looking for room ${room}`);
    res.sendFile(room+'.html',{root: dir[9]});
});

/*var io = require('socket.io').listen(app.listen(config.PORT, function(){
    console.log(`[0] listening on port ${config.PORT}`);
}));*/

io.on('connection', (socket) => {
  console.log('client connected.');
  var conn = socket;

  ///////
  socket.on('disconnect', function(){
      console.log(`socket ${socket.id} disconnected.`);
  });
});

server.listen(config.PORT, () => {
  console.log('listening on *:',config.PORT);
});
/*
io.sockets.on('connection', function(socket){
    console.log('client connected.');
    var conn = socket;

    ///////
    socket.on('disconnect', function(){
        console.log(`socket ${socket.id} disconnected.`);
    });
});
*/
