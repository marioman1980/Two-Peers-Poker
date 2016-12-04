define(['jquery', 'models/guestModel', 'views/guestView', 'functions'], function($, guestModel, guestView, functions){
  

  function start(){
    $('#btn-join').click(function(){
      functions.gameFunctions.loadTable('#user-name', '#guest-content', '#guest-name');     
    }); 



  
  }
  

  
  return{start:start}
  
  
});