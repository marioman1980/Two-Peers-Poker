define(['jquery'], function($){  

  gameFunctions = {
    loadTable: function(userName, table, userNameOutput){
      $('#choose-player').addClass('remove');  
      var playerName = $(userName).val();
      localStorage.twoPeersUserName = playerName;
      $('#choose-player').addClass('hide-content');
      $(table).addClass('show-content');
      $(userNameOutput).html(playerName);
    },

    updatePot: function(pot){
      sendMessage({
        message: 'pot = ' + pot
      }, handleData);
      sendMessage({
        //message: 'pot = ' + pot + '; $("#guest-pot-value").html(' + pot + ')'
        message: '$(".pot").html(' + pot + ')'
      }, handleData);       
    },
    
    potToBank: function(winner){
      winner.bank += pot;
      winner.updateBank();
      pot = 0;
      console.log(winner + 'bank: ' + winner.bank);
      console.log('pot: ' + pot)
      if (winner == hostPlayer){
        sendMessage({
          message: '$(".host-bank").html("' + hostPlayer.bank + '")'
        }, handleData);  
        sendMessage({message: "hostPlayer.bank = '" + hostPlayer.bank + "'"}, handleData);
      }  
      else if (winner == guestPlayer){
        sendMessage({
          message: '$(".guest-bank").html("' + guestPlayer.bank + '")'
        }, handleData);  
        sendMessage({message: "guestPlayer.bank = '" + guestPlayer.bank + "'"}, handleData);
      } 
    },
    
    determineWinner: function(){
      hostScore = hostPlayer.getScore();
      guestScore = guestPlayer.getScore();
      console.log(hostScore);
      console.log(guestScore);
      if (hostScore > guestScore){
        sendMessage({message: "alert(hostPlayer.name + ' wins')"}, handleData);
        this.potToBank(hostPlayer);
      }
      else{
        sendMessage({message: "alert(guestPlayer.name + ' wins')"}, handleData);
        this.potToBank(guestPlayer);
      }   
    },
    
    reset: function(){
      sendMessage({message: "pot = 0"}, handleData);
      sendMessage({message: '$(".pot").html(' + pot + ')'}, handleData);
      sendMessage({message: "hostPlayer.hand.cards = []"}, handleData);
      sendMessage({message: "guestPlayer.hand.cards = []"}, handleData);
      sendMessage({message: "deck.dealtCards = []"}, handleData);
      sendMessage({message: "$('#host-card').empty()"}, handleData);
      sendMessage({message: "$('#guest-host-card').empty()"}, handleData);
      sendMessage({message: "$('#host-guest-card').empty()"}, handleData);
      sendMessage({message: "$('#guest-card').empty()"}, handleData);
      sendMessage({message: "hostPlayer.betAmount = 0; guestPlayer.betAmount = 0"}, handleData);
      sendMessage({message: "hostPlayer.hand.handScore = 0"}, handleData);
      sendMessage({message: "guestPlayer.hand.handScore = 0"}, handleData);
    },
    
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