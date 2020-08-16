const fs = require('fs');
const express = require('express');

var app = require('express')();
var http = require('http').Server(app);
var bodyParser = require('body-parser');

var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res){
  var static_path = __dirname+'/public/static/index.html';

  res.sendFile(static_path);
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});