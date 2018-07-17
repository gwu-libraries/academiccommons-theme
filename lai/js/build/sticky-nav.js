(function ($) {
  $(document).ready(function(event) {
    var navBar = $("#nav-bar");
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
        } else {
          navBar.removeClass("sticky");
        }
      });
    }
  });
})(jQuery);
