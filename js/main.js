require(['peerjs', 'connection', 'models/model', 'controllers/controller'], function(peerjs, connection, model, controller){


  connection.start();
  model.start();
  controller.start();



  
});