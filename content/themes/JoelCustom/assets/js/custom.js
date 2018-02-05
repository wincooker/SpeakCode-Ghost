
(function($) {
    "use strict";

// Initialize preloader (dependency imageLoaded plugin)
// ----------------------------------------------------
    preloader();
// Initialize Plugins

    var chartOpts = {
        size: 150,
        scaleLength: 1,
        barColor: "#fff",
        trackColor: false,
        lineWidth: 7,
        scaleColor: false,
        lineCap: "square",
        rotate: 90
    },
    smoothScrollOpts = {
        direction: "top",
        offset: -65
    };


// Initialize Easy Pie Chart
 $(".chart .chart-draw").easyPieChart(chartOpts);
 // and set it to 0, update it inside waypoint.
 $(".chart .chart-draw").each(function() {
    var s = $(this);
    s.data("easyPieChart").update(0);
});

// Smooth scroll plugin (learn-more btn)
// ---------------------------------
    $(".learn-more > a").smoothScroll(smoothScrollOpts);

// EasyPieChart Plugin with waypoint
// ---------------------------------
$(".skills").waypoint({
    handler: function() {
        // Update chart
        $(".chart .chart-draw").each(function() {
            var s = $(this);
            // Addition callback function for step added customarily in easypiechart
            s.data("easyPieChart").update(s.attr("data-percent"), function(percent) {
                 s.find("em").text(Math.round(percent) + "%");
            });
        });
    },
    triggerOnce: true,
    offset: "90%"
});



// Animate Statistics with waypoint
// -----------------------------------
function animateStats() {
    var $stats = $(".statistics").find(".num");
    var arr = [];
    $stats.each(function(i) {
        arr[i] = $(this).text();
    });
    $(".statistics").waypoint({
        handler: function() {
            $stats.each(function(i) {
                var $s = $(this);
                $({tmp: 0}).animate({tmp: arr[i]}, {
                    duration: 1200,
                    easing: "swing",
                    step: function() {
                        $s.text(Math.ceil(this.tmp));
                    }
                });
            });
        },
        triggerOnce: true,
        offset: "90%",
    });
}
animateStats();


// Animate Resume Page with waypoint
// ------------------------------------
function animateResumePage() {
    var $rDescBox = $(".resume .timeline-cont .desc-box"),
        oddBox = $rDescBox.filter(":odd"),
        evenBox = $rDescBox.filter(":even");
    $rDescBox.addClass("ar-desc-box");
    oddBox.addClass("ar-left");
    evenBox.addClass("ar-right");

    $rDescBox.waypoint({
        handler:function() {
            var $s = $(this);
            if($s.hasClass("ar-left")) 
                $s.removeClass("ar-left");
            else
                $s.removeClass("ar-right");
        },
        triggerOnce: true,
        offset: "100%"
    });
}
animateResumePage();    // Initialize



// Magnific Popup 
// -----------------------------------------
$(".filter-port figure a").magnificPopup({
    type: "image",
    titleSrc: "title",
    key: "image-key",
    verticalFit: true,
    mainClass: "image-popup-style", // This same class is used for video popup
    tError: '<a href="%url%">The image</a> could not be loaded.',
    gallery: {
        enabled: true
    },
    callbacks: {
        open: function() {
            this.content.addClass("fadeInLeft");
        },
        close: function() {
            this.content.removeClass("fadeInLeft");
        }
    }
});

$(".filter-port figure a.ajax-content").magnificPopup({
    type: "ajax"
});



// Isotope Filter 
// ----------------------------------------------
function isotopeInit() {
    var $container = $(".filter-port"),
        $filter = $(".filter-menu");

    $(window).on("load resize", function() {
        $container.isotope({
            itemSelector: ".item",
            animationEngine: "best-available",
            transformsEnabled: true,
            resizesContainer: true,
            resizable: true,
            easing: "linear",
            layoutMode: "masonry"
        });

        $filter.find("a").on("click touchstart", function(e) {
            var $t = $(this),
                selector = $t.data("filter");
            // Don't proceed if already selected
            if($t.hasClass("filter-current"))
                return false;

            $filter.find("a").removeClass("filter-current");
            $t.addClass("filter-current");
            $container.isotope({filter: selector});

            e.stopPropagation();
            e.preventDefault(); 
        });
    })
}
// Initialization
    isotopeInit();


// Form Validation and Settings
// ---------------------------------
function formValidation() {
    var $form = $("#contact-form"),
    successMsg = "<span class='elegant-eleganticons-44 form-success'>Your message has been sent!</span>",
    errorMsg = "<span class='elegant-eleganticons-45 form-error'>Oops! something went wrong with the server.</span>",
    response;
    $form.validate({    
        rules: {
            "name": {
                required: true,
                minlength: 2
            },
            "email": "required",
            "message": {
                required: true,
                minlength: 5
            }
        },
        errorClass: "invalid-error",
        errorElement: "span",
        
    });

    $form.submit(function(e) {
        if($form.valid()) {
            $.ajax({
                url: $form.attr("action"),
                type: "POST",
                data: $form.serialize(),
                success: function() {
                    response = successMsg;
                },
                error: function() {
                    response = errorMsg;
                },
                complete: function() {
                    $(".form-success, .form-error").remove();
                    $form.find("#form-submit").parent().after($(response).fadeIn(500, function() {
                        $form[0].reset();
                    }));
                }
            });
        }
        e.preventDefault(); // Prevent default form submit
    });
}
// Initialization
formValidation();


// Testimonials (Owl Carousel Config) 
// ----------------------------------

function owlCarouselConfig() {
    var owl = $("#owl-carousel"),
            owlOpts = {
                slideSpeed: 200,
                paginationSpeed: 200,
                rewindSpeed: 800,
                singleItem: true,
                autoPlay: true,
                pagination: false, // disable default pagination
                responsive: true
            };

    owl.owlCarousel(owlOpts);
    // Custom Pagination Init
    var $pagination = $(".testimonials").find(".arrows"),
        $next = $pagination.find(".next"),
        $back = $pagination.find(".back");

    $next.click(function() {
        owl.trigger("owl.next");
    });
    $back.click(function() {
        owl.trigger("owl.prev");
    });
}
// Initialization
owlCarouselConfig();


// Main Navigation Config 
// ------------------------
function mainNavInit() {
    var $mainNav = $(".main-nav"),
        $aboutSec = $(".inner-nav a[href='#about']");
    $mainNav.find(".nav-control").on("click touchstart", function(e) {
       if(e.target.parentNode == this) {
            $(this).find(".inner-nav").toggleClass("show-nav");
            e.stopPropagation();
            e.preventDefault();
       }

    });

    // initialize smooth scroll for this    
    $aboutSec.smoothScroll(smoothScrollOpts); // for `aboutSection` offset is different.
    $mainNav.find(".inner-nav a").not($aboutSec).smoothScroll({
        direction: "top",
        offset: -104,
        speed: 800
    });

    
}
// Iniitialization
mainNavInit();


// Words Rotater 
// ---------------------------------------------
function wordsRotaterInit() {
  $("#words-rotate").textrotator({
    animation: "dissolve",  // Options are `dissolve, fade, flip, flipUp, flipCube, flipCubeUp and spin.`
    separator: ",",
    speed: 2000
  });
}
wordsRotaterInit();




// Preloader (require pace.min.js)
    function preloader() {
        $(window).on("load", function() {
            Pace.on("done",function() {
                $("#preload").delay(100).fadeOut(500);
            });
        });
    }

})(jQuery);