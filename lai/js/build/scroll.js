jQuery( document ).ready(function() {


		function someScroll(ev){
	    if(window.pageYOffset>160 && window.innerWidth>1220)document.getElementById("backToTopContainer").style.display = "block";
	    if(window.pageYOffset<160 && window.innerWidth>1220)document.getElementById("backToTopContainer").style.display = "none";
		}
		window.onscroll=someScroll;

		jQuery(window).resize(function() {
			if(window.innerWidth<1220)document.getElementById("backToTopContainer").style.display = "none";
			if(window.innerWidth>1219 && window.pageYOffset>160)document.getElementById("backToTopContainer").style.display = "block";   
		});
	
});