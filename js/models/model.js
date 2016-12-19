define(['jquery', 'connection', 'functions'], function($, connection, functions){
 
  function model(){
    
    var value,
        suit,
        rank,
        card,
        image,
        dealtCard;  
  
    deck = {
      cardRanks: ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'],
      cardSuits: ['C', 'D', 'H', 'S'],
      dealtCards: []
    }
 
/* Player object */
    function Player(playerName, playerType){
      this.name = playerName;
      this.type = playerType;
      this.hand = new Hand();
      this.bank = 0;
      
    }       

/* Hand object */
    function Hand(){
      this.cards = [];
    }        
        
    function selectCard(){
      value = Math.floor(Math.random() * deck.cardRanks.length);//Random value
      suit = Math.floor(Math.random() * 4);//Random suit value
      for (i=0;i<13;i++){
        if (value == i){
          rank = deck.cardRanks[i];//Get rank of card
        }
      }
/* Give card a value if it's a face card */
      if (rank == 'J') value = 11;
      else if (rank == 'Q') value = 12;
      else if (rank == 'K') value = 13;
      else if (rank == 'A') value = 14;
      else value = value + 1;	
      for (i=0;i<4;i++){
        if (suit == i){
          suit = deck.cardSuits[i];//Get suit
        }
      }	
/* Create card from rank & suit */      
      card = rank + suit;	
      image = '<img src="../Two-Peers-Poker/images/allCards/' + card + '.jpg">';
      console.log(card);
/* Card object to return each time a card is dealt */      
      var dealtCard = {
        value: value,
        suit: suit,
        rank: rank,
        card: card,
        image: image
      }     
/* Check card doesn't exist in array of already dealt cards */      
      notDealt = (deck.dealtCards.every(function(card){
        return card != dealtCard.card;
      }));
        
      console.log(notDealt);
/* Only return card if it hasn't already been dealt */           
      if (notDealt == true){
        deck.dealtCards.push(card);
        return (dealtCard);         
      }
    }   //END SELECT CARD
  
/*  
Deal a card to each player.
Function takes the corresponding element for each player
and ouputs the relevant image 
*/   
    function dealCard(primaryElement, secondaryElement, faceUp){
 /* Call selectCard until a new card (one that hasn't already been dealt) is returned */      
      do { dealtCard = selectCard(); }
      while(dealtCard == undefined);

      var faceUp = faceUp;
      functions.gameFunctions.sendMessage({
        doStuff: "$('" + primaryElement + "').append('" + dealtCard.image +"')"
      }, functions.gameFunctions.handleData);
      var image;
      if (faceUp == true){image = dealtCard.image;}
      else {image = '<img src="../Two-Peers-Poker/images/allCards/cardBack.jpg">'}
      functions.gameFunctions.sendMessage({
        doStuff: "$('" + secondaryElement + "').append('" + image +"')"
      }, functions.gameFunctions.handleData);
    }
  
/* Game starts, players created and initial cards dealt */  
    this.dealStartCards = function(){     
      hostPlayer = new Player(hostName, 'host');
      guestPlayer = new Player(guestName, 'guest');
      alert(hostPlayer.type + ' ' + hostPlayer.name);
      alert(guestPlayer.type + ' ' + guestPlayer.name);
            
/* Deal two cards to each player */
      dealCard('#host-card', '#guest-host-card', false);
      hostPlayer.hand.cards.push(dealtCard);
      dealCard('#host-card', '#guest-host-card', true);
      hostPlayer.hand.cards.push(dealtCard);
      console.log(hostPlayer.hand);        
      dealCard('#guest-card', '#host-guest-card', false);
      guestPlayer.hand.cards.push(dealtCard);
/* DO ALL EVALUATING HOST SIDE */
      dealCard('#guest-card', '#host-guest-card', true);  
      guestPlayer.hand.cards.push(dealtCard);
      console.log(guestPlayer.hand); 

      console.log(deck.dealtCards);
    }//END DEAL START CARDS
    
    
    $('#btn-send').click(function(){
      dealCard('#host-card', '#guest-host-card', true);
    });    

    
  }/* END */
  
  return {model}
});