define(['jquery'], function($){  

/* Object concerned with host view */
  function render(){
    this.foo = 'bar'
  }
  render.prototype = {
//    loadTable: function(userName, route, userNameOutput, hostId){
//      var playerName = $(userName).val();
//      localStorage.twoPeersUserName = playerName;
//      $('#content').load(route, function(){
//        $(userNameOutput).html(playerName);
//      });       
//    },
    displayId: function(hostId){
      $('#host-name').html(hostId);
      console.log(hostId);
    }    
  }
  
  return {render:render};

});