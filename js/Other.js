$(document).ready(function() {
	$(function() {
		$(".opt-other").on("click", function() {
			let opt = this.id;
			var string = "";

			switch (opt) {
				/*------BUFFER OVERFLOW/128------*/
				case "buffer128":
					string = iOverflow(128);
					break;

				/*------BUFFER OVERFLOW/256------*/
				case "buffer256":
					string = iOverflow(256);
					break;

				/*------BUFFER OVERFLOW/512------*/
				case "buffer512":
					string = iOverflow(512);
					break;

				/*------BUFFER OVERFLOW/1024------*/
				case "buffer1024":
					string = iOverflow(1024);
					break;

				/*------BUFFER OVERFLOW/CUSTOM------*/
				case "buffercustom":
					string = iOverflow(prompt("Buffer overflow lenght", "10"));
					break;

				default:
					string = "www.facebook.com/Jalkhov";
			}
			setSelectedText(string);
		});
	});
});