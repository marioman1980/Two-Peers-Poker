define(['peerjs', 'connect', 'models/model'], function(peerjs, connect, model){
  
  function start(customConfig){

    var guest_id = null; 
    var name = null;
    var conn = null;  
    var connMade = false;
    
    var dealtCard;
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
      conn.on('data', handleCards); 
      $('#mmmm').addClass('remove');
      $('#guest-enter-id').addClass('remove');
      
    }

    var a = 1;
    peer.on('connection', function(connection){     
      conn = connection;
      host_id = connection.peer;
    //Whilst connection is open, any data sent will be handled by 'handleMessage' function
      //conn.on('data', handleCards);
      if ( connMade == false){
      //Display destination ID and name  
        $('#host-connection-established').html("Connection established. You are playing " + conn.metadata.userName);
        $('#guest-connection-established').html("Connection established. You are playing " + conn.metadata.userName);
        hostName = $('#host-name').val();
        guest_id = host_id;
        conn = peer.connect(guest_id, {metadata: {'userName' : hostName}});
        conn.on('data', handleCards); 
        $('#display-id').addClass('remove');
        
        connMade = true;
      }        
    }); 
  
    function handleCards(data){
      $(data.element).append(data.img);
    }

  //Sending messages	
    function sendMessage(data){
      conn.send(data);
      handleCards(data);
    }


  
//var cardRanks = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
//var cardSuits = ['C', 'D', 'H', 'S'];
//var value,
//    suit,
//		rank,
//		card;    
//    
//function selectCard(){
//	value = Math.floor(Math.random() * cardRanks.length);//Random value
//	suit = Math.floor(Math.random() * 4);//Random suit value
//	for (i=0;i<13;i++){
//		if (value == i){
//			rank = cardRanks[i];//Get rank of card
//		}
//	}
//  /*Give card a value if it's a face card*/
//	if (rank == 'J') value = 11;
//	else if (rank == 'Q') value = 12;
//	else if (rank == 'K') value = 13;
//	else if (rank == 'A') value = 14;
//	else value = value + 1;	
//	for (i=0;i<4;i++){
//		if (suit == i){
//			suit = cardSuits[i];//Get suit
//		}
//	}	
//	card = rank + suit;	//Create card from rank & suit
//  image = '<img src="../Two-Peers-Poker/images/allCards/' + card + '.jpg">'
//  console.log(card);
//
//}    
 
  /*  Deal a card to each player.
      Function takes the corresponding element for each player
      and ouputs the relevant image */
    
    function dealCard(primaryElement, secondaryElement){
      dealtCard = model.selectCard();
      sendMessage({
        element: primaryElement,
        img: dealtCard.image
      });
      sendMessage({
        element: secondaryElement,
        img: dealtCard.image
      });
    }
    
    function dealStartCards(){
    /* Deal two cards to each player */
      dealCard('#host-card', '#guest-host-card');
      console.log(dealtCard.rank);
      dealCard('#host-card', '#guest-host-card');
      dealCard('#guest-card', '#host-guest-card');
      dealCard('#guest-card', '#host-guest-card');      
      

    }  
    
 
    
    
    
    
    
    $('#show-host-card').click(function(){
      dealStartCards();
    });
    
    
    
  }
  
  
  return {start:start};

  
});