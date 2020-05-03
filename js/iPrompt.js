function iConsole(str) {
	console.log(str);
}

function iPrompt() {
	alertify.prompt('Insert string', '', 'Prompt Value',
		function(evt, value) {
			iConsole(value);
		},
		function() {
			iConsole(false);
		}).set({
		movable: false,
		transitionOff: true,
		closable: false
	});
}

$(document).ready(function() {
	$("#prompt").on("click", function() {
		iPrompt()
	});
});