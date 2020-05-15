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
	window.setTimeout(fade2, 4500);
	// hide Febuary
	function fade3() {
		$('.fade3').addClass('hideEgg');
	}
	window.setTimeout(fade3, 4600);
	// hide March
	function fade4() {
		$('.fade4').addClass('hideEgg');
	}
	window.setTimeout(fade4, 4700);
	// hide April
	function fade5() {
		$('.fade5').addClass('hideEgg');
	}
	window.setTimeout(fade5, 4800);
	// hide May
	function fade6() {
		$('.fade6').addClass('hideEgg');
	}
	window.setTimeout(fade6, 4900);
	// hide June
	function fade7() {
		$('.fade7').addClass('hideEgg');
	}
	window.setTimeout(fade7, 5000);
	// hide July
	function fade8() {
		$('.fade8').addClass('hideEgg');
	}
	window.setTimeout(fade8, 5100);
	// hide August
	function fade9() {
		$('.fade9').addClass('hideEgg');
	}
	window.setTimeout(fade9, 5200);
	// hide September
	function fade10() {
		$('.fade10').addClass('hideEgg');
	}
	window.setTimeout(fade10, 5300);
	// hide October
	function fade11() {
		$('.fade11').addClass('hideEgg');
	}
	window.setTimeout(fade11, 5400);
	// hide November
	function fade12() {
		$('.fade12').addClass('hideEgg');
	}
	window.setTimeout(fade12, 5500);
	// hide December
	function fade13() {
		$('.fade13').addClass('hideEgg');
	}
	window.setTimeout(fade13, 5600);
	// hide month header
	function fade14() {
		$('.fade14').addClass('hideEgg');
	}
	window.setTimeout(fade14, 6300);
	// hide footer
	function fade15() {
		$('.fade15').addClass('hideEgg');
	}
	window.setTimeout(fade15, 8200);
	// hide graph
	function fade16() {
		$('.fade16').addClass('hideEgg');
	}
	window.setTimeout(fade16, 9800);
	// hide dashboard main section
	function fade16half() {
		$('.fade16half').addClass('hideEgg');
	}
	window.setTimeout(fade16half, 11000);
	// hide arrow
	function fade17() {
		$('.fade17').addClass('hideEgg');
	}
	window.setTimeout(fade17, 13000);
	// hide logout
	function fade18() {
		$('.fade18').addClass('hideEgg');
	}
	window.setTimeout(fade18, 13600);
	// hide edit profile
	function fade19() {
		$('.fade19').addClass('hideEgg');
	}
	window.setTimeout(fade19, 13700);
	// hide about us
	function fade20() {
		$('.fade20').addClass('hideEgg');
	}
	window.setTimeout(fade20, 13800);
	// hide activity
	function fade21() {
		$('.fade21').addClass('hideEgg');
	}
	window.setTimeout(fade21, 13900);
	// hide survey
	function fade22() {
		$('.fade22').addClass('hideEgg');
	}
	window.setTimeout(fade22, 14000);
	// hide group
	function fade23() {
		$('.fade23').addClass('hideEgg');
	}
	window.setTimeout(fade23, 14100);
	// hide graph
	function fade24() {
		$('.fade24').addClass('hideEgg');
	}
	window.setTimeout(fade24, 14500);
	// hide dashboard
	function eggEnd() {
		$('#eggend').removeClass('hideEgg');
		$('#eggend').addClass('eggend');
		$('#eggend').addClass('eggEndDiv');
	}
	window.setTimeout(eggEnd, 15000);
});
$('#backToDash').click(function() {
	$('#easterEggImg').removeClass('walk');
	//  // show goose
	$('#easterEggImg').addClass('hideEgg');
	$('#eggend').removeClass('eggend');
	$('#eggend').removeClass('eggEndDiv');
	$('#eggend').addClass('hideEgg');

	$('.fade1').removeClass('hideEgg');
	$('.fade2').removeClass('hideEgg');
	$('.fade3').removeClass('hideEgg');
	$('.fade4').removeClass('hideEgg');
	$('.fade5').removeClass('hideEgg');
	$('.fade6').removeClass('hideEgg');
	$('.fade7').removeClass('hideEgg');
	$('.fade8').removeClass('hideEgg');
	$('.fade9').removeClass('hideEgg');
	$('.fade10').removeClass('hideEgg');
	$('.fade11').removeClass('hideEgg');
	$('.fade12').removeClass('hideEgg');
	$('.fade13').removeClass('hideEgg');
	$('.fade14').removeClass('hideEgg');
	$('.fade15').removeClass('hideEgg');
	$('.fade16').removeClass('hideEgg');
	$('.fade16half').removeClass('hideEgg');
	$('.fade17').removeClass('hideEgg');
	$('.fade18').removeClass('hideEgg');
	$('.fade19').removeClass('hideEgg');
	$('.fade20').removeClass('hideEgg');
	$('.fade21').removeClass('hideEgg');
	$('.fade22').removeClass('hideEgg');
	$('.fade23').removeClass('hideEgg');
	$('.fade24').removeClass('hideEgg');
});
