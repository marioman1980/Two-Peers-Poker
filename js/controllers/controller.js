define(['jquery', 'connection', 'models/model', 'views/view', 'functions'], function($, connection, model, view, functions){
  

  function start(){
    $('#btn-host-game').click(function(){
      functions.gameFunctions.loadTable('#user-name', '#host-content', '#host-name');
      view.render.prototype.displayId(myId);  
      alert("Give your ID to a friend so they can \"Join\" your game");
    });  
    $('#btn-join').click(function(){
      functions.gameFunctions.loadTable('#user-name', '#guest-content', '#guest-name');     
    }); 
    $('#btn-join-game').click(function(){
      connection.joinGame();
    });       
   
  }
  

  
  return{start:start}
  
  
});