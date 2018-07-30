(function ($) {
//  Drupal.behaviors.resources = {
//    attach: function(context, settings) {
//      $(".resource-bucket a", context).attr("tabindex","-1");
//      $("#main-content", context).on("click keypress", ".resource-bucket", function(e) {
      $(".resource-bucket a").attr("tabindex","-1");
      $(document).ajaxComplete(function(){
        $(".resource-bucket a").attr("tabindex","-1");
      });
      $("#main-content").on("click", ".resource-bucket a", function(e) {
        e.preventDefault();
      });
      $("#main-content").on("click keypress", ".resource-bucket", function(e) {
        if (e.type == "click" || (e.type == "keypress" && (e.which == 13 || e.which == 10))) {
          var link = $(this).find("h2 a")[0].href;
          var windowName = e.ctrlKey == true ? "_blank" : "_self";
          window.open(link, windowName);
        }
      });
//    }
//  }
})(jQuery);
