require(['peerjs', 'connection', 'model', 'controller'], function(peerjs, connection, model, controller){

  /* This object will take in an array of XirSys STUN / TURN servers
   and override the original Peer config object in connection. 
   Supporting both provides greatest chance of successful connection  */   
  var customConfig;

/* Call XirSys ICE servers */
  $.ajax({
    url: "https://service.xirsys.com/ice",
    data: {
      ident: "marioman",
      secret: "06711950-9ede-11e6-8268-76dec46168b1",
      domain: "www.jameskamradcliffe.com",
      application: "default",
      room: "default",
      secure: 1
    },
    success: function (data, status) {
      /* data.d is where the iceServers object lives */
      customConfig = data.d;
      console.log(customConfig);
      /* Pass iceServers to connection */
      connection.connection(customConfig);
    },
    error: function (jqXHR, err) {
      if(err) {
        alert(err);
      }else{
        alert(jqXHR.responseText);//Uncaught error
      }     
    }    
  });

  
/* Instantiate model and controller */  
  model.model();
  controller.controller();
  
});