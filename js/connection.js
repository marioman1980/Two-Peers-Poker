define(['peerjs', 'connect'], function(peerjs, connect){
  
  function start(customConfig){

    var guest_id = null; 
    var name = null;
    var conn = null;  
    var connMade = false;
 /* New peer connection with our heroku server */
    peer = new Peer({　
        host: 'twopeers.herokuapp.com',
        secure: true,
        port: 443,
        debug: 3
    });   

    peer.on('open', function(id) {
      myId = id;
      console.log('My peer ID is: ' + myId); /* Console message confirming peer & ID created */   
    });					

  /* Host peer ID used to establish connection and guest name sent to host peer */     
    this.joinGame = function(){  
      name = $('#guest-name').val();
      host_id = $('#input-host-id').val();
      conn = peer.connect(host_id, {metadata: {'userName' : name}});
      //conn.on('data', handleMessage); 
      $('#mmmm').addClass('remove');
      $('#guest-enter-id').addClass('remove');
    }

    
    peer.on('connection', function(connection){
      conn = connection;
      host_id = connection.peer;
    //Whilst connection is open, any data sent will be handled by 'handleMessage' function
      //conn.on('data', handleMessage);
      if ( connMade == false){
      //Display destination ID and name  
        $('#host-connection-established').html("Connection established. You are playing " + conn.metadata.userName);
        $('#guest-connection-established').html("Connection established. You are playing " + conn.metadata.userName);
        hostName = $('#host-name').val();
        guest_id = host_id;
        conn = peer.connect(guest_id, {metadata: {'userName' : hostName}});
        //conn.on('data', handleMessage); 
        $('#display-id').addClass('remove');
        dealStartCards();
        connMade = true;
      }  
      
    }); 

//    function handleMessage(data){
//      $(data.element).html(data.img);
//    }	
    
    function handleCards(data){
      $(data.element).html(data.img);
    }

  //Sending messages	
    function sendMessage(data){
      conn.send(data);
      handleCards(data);
    }

    
    function dealStartCards(){
      sendMessage({element: '#host-card', img: '<img src="../Two-Peers-Poker/images/allCards/4D.jpg">'});
      sendMessage({element: '#card-back', img: '<img src="../Two-Peers-Poker/images/allCards/cardBack.jpg">'});   
    }

      
  }
  
  
  return {start:start};

  
});