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
var playerArray = ['AI'];
var playerAttributeArray = ['AI_sea_urchin'];

var gameCodeArray = [];

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

        var attribute_code = unique_user + '_' + user_creature;

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

    var attribute_code = user_name + '_' + user_creature;

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
  <!DOCTYPE html>
  <html>
    <head>
      <title>TidePool.io</title>

      <!-- Hover CSS -->
      <link href="https://cdnjs.cloudflare.com/ajax/libs/hover.css/2.3.1/css/hover-min.css" rel="stylesheet">

      <!-- CSS -->
      <link href="https://tidepool.codesalvageon.repl.co/css/style.css" rel="stylesheet">
      <link href="https://tidepool.codesalvageon.repl.co/css/hover.css" rel="stylesheet">

      <!-- Viewport -->
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width">

      <!-- Google Fonts -->
      <link href="https://fonts.googleapis.com/css2?family=Oxygen&display=swap" rel="stylesheet">

      <!-- Favicon -->
      <link href="https://static.thenounproject.com/png/51723-200.png" rel="icon">
    </head>
    <body>
      <center>
        <div class="box zoom hover" id="fight_opponent">
          <h1>New Tide</h1>
        </div>
      </center>

      <div id="header">
      </div>

      <center>
        <div id="content" class="hover">
        </div>
      </center>
      
      <!-- Socket.io -->

      <script src="https://cdn.socket.io/socket.io-1.2.0.js"></script>
      <script src="https://tidepool.codesalvageon.repl.co/javascript/socket.js"></script>

      <!-- JQuery -->

      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

      <!-- Client -->

      <script src="https://tidepool.codesalvageon.repl.co/javascript/client.js"></script>
    </body>
  </html>
  `

  res.send(page_content);
});

// Matchup the player with another player

app.post('/match', function(req, res){
  const player_request = req.body.player;
  
  // Get a random user to fight

  var selected_player = playerArray[Math.floor(Math.random() * playerArray.length)];
  var selected_player_data = playerAttributeArray[Math.floor(Math.random() * playerAttributeArray.length)];

  // Check for duplicates 

  function removeDuplicates() {
    if (selected_player == player_request) {
      var selected_player = playerArray[Math.floor(Math.random() * playerArray.length)];
      var selected_player_data = playerAttributeArray[Math.floor(Math.random() * playerAttributeArray.length)];

      removeDuplicates();
    }
    else{
      console.log('pass');
    }
  }

  removeDuplicates();

  // Get the enemy's creature

  if (selected_player_data.includes("sea_urchin")) {
    var client_data = selected_player + "&&" + "sea_urchin";

    res.send(client_data);
  }

  else if (selected_player_data.includes("chiton")) {
    var client_data = selected_player + "&&" + "chiton";

    res.send(client_data);
  }

  else if (selected_player_data.includes("turban_snail")) {
    var client_data = selected_player + "&&" + "turban_snail";

    res.send(client_data);
  }

  else if (selected_player_data.includes("hermit_crab")) {
    var client_data = selected_player + "&&" + "hermit_crab";

    res.send(client_data);
  }

  else if (selected_player_data.includes("jelly_fish")) {
    var client_data = selected_player + "&&" + "jelly_fish";

    res.send(client_data);
  }
 
});

// Listen on the set port

http.listen(port, function(){
  console.log('listening on *:' + port);
});