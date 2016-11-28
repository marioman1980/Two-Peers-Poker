require(['peerjs', 'connection', 'controllers/hostController', 'controllers/guestController', 'models/model'], function(peerjs, connection, hostController, guestController, model){


  connection.start();
  hostController.start()
  guestController.start();
  model.start();


  
});