(function ($) {
  $(document).ready(function(event) {
    var navBar = $("#nav-bar");
    var body = $("body");
    // Fixed position menus after scrolling down past their location on the page
    if ($(window).width() > 640) {
      var toolbarTabHeight = $("#toolbar-administration .toolbar-tab:first").outerHeight() || 0;
      var toolbarTrayHeight = $(".toolbar-horizontal #toolbar-administration .toolbar-tray:first").outerHeight() || 0;
      var toolbarHeight = toolbarTabHeight + toolbarTrayHeight; // for some reason $("#toolbar-administration").outerHeight() is always returning 0 for me
      var navBarOffset = navBar.offset().top;
      $(document).on("scroll", function() {
        if ($(document).scrollTop() > navBarOffset - toolbarHeight) {
          navBar.addClass("sticky");
          navBar.css({
            "top" : toolbarHeight + "px",
          });
          body.css("margin-top",navBar.outerHeight()); // margin instead of padding since Drupal is already using padding to account for the admin toolbar
        } else {
          navBar.removeClass("sticky");
          body.css("margin-top","0");
        }
      });
    }
  });
})(jQuery);
