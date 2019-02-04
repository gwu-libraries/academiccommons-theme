(function ($) {

  // This makes the Calendly link pop open in the same window since Views strips out onclick attributes
  // It used to use `a[href*="calendly"]` but we also want to hack something together for non-Calendly links (see below)
  $('.peer-coaching-detail a:first').each(function() {
    $(this).attr("onclick","Calendly.showPopupWidget('" + $(this).attr("href") + "');return false;");
  });

  // Hack to reuse popup intended for Calendly links to now also show the value of the "Review Session Info" field
  if (window.self != window.top) {
    // If inside an iframe, hide elements like headers and footers that make for possible infinite nesting and linking from within the iframe we'd rather avoid
    // Doing as injected <style> instead of .find() since #block-academiccommonsfooter (at least) doesn't seem to load at same time as the rest of the page
    $(".peer_coaching_appointment_rsvp").prepend("<style type='text/css'>#toolbar-administration, .region-header, #block-lai-page-title, #block-lai-local-tasks, #block-views-block-peer-coaching-detail-block-1, .region-footer, #drupal-live-announce, #block-academiccommonsfooter { display: none; } </style>");
    // Though do turn on the field we normally hide in display if somebody lands on the node from search
    $(".peer_coaching_appointment_rsvp .peer_coaching_appointment_rsvp__review-session-info").show();
    // Make sure any links within the field, such as to other GW departments, open in a new tab instead of possibly within the iframe
    $(".peer_coaching_appointment_rsvp #content a").attr("target","_blank");
  }

})(jQuery);
