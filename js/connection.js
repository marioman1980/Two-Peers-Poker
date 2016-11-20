define(['peerjs', 'connect'], function(peerjs, connect){
  
  function start(customConfig){

    var guest_id = null; 
    var name = null;
    var conn = null;    
             // New peer connection with our heroku server
            var peer = new Peer({　
                host: 'twopeers.herokuapp.com',
                secure: true,
                port: 443,
                debug: 3
            });   

    peer.on('open', function(id) {
      myId = id;
      console.log('My peer ID is: ' + myId); //Console message confirming peer & ID created     
      //console.log(peer.options.config);
    });					

    	//On click, host peer ID used to establish connection and guest name sent to host peer
    $('#btn-login').click(function(){
      name = $('#name').val();
      guest_id = $('#guest-id').val();
      conn = peer.connect(guest_id, {metadata: {'userName' : name}});
      conn.on('data', handleMessage);
    });

    peer.on('connection', function(connection){
      conn = connection;
      guest_id = connection.peer;
    //Whilst connection is open, any data sent will be handled by 'handleMessage' function
      conn.on('data', handleMessage);
    //Display destination ID and name  
      $('#peer-id').html(guest_id);
      $('#connected-peer').html(conn.metadata.userName);
     }); 

    function handleMessage(data){
      $('#msg-receive').html(data);
    }	

  //Sending messages	
    function sendMessage(){
      var data = document.getElementById('msg-send').value;
      conn.send(data);
      handleMessage(data);
    }

    $('#btn-send').click(function(){
      sendMessage();
    });
  }
  return {start:start};

  
});