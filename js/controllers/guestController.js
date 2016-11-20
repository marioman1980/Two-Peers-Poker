define(['jquery', 'models/guestModel', 'views/guestView', 'functions'], function($, guestModel, guestView, functions){
  

  function start(){
    $('#btn-join-game').click(function(){
      functions.gameFunctions.prototype.loadTable('#user-name', '#guest-content', '#guest-name');
      //hostView.render.prototype.displayId(myId);
      
    }); 


  
  }
  

  
  return{start:start}
  
  
});