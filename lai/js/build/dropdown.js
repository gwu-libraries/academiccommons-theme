jQuery( document ).ready(function() {
//alert("kyle");
	"use strict";
  jQuery("#search-dropdown").on("click", "li", function() {
	  jQuery("#current-search-text-a").text(jQuery(this).find(".search-label").text());
	  jQuery("#search-form input[type=text]").attr("placeholder",jQuery(this).data("placeholder"));
	  jQuery("#home-search-explanation").html(jQuery(this).find(".search-description").html());
	  jQuery("#search-dropdown ul").hide();
	  jQuery("#search-form input[type=text]").focus();
	  jQuery("#catalog-options").hide();
	  jQuery("#journals-options").hide();
	  if (this.id == "search-catalog") {
	    jQuery("#catalog-options").show();
	  }
	  if (this.id == "search-journals") {
	    jQuery("#journals-options").show();
	  }
  });

	jQuery("#search-dropdown").on("click", "a", function(e) {
	  e.preventDefault();
	});

	jQuery("#search-dropdown").on("keydown", function(e) {
	  var ul = jQuery(this).find("ul");
	  if (ul.is(":hidden")) {
	    ul.show();
	  }
	  var searchLabels = jQuery("#internal-search a");
	  var nearestLabel = searchLabels.filter(":focus");
	  var nearestLabelIndex = searchLabels.index(searchLabels.filter(":focus"));
	  if (e.which == 38) { // Up arrow
	    if (nearestLabel.length == 0) {
	      searchLabels.last().focus();
	    } else {
	      searchLabels.eq(nearestLabelIndex - 1).focus();
	    }
	    e.preventDefault(); // page scrolling
	  }
	  if (e.which == 40) { // Down arrow
	    if (nearestLabelIndex == searchLabels.length - 1) {
	      searchLabels.first().focus();
	    } else {
	      searchLabels.eq(nearestLabelIndex + 1).focus();
	    }
	    e.preventDefault(); // page scrolling
	  }
	});

	jQuery("#search-dropdown").on("mouseenter mouseover", function(e) {
	  jQuery(this).find("ul").show();
	});
	jQuery("#search-dropdown").on("mouseleave", function(e) {
	  jQuery(this).find("ul").hide();
	});


});