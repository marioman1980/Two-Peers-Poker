define(['peerjs', 'functions'], function(peerjs, functions){
  
  function connection(customConfig){

    conn = null;  
    var guest_id = null; 
    var name = null;
    var connMade = false;

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
Every time a message is received, 
handleData executes the contents
*/
      conn.on('data', handleData); 
      $('#guest-host-id').addClass('remove');
      $('#guest-enter-id').addClass('remove');  
      $('#choose-player').addClass('remove');  
      alert("Connection successfully established");
      
      conn.on('close', function(){
        alert("Game Over!");
        location.reload();
      });      
    }//End joinGame

    peer.on('connection', function(connection){   
      
      conn = connection;
      host_id = connection.peer;
      
      if ( connMade == false){
/* Confirm successful connection */
        alert("Connection successfully established");
        guestName = conn.metadata.userName;
        hostName = $('#host-name').val();
        guest_id = host_id;
        conn.on('data', handleData); 
        $('#display-id').addClass('remove');
        $('#start-game').addClass('show-content');
        connMade = true;
      } 
      
      conn.on('close', function(){
        alert("Game Over!");
        location.reload();
      });      
    });  
   
  /* Catch any errors related to the connection */  
    peer.on('error', function(err){
      alert(err);
      location.reload();
    });
  /* Try to reconnect if disconnected from server */  
    peer.on('disconnected', function() {
      alert('disconnected');
      peer.reconnect();
    });   

  }
  /* Function handles data received */  
    handleData = function(data){
      eval(data.message);      
    }
    
  /*  Sending messages 
      Used throughout to ensure values (pot/bank) are updated on both devices 
      Also used to show/hide correct content, enable/disable controls   
  */	  
    sendMessage = function(data, handleData){
      conn.send(data);
      handleData(data);      
    }  
  
  
  return {connection};

  
});
