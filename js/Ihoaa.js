$(document).ready(function() {
	$(function() {
		$(".opt-leftpanel").on("click", function() {
			let opt = this.id;
			let ihoaa = document.getElementById("ihoaa");
			let mode = ihoaa.options[ihoaa.selectedIndex].value;
			var str = "";
			var ascii = "";
			var hex = "";
			var string = "";
			var i = 0;

			switch (opt) {
				/*------INCREMENT FOR NUMBER------*/
				case "inc4number":
					string = inc4number(mode, getSelectedText())
					break;

				/*------DECREMENT FOR NUMBER------*/
				case "dec4number":
					string = dec4number(mode, getSelectedText())
					break;

				/*------CLEAN FIELDS------*/
				case "clean":
					iClean()
					break;

				default:
					string = "www.facebook.com/Jalkhov";
			}
			if (string) {
				setSelectedText(string);
				iUpdate($('#text_field').val())
			}
		});
	});
});