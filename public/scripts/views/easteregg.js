$('#easterEgg').click(function() {
	event.preventDefault();
	// show goose
	$('#easterEggImg').removeClass('hideEgg');
	// start moving
	$('#easterEggImg').addClass('walk');
	// hide username
	function fade1() {
		$('.fade1').addClass('hideEgg');
	}
	window.setTimeout(fade1, 2900);
	// hide January
	function fade2() {
		$('.fade2').addClass('hideEgg');
	}
	window.setTimeout(fade2, 5000);
	// hide Febuary
	function fade3() {
		$('.fade3').addClass('hideEgg');
	}
	window.setTimeout(fade3, 5100);
	// hide March
	function fade4() {
		$('.fade4').addClass('hideEgg');
	}
	window.setTimeout(fade4, 5200);
	// hide April
	function fade5() {
		$('.fade5').addClass('hideEgg');
	}
	window.setTimeout(fade5, 5300);
	// hide May
	function fade6() {
		$('.fade6').addClass('hideEgg');
	}
	window.setTimeout(fade6, 5400);
	// hide June
	function fade7() {
		$('.fade7').addClass('hideEgg');
	}
	window.setTimeout(fade7, 5500);
	// hide July
	function fade8() {
		$('.fade8').addClass('hideEgg');
	}
	window.setTimeout(fade8, 5600);
	// hide August
	function fade9() {
		$('.fade9').addClass('hideEgg');
	}
	window.setTimeout(fade9, 5700);
	// hide September
	function fade10() {
		$('.fade10').addClass('hideEgg');
	}
	window.setTimeout(fade10, 5800);
	// hide October
	function fade11() {
		$('.fade11').addClass('hideEgg');
	}
	window.setTimeout(fade11, 5900);
	// hide November
	function fade12() {
		$('.fade12').addClass('hideEgg');
	}
	window.setTimeout(fade12, 6000);
	// hide December
	function fade13() {
		$('.fade13').addClass('hideEgg');
	}
	window.setTimeout(fade13, 6100);
	// hide month header
	function fade14() {
		$('.fade14').addClass('hideEgg');
	}
	window.setTimeout(fade14, 7300);
	// hide footer
	function fade15() {
		$('.fade15').addClass('hideEgg');
	}
	window.setTimeout(fade15, 9600);
	// hide graph
	function fade16() {
		$('.fade16').addClass('hideEgg');
	}
	window.setTimeout(fade16, 11000);
	// hide graph
	function fade17() {
		$('.fade17').addClass('hideEgg');
	}
	window.setTimeout(fade17, 13500);
	// hide graph
	function fade18() {
		$('.fade18').addClass('hideEgg');
	}
	window.setTimeout(fade18, 13700);
	// hide graph
	function fade19() {
		$('.fade19').addClass('hideEgg');
	}
	window.setTimeout(fade19, 13900);
	// hide graph
	function fade20() {
		$('.fade20').addClass('hideEgg');
	}
	window.setTimeout(fade20, 14100);
	// hide graph
	function fade21() {
		$('.fade21').addClass('hideEgg');
	}
	window.setTimeout(fade21, 14300);
	// hide graph
	function fade22() {
		$('.fade22').addClass('hideEgg');
	}
	window.setTimeout(fade22, 14500);
	// hide graph
	function fade23() {
		$('.fade23').addClass('hideEgg');
	}
	window.setTimeout(fade23, 14700);
	// hide graph
	function fade24() {
		$('.fade24').addClass('hideEgg');
	}
	window.setTimeout(fade24, 14900);

	function fadedone() {
		$('#easterEggImg').removeClass('walk');
		// show goose
		$('#easterEggImg').addClass('hideEgg');
	}
	window.setTimeout(fadedone, 15100);
});
