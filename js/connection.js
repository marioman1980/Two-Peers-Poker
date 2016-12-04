define(['peerjs', 'connect', 'models/model'], function(peerjs, connect, model){
  
  function start(customConfig){
    
    conn = null;  
    var guest_id = null; 
    var name = null;
    var connMade = false;
    //var dealtCard;
    
    this.getConn = function(){
      return conn;
    }
    
    
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
      conn.on('data', displayImage); 
      $('#mmmm').addClass('remove');
      $('#guest-enter-id').addClass('remove');      
    }

    //var a = 1;
    peer.on('connection', function(connection){     
      conn = connection;
      host_id = connection.peer;
    //Whilst connection is open, any data sent will be handled by 'handleMessage' function
      //conn.on('data', displayImage);
      if ( connMade == false){
      //Display destination ID and name  
        $('#host-connection-established').html("Connection established. You are playing " + conn.metadata.userName);
        $('#guest-connection-established').html("Connection established. You are playing " + conn.metadata.userName);
        hostName = $('#host-name').val();
        guest_id = host_id;
        conn = peer.connect(guest_id, {metadata: {'userName' : hostName}});
        conn.on('data', displayImage); 
        $('#display-id').addClass('remove');
        
        connMade = true;
      }        
    }); 
  
//    function displayImage(data){
//      $(data.element).append(data.img);
//    }
//
//  //Sending messages	
//    function sendMessage(data){
//      conn.send(data);
//      displayImage(data);
//    }
//   
// 
//  /*  Deal a card to each player.
//      Function takes the corresponding element for each player
//      and ouputs the relevant image */
//    
//    function dealCard(primaryElement, secondaryElement){
//      dealtCard = model.selectCard();
//      sendMessage({
//        element: primaryElement,
//        img: dealtCard.image
//      });
//      sendMessage({
//        element: secondaryElement,
//        img: dealtCard.image
//      });
//    }
//    
//    function dealStartCards(){
//    /* Deal two cards to each player */
//      dealCard('#host-card', '#guest-host-card');
//      console.log(dealtCard.rank);
//      dealCard('#host-card', '#guest-host-card');
//      dealCard('#guest-card', '#host-guest-card');
//      dealCard('#guest-card', '#host-guest-card');      
//    }  
    
 
    
    
    
    
    

    
    
    
  }
  
  
  return {start:start};

  
});