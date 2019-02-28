# Release Notes
Started as of September 11, 2018

2018/09/11
* Styling adjustments to make Peer Coaching Events display well in popups/dialogs (related to Drupal-Modules issue 101 and ticketed in this repo at [24](../../issues/24))
* Fix missing "X" button in dialog by removing boostrap.js (also [24](../../issues/24))
* Make dialog work for logged-out/anonymous users via an including in the libraries.yml file (unticketed)

2018/12/15
* Hide homepage h1 visually but still accessible to screen readers (fixes [35](../../issues/35))
* Adjust styling for new Views output of buckets as wrapped in <a>s (and remove JS formerly meant to make these more linky) (fixes [29](../../issues/29))
* More robust output and CSS for individual fellowship pages (fixes [33](../../issues/33))

2019/01/10
* Update twig templates that redirect traffic to custom pages to use the /tutoring URI instead of /peer-coaching (fixes [41](../../issues/41))

2019/02/07
* Hack to allow (along w/ config and AC modules changes) review session information to display in the same popup currently used for Calendly (fixes [44](../../issues/44))

2019/02/29
* Add styling for the GDPR/cookie-related notice (fixes [47](../../issues/47))
