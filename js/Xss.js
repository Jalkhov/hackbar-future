function setXss(id) {
	var hex, ascii = "";
	var i = 0;

	switch (opt) {
		/*------HTML CHARACTERS------*/
		case "strtohtml":
			getSelectedText(function(str) {
				for (i; i < str.length; i++) {
					hex += "&#x" + str.charCodeAt(i).toString(16) + ";";
					//ascii += " " + str.charCodeAt(i);
				}
				setSelectedText(hex);
			});
			break;

		/*------STRING FROM CHAR CODE------*/
		case "strcharcode":
			getSelectedText(function(str) {
				for (i; i < str.length; i++) {
					if (i == str.length - 1) {
						ascii += "" + str.charCodeAt(i) + "";
					} else {
						ascii += "" + str.charCodeAt(i) + ", ";
					}
				}
				setSelectedText("String.fromCharCode(" + ascii + ")");
			});
			break;

		/*------ALERT STRING FROM CHAR CODE------*/
		case "alertxss":
			getSelectedText(function(str) {
				for (i; i < str.length; i++) {
					if (i == str.length - 1) {
						ascii += "" + str.charCodeAt(i) + "";
					} else {
						ascii += "" + str.charCodeAt(i) + ", ";
					}
				}
				setSelectedText("alert(String.fromCharCode(" + ascii + "))");
			});
			break;
	}
}