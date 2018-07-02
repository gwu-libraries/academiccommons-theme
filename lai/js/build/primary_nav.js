jQuery( document ).ready(function() {
"use strict";
	
    jQuery("nav:first").accessibleMegaMenu({
        /* prefix for generated unique id attributes, which are required 
           to indicate aria-owns, aria-controls and aria-labelledby */
        uuidPrefix: "accessible-megamenu",

        /* css class used to define the megamenu styling */
        menuClass: "nav-menu",

        /* css class for a top-level navigation item in the megamenu */
        topNavItemClass: "nav-item",

        /* css class for a megamenu panel */
        panelClass: "sub-nav",

        /* css class for a group of items within a megamenu panel */
        panelGroupClass: "sub-nav-group",

        /* css class for the hover state */
        hoverClass: "hover",

        /* css class for the focus state */
        focusClass: "focus",

        /* css class for the open state */
        openClass: "open"
    });
	

});


/*
jQuery( document ).ready(function() {
"use strict";
	
	jQuery(".nav-item").on("mouseenter mouseover", function() {
		//alert("mouseenter");
	  jQuery(this).find(".sub-nav, li").show();
	});
	
	jQuery(".nav-item").on("mouseleave", function() {
	  jQuery(this).find(".sub-nav, li").hide();
	});
	
	///////////////////////////////////////////////////////////////////////
	
	
	jQuery(".nav-item").on("keydown", function() {

	var li = jQuery(this).find(".sub-nav, li");
	  if (li.is(":hidden")) {
		li.show();
		  //alert("keydown");
	  }
		
		
	  
	});
	

});

*/