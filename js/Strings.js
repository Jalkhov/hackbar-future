function SetStrings(id){
	switch (id) {
		/*------ADD SLASHES------*/
		case "addslash":
			getSelectedText(function(str) {
				setSelectedText(addslashes(str));
			});
			break;

		/*------STRIP SLASHES------*/
		case "stripslash":
			getSelectedText(function(str) {
				setSelectedText(stripslashes(str));
			});
			break;

		/*------STRIP SPACES------*/
		case "stripspace":
			getSelectedText(function(str) {
				setSelectedText(stripspaces(str));
			});
			break;

		/*------REVERSE------*/
		case "reverse":
			getSelectedText(function(str) {
				setSelectedText(reverse(str));
			});
			break;

		/*------TO LOWERCASE------*/
		case "lowercase":
			getSelectedText(function(str) {
				setSelectedText(str.toLowerCase());
			});
			break;

		/*------TO UPPERCASE------*/
		case "uppercase":
			getSelectedText(function(str) {
				setSelectedText(str.toUpperCase());
			});
			break;

		/*------RANDOM CASE------*/
		case "randomcase":
			getSelectedText(function(str) {
				setSelectedText(randomcase(str));
			});
			break;

		/*------PI------*/
		case "pi":
			setSelectedText("3.14159265");
			break;

		/*------BIGPI------*/
		case "bigpi":
			setSelectedText("3.14159265358979323846264338327950288419716939937510");
			break;

		/*------FIBONACCI------*/
		case "fibonacci":
			setSelectedText("0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946, ...");
			break;

		/*------LOREM IPSUM------*/
		case "lorem":
			setSelectedText("Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
			break;

		default:
			setSelectedText("www.facebook.com/Jalkhov");
	}
}