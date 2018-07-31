(function ($) {

  // This makes the Calendly link pop open in the same window since Views strips out onclick attributes
  $('.peer-coaching-detail a[href*="calendly"]').each(function() {
    $(this).attr("onclick","Calendly.showPopupWidget('" + $(this).attr("href") + "');return false;");
  });

})(jQuery);
