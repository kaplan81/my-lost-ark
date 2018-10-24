// THIS AGNITIO SLIDE IS IMPLEMENTING http://kenwheeler.github.io/slick/
document.addEventListener('presentationInit', function () {
    var slide = app.slide.slide_0_0 = {
        elements: {
            wholeSlide: '#whole-slide'
        },
        firstTime: true,
        onEnter: function (ele) {
            
            counter = 1;
            console.log(counter);

            $('#contour-launcher1').on('tap', function() {app.goTo('contour_c3_0', 'slide_1_0');});
            $('#contour-launcher2').on('tap', function() {app.goTo('contour_c3_0', 'slide_2_0');});
            $('#contour-launcher3').on('tap', function() {app.goTo('contour_c3_0', 'slide_3_0');});
            $('#contour-launcher4').on('tap', function() {app.goTo('contour_c3_0', 'slide_4_0');});
            $('#contour-launcher5').on('tap', function() {app.goTo('contour_c3_0', 'slide_5_0');});
            $('#contour-launcher6').on('tap', function() {app.goTo('contour_c3_0', 'slide_6_0');});
            $('#contour-launcher7').on('tap', function() {app.goTo('contour_c3_0', 'slide_7_0');});
            $('#contour-launcher8').on('tap', function() {app.goTo('contour_c3_0', 'slide_8_0');});
            $('#contour-launcher9').on('tap', function() {app.goTo('contour_c3_0', 'slide_9_0');});

        	$('#slider1').slick({
        		vertical: true,
                infinite: false,
                arrows: false,
                swipe: false
        	});

            app.addEvent('swipeup', slide.swipeUp, slide.element.wholeSlide); 
            app.addEvent('swipedown', slide.swipeDown, slide.element.wholeSlide);         
        },
        onExit: function (ele) {
            counter = 1;
            $('#slider1').unslick();
            $('#slider2 ul').velocity("stop");
            $('#slider2 ul').css('top', '307px');
            var selected = $('.selected');
            var firstChild = $('#slider2 ul li:first-child');
            selected.removeClass('selected');
            firstChild.addClass('selected');
        },
        swipeUp: function (ele) {
            if(counter == 0) {counter = 1;}
            if(counter <= 9) {counter++; console.log(counter);}

            if(counter <= 9) {
                $('#slider1').slickNext();
                $('#slider2 ul').velocity ({top: "-=37px"});
                var selected = $('.selected');
                var next = selected.next();
                selected.removeClass('selected');
                next.addClass('selected');
            }
        },
        swipeDown: function (ele) {
            if(counter == 10) {counter = 9;}
            if(counter <= 9 && counter > 0 ) {counter--; console.log(counter);}

            if( counter <= 9 && counter > 0 ) {
                $('#slider1').slickPrev();
                $('#slider2 ul').velocity ({top: "+=37px"});
                var selected = $('.selected');
                var previous = selected.prev();
                selected.removeClass('selected');
                previous.addClass('selected');
            }                       
        }
    };
});