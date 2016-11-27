define(['jquery', 'connection', 'models/guestModel', 'views/guestView', 'functions'], function($, connection, guestModel, guestView, functions){
  
  $('#btn-join-game').click(function(){
    connection.joinGame();
  });
  
});