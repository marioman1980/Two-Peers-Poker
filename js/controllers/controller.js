define(['jquery', 'connection', 'models/model', 'views/view', 'functions'], function($, connection, model, view, functions){
  

  function controller(){
    

    //Host Game
    $('#btn-host-game').click(function(){
      functions.gameFunctions.loadTable('#user-name', '#host-content', '#host-name');
      view.view.prototype.displayId(myId);  
      alert("Give your ID to a friend so they can \"Join\" your game");
    }); 
    //Join Game
    $('#btn-join').click(function(){
      functions.gameFunctions.loadTable('#user-name', '#guest-content', '#guest-name');     
    }); 
    //Connect to game
    $('#btn-join-game').click(function(){
      connection.joinGame();
    }); 
    
    /* Start Game. 
    Cards dealt and player banks initiated
    */
    $('#start-game').click(function(){
      model.dealStartCards();
      $('#start-game').addClass('remove');
      sendMessage({
        doStuff: '$("#test-game-controls").addClass("show-content")'
      }, handleData);
      $('#host-opponent-name').html(guestPlayer.name);  
      sendMessage({
        doStuff: '$("#guest-opponent-name").html("' + hostPlayer.name + '")'
      }, handleData);  
      hostPlayer.updateBank();
      guestPlayer.updateBank(); 
    });   
    
    $('#btn-call').click(function(){
      if(player.type == 'guest'){
        alert('guest');
      }
      else if(player.type == 'host'){
        alert('host');
      }
    });
    


  }
  

  
  return{controller}
  
  
});