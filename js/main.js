require(['peerjs', 'connection', 'models/model', 'views/view', 'controllers/controller'], function(peerjs, connection, model, view, controller){


  connection.connection();
  model.model();
  view.view();
  controller.controller();



  
});