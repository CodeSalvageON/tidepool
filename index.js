// Install File System and Express

const fs = require('fs');
const express = require('express');

// Create the server

var app = require('express')();
var http = require('http').Server(app);
var bodyParser = require('body-parser');

// Set Port and Socket

var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

// Set Target Folder

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Create an Array
var playerArray = [];
var playerAttributeArray = [];

// Static Pages

app.get('/', function(req, res){
  var static_path = __dirname + '/public/static/index.html';

  res.sendFile(static_path);
});

// Post Requests

app.post('/join_game', function(req, res){
  // Get User Data from POST request

  const user_name = req.body.username;
  const user_creature = req.body.creature;
  const user_game_type = req.body.game_type;

  // Check if a user with the same name is on 

  if (playerArray.includes(user_name)){
    // Give the player a unique username
    
    var number = 0;
    var unique_user = user_name;

    function createUniqueUser() {
      if (playerArray.includes(unique_user)){
        number = number + 1;

        unique_user = user_name + '_' + number;
        createUniqueUser();
      }
      else{
        // Create the Unique User

        playerArray.push(unique_user);
        console.log(playerArray);

        // Add the player's attributes

        var attribute_code = unique_user + '_' + user_creature + '_' + user_game_type;

        playerAttributeArray.push(attribute_code);
        console.log(playerAttributeArray);
      }
    }

    createUniqueUser();
  }
  else{
    // Create the User

    playerArray.push(user_name);
    console.log(playerArray);

    // Add the player's attributes

    var attribute_code = user_name + '_' + user_creature + '_' + user_game_type;

    playerAttributeArray.push(attribute_code);
    console.log(playerAttributeArray);
  }

  // Send the player to the game!

  const raw_head = __dirname + '/raw/rawhead.txt';
  const raw_footer = __dirname + '/raw/rawfooter.txt';

  var read_head = '';
  var read_footer = '';

  fs.readFile(raw_head, 'utf8', function(err, data){
    read_head = data;
  });

  fs.readFile(raw_footer, 'utf8', function(err, data){
    read_footer = data;
  });

  var page_content = `
  <h1 class="center"></h1>
  `

  res.send(read_head + page_content + read_footer);
});

// Listen on the set port

http.listen(port, function(){
  console.log('listening on *:' + port);
});