$(document).ready(function() {
	$(function() {
		$(".opt-strings").on("click", function() {
			let opt = this.id;
			var str = "";
			var string = "";
			switch (opt) {
				/*------ADD SLASHES------*/
				case "addslash":
					str = getSelectedText();
					string = addslashes(str);
					break;

				/*------STRIP SLASHES------*/
				case "stripslash":
					str = getSelectedText();
					string = stripslashes(str);
					break;

				/*------STRIP SPACES------*/
				case "stripspace":
					str = getSelectedText();
					string = stripspaces(str);
					break;

				/*------REVERSE------*/
				case "reverse":
					str = getSelectedText();
					string = reverse(str);
					break;

				/*------TO LOWERCASE------*/
				case "lowercase":
					str = getSelectedText();
					string = str.toLowerCase()
					break;

				/*------TO UPPERCASE------*/
				case "uppercase":
					str = getSelectedText();
					string = str.toUpperCase()
					break;

				/*------RANDOM CASE------*/
				case "randomcase":
					str = getSelectedText();
					string = randomcase(str)
					break;

				/*------PI------*/
				case "pi":
					string = "3.14159265";
					break;

				/*------BIGPI------*/
				case "bigpi":
					string = "3.14159265358979323846264338327950288419716939937510";
					break;

				/*------FIBONACCI------*/
				case "fibonacci":
					string = "0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946, ...";
					break;

				/*------LOREM IPSUM------*/
				case "lorem":
					string = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
					break;

				default:
					string = "www.facebook.com/Jalkhov";
			}
			setSelectedText(string);
		});
	});
});