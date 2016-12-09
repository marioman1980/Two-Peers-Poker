define(['jquery', 'connection'], function($, connection){  

/* Object concerned with host view */
  function view(){

  }
  view.prototype = {
    displayId: function(hostId){
      $('#display-id').append(hostId);
      console.log(hostId);
    }    
  }
  
  return {view};

  
});