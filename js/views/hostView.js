define(['jquery'], function($){  

/* Object concerned with host view */
  function render(){
    this.foo = 'bar'
  }
  render.prototype = {
    displayId: function(hostId){
      $('#display-id').append(hostId);
      console.log(hostId);
    }    
  }
  
  return {render:render};

});