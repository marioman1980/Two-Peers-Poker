define(['jquery', 'connection'], function($, connection){  

/* Object concerned with host view */
  function render(){

  }
  render.prototype = {
    displayId: function(hostId){
      $('#display-id').append(hostId);
      console.log(hostId);
    }    
  }
  
  return {render:render};

  
});