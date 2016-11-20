define(['jquery', 'models/hostModel', 'views/hostView', 'functions'], function($, hostModel, hostView, functions){
  

  function start(){
    $('#btn-host-game').click(function(){
      functions.gameFunctions.prototype.loadTable('#user-name', '#host-content', '#host-name');
      //hostView.render.prototype.displayId(myId);
      
    }); 


  
  }
  

  
  return{start:start}
  
  
});