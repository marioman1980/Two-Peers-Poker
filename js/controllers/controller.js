define(['jquery', 'connection', 'models/model', 'views/view', 'functions'], function($, connection, model, view, functions){
  

  function controller(){

    
    $('#btn-host-game').click(function(){
      functions.gameFunctions.loadTable('#user-name', '#host-content', '#host-name');
      view.view.prototype.displayId(myId);  
      alert("Give your ID to a friend so they can \"Join\" your game");
    }); 
    
    $('#btn-join').click(function(){
      functions.gameFunctions.loadTable('#user-name', '#guest-content', '#guest-name');     
    }); 
    
    $('#btn-join-game').click(function(){
      connection.joinGame();
    }); 
    
    $('#start-game').click(function(){
      model.dealStartCards();
      $('#start-game').addClass('remove');
      functions.gameFunctions.sendMessage({
        doStuff: '$("#test-game-controls").addClass("show-content")'
      }, functions.gameFunctions.handleData);
      $('#host-bank').html(hostPlayer.bank);
      functions.gameFunctions.sendMessage({
        doStuff: '$("#guest-bank").html(' + guestPlayer.bank + ')'
      }, functions.gameFunctions.handleData);   
      $('#host-opponent-name').html(guestPlayer.name);
      $('#host-opponent-bank').html(guestPlayer.bank);//COOOOOOEEEEE
//      functions.gameFunctions.sendMessage({
//        doStuff: '$("#guest-opponent-name").html(' + hostPlayer.name + ')'
//      }, functions.gameFunctions.handleData);   
//      functions.gameFunctions.sendMessage({
//        doStuff: '$("#guest-opponent-bank").html(' + hostPlayer.bank + ')'
//      }, functions.gameFunctions.handleData);        
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