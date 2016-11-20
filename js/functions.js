define(['jquery'], function($){  

  function gameFunctions(){
    
  }
  gameFunctions.prototype = {
//    loadTable: function(userName, route, userNameOutput, hostId){
//      var playerName = $(userName).val();
//      localStorage.twoPeersUserName = playerName;
//      $('#content').load(route, function(){
//        $(userNameOutput).html(playerName);
//      });       
//    } 
    loadTable: function(userName, table, userNameOutput){
      var playerName = $(userName).val();
      localStorage.twoPeersUserName = playerName;
      $('#choose-player').addClass('hide-content');
      $(table).addClass('show-content');
      $(userNameOutput).html(playerName);
    }
  }
  
  return{gameFunctions:gameFunctions};
  
});