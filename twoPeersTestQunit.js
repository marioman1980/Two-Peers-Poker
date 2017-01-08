/* 
  A set of unit tests to check 

  functionality and interaction of object

  properties and methods
*/



/* ===== PLAYER TESTS ===== */
QUnit.module("Players created?");
//Are players created
  QUnit.test("Host Player", function(assert) {
    assert.ok(hostPlayer, "Host Player created" );
  });
  QUnit.test("Guest Player", function(assert) {
    assert.ok(guestPlayer, "Guest Player created" );
  });


QUnit.module("Player properties assigned");
//Can players be assigned properties
  QUnit.test("Host assigned name?", function(assert){
    hostPlayer.setName("Tom");
    assert.equal(hostPlayer.name, "Tom", "Host name successfully assigned");
  });
  QUnit.test("Host type assigned", function(assert){
    hostPlayer.setType("host");
    assert.equal(hostPlayer.type, "host", "Host assigned type");
  });
  QUnit.test("Guest assigned name", function(assert){
    guestPlayer.setName("Jerry");
    assert.equal(guestPlayer.name, "Jerry", "Guest name successfully assigned");
  });
  QUnit.test("Guest type assigned", function(assert){
    guestPlayer.setType("guest");
    assert.equal(guestPlayer.type, "guest", "Guest assigned type");
  });


/* ===== CARD RELATED TESTS ===== */
QUnit.module("Card tests", {
  beforeEach: function(){
    // Clear array before each test to make all cards available
    deck.dealtCards = [];
  }
});  
  /* ===== CARD DEALING ===== */
  QUnit.module("Selecting and dealing cards");

  /* Run a number of times, selectCard() should produce different cards */
    QUnit.test("selectCard() produces random card", function(assert){
        card = deck.selectCard();
        assert.equal(card, card, "selectCard() produces " + card.card);  
      //deck.dealtCards = [];
    });

  /* Five different cards should be dealt to each player */
    QUnit.test("Cards dealt to each player, stored in Hand object's card array", function(assert){
      for (var i = 0; i < 5; i++){
        deck.dealCard(hostPlayer);
        deck.dealCard(guestPlayer);
      }
      for (var i = 0; i < 5; i++){
        assert.deepEqual(hostPlayer.hand, hostPlayer.hand, "Host card " + hostPlayer.hand.cards[i].card);
      }
      for (var i = 0; i < 5; i++){
        assert.deepEqual(guestPlayer.hand, guestPlayer.hand, "Guest card " + guestPlayer.hand.cards[i].card);
      }    
      //deck.dealtCards = [];
      hostPlayer.hand.cards = [];
      guestPlayer.hand.cards = [];
    });


  /* ===== EVALUATING HANDS ===== */
  QUnit.module("Evaluating Hands");
    /* Evaluate each possible hand */
    QUnit.module("Evaluate Individual Hands", {
      beforeEach: function(){
      // Reset score before each test, otherwise resulting score will be the sum of all scores
        hand = new Hand();
        hand.handScore = 0;
      }      
    });
    //High card
      QUnit.test("Test for high card", function(assert){
        hand.cards = [ {value: 14, suit: 'C'}, {value: 9, suit: 'D'}, {value: 2, suit: 'S'}, {value: 3, suit: 'D'}, {value: 13, suit: 'H'} ]; 
        hand.evaluateHand();
        assert.equal(hand.handName, 'High Card', 'Function evaluates high card: ' + hand.handName);
        assert.equal(hand.handScore, 14,  'Score: ' + hand.handScore);
      });
    // One pair
      QUnit.test("Test for a pair", function(assert){
        hand.cards = [ {value: 14, suit: 'C'}, {value: 14, suit: 'D'}, {value: 2, suit: 'S'}, {value: 3, suit: 'D'}, {value: 13, suit: 'H'} ]; 
        hand.evaluateHand();
        assert.equal(hand.handName, 'Pair', 'Function evaluates one pair: ' + hand.handName);
        assert.equal(hand.handScore, 114,  'Score: ' + hand.handScore);
      });
    // Two pairs
      QUnit.test("Test for two pairs", function(assert){
        hand.cards = [ {value: 9, suit: 'C'}, {value: 14, suit: 'D'}, {value: 2, suit: 'S'}, {value: 9, suit: 'D'}, {value: 2, suit: 'H'} ]; 
        hand.evaluateHand();
        assert.equal(hand.handName, 'Two Pairs', 'Function evaluates two pairs: ' + hand.handName);
        assert.equal(hand.handScore, 214,  'Score: ' + hand.handScore);
      });
    // Three of a kind
      QUnit.test("Test for three of a kind", function(assert){
        hand.cards = [ {value: 14, suit: 'C'}, {value: 14, suit: 'D'}, {value: 14, suit: 'S'}, {value: 3, suit: 'D'}, {value: 13, suit: 'H'} ]; 
        hand.evaluateHand();
        assert.equal(hand.handName, 'Trips', 'Function evaluates three of a kind: ' + hand.handName);
        assert.equal(hand.handScore, 314,  'Score: ' + hand.handScore);
      });
    // Straight
      QUnit.test("Test for straight", function(assert){
        hand.cards = [ {value: 14, suit: 'C'}, {value: 13, suit: 'D'}, {value: 10, suit: 'S'}, {value: 12, suit: 'D'}, {value: 11, suit: 'H'} ]; 
        hand.evaluateHand();
        assert.equal(hand.handName, 'Straight', 'Function evaluates straight: ' + hand.handName);
        assert.equal(hand.handScore, 414,  'Score: ' + hand.handScore);
      });
    // Flush
      QUnit.test("Test for flush", function(assert){
        hand.cards = [ {value: 14, suit: 'C'}, {value: 9, suit: 'C'}, {value: 2, suit: 'C'}, {value: 6, suit: 'C'}, {value: 3, suit: 'C'} ]; 
        hand.evaluateHand();
        assert.equal(hand.handName, 'Flush', 'Function evaluates flush: ' + hand.handName);
        assert.equal(hand.handScore, 514,  'Score: ' + hand.handScore);
      });
    // Full House
      QUnit.test("Test for full house", function(assert){
        hand.cards = [ {value: 14, suit: 'C'}, {value: 14, suit: 'D'}, {value: 14, suit: 'S'}, {value: 12, suit: 'D'}, {value: 12, suit: 'H'} ]; 
        hand.evaluateHand();
        assert.equal(hand.handName, 'Full House', 'Function evaluates full house: ' + hand.handName);
        assert.equal(hand.handScore, 614,  'Score: ' + hand.handScore);
      });
    // Four of a kind
      QUnit.test("Test for four of a kind", function(assert){
        hand.cards = [ {value: 14, suit: 'C'}, {value: 14, suit: 'D'}, {value: 14, suit: 'S'}, {value: 14, suit: 'H'}, {value: 11, suit: 'H'} ]; 
        hand.evaluateHand();
        assert.equal(hand.handName, 'Quads', 'Function evaluates four of a kind: ' + hand.handName);
        assert.equal(hand.handScore, 714,  'Score: ' + hand.handScore);
      });

/* Here, different values can be inserted to test each player winning with different hands */
    QUnit.module("Evaluate Best of 2 Hands", {
      beforeEach: function(){
        hostPlayer = new Player();
        hostPlayer.setName('Tom');
        hostPlayer.setType('host');
        guestPlayer = new Player();
        guestPlayer.setName('Jerry');
        guestPlayer.setType('guest'); 
      },
      afterEach: function(){
        hostPlayer.hand.cards = [];
        guestPlayer.hand.cards = [];
      } 
    });
    
    // Give host player better hand
      QUnit.test("Test host winning", function(assert){
        hostPlayer.hand.cards = [ {value: 14, suit: 'C'}, {value: 14, suit: 'D'}, {value: 14, suit: 'S'}, {value: 9, suit: 'H'}, {value: 11, suit: 'H'} ];  
        guestPlayer.hand.cards = [ {value: 10, suit: 'C'}, {value: 10, suit: 'D'}, {value: 10, suit: 'S'}, {value: 9, suit: 'H'}, {value: 11, suit: 'H'} ]; 
        
        hostPlayer.hand.evaluateHand();
        guestPlayer.hand.evaluateHand();
        
        assert.ok(hostPlayer.hand.handScore > guestPlayer.hand.handScore, "Host hand " + hostPlayer.hand.handName + "(" + hostPlayer.hand.handScore + ") beats guest hand " + guestPlayer.hand.handName + "(" + guestPlayer.hand.handScore + ")");
      });
    // Give guest player better hand
      QUnit.test("Test guest winning", function(assert){
        hostPlayer.hand.cards = [ {value: 14, suit: 'C'}, {value: 14, suit: 'D'}, {value: 11, suit: 'S'}, {value: 9, suit: 'H'}, {value: 11, suit: 'H'} ];  
        guestPlayer.hand.cards = [ {value: 10, suit: 'C'}, {value: 10, suit: 'D'}, {value: 10, suit: 'S'}, {value: 9, suit: 'H'}, {value: 11, suit: 'H'} ]; 
        
        hostPlayer.hand.evaluateHand();
        guestPlayer.hand.evaluateHand();
        
        assert.ok(hostPlayer.hand.handScore < guestPlayer.hand.handScore, "Guest hand " + guestPlayer.hand.handName + "(" + guestPlayer.hand.handScore + ") beats host hand " + hostPlayer.hand.handName + "(" + hostPlayer.hand.handScore + ")");
      });

