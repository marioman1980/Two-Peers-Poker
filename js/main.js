require(['peerjs', 'connection', 'controllers/hostController', 'controllers/guestController'], function(peerjs, connection, hostController, guestController){


  connection.start();
  hostController.start()
  guestController.start();


  
});