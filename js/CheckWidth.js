var min = 394;
var max = 418;

window.onload = function() {
	$('#wadvise').hide();
	$('#widthval').html($(document).width());
	if ($(document).width() < min || $(document).width() > max) {
		$('.currentDiv').css('background-color', 'red');
		$('#wadvise').show();
	}
}

window.onresize = function() {
	$('#widthval').html($(document).width())
	if ($(document).width() < min || $(document).width() > max) {
		$('.currentDiv').css('background-color', 'red');
		$('#wadvise').show();
	} else {
		$('.currentDiv').css('background-color', 'white')
		$('#wadvise').hide();
	}
}