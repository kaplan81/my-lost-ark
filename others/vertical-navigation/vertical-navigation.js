jQuery(document).ready(function(){ 
	var currentLocation = location.href;	
	var hashPosition = currentLocation.indexOf('#');
	if (hashPosition > 1) {
		currentLocation = currentLocation.substr(0, hashPosition);
	}

	//Get Sections top position
	function getTargetTop(elem){	
		//gets the id of the section header
		//from the navigation's href e.g. ("#html")
		var id = elem.attr("href");
		id = id.substr(id.indexOf('#'));
		//Height of the navigation
		var offset = $('.navbar').height();
		//Gets the distance from the top and 
		//subtracts the height of the nav.
		return $(id).offset().top - offset;
	}
	var topBarHeight = $('.topbar').height();
	function getTargetTopConcrete(elem) {
		var offset = $('.navbar').height();
		return elem.offset().top - offset - topBarHeight;
	}

	// For the sections that do not navigate neither to the top or the bottom of the page.
	var secondSection = 2;
	var nextTolastSection = 7; //In this case.
	for (var i = secondSection; i <= nextTolastSection; i++) {
		var target = getTargetTopConcrete($('#sections section:nth-child('+i.toString()+')'));
		$('.target'+i.toString()+'-anchor').click(function(event) {
			$('html, body').animate({scrollTop:target}, 500);
		});
	};
	// For the eighth and last target/section of the page: Contact in this case.
	var contactTarget = $(document).height();
	$('.contact-button, .contact-button-slide').click(function(event) {
		$('html, body').animate({scrollTop:contactTarget}, 500);
		event.preventDefault();
	});

	//Smooth scroll when user click link that starts with #
	var elemHref = $('.navbar-right a[href^="#"], .navbar-right a[href^="' + currentLocation + '#"], .navbar-right a[href^="' + currentLocation + '/#"]')
	elemHref = $($.grep(elemHref, function (section) {
    var hash = $(section).attr('href');
    hash = hash.substr(hash.indexOf('#'));
    return $(hash).length > 0;
        }));
	elemHref.click(function(event) {
		//alert (currentLocation);
		//gets the distance from the top of the 
		//section refenced in the href.
		var target = getTargetTop($(this));
		//scrolls to that section.
		$('html, body').animate({scrollTop:target}, 500);
		//prevent the browser from jumping down to section.
		event.preventDefault();
	});
});