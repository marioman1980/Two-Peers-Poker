/* ========== Player object ========== */
function Player(){
  this.name = null;
  this.type = null;
  this.hand = new Hand();

} 
/*Using prototype, functions don't have to be recreated for each player object */  
Player.prototype = {
  setName: function(playerName){
    this.name = playerName;
  },
  setType: function(playerType){
    this.type = playerType;
  },

// Calls function to give a score to a player's hand
  getScore: function(){
    return (this.hand.evaluateHand());
  }     
}  /* END PLAYER */

/* Instantiate player objects */
hostPlayer = new Player();
guestPlayer = new Player();  



/* =========== DECK OBJECT ========== */    
deck = {
  cardRanks: ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'],
  cardSuits: ['C', 'D', 'H', 'S'],
  dealtCards: [],
  selectCard: function(){
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


/* Card object to return each time a card is dealt */  

    var dealtCard = {
      value: value,
      suit: suit,
      rank: rank,
      card: card
    }   

/* Returns true if card doesn't exist in array of already dealt cards */      
    notDealt = (deck.dealtCards.every(function(card){
      return card != dealtCard.card;
    }));

/* Only return card if it hasn't already been dealt */           
    if (notDealt == true){
      deck.dealtCards.push(card);
      return (dealtCard);         
    }
  },   //END SELECT CARD

  dealCard: function(player){      
    do { dealtCard = deck.selectCard(); }
    while (dealtCard == undefined);  
    player.hand.cards.push(dealtCard);
  }  
  
  
}//END DECK
//
//
//
//
function Hand(){
  this.cards = [];
  this.handName = null;
  this.handScore = 0;
/* Evaluate Hand */      
  this.evaluateHand = function(){
    var i;
    var j;
    var playerCards = this.cards;
  /* Sort cards into ascending order */  
    playerCards.sort(function(a, b){
//      if (a.value < b.value) return -1;
//      if (a.value > b.value) return 1;		
//      return 0;  
      return (a.value - b.value);
    });

  /* If Ace is necessary for low straight, change value from 14 to 1 */  
    if ((playerCards[0].value == 2) && (playerCards[1].value == 3) && (playerCards[2].value == 4) && (playerCards[3].value == 5) && (playerCards[4].value == 14)){  
      playerCards[4].value = 1;
    /* Re-sort cards */  
      playerCards.sort(function(a, b){
//        if (a.value < b.value) return -1;
//        if (a.value > b.value) return 1;		
//        return 0;  
        return (a.value - b.value);
      });    
    }

  /* Check for flush */
    var flush;
    for (i=1; i<5; i++){
      if (playerCards[i].suit != playerCards[0].suit){
        flush = false;
        break
      } else{
        flush = true;
      }       
    }
    if (flush == true){
      this.handScore += 500;
      this.handScore += playerCards[4].value;
      this.handName = 'Flush';
    }

    /* Check for straight */
    var straight;
    for (i=1; i<5; i++){
      j = i - 1;
      if ((playerCards[i].value - playerCards[j].value) != 1){
        straight = false;
        break;
      } else{
        straight = true;
      }
    }  
    if (straight == true){
      this.handScore += 400;
      this.handScore += playerCards[4].value;
      this.handName = 'Straight';
    }

  /* Check for pairs, trips, quads */  
    if ((flush == false) && (straight == false)){

      var pairValue;
      var pairsArray = [];
      /* Check for matching card values */
      for (i=1; i<5; i++){
        j = i - 1;
        if ((playerCards[i].value - playerCards[j].value) == 0){
          pairsArray[j] = 1;
          pairValue = playerCards[i].value;
        } else{
          pairsArray[j] = 0;
        }
      }
      /* Check total no. of pairs */
      var pairsTotal = 0;
      for (i=0; i<4; i++){
        pairsTotal = pairsTotal + pairsArray[i];
      }
      if(pairsTotal == 1){ /* Single pair */
        this.handScore += (100 + pairValue);
        this.handName = 'Pair';
      } else if (pairsTotal == 0){ /* High card */
        this.handScore += (playerCards[4].value);  
        this.handName = 'High Card';
      }
    /* 
      Full house - There's effectively 3 pairs due to 3 of kind 
      Either 2nd & 3rd or 3rd & 4th won't be matched
    */  
      else if ((pairsTotal == 3) && ((pairsArray[1] == 0) || (pairsArray[2] == 0))){
        this.handScore += (600 + playerCards[2].value);
        this.handName = 'Full House';
      }
    /* 
      Four of a kind - There's effectively 3 pairs again
      Either 1st & 2nd or 4th & 5th won't be matched
    */     
      else if ((pairsTotal == 3) && ((pairsArray[0] == 0) || (pairsArray[3] == 0))){
        this.handScore += (700 + playerCards[3].value);
        this.handName = 'Quads';      
      }
    /* 3-of-a-kind 2 pairs will be made up of 3 cards */  
      else if (pairsTotal == 2){
        if (((pairsArray[0] == 1) && (pairsArray[1] == 1)) || ((pairsArray[1] == 1) && (pairsArray[2] == 1)) || ((pairsArray[2] == 1) && (pairsArray[3] == 1))){
          this.handScore += (300 + playerCards[2].value);
          this.handName = 'Trips';          
        } else{
        /* Two Pairs - only remaining combination*/  
          this.handScore += (200 + playerCards[3].value);
          this.handName = 'Two Pairs';  
        }
      }  
    }/* End pairs, trips, quads check */

    return (this);        
  }      
}  /* END HAND */    

