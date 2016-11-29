define(['jquery', 'connection', 'functions'], function($, connection, functions){
 
  function start(){
    
    this.playerType = null;
    
//    var cardRanks = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
//    var cardSuits = ['C', 'D', 'H', 'S'];
//    var value,
//        suit,
//        rank,
//        card = null;    
//
//    selectCard = function(){
//      value = Math.floor(Math.random() * cardRanks.length);//Random value
//      suit = Math.floor(Math.random() * 4);//Random suit value
//      for (i=0;i<13;i++){
//        if (value == i){
//          rank = cardRanks[i];//Get rank of card
//        }
//      }
//      /*Give card a value if it's a face card*/
//      if (rank == 'J') value = 11;
//      else if (rank == 'Q') value = 12;
//      else if (rank == 'K') value = 13;
//      else if (rank == 'A') value = 14;
//      else value = value + 1;	
//      for (i=0;i<4;i++){
//        if (suit == i){
//          suit = cardSuits[i];//Get suit
//        }
//      }	
//      card = rank + suit;	//Create card from rank & suit
//      console.log(card);
//    }    
  
  }
  
  return {start:start}
});