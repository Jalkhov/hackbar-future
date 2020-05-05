function setLeftPanel(id){
	var ihoaa = document.getElementById("ihoaa");
	var mode = ihoaa.options[ihoaa.selectedIndex].value;

	switch (id) {
		/*------INCREMENT FOR NUMBER------*/
		case "inc4number":
			getSelectedText(function(str) {
				setSelectedText(inc4number(mode, str))
				iUpdate($('#text_field').val())
			});
			break;

		/*------DECREMENT FOR NUMBER------*/
		case "dec4number":
			getSelectedText(function(str) {
				setSelectedText(dec4number(mode, str))
				iUpdate($('#text_field').val())
			});
			break;
	}
}