//import scss
import "~/pages/index/index.scss";

//import js
import '~/pages/_common/common.js'

/*Here JS for index.js*/



//=====================SLIDER===========================================================//
import '~/components/_common/libs/slick.min.js'


$(window).on('load', function () {
	$('.slider').slick({
		autoplay: true,
		//infinite:false,
		dots: true,
		arrows: false,
		//accessibility:false,
		//slidesToShow:1,
		autoplaySpeed: 3500,
		speed: 2000
	});
});
