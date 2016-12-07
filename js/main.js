require(['peerjs', 'connection', 'models/model', 'views/view', 'controllers/controller'], function(peerjs, connection, model, view, controller){


  connection.start();
  model.start();
  view.render();
  controller.start();



  
});