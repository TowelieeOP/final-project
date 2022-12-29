(function ($) {
	'use strict';



	var mobileDevice = false;

	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		$('html').addClass('mobile');
		mobileDevice = true;
	}

	else {
		$('html').addClass('no-mobile');
		mobileDevice = false;
	}



	$(window).load(function () {

		$('.loader').fadeOut();

		var wow = new WOW({
			offset: 150,
			mobile: false
		}
		);
		wow.init();
	});

	var navbar = $('.js-navbar-affix');
	var windowHeight = $(window).height();
	var navbarAffixHeight = 75


	$('.js-target-scroll, .navbar-nav li a[href^="#"]').on('click', function () {
		var target = $(this.hash);
		if (target.length) {
			$('html,body').animate({
				scrollTop: (target.offset().top - navbarAffixHeight + 1)
			}, 1000);
			return false;
		}
	});


	navbar.affix({
		offset: {
			top: navbarAffixHeight
		}
	});

	navbar.on('affix.bs.affix', function () {
		if (!navbar.hasClass('affix')) {
			navbar.addClass('animated slideInDown');
		}
	});

	navbar.on('affixed-top.bs.affix', function () {
		navbar.removeClass('animated slideInDown');
		$('.navbar-collapse').collapse('hide');
	});





	$('.navbar-collapse').on('show.bs.collapse', function () {
		navbar.addClass('affix');
	});

	$('.navbar-collapse').on('hidden.bs.collapse', function () {
		if (navbar.hasClass('affix-top')) {
			navbar.removeClass('affix');
		}
	});

	$(".navbar-nav > li > a").on('click', function () {
		$(".navbar-collapse").collapse('hide');
	});




	$('body').scrollspy({
		offset: navbarAffixHeight + 1
	});



	if (!mobileDevice) {
		$(window).stellar({
			responsive: true,
			horizontalScrolling: false,
			hideDistantElements: false,
			horizontalOffset: 0,
			verticalOffset: 0
		});
	}



	$('.js-gallery').each(function () {
		$(this).magnificPopup({
			delegate: 'a:not(.link)',
			type: 'image',
			removalDelay: 300,
			tLoading: 'Loading image #%curr%...',
			gallery: {
				enabled: true,
				navigateByImgClick: true,
				preload: [0, 1]
			},
			image: {
				tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
				titleSrc: function (item) {
					return item.el.attr('title') + '<small></small>';
				}
			}

		});
	});



	function progress_bars() {
		$(".progress .progress-bar:in-viewport").each(function () {
			if (!$(this).hasClass("animated")) {
				$(this).addClass("animated");
				$(this).width($(this).attr("data-width") + "%");
			}

		});
	}

	$(window).scroll(function () {
		progress_bars();
	});


	$('.isotope').each(function () {
		var $container = $(this);
		$container.imagesLoaded(function () {
			$container.isotope({
				itemSelector: '.isotope-item',
				percentPosition: true,
				layoutMode: 'masonry',
				masonry: {
					columnWidth: '.isotope-item'
				}
			});
		});
	});




	$('.filter li a').on('click', function () {
		$('.filter .active').removeClass('active');
		$(this).closest('li').addClass('active');
		var selector = $(this).attr('data-filter');
		$('.isotope').isotope({
			filter: selector,
			animationOptions: {
				duration: 500,
				queue: false
			}
		});
		return false;
	});



	$('.js-play').magnificPopup({
		type: 'iframe',
		removalDelay: 300
	});




	$(".review-carousel").owlCarousel({
		singleItem: true,
		autoHeight: true
	});



	$(".partners-carousel").owlCarousel({
		itemsMobile: [479, 1],
		itemsTablet: [768, 2],
		itemsDesktopSmall: [979, 3],
		items: 4,
		autoHeight: true,
		pagination: false
	});



	if ($('.js-ajax-form').length) {
		$('.js-ajax-form').each(function () {
			$(this).validate({
				errorClass: 'error wobble-error',
				submitHandler: function (form) {
					jQuery.ajax({
						type: "POST",
						url: larry_obj.ajaxurl,
						data: 'action=larry_mail_send&' + jQuery(form).serialize(),
						success: function (res) {
							$('.modal').modal('hide');
							$('#success').modal('show');
							jQuery('#mc-notification').html(res);

							jQuery('#mc-form .btn').attr('disabled', false);

						},


						error: function (res) {

							$('.modal').modal('hide');
							$('#error').modal('show');
							jQuery('#mc-notification').html(res);
							jQuery('#mc-form .btn').attr('disabled', false);

						}
					});


				}
			});
		});
	}
})(jQuery);
