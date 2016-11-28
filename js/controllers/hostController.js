define(['jquery', 'models/hostModel', 'views/hostView', 'functions', 'models/model'], function($, hostModel, hostView, functions, model){
  

  function start(){
    $('#btn-host-game').click(function(){
      functions.gameFunctions.prototype.loadTable('#user-name', '#host-content', '#host-name');
      hostView.render.prototype.displayId(myId);  
      alert("Give your ID to a friend so they can \"Join\" your game");
    });  
  }
  

  
  return{start:start}
  
  
});