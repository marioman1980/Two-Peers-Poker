define(['jquery', 'connection', 'functions', 'jqueryui'], function($, connection, functions, ui){
 
  function model(){
    
    var value,
        suit,
        rank,
        card,
        image;  
    
    pot = 0;
    dealtCard = null;
  
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
      this.bank = 100;  
      this.betAmount = 0;
      this.updateBank = null;
    } 
    Player.prototype = {
      setName: function(playerName){
        this.name = playerName;
      },
      setType: function(playerType){
        this.type = playerType;
      },
      bet: function(betAmount){
        pot += betAmount;
        this.bank -= betAmount;
      }
    }
//    Player.prototype.setName = function(playerName){
//      this.name = playerName;
//    }
//    Player.prototype.setType = function(playerType){
//      this.type = playerType;
//    }
    //Player.prototype.bet
/* Instantiate player objects and overload updateBank method */
    hostPlayer = new Player();
    hostPlayer.updateBank = function(){
      $('#host-bank').html(hostPlayer.bank);
      sendMessage({
        doStuff: '$("#guest-opponent-bank").html("' + hostPlayer.bank + '")'
      }, handleData);        
    }
    guestPlayer = new Player();
    guestPlayer.updateBank = function(){
      $('#host-opponent-bank').html(guestPlayer.bank);
      sendMessage({
        doStuff: '$("#guest-bank").html(' + guestPlayer.bank + ')'
      }, handleData);  
      sendMessage({
        doStuff: '$("#host-opponent-bank").html(' + guestPlayer.bank + ')'
      }, handleData);       
    }
    updatePot = function(pot){
      sendMessage({
        doStuff: 'pot = ' + pot + '; $("#host-pot-value").html(' + pot + ')'
      }, handleData); 
      sendMessage({
        doStuff: 'pot = ' + pot + '; $("#guest-pot-value").html(' + pot + ')'
      }, handleData);        
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
    dealCard = function(primaryElement, secondaryElement, faceUp){
 /* Call selectCard until a new card (one that hasn't already been dealt) is returned */      
      do { dealtCard = selectCard(); }
      while(dealtCard == undefined);

      var faceUp = faceUp;
      sendMessage({
        doStuff: "$('" + primaryElement + "').append('" + dealtCard.image +"')"
      }, handleData);
      var image;
      if (faceUp == true){image = dealtCard.image;}
      else {image = '<img src="../Two-Peers-Poker/images/allCards/cardBack.jpg">'}
      sendMessage({
        doStuff: "$('" + secondaryElement + "').append('" + image +"')"
      }, handleData);
    }
  
/* Game starts, players created and initial cards dealt */  
    this.dealStartCards = function(){     
      hostPlayer.setName(hostName);
      hostPlayer.setType('host');
      guestPlayer.setName(guestName);
      guestPlayer.setType('guest');      
      //guestPlayer = new Player(guestName, 'guest');
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
      evaluateHand();
    });    

    
    
    /*========================================================
    ===========EVALUATE HANDS===============================*/
    
evaluateHand = function(){
  
  hostPlayer.hand.cards[0] = {value: 5, suit: 'S'};
  hostPlayer.hand.cards[1] = {value: 14, suit: 'S'};
  hostPlayer.hand.cards[2] = {value: 3, suit: 'S'};
  hostPlayer.hand.cards[3] = {value: 2, suit: 'S'};
  hostPlayer.hand.cards[4] = {value: 4, suit: 'S'};

/* Sort cards into ascending order */  
  hostPlayer.hand.cards.sort(function(a, b){
		if (a.value < b.value) return -1;
		if (a.value > b.value) return 1;		
		return 0;    
  });

/* If Ace is necessary for low straight, change value from 14 to 1 */  
  if ((hostPlayer.hand.cards[0].value == 2) && (hostPlayer.hand.cards[1].value == 3) && (hostPlayer.hand.cards[2].value == 4) && (hostPlayer.hand.cards[3].value == 5) && (hostPlayer.hand.cards[4].value == 14)){  
    hostPlayer.hand.cards[4].value = 1;
    hostPlayer.hand.cards.sort(function(a, b){
      if (a.value < b.value) return -1;
      if (a.value > b.value) return 1;		
      return 0;    
    });    
  }
//  for (var i=0;i<5;i++){
//    console.log(hostPlayer.hand.cards[i]);
//  }
  
/* Check for flush */
  var flush;
  for (var i=1; i<5; i++){
    
    var j = i - 1;
    if (hostPlayer.hand.cards[i].suit != hostPlayer.hand.cards[j].suit){
      flush = false;
      break
    }
    else{
      flush = true;
    }
         
  }
  alert (flush);
}    
    
    
    
    
    
    
    
    
  }/* END */
  
  return {model}
});