define(['jquery', 'connection', 'model', 'functions', 'jqueryui'], function($, connection, model, functions, ui){
  

  function controller(){
    
    var startGame = false;
    
    //HOST GAME
    $('#btn-host-game').click(function(){
      
      try{
        $('#display-id').append(myId);
        functions.gameFunctions.loadTable('#user-name', '#host-content', '#host-name');
        console.log(myId); 
        alert("Give your ID to a friend so they can \"Join\" your game \rID: " + myId);
        localStorage.playerType = 'host';        
      } catch(err){
        if (err == 'ReferenceError: myId is not defined'){
          alert('ID not assigned. Please click \'Host\' again.');
        } else alert(err);
      }
    }); 
    
    //JOIN GAME
    $('#btn-join').click(function(){
      functions.gameFunctions.loadTable('#user-name', '#guest-content', '#guest-name');   
      localStorage.playerType = 'guest';
    }); 
    
    //CONNECT TO GAME
    $('#btn-join-game').click(function(){
      connection.joinGame();      
    }); 
    
    //START GAME
    $('#start-game').click(function(){
      functions.gameFunctions.reset(); //Clear cards and pot from any previous hand
      startGame = true;
      deck.dealStartCards();
      
    //Display Gameplay Controls  
      sendMessage({ message: '$("#test-game-controls").addClass("show-content")' }, handleData);
      
    //Display names on both devices  
      $('#host-opponent-name').html(guestPlayer.name);  
      sendMessage({ message: '$("#guest-opponent-name").html("' + hostPlayer.name + '")' }, handleData); 
      $('#host-pot').html('Pot: ');  
      sendMessage({ message: '$("#guest-pot").html("Pot: ")' }, handleData); 
      
    //Initial, compulsory bets  
      hostPlayer.bet(10);
      guestPlayer.bet(10);
      hostPlayer.updateBank();
      guestPlayer.updateBank();
      sendMessage({ message: 'hostPlayer.bank = ' + hostPlayer.bank }, handleData);
      sendMessage({ message: 'guestPlayer.bank = ' + guestPlayer.bank }, handleData);      
      functions.gameFunctions.updatePot(pot); 
      sendMessage({ message: "if(localStorage.playerType == 'guest'){functions.gameFunctions.disableControls();}" }, handleData);
    });  //END START 
    
  /* === CALL === */  
    $('#btn-call').click(function(){
    /* Host Calls */  
      if (localStorage.playerType == 'host'){
      //If guest bets, match it  
        callAmount = guestPlayer.betAmount;  
        sendMessage({ message: 'hostPlayer.betAmount = ' + callAmount }, handleData);  
        hostPlayer.bet(callAmount);
        hostPlayer.updateBank();

        sendMessage({ message: 'hostPlayer.bank = ' + hostPlayer.bank }, handleData);
        functions.gameFunctions.updatePot(pot); 
        sendMessage({ message: "alert('" + hostPlayer.name + " calls')" }, handleData);
        if (deck.dealtCards.length == 10){
          functions.gameFunctions.determineWinner(); 
        }        
        
        if (deck.dealtCards.length != 10){
          deck.dealCard(true);
        }
        functions.gameFunctions.enableControls();
        sendMessage({ message: "if(localStorage.playerType == 'guest'){functions.gameFunctions.disableControls();}" }, handleData);
      } else{
      /* Guest calls */     
        callAmount = hostPlayer.betAmount;
        guestPlayer.bet(callAmount);
        guestPlayer.endTurn = true;
        guestPlayer.updateBank();
        sendMessage({ message: "guestPlayer.bank = " + guestPlayer.bank }, handleData);
        functions.gameFunctions.updatePot(pot); 
        sendMessage({ message: "alert('" + guestPlayer.name + " calls')" }, handleData);
        if (deck.dealtCards.length == 10){
          functions.gameFunctions.determineWinner();  
        }            
        if (deck.dealtCards.length != 10){
          deck.dealCard(true);
        }
        functions.gameFunctions.disableControls();
        sendMessage({ message: "if(localStorage.playerType == 'host'){functions.gameFunctions.enableControls();}" }, handleData);           
      }
      startGame = false;
    //Reset bets  
      sendMessage({ message: 'hostPlayer.reset()' }, handleData);
      sendMessage({ message: 'guestPlayer.reset()' }, handleData);
    }); //END CALL
    
  /* === BET / RAISE === */    
    $('#btn-raise').click(function(){
    //Host Raises  
      if (localStorage.playerType == 'host'){
      //Get bet value from input  
        hostPlayer.betAmount = parseInt($('#bet-value').val());
        sendMessage({ message: "alert('" + hostPlayer.name + " raises " + hostPlayer.betAmount + "')" }, handleData);
        hostPlayer.bet(hostPlayer.betAmount);
        sendMessage({ message: 'hostPlayer.betAmount = ' + hostPlayer.betAmount }, handleData);        
        hostPlayer.updateBank();
        sendMessage({message: "hostPlayer.bank = " + hostPlayer.bank}, handleData);
        functions.gameFunctions.updatePot(pot);
        functions.gameFunctions.disableControls();
        sendMessage({ message: "if(localStorage.playerType == 'guest'){functions.gameFunctions.enableControls();}" }, handleData);        
      } else{
      //Guest Raises  
        guestPlayer.betAmount = parseInt($('#bet-value').val());
        sendMessage({ message: "alert('" + guestPlayer.name + " raises " + guestPlayer.betAmount + "')" }, handleData);        
        guestPlayer.bet(guestPlayer.betAmount);
        sendMessage({ message: 'guestPlayer.betAmount = ' + guestPlayer.betAmount }, handleData); 
        sendMessage({message: "guestPlayer.endTurn = true"}, handleData);
        guestPlayer.updateBank();
        sendMessage({ message: "guestPlayer.bank = " + guestPlayer.bank }, handleData);
        functions.gameFunctions.updatePot(pot);
        functions.gameFunctions.disableControls();
        sendMessage({ message: "if(localStorage.playerType == 'host'){functions.gameFunctions.enableControls();}" }, handleData);
      }
    }); //END RAISE
    
  /* === CHECK === */    
    $('#btn-check').click(function(){
    //Host Checks  
      if (localStorage.playerType == 'host'){
        sendMessage({ message: "alert('" + hostPlayer.name + " checks')" }, handleData);
      //If both players have checked  
        if (hostPlayer.endTurn == true && guestPlayer.endTurn == true){
          deck.dealCard(true); 
          hostPlayer.reset();
          guestPlayer.reset();
        }
        sendMessage({message: 'hostPlayer.endTurn = true'}, handleData);
        functions.gameFunctions.disableControls();
        sendMessage({ message: "if(localStorage.playerType == 'guest'){functions.gameFunctions.enableControls();}" }, handleData);        
      } else{
      //Guest Checks 
        sendMessage({ message: "alert('" + guestPlayer.name + " checks')" }, handleData);
        if (deck.dealtCards.length == 10){
          functions.gameFunctions.determineWinner();
        }           
        sendMessage({ message: 'guestPlayer.endTurn = true' }, handleData);
        if (deck.dealtCards.length != 10){
          deck.dealCard(true);
        }
        functions.gameFunctions.disableControls();
        sendMessage({ message: "if(localStorage.playerType == 'host'){functions.gameFunctions.enableControls();}" }, handleData);           
      }
    });  //END CHECK
    
  /* === FOLD === */    
    $('#btn-fold').click(function(){
      if (localStorage.playerType == 'host'){
        sendMessage({ message: "alert('" + hostPlayer.name + " folds')" }, handleData);
        functions.gameFunctions.potToBank(guestPlayer);
        sendMessage({ message: "alert(guestPlayer.name + ' wins')" }, handleData);
        document.getElementById('start-game').click();  
      }  
      else if (localStorage.playerType == 'guest'){
        sendMessage({ message: "alert('" + guestPlayer.name + " folds')" }, handleData);
        functions.gameFunctions.potToBank(hostPlayer);
        sendMessage({ message: "alert(hostPlayer.name + ' wins')" }, handleData);
        sendMessage({ message: "if (localStorage.playerType == 'host') {document.getElementById('start-game').click(); }"}, handleData);   
      } 
      sendMessage({ message: "if(localStorage.playerType == 'guest'){functions.gameFunctions.disableControls();}" }, handleData);  
      sendMessage({ message: "if(localStorage.playerType == 'host'){functions.gameFunctions.enableControls();}" }, handleData); 
         
    });  //END FOLD   
    
    
  /* === BUTTONS FOR TESTING === */  
    $('#btn-send').click(function(){
      conn.close();
    });
    
    $('#btn-eval').click(function(){
      console.log(hostPlayer.bank);
      console.log(guestPlayer.bank);
    });


  }
   
  return{controller}
  
  
});