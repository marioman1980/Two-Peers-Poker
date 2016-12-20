define(['peerjs', 'connect', 'models/model', 'functions'], function(peerjs, connect, model, functions){
  
  function connection(customConfig){

    conn = null;  
    var guest_id = null; 
    var name = null;
    var connMade = false;
    hostOpponentName = null;
    guestOpponentName = null;

/* Connection brokered through Heroku */
    
    peer = new Peer({　
        host: 'twopeers.herokuapp.com',
        secure: true,
        port: 443,
        debug: 3,
        config: customConfig
    });   
    console.log(peer.options.config);
    
/* Peer created on page load */
    peer.on('open', function(id) {
      myId = id;
      console.log('My peer ID is: ' + myId); /* Console message confirming peer & ID created */   
    });					

/* Host peer ID used to establish connection and guest name sent to host peer */     
    this.joinGame = function(){  
      name = $('#guest-name').val();
      host_id = $('#input-host-id').val();
      conn = peer.connect(host_id, {metadata: {'userName' : name}});
/* 
Every time a message is sent to or from, 
handleData function is used to handle data 
*/
      conn.on('data', handleData); 
      $('#mmmm').addClass('remove');
      $('#guest-enter-id').addClass('remove');  
      $('#choose-player').addClass('remove');  
    }

    peer.on('connection', function(connection){     
      conn = connection;
      host_id = connection.peer;
      if ( connMade == false){
/* Display name of opposing player */        
        $('#host-connection-established').html("Connection established. You are playing " + conn.metadata.userName);
        guestName = conn.metadata.userName;
        $('#guest-connection-established').html("Connection established. You are playing " + conn.metadata.userName);    
        hostName = $('#host-name').val();
        guest_id = host_id;
        //conn = peer.connect(guest_id, {metadata: {'userName' : hostName}});
        conn.on('data', handleData); 
        $('#display-id').addClass('remove');
        $('#start-game').addClass('show-content');
        connMade = true;
      }        
    });  
  }
  /* Function handles data sent */  
    handleData = function(data){
      eval(data.doStuff);
    },
  /* Sending messages */	  
    sendMessage = function(data, handleData){
      conn.send(data);
      handleData(data);      
    }  
  
  
  return {connection};

  
});
