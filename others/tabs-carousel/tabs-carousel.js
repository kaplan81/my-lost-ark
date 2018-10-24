jQuery(document).ready(function(){
	jQuery( ".course-panes" ).tabs();
    jQuery("#course-slides").slidesjs({
        width: 664,
        height: 191,
        navigation: {
      		active: false,
      		effect: "slide"
    	},
    	pagination: {
	      active: true,
	      effect: "slide"
	    },
	    play: {
	        active: false,
      		interval: 4000,
	     	auto: true,
   	   		pauseOnHover: true
    	}
    });
});