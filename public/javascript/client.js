var enemy_set_username

$('#game_joiner').submit(function(){
  var username = document.getElementById("username").value;

  localStorage.setItem("username", username);
});

$('#fight_opponent').click(function(){
   var http = new XMLHttpRequest();

   http.open("POST", "https://tidepool.codesalvageon.repl.co/match", true);
   http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

   http.onreadystatechange = function() {
     if (this.readyState == 4 && this.status == 200) {
       if (this.responseText.includes("&&sea_urchin")) {
         var enemy_username = this.responseText.replace("&&sea_urchin", "");

         enemy_set_username = enemy_username;
         
         doSomething();
       }
       else if (this.responseText.includes("&&chiton")) {
         var enemy_username = this.responseText.replace("&&chiton", "");

         enemy_set_username = enemy_username;

         doSomething();
       }
       else if (this.responseText.includes("&&turban_snail")) {
         var enemy_username = this.responseText.replace("&&turban_snail", "");

         enemy_set_username = enemy_username;

         doSomething();
       }
       else if (this.responseText.includes("&&hermit_crab")) {
         var enemy_username = this.responseText.replace("&&hermit_crab", "");

         enemy_set_username = enemy_username;

         doSomething();
       }
       else if (this.responseText.includes("&&jelly_fish")) {
         var enemy_username = this.responseText.replace("&&jelly_fish", "");

         enemy_set_username = enemy_username;

         doSomething();
       }

       function doSomething() {
         alert(enemy_set_username);
       }
     }
   };

   http.send("player=" + localStorage.getItem("username"));
});