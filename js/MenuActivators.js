$(document).ready(function() {
	$('.unionbased').hide();
	$('.hacksearch').hide();
	$('.strings').hide();
	$('.other').hide();

	$('input[type="radio"]').click(function() {
		var inputValue = $(this).attr("value");
		var targetDiv = $("." + inputValue);
		var targetlabel = $("#" + "LAB" + inputValue);

		//CHANGE DIV
		$(".type").not(targetDiv).hide();
		$(targetDiv).show();

		switch (inputValue) {
			case "sqlbasics":
				$('.scroll').css("height", "160");
				break;

			case "unionbased":
				$('.scroll').css("height", "160");
				break;

			case "hacksearch":
				$('.scroll').css("height", "160");
				break;

			case "strings":
				$('.scroll').css("height", "70");
				break;

			case "other":
				$('.scroll').css("height", "70");
				break;
		}

		//CHANGE LABEL
		$(".lab").not(targetlabel).css('color', 'white');
		$(targetlabel).css('color', '#00E0C7');
	});
});