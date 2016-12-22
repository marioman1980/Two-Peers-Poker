define(['jquery', 'connection', 'models/model', 'views/view', 'functions', 'jqueryui'], function($, connection, model, view, functions, ui){
  

  function controller(){
    
    startGame = false;
    
    //Host Game
    $('#btn-host-game').click(function(){
      functions.gameFunctions.loadTable('#user-name', '#host-content', '#host-name');
      view.view.prototype.displayId(myId);  
      alert("Give your ID to a friend so they can \"Join\" your game");
      localStorage.playerType = 'host';
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
      startGame = true;
      model.dealStartCards();
      $('#start-game').addClass('remove');
      sendMessage({
        doStuff: '$("#test-game-controls").addClass("show-content")'
      }, handleData);
      $('#host-opponent-name').html(guestPlayer.name);  
      sendMessage({
        doStuff: '$("#guest-opponent-name").html("' + hostPlayer.name + '")'
      }, handleData); 
      $('#host-pot').html('Pot: ');  
      sendMessage({
        doStuff: '$("#guest-pot").html("Pot: ")'
      }, handleData);       

//      $( "#dialog" ).html('YOUR TURN');
//      $( "#dialog" ).dialog();
//      setTimeout(function() { $( "#dialog" ).dialog('close'); }, 3000); 
      hostPlayer.betAmount = 10;
      sendMessage({
        doStuff: 'hostPlayer.betAmount = 10'
      }, handleData);
      guestPlayer.betAmount = 20;
      hostPlayer.bet(hostPlayer.betAmount);
      guestPlayer.bet(guestPlayer.betAmount);
      hostPlayer.updateBank();
      guestPlayer.updateBank();  
      sendMessage({
        doStuff: 'guestPlayer.bank = ' + guestPlayer.bank
      }, handleData);      
      updatePot(pot);    
    });   
    
    $('#btn-call').click(function(){
      if (localStorage.playerType == 'host'){
        if (startGame == true){
          callAmount = guestPlayer.betAmount - hostPlayer.betAmount;
        }
        else{
          callAmount = guestPlayer.betAmount;  
        }
        
        alert(callAmount);
        hostPlayer.bet(callAmount);
        hostPlayer.updateBank();
        updatePot(pot); 
        if (startGame != true){
          /*===!!!!!!!DEAL A CARD!!!!!===
          ==========Need to deal a card if guest calls ========*/
          dealCard('#host-card', '#guest-host-card', true);
          hostPlayer.hand.cards.push(dealtCard);
          console.log(hostPlayer.hand);        
          dealCard('#guest-card', '#host-guest-card', true);
          guestPlayer.hand.cards.push(dealtCard);  
          console.log(guestPlayer.hand); 
        }
      }  
      else{
        callAmount = hostPlayer.betAmount;
        guestPlayer.bet(callAmount);
        
        guestPlayer.updateBank();
//        updatePot(pot);   
        alert(callAmount);
        alert(pot);  
        updatePot(pot);
        sendMessage({doStuff: 'guestCalls = true'}, handleData)
        
      }
      startGame = false;

    });
    $('#btn-raise').click(function(){
      if (localStorage.playerType == 'host'){
        //betAmount = $('#bet-value').val();
        hostPlayer.betAmount = parseInt($('#bet-value').val());
        hostPlayer.bet(hostPlayer.betAmount);
        sendMessage({
          doStuff: 'hostPlayer.betAmount = ' + hostPlayer.betAmount
        }, handleData);        
        hostPlayer.updateBank();
        updatePot(pot);         
      }
      else{
        guestPlayer.betAmount = parseInt($('#bet-value').val());
        guestPlayer.bet(guestPlayer.betAmount);
        sendMessage({
          doStuff: 'guestPlayer.betAmount = ' + guestPlayer.betAmount
        }, handleData);         
        guestPlayer.updateBank();
        updatePot(pot);
      }
    });
    $('#btn-check').click(function(){
      if (deck.dealtCards.length == 10){
        alert('Showdown');
      }
      else{
        
      }
    });  
    $('#btn-fold').click(function(){
      evaluateHand();
    });      
    


  }
  

  
  return{controller}
  
  
});