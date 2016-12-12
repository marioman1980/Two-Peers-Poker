define(['jquery', 'connection', 'models/model', 'views/view', 'functions'], function($, connection, model, view, functions){
  

  function controller(){
    
    function Player(playerName, playerType){
      this.name = playerName;
      this.type = playerType;
      this.hand = [];
      
    }
    
    $('#btn-host-game').click(function(){
      functions.gameFunctions.loadTable('#user-name', '#host-content', '#host-name');
      view.view.prototype.displayId(myId);  
      alert("Give your ID to a friend so they can \"Join\" your game");
      player = new Player(localStorage.twoPeersUserName, 'host');
      alert(player.type + ' ' + player.name);
    });  
    $('#btn-join').click(function(){
      functions.gameFunctions.loadTable('#user-name', '#guest-content', '#guest-name');  
      player = new Player(localStorage.twoPeersUserName, 'guest');
      alert(player.type + ' ' + player.name);      
    }); 
    $('#btn-join-game').click(function(){
      connection.joinGame();
    });       
    $('#start-game').click(function(){
      model.dealStartCards();
      $('#start-game').addClass('remove');

      sendMessage({
        doStuff: '$("#test-game-controls").addClass("show-content")'
      }, displayImage);
    });      
   
    
    //TEST CARDS
    $('#btn-send').click(function(){
      $('#host-card').append('<img src="../Two-Peers-Poker/images/allCards/AS.jpg">');
      $('#host-guest-card').append('<img src="../Two-Peers-Poker/images/allCards/AS.jpg">');
    });

  }
  

  
  return{controller}
  
  
});