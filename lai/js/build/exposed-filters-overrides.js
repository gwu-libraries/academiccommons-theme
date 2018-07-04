(function ($) {
  Drupal.behaviors.exposedFiltersOverrides = {
    attach: function(context, settings) {
      $(".find-fellowships fieldset", context).each(function() {
        $(this).attr("tabindex","0");
      });
      $(".find-fellowships fieldset input", context).on("blur", function(e) {
	var current = $(e.currentTarget);
	var related = $(e.relatedTarget);
//console.log(current.closest("fieldset").attr("id"));
//console.log(related.closest("fieldset").attr("id") == undefined);
        if (related.prop("tagName") != "INPUT") {
	  if (related.closest("fieldset").attr("id") != current.closest("fieldset").attr("id") || current.closest("fieldset").attr("id") == undefined) {
//	  console.log("do nothing");
//        } else {
//	  console.log("remove class from ancestor");
          $(".focused-child").removeClass("focused-child");
//	  console.log("class removed");
        }
}
      });
      $(".find-fellowships fieldset", context).on("blur", function(e) {
        if ($(this).has($(e.relatedTarget)).length > 0) {
	  $(this).addClass("focused-child");
        } else {
	  $(this).removeClass("focused-child");
	}
      });
    }
  }
})(jQuery);
