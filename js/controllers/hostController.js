define(['jquery', 'models/hostModel', 'views/hostView', 'functions'], function($, hostModel, hostView, functions){
  

  function start(){
    $('#btn-host-game').click(function(){
      functions.gameFunctions.loadTable('#user-name', '#host-content', '#host-name');
      hostView.render.prototype.displayId(myId);  
      alert("Give your ID to a friend so they can \"Join\" your game");
    });  
  }
  

  
  return{start:start}
  
  
});