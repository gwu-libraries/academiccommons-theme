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
