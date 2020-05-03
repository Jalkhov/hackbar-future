$(document).ready(function() {
	$(function() {
		$(".opt-xss").on("click", function() {
			let opt = this.id;
			var str = "";
			var ascii = "";
			var hex = "";
			var string = "";
			var i = 0;

			switch (opt) {
				/*------HTML CHARACTERS------*/
				case "strtohtml":
					str = getSelectedText();

					for (i; i < str.length; i++) {
						hex += "&#x" + str.charCodeAt(i).toString(16) + ";";
						ascii += " " + str.charCodeAt(i);
					}
					string = hex;
					break;

				/*------STRING FROM CHAR CODE------*/
				case "strcharcode":
					str = getSelectedText();

					for (i; i < str.length; i++) {
						if (i == str.length - 1) {
							ascii += "" + str.charCodeAt(i) + "";
						} else {
							ascii += "" + str.charCodeAt(i) + ", ";
						}
					}

					string = "String.fromCharCode(" + ascii + ")";
					break;

				/*------ALERT XSS------*/
				case "alertxss":
					string = "alert(String.fromCharCode(88, 83, 83))";
					break;

				default:
					string = "www.facebook.com/Jalkhov";
			}

			setSelectedText(string);
		});
	});
});