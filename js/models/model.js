define(['jquery', 'connection', 'functions'], function($, connection, functions){
 
  function model(){
    
    deck = {
      cardRanks: ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'],
      cardSuits: ['C', 'D', 'H', 'S'],
      dealtCards: []
    }
    

    var value,
        suit,
        rank,
        card,
        image,
        dealtCard;    
    
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
      deck.dealtCards.push(card);
      return (dealtCard);
    }   //END SELECT CARD
    
/* Function handles data sent */    
    displayImage = function(data){
      eval(data.doStuff);
    }

/* Sending messages */	
    sendMessage = function(data, handleData){
      conn.send(data);
      handleData(data);
    }
   
 
/*  
Deal a card to each player.
Function takes the corresponding element for each player
and ouputs the relevant image 
*/   
    function dealCard(primaryElement, secondaryElement, faceUp){
      dealtCard = selectCard();
      var faceUp = faceUp;
      sendMessage({
        doStuff: "$('" + primaryElement + "').append('" + dealtCard.image +"')"
      }, displayImage);
      var image;
      if (faceUp == true){image = dealtCard.image;}
      else {image = '<img src="../Two-Peers-Poker/images/allCards/cardBack.jpg">'}
      sendMessage({
        doStuff: "$('" + secondaryElement + "').append('" + image +"')"
      }, displayImage);
    }
    
    this.dealStartCards = function(){
/* Deal two cards to each player */
      dealCard('#host-card', '#guest-host-card', false);
      player.hand.cards.push(dealtCard);
      dealCard('#host-card', '#guest-host-card', true);
      player.hand.cards.push(dealtCard);
      console.log(player.hand);        
      dealCard('#guest-card', '#host-guest-card', false);
      sendMessage({doStuff: "dealtCard = '" + dealtCard.image + "'"}, displayImage);//STUCK HERE
      sendMessage({doStuff: "console.log(dealtCard)"}, displayImage);
      
//      cat = dealtCard.value;
//      sendMessage({doStuff: "console.log('" + (cat + 5) + "')"}, displayImage);/* DO ALL EVALUATING HOST SIDE */
      dealCard('#guest-card', '#host-guest-card', true);  
    } 
/* Player object */
    function Player(playerName, playerType){
      this.name = playerName;
      this.type = playerType;
      this.hand = new Hand();
      this.bank = 0;
      
    }       
    this.createPlayer = function(type){
      player = new Player(localStorage.twoPeersUserName, type);
    }

/* Hand object */
    function Hand(){
      this.cards = [];
    }
    
  }/* END */
  
  return {model}
});