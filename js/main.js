require(['peerjs', 'connection', 'models/model', 'views/view', 'controllers/controller'], function(peerjs, connection, model, view, controller){

  // and override the original config object
var customConfig;
  


  connection.connection(customConfig);
  model.model();
  view.view();
  controller.controller();



  
});