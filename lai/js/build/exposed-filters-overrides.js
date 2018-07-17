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

      // Add class to ancestors of "input:checked" elements to indicate that something there was selected
      function checkedChildren() {
        var withCheckedChildren = $(".find-fellowships .checked-children");
        withCheckedChildren.find("legend").removeAttr("data-checked-children-quantity");
        withCheckedChildren.removeClass("checked-children");
        $(".find-fellowships .checked-children").removeClass("checked-children");
        var checkedFieldsets = $(".find-fellowships fieldset:has(input:checked)");
        checkedFieldsets.each(function() {
          $(this).addClass("checked-children");
          $(this).find("legend").attr("data-checked-children-quantity",$(this).find("input:checked").length);
	});
      }

      // Honestly am not quite sure why I can do ajaxStart once, but adding once() to ajaxStop doesn't make things work.
      // Or why I really even need ajaxStop in the first place.
      // Probably could use some improvement, but it's at least working for now.
      $(document, context).once().ajaxStart(checkedChildren);
      $(document, context).ajaxStop(checkedChildren);

    }
  }
})(jQuery);
