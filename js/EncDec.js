$(document).ready(function() {
	$(function() {
		$(".opt-encdec").on("click", function() {
			let opt = this.id;
			var str = getSelectedText();
			var string = "";

			switch (opt) {
				/*------FROM HEX------*/
				case "fromhex":
					string = hexdecode(str);
					break;

				/*------TO HEX------*/
				case "tohex":
					string = hexencode(str);
					break;

				/*------FROM %URL------*/
				case "fromurl":
					string = urldecode(str);
					break;

				/*------TO %URL------*/
				case "tourl":
					string = urlencode(str);
					break;

				/*------FROM BASE64------*/
				case "fromb64":
					string = base64_decode(str);
					break;

				/*------TO BASE64------*/
				case "tob64":
					string = base64_encode(str);
					break;

				/*------FROM 0bBINARY------*/
				case "frombinary":
					string = fromBinary(str);
					break;

				/*------TO 0bBINARY------*/
				case "tobinary":
					string = toBinary(str);
					break;

				/*------TO MD5------*/
				case "tomd5":
					string = md5(str);
					break;

				/*------SHA-1 HASH------*/
				case "sha1":
					string = sha1hash(str);
					break;

				/*------SHA-256------*/
				case "sha256":
					string = sha256(str);
					break;

				/*------ROT13------*/
				case "rot13":
					string = rot13(str);
					break;

				/*------SHA-512------*/
				case "sha512":
					string = sha512(str);
					break;

				default:
					string = "www.facebook.com/Jalkhov";
			}

			setSelectedText(string);
		});
	});
});