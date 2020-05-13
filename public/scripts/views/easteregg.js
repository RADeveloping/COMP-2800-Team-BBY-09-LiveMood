$('#easterEgg').click(function() {
	event.preventDefault();
	$('#easterEggImg').removeClass('hideEgg');
	$('#easterEggImg').addClass('walk', 5000);
});
