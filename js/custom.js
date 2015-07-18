$(document).ready(function()
{
  fixedNavbar(); //sticky navbar

  activeAccordion(); //change active accordion color

  smoothScroll();

  shuffleme.init(); //filter portfolio

});

var shuffleme = (function( $ ) {
  'use strict';
  var $grid = $('#grid'),
      $filterOptions = $('.portfolio-sorting li'),
      $sizer = $grid.find('.shuffle_sizer'),

  init = function() {

    // None of these need to be executed synchronously
    setTimeout(function() {
      listen();
      setupFilters();
    }, 100);

    // instantiate the plugin
    $grid.shuffle({
      itemSelector: '[class*="col-"]',
      sizer: $sizer    
    });
  },

      

  // Set up button clicks
  setupFilters = function() {
    var $btns = $filterOptions.children();
    $btns.on('click', function(e) {
      e.preventDefault();
      var $this = $(this),
          isActive = $this.hasClass( 'active' ),
          group = isActive ? 'all' : $this.data('group');

      // Hide current label, show current label in title
      if ( !isActive ) {
        $('.portfolio-sorting li a').removeClass('active');
      }

      $this.toggleClass('active');

      // Filter elements
      $grid.shuffle( 'shuffle', group );
    });

    $btns = null;
  },

  // Re layout shuffle when images load. This is only needed
  // below 768 pixels because the .picture-item height is auto and therefore
  // the height of the picture-item is dependent on the image
  // I recommend using imagesloaded to determine when an image is loaded
  // but that doesn't support IE7
  listen = function() {
    var debouncedLayout = $.throttle( 300, function() {
      $grid.shuffle('update');
    });

    // Get all images inside shuffle
    $grid.find('img').each(function() {
      var proxyImage;

      // Image already loaded
      if ( this.complete && this.naturalWidth !== undefined ) {
        return;
      }

      // If none of the checks above matched, simulate loading on detached element.
      proxyImage = new Image();
      $( proxyImage ).on('load', function() {
        $(this).off('load');
        debouncedLayout();
      });

      proxyImage.src = this.src;
    });

    // Because this method doesn't seem to be perfect.
    setTimeout(function() {
      debouncedLayout();
    }, 500);
  };      

  return {
    init: init
  };
}( jQuery ));

function fixedNavbar()
{
  var $header = $('nav');
        
  $(window).scroll(function() 
  {
    var scroll = $(this).scrollTop();

    if( scroll >= 48 )
    {
      $header.addClass('navbar-fixed-top');
      $('body').addClass('add-nav-padding');
    } 
    else 
    {
      $header.removeClass('navbar-fixed-top');
      $('body').removeClass('add-nav-padding');
    }
  });
};

function smoothScroll()
{
  //snippet from -> https://css-tricks.com/snippets/jquery/smooth-scrolling/

  $("#navigation ul li a[href^='#']").click(function()
  {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) 
    {
      var target = $(this.hash); // store hash
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) 
      {
        $('html,body').animate({
          scrollTop: target.offset().top - 90
        }, 900);
        window.location.hash = hash;
      }
    }
  });
}

function activeAccordion()
{
	$('#accordion > .panel').on('show.bs.collapse', function (e) 
  {
      var heading = $(this).find('.panel-heading');
      heading.addClass("active");        
	});
	
	$('#accordion > .panel').on('hidden.bs.collapse', function (e) 
  {
	  var heading = $(this).find('.panel-heading');
    heading.removeClass("active");
	});
};