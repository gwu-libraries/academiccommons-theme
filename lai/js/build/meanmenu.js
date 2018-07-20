/*
  This file has been modified from its original to include the following new options/variables:
  menuText: in order to allow for the website's name to be displayed at top instead of just the word "MENU"
  insertionMethod: in order to allow using 'append' instead of 'prepend' since our Drupal regions might be different from the assumed case
*/

(function($) {
    "use strict";
    $.fn.meanmenu = function(options) {
        var defaults = {
            meanMenuTarget: jQuery(this), // Target the current HTML markup you wish to replace
            meanMenuContainer: '.region.region-navigation', // Choose where meanmenu will be placed within the HTML
            meanMenuClose: "X", // single character you want to represent the close menu button
            meanMenuCloseSize: "18px", // set font size of close button
            meanMenuOpen: "<span /><span /><span />", // text/markup you want when menu is closed
            meanRevealPosition: "right", // left right or center positions
            meanRevealPositionDistance: "0", // Tweak the position of the menu
            meanRevealColour: "", // override CSS colours for the reveal background
            meanScreenWidth: "480", // set the screen width you want meanmenu to kick in at
            meanNavPush: "", // set a height here in px, em or % if you want to budge your layout now the navigation is missing.
            meanShowChildren: true, // true to show children in the menu, false to hide them
            meanExpandableChildren: true, // true to allow expand/collapse children
            meanExpand: "+", // single character you want to represent the expand for ULs
            meanContract: "-", // single character you want to represent the contract for ULs
            meanRemoveAttrs: false, // true to remove classes and IDs, false to keep them
            onePage: false, // set to true for one page sites
            meanDisplay: "block", // override display method for table cell based layouts e.g. table-cell
            removeElements: "", // set to hide page elements
            menuText: "MENU", // text you want showing at the left of the meanmenu on the same line as the hamburger
            insertionMethod: "prepend", // how to hang the new element into meanMenuContainer (prepend or append)
        };
        options = $.extend(defaults, options);
        // get browser width
        var currentWidth = window.innerWidth || document.documentElement.clientWidth;
        return this.each(function() {
            var meanMenu = options.meanMenuTarget;
            var meanContainer = options.meanMenuContainer;
            var meanMenuClose = options.meanMenuClose;
            var meanMenuCloseSize = options.meanMenuCloseSize;
            var meanMenuOpen = options.meanMenuOpen;
            var meanRevealPosition = options.meanRevealPosition;
            var meanRevealPositionDistance = options.meanRevealPositionDistance;
            var meanRevealColour = options.meanRevealColour;
            var meanScreenWidth = options.meanScreenWidth;
            var meanNavPush = options.meanNavPush;
            var meanRevealClass = ".meanmenu-reveal";
            var meanShowChildren = options.meanShowChildren;
            var meanExpandableChildren = options.meanExpandableChildren;
            var meanExpand = options.meanExpand;
            var meanContract = options.meanContract;
            var meanRemoveAttrs = options.meanRemoveAttrs;
            var onePage = options.onePage;
            var meanDisplay = options.meanDisplay;
            var menuText = options.menuText;
            var insertionMethod = options.insertionMethod;

            var $trm = "#nav-bar";

            if ($('.utility-links').length) {
                var $trm = $trm + ", .utility-links";
            }
            var removeElements = $trm;

            var $tli = $('#util-l li').clone();
            var $tri = $('#util-r li').clone();
            var $tsearch = $('#google-appliance-block-form').clone();
            var $tcta = $('#smallBtn a').clone();
            var $tmain = $('#nav-bar-wrapper');

            $tsearch.find('form').unwrap();
            $tsearch.find('input').unwrap();
            $tsearch.find('h2').unwrap();

            $tsearch.find('form fieldset').remove();


            var $meanMenuExist = false;

            var gwuMeanExist = function($meanMenuExist) {
                if ($meanMenuExist == true) {
                    $tsearch.prependTo(jQuery(meanMenu).find('ul').eq(0));
                    $tcta.appendTo(jQuery(meanMenu).find('ul').eq(0));
                    $tli.appendTo(jQuery(meanMenu).find('ul').eq(0));
                    $tri.appendTo(jQuery(meanMenu).find('ul').eq(0));
                    $tmain.detach();

                } else {
                    $tsearch.detach();
                    $tcta.detach();
                    $tli.detach();
                    $tri.detach();
                    $tmain.appendTo(jQuery('#nav-bar'));
                }
            }

            //detect known mobile/tablet usage
            var isMobile = false;
            if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) ||
                (navigator.userAgent.match(/iPad/i)) || (navigator.userAgent.match(/Android/i)) ||
                (navigator.userAgent.match(/Blackberry/i)) || (navigator.userAgent.match(/Windows Phone/i))) {
                isMobile = true;
            }

            if ((navigator.userAgent.match(/MSIE 8/i)) || (navigator.userAgent.match(/MSIE 7/i))) {
                // add scrollbar for IE7 & 8 to stop breaking resize function on small content sites
                jQuery('html').css("overflow-y", "scroll");
            }

            var meanRevealPos = "";
            var meanCentered = function() {
                if (meanRevealPosition === "center") {
                    var newWidth = window.innerWidth || document.documentElement.clientWidth;
                    var meanCenter = ((newWidth / 2) - 22) + "px";
                    meanRevealPos = "left:" + meanCenter + ";right:auto;";
                    if (!isMobile) {
                        jQuery('.meanmenu-reveal').css("left", meanCenter);
                    } else {
                        jQuery('.meanmenu-reveal').animate({
                            left: meanCenter
                        });
                    }
                }
            };

            var menuOn = false;
            var $meanMenuExist = false;
            gwuMeanExist($meanMenuExist);
            if (meanRevealPosition === "right") {
                meanRevealPos = "right:" + meanRevealPositionDistance + ";left:auto;";
            }
            if (meanRevealPosition === "left") {
                meanRevealPos = "left:" + meanRevealPositionDistance + ";right:auto;";
            }

            // run center function
            meanCentered();
            // set all styles for mean-reveal
            var $navreveal = "";

            var meanInner = function() {
                // get last class name
                if (jQuery($navreveal).is(".meanmenu-reveal.meanclose")) {
                    $navreveal.html(meanMenuClose);
                } else {
                    $navreveal.html(meanMenuOpen);
                }
            };

            // re-instate original nav (and call this on window.width functions)
            var meanOriginal = function() {
                jQuery('.mean-bar,.mean-push').remove();
                jQuery(meanContainer).removeClass("mean-container");
                jQuery(meanMenu).css('display', meanDisplay);
                menuOn = false;
                $meanMenuExist = false;
                gwuMeanExist($meanMenuExist);
                jQuery(removeElements).attr("aria-hidden", "false");
                jQuery(removeElements).removeClass('mean-remove');
            };

            // navigation reveal
            var showMeanMenu = function() {
                //var meanStyles = "background:" + meanRevealColour + "; color:" + meanRevealColour + "; " + meanRevealPos;
                var meanStyles = meanRevealPos;
                if (currentWidth <= meanScreenWidth) {
                    jQuery(removeElements).attr("aria-hidden", "true");
                    jQuery(removeElements).addClass('mean-remove');
                    $meanMenuExist = true;
                    gwuMeanExist($meanMenuExist);

                    // add class to body so we don't need to worry about media queries here, all CSS is wrapped in '.mean-container'
                    jQuery(meanContainer).addClass("mean-container");
                    jQuery('.mean-container')[insertionMethod]('<div id="navigation-mobile" role="navigation" class="mean-bar"><span id="mobile-menu-label">' + menuText + '</span><a role="button" aria-label="mobile menu" aria-controls="mean-bar" aria-pressed="false" aria-expanded="false" href="#nav" class="meanmenu-reveal" style="' + meanStyles + '">Show Navigation</a><nav class="mean-nav"></nav></div>');
                    //push meanMenu navigation into .mean-nav
                    var meanMenuContents = jQuery(meanMenu).html();
                    jQuery('.mean-nav').html(meanMenuContents);



                    // remove all classes from EVERYTHING inside meanmenu nav
                    if (meanRemoveAttrs) {

                        jQuery('nav.mean-nav ul, nav.mean-nav ul *').each(function() {
                            // First check if this has mean-remove class
                            if (jQuery(this).is('.mean-remove')) {
                                jQuery(this).attr('class', 'mean-remove');
                            } else {
                                if (jQuery(this).hasClass('util-item')) {
                                    jQuery(this).attr('class', 'uitm');
                                    } else {
                                    jQuery(this).removeAttr("class");
                                }
                            }

                            jQuery(this).removeAttr("id");

                            if (jQuery(this).is('form')) {
                                jQuery(this).attr('class', 'mobile-search').wrap("<li>");
                            }
                            if (jQuery(this).is('form h2')) {
                                jQuery(this).attr('class', 'element-invisible');
                            }
                            if (jQuery(this).is('form label')) {
                                jQuery(this).attr('class', 'element-invisible');
                            }
                            if (jQuery(this).not('li a').is('a')) {
                                jQuery(this).attr('class', 'mobile-cta').wrap("<li class=\"mobile-cta-p\">");
                            }

                        });
                    }

                    // push in a holder div (this can be used if removal of nav is causing layout issues)
                    //jQuery(meanMenu).before('<div id="main-nav" />');
                    //jQuery('.mean-push').css("margin-top", meanNavPush);

                    // hide current navigation and reveal mean nav link
                    jQuery(meanMenu).hide();
                    jQuery(".meanmenu-reveal").show();

                    // turn 'X' on or off
                    jQuery(meanRevealClass).html(meanMenuOpen);
                    $navreveal = jQuery(meanRevealClass);

                    //hide mean-nav ul
                    jQuery('.mean-nav ul').hide().attr("aria-hidden", "true");
                    // hide sub nav
                    if (meanShowChildren) {
                        // allow expandable sub nav(s)
                        if (meanExpandableChildren) {

                            jQuery('.mean-nav ul ul').each(function() {
                                jQuery(this).css("visibility", "");
                                jQuery(this).attr("aria-hidden", "true");

                                if (jQuery(this).children().length) {
                                    jQuery(this, 'li:first').parent().append('<a role="button" aria-pressed="false" aria-expanded="false" aria-label="mobile sub menu" aria-controls="mean-bar-sub"  class="mean-expand" href="#" style="font-size: ' + meanMenuCloseSize + '">' + meanExpand + '</a>');
                                }
                            });

                            jQuery('.mean-expand').on("click", function(e) {
                                e.preventDefault();
                                if (jQuery(this).hasClass("mean-clicked")) {
                                    jQuery(this).text(meanExpand);
                                    jQuery(this).attr({"aria-pressed": false, "aria-expanded": false});
                                    jQuery(this).prev('ul').slideUp(300, function() {});
                                    jQuery(this).prev('ul').attr("aria-hidden", "true");
                                } else {
                                    jQuery(this).text(meanContract);
                                    jQuery(this).attr({"aria-pressed": true, "aria-expanded": true});
                                    jQuery(this).prev('ul').slideDown(300, function() {});
                                    jQuery(this).prev('ul').attr("aria-hidden", "false");
                                }

                                jQuery(this).toggleClass("mean-clicked");
                            });
                        } else {
                            jQuery('.mean-nav ul ul').show();

                        }
                    } else {
                        jQuery('.mean-nav ul ul').hide();
                    }
                    // add last class to tidy up borders


                    jQuery('.mean-nav ul li').last().addClass('mean-last');
                    $navreveal.removeClass("meanclose");

                    jQuery($navreveal).click(function(e) {
                        e.preventDefault();
                        if (menuOn === false) {
                            $navreveal.css("text-align", "center");
                            $navreveal.css("text-indent", "0");
                            $navreveal.css("font-size", meanMenuCloseSize);
                            $navreveal.attr({"aria-pressed": true, "aria-expanded": true});
                            jQuery('.mean-nav ul:first').slideDown().attr("aria-hidden", "false");
                            menuOn = true;
                        } else {
                            $navreveal.attr({"aria-pressed": false, "aria-expanded": false});
                            jQuery('.mean-nav ul:first').slideUp().attr("aria-hidden", "true");
                            menuOn = false;
                        }
                        $navreveal.toggleClass("meanclose");
                        meanInner();
                        jQuery(removeElements).addClass('mean-remove');
                    });
                    // for one page websites, reset all variables...
                    if (onePage) {
                        jQuery('.mean-nav ul > li > a:first-child').on("click", function() {
                            jQuery('.mean-nav ul:first').slideUp();
                            menuOn = false;
                            jQuery($navreveal).toggleClass("meanclose").html(meanMenuOpen);
                        });
                    }
                } else {
                    meanOriginal();
                }
            };
            if (!isMobile) {

                // reset menu on resize above meanScreenWidth
                jQuery(window).resize(function() {
                    currentWidth = window.innerWidth || document.documentElement.clientWidth;
                    if (currentWidth > meanScreenWidth) {
                        meanOriginal();
                    } else {
                        meanOriginal();
                    }
                    if (currentWidth <= meanScreenWidth) {
                        showMeanMenu();
                        meanCentered();
                    } else {
                        meanOriginal();
                    }
                });
            }

            jQuery(window).resize(function() {
                // get browser width
                currentWidth = window.innerWidth || document.documentElement.clientWidth;
                if (!isMobile) {
                    meanOriginal();
                    if (currentWidth <= meanScreenWidth) {
                        showMeanMenu();
                        meanCentered();
                    }
                } else {
                    meanCentered();
                    if (currentWidth <= meanScreenWidth) {
                        if ($meanMenuExist === false) {
                            gwuMeanExist($meanMenuExist);
                            showMeanMenu();
                        }
                    } else {
                        gwuMeanExist($meanMenuExist);
                        meanOriginal();
                    }
                }
            });

            // run main menuMenu function on load
            showMeanMenu();
        });
    };

})(jQuery);
