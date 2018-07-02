jQuery( document ).ready(function() {

	jQuery(".search-dropdown").on("click", ".search-dropdown-ul li", function() {
	  searchDropdown(jQuery(this));
	});
	jQuery(".search-label").on("keypress", function(e) {
	  if (e.which == 13) { // Enter
		searchDropdown(jQuery(this).parent());
		e.preventDefault();
	  }
	});

	function searchDropdown(passedThis) {
	  jQuery(".current-search-text").text(passedThis.find(".search-label").text());
	  jQuery("#search-form input[type=text]").attr("placeholder",passedThis.data("placeholder"));
	  jQuery("#home-search-explanation").html(passedThis.find(".search-description").html());
	  jQuery(".search-dropdown ul").hide();
	  jQuery("#home-search-explanation").show();
	  jQuery("#search-form input[type=text]").focus();
	  jQuery("#catalog-options").hide();
	  jQuery("#journals-options").hide();
	  if (passedThis.attr("id") == "search-catalog") {
		jQuery("#catalog-options").show();
	  }
	  if (passedThis.attr("id") == "search-journals") {
		jQuery("#journals-options").show();
	  }
	}

	jQuery(".search-dropdown").on("click", "a", function(e) {
	  e.preventDefault();
	});

	jQuery(".search-dropdown").on("keydown", function(e) {
	  var ul = jQuery(this).find("ul");
	  if (ul.is(":hidden")) {
		ul.show();
	  }
	  var searchLabels = jQuery(".search-label");
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

	jQuery(".search-dropdown").on("mouseenter mouseover", function() {
	  jQuery(this).find("ul").show();
	});
	jQuery(".search-dropdown").on("mouseleave", function() {
	  jQuery(this).find("ul").hide();
	});

});