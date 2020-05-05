const menu_btn_array = ['opt-sqlbasics', 'opt-unionbased', 'opt-hacksearch', 'opt-strings', 'opt-other', 'opt-encdec', 'opt-ihoaa','opt-error', 'opt-waf','opt-xss'];

menu_btn_array.forEach(function(elementClass) {
	$('.' + elementClass).bind('click', function() {
		var id = this.id;
		switch (elementClass) {
			case "opt-sqlbasics":
				setSqlBasics(id);
				break;

			case "opt-unionbased":
				setUnionBased(id);
				break;

			case "opt-hacksearch":
				setHacksearch(id);
				break;

			case "opt-strings":
				SetStrings(id);
				break;

			case "opt-other":
				setOther(id);
				break;

			case "opt-encdec":
				setEncDec(id);
				break;

			case "opt-ihoaa":
				setLeftPanel(id);
				break;

			case "opt-error":
				setErrorBased(id);
				break;

			case "opt-waf":
				setWaf(id);
				break;

			case "opt-xss":
				setXss(id);
				break;
		}
	});
});