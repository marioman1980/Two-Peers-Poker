define(['jquery', 'connection', 'models/model', 'views/view', 'functions', 'jqueryui'], function($, connection, model, view, functions, ui){
  

  function controller(){
    
    var startGame = false; //IF ERROR POSS HERE
    
    //Host Game
    $('#btn-host-game').click(function(){
      
      try{
        $('#display-id').append(myId);
        functions.gameFunctions.loadTable('#user-name', '#host-content', '#host-name');
        console.log(myId); 
        alert("Give your ID to a friend so they can \"Join\" your game \rID: " + myId);
        localStorage.playerType = 'host';        
      }
      catch(err){
        if (err == 'ReferenceError: myId is not defined'){
          alert('ID not assigned. Please click \'Host\' again.');
        }
        else alert(err);
      }
    }); 
    //Join Game
    $('#btn-join').click(function(){
      functions.gameFunctions.loadTable('#user-name', '#guest-content', '#guest-name');   
      localStorage.playerType = 'guest';
    }); 
    //Connect to game
    $('#btn-join-game').click(function(){
      connection.joinGame();
    }); 
    
    /* Start Game. 
    Cards dealt and player banks initiated
    */
    $('#start-game').click(function(){
      reset();
      startGame = true;
      deck.dealStartCards();
//      $('#start-game').addClass('remove');
      sendMessage({
        message: '$("#test-game-controls").addClass("show-content")'
      }, handleData);
      $('#host-opponent-name').html(guestPlayer.name);  
      sendMessage({
        message: '$("#guest-opponent-name").html("' + hostPlayer.name + '")'
      }, handleData); 
      $('#host-pot').html('Pot: ');  
      sendMessage({
        message: '$("#guest-pot").html("Pot: ")'
      }, handleData);       

//      $( "#dialog" ).html('YOUR TURN');
//      $( "#dialog" ).dialog();
//      setTimeout(function() { $( "#dialog" ).dialog('close'); }, 3000); 
      hostPlayer.betAmount = 10;
//      sendMessage({
//        message: 'hostPlayer.betAmount = 10'
//      }, handleData);
      guestPlayer.betAmount = 20;
      hostPlayer.bet(hostPlayer.betAmount);
      guestPlayer.bet(guestPlayer.betAmount);
      hostPlayer.updateBank();
      guestPlayer.updateBank();
      sendMessage({message: 'hostPlayer.bank = ' + hostPlayer.bank}, handleData);
      sendMessage({
        message: 'guestPlayer.bank = ' + guestPlayer.bank
      }, handleData);      
      updatePot(pot);    
    });   
    
    $('#btn-call').click(function(){
    /* Host Calls */  
      if (localStorage.playerType == 'host'){
        if (startGame == true){
          callAmount = guestPlayer.betAmount - hostPlayer.betAmount;
          sendMessage({message: 'hostPlayer.endTurn = true'}, handleData);
        }
        else{
          callAmount = guestPlayer.betAmount;  
        }
        sendMessage({
          message: 'hostPlayer.betAmount = ' + callAmount
        }, handleData);  
        
        alert(callAmount);
        hostPlayer.bet(callAmount);
        hostPlayer.updateBank();
        sendMessage({message: 'hostPlayer.bank = ' + hostPlayer.bank}, handleData);
        updatePot(pot); 
        if (startGame != true){
          /*===!!!!!!!DEAL A CARD!!!!!===
          ==========Need to deal a card if guest calls ========*/
          deck.dealCard(true);
          console.log(hostPlayer.hand);        
          console.log(guestPlayer.hand); 
        }
        if (deck.dealtCards.length == 10){
          $( "#dialog" ).html('SHOWDOWN');
          $( "#dialog" ).dialog();
          setTimeout(function() { $( "#dialog" ).dialog('close'); }, 3000); 
          determineWinner();        
        }
      }  
      else{
      /* Guest calls */  
        callAmount = hostPlayer.betAmount;
        guestPlayer.bet(callAmount);
        guestPlayer.endTurn = true;
        guestPlayer.updateBank();
        updatePot(pot); 
        deck.dealCard(true);
      }
      startGame = false;
      sendMessage({message: 'hostPlayer.reset()'}, handleData);
      sendMessage({message: 'guestPlayer.reset()'}, handleData);
    });
    $('#btn-raise').click(function(){
      if (localStorage.playerType == 'host'){
        //betAmount = $('#bet-value').val();
        hostPlayer.betAmount = parseInt($('#bet-value').val());
        hostPlayer.bet(hostPlayer.betAmount);
        sendMessage({
          message: 'hostPlayer.betAmount = ' + hostPlayer.betAmount
        }, handleData);        
        hostPlayer.updateBank();
        updatePot(pot);         
      }
      else{
        guestPlayer.betAmount = parseInt($('#bet-value').val());
        guestPlayer.bet(guestPlayer.betAmount);
        sendMessage({
          message: 'guestPlayer.betAmount = ' + guestPlayer.betAmount
        }, handleData);         
        guestPlayer.updateBank();
        updatePot(pot);

      }
    });
    $('#btn-check').click(function(){
      if (localStorage.playerType == 'host'){
        
        if (hostPlayer.endTurn == true && guestPlayer.endTurn == true){
          deck.dealCard(true);
          console.log(hostPlayer.hand);        
          console.log(guestPlayer.hand);  
          hostPlayer.reset();
          guestPlayer.reset();
        }
        sendMessage({message: 'hostPlayer.endTurn = true'}, handleData);
        if (deck.dealtCards.length == 10){
          alert('Showdown');
        }
      }
      else{
        sendMessage({message: 'guestPlayer.endTurn = true'}, handleData);
        deck.dealCard(true);
        if (deck.dealtCards.length == 10){
          determineWinner();
        }        
      }
    });  
    
    $('#btn-fold').click(function(){
      if (localStorage.playerType == 'host'){
        potToBank(guestPlayer);
      }  
    });      
    
    
    
    $('#btn-send').click(function(){
      console.log(hostPlayer.hand.cards);
      console.log(guestPlayer.hand.cards);
      console.log(deck.dealtCards);
    });
    
    $('#btn-eval').click(function(){
      console.log(hostPlayer.bank);
      console.log(guestPlayer.bank);
    });


  }
  

  
  return{controller}
  
  
});