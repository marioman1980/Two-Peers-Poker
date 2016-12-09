define(['jquery'], function($){  

  gameFunctions = {
    loadTable: function(userName, table, userNameOutput){
      $('#choose-player').addClass('remove');  
      var playerName = $(userName).val();
      localStorage.twoPeersUserName = playerName;
      $('#choose-player').addClass('hide-content');
      $(table).addClass('show-content');
      $(userNameOutput).html(playerName);
    }    
  }

  
  return{gameFunctions:gameFunctions};
  
});