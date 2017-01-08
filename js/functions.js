define(['jquery'], function($){  


  gameFunctions = {

/*  Once user has chosen to host or join a game,
    the relevant content is loaded */    
    loadTable: function(userName, table, userNameOutput){
      $('#choose-player').addClass('remove');  
      var playerName = $(userName).val();
      localStorage.twoPeersUserName = playerName;
      $('#choose-player').addClass('hide-content');
      $(table).addClass('show-content');
      $(userNameOutput).html(playerName);
    },

  /* Called to credit pot when a player bets or calls  */  
    updatePot: function(pot){
      sendMessage({ message: 'pot = ' + pot }, handleData);
      sendMessage({ message: '$(".pot").html(' + pot + ')' }, handleData);       
    },
 
  /*  When a winner of a hand is determined,
      this function credits their bank with pot value */
    potToBank: function(winner){
      winner.bank += pot;
      winner.updateBank();
      //pot = 0;
      console.log(winner + 'bank: ' + winner.bank);
      //console.log('pot: ' + pot)
      if (winner == hostPlayer){
        sendMessage({ message: '$(".host-bank").html("' + hostPlayer.bank + '")' }, handleData);  
        sendMessage({ message: "hostPlayer.bank = '" + hostPlayer.bank + "'" }, handleData);
      }  
      else if (winner == guestPlayer){
        sendMessage({ message: '$(".guest-bank").html("' + guestPlayer.bank + '")' }, handleData);  
        sendMessage({ message: "guestPlayer.bank = '" + guestPlayer.bank + "'" }, handleData);
      } 
      this.updatePot(0);
    },


  /* Call getScore() on both players to determine winner */  
    determineWinner: function(){
      hostScore = hostPlayer.getScore();
      guestScore = guestPlayer.getScore();
      console.log(hostScore);
      console.log(guestScore);
    //Reveal face down cards  
      sendMessage({ message: "document.getElementById('guestBack').src = hostFirstCard" }, handleData);
      sendMessage({ message: "document.getElementById('hostBack').src = guestFirstCard" }, handleData);
    //Declare winner  
      if (hostScore > guestScore){
        sendMessage({ message: "alert(hostPlayer.name + ' wins with ' + '" + hostPlayer.hand.handName + "'" + ")" }, handleData);
        this.potToBank(hostPlayer);
        sendMessage({ message: "if (" + guestPlayer.bank <= 0 + ") alert('Game Over. Play again?')"}, handleData);
      }
      else{
        sendMessage({ message: "alert(guestPlayer.name + ' wins with ' + '" + guestPlayer.hand.handName + "'" + ")" }, handleData);
        this.potToBank(guestPlayer);
      }  
      alert (guestPlayer.bank);
      if ((guestPlayer.bank <= 0) || (hostPlayer.bank <= 0)){
        sendMessage({ message: "alert('Game Over')" }, handleData);
        if (confirm('Play again?') == true){
          sendMessage({ message: "hostPlayer.resetBank()" }, handleData);
          sendMessage({ message: "guestPlayer.resetBank()" }, handleData);
        } else{
        //Gracefully closes connection and clears up after itself 
          conn.close();
          location.reload();
        }
      }
      sendMessage({ message: "if (localStorage.playerType == 'host') {document.getElementById('start-game').click(); }"}, handleData);
    },
    
    
  /*  Clear values on both devices,
      ready for next hand */
    reset: function(){
      sendMessage({ message: "pot = 0" }, handleData);
      sendMessage({ message: '$(".pot").html(' + pot + ')' }, handleData);
      sendMessage({ message: "hostPlayer.hand.cards = []" }, handleData);
      sendMessage({ message: "guestPlayer.hand.cards = []" }, handleData);
      sendMessage({ message: "deck.dealtCards = []" }, handleData);
      sendMessage({ message: "$('#host-card').empty()" }, handleData);
      sendMessage({ message: "$('#guest-host-card').empty()" }, handleData);
      sendMessage({ message: "$('#host-guest-card').empty()" }, handleData);
      sendMessage({ message: "$('#guest-card').empty()" }, handleData);
      sendMessage({ message: "hostPlayer.betAmount = 0; guestPlayer.betAmount = 0" }, handleData);
      sendMessage({ message: "hostPlayer.hand.handScore = 0" }, handleData);
      sendMessage({ message: "guestPlayer.hand.handScore = 0" }, handleData);
    },
  
    
  /*  Functions to enable/disable controls,
      depending on whose turn it is */
    disableControls: function(){
      $('#btn-raise').attr('disabled', true);
      $('#btn-call').attr('disabled', true);
      $('#btn-check').attr('disabled', true);
      $('#btn-fold').attr('disabled', true);
    },
    
    enableControls: function(){
      $('#btn-raise').attr('disabled', false);
      $('#btn-call').attr('disabled', false);
      $('#btn-check').attr('disabled', false);
      $('#btn-fold').attr('disabled', false);
    }       
    
    
    
  }

  
  return{gameFunctions:gameFunctions};
  
});