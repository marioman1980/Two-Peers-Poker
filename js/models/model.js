define(['jquery', 'connection', 'functions'], function($, connection, functions){
 
  function start(){
    
    var cardRanks = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
    var cardSuits = ['C', 'D', 'H', 'S'];
    var value,
        suit,
        rank,
        card,
        image,
        dealtCard;    
    
    function selectCard(){
      value = Math.floor(Math.random() * cardRanks.length);//Random value
      suit = Math.floor(Math.random() * 4);//Random suit value
      for (i=0;i<13;i++){
        if (value == i){
          rank = cardRanks[i];//Get rank of card
        }
      }
      /*Give card a value if it's a face card*/
      if (rank == 'J') value = 11;
      else if (rank == 'Q') value = 12;
      else if (rank == 'K') value = 13;
      else if (rank == 'A') value = 14;
      else value = value + 1;	
      for (i=0;i<4;i++){
        if (suit == i){
          suit = cardSuits[i];//Get suit
        }
      }	
      card = rank + suit;	//Create card from rank & suit
      image = '<img src="../Two-Peers-Poker/images/allCards/' + card + '.jpg">'
      console.log(card);
      
      var dealtCard = {
        value: value,
        suit: suit,
        rank: rank,
        card: card,
        image: image
      }    
      return (dealtCard);
    }   
    
    displayImage = function(data){
      $(data.element).append(data.img);
    }

  //Sending messages	
    function sendMessage(data, handleData){
      conn.send(data);
      handleData(data);
    }
   
 
  /*  Deal a card to each player.
      Function takes the corresponding element for each player
      and ouputs the relevant image */   
    function dealCard(primaryElement, secondaryElement){
      dealtCard = selectCard();
      sendMessage({
        element: primaryElement,
        img: dealtCard.image
      }, displayImage);
      sendMessage({
        element: secondaryElement,
        img: dealtCard.image
      }, displayImage);
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
    
    
  }/* END */
  
  return {start:start}
});