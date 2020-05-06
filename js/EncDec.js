function setEncDec(id) {
	switch (id) {
		/*------FROM HEX------*/
		case "fromhex":
			getSelectedText(function(str) {
				setSelectedText(hexdecode(str));
			});
			break;

		/*------TO HEX------*/
		case "tohex":
			getSelectedText(function(str) {
				setSelectedText(hexencode(str));
			});
			break;

		/*------FROM %URL------*/
		case "fromurl":
			getSelectedText(function(str) {
				setSelectedText(urldecode(str));
			});
			break;

		/*------TO %URL------*/
		case "tourl":
			getSelectedText(function(str) {
				setSelectedText(urlencode(str));
			});
			break;

		/*------FROM BASE64------*/
		case "fromb64":
			getSelectedText(function(str) {
				setSelectedText(base64_decode(str));
			});
			break;

		/*------TO BASE64------*/
		case "tob64":
			getSelectedText(function(str) {
				setSelectedText(base64_encode(str));
			});
			break;

		/*------FROM 0bBINARY------*/
		case "frombinary":
			getSelectedText(function(str) {
				setSelectedText(fromBinary(str));
			});
			break;

		/*------TO 0bBINARY------*/
		case "tobinary":
			getSelectedText(function(str) {
				setSelectedText(toBinary(str));
			});
			break;

		/*------TO MD5------*/
		case "tomd5":
			getSelectedText(function(str) {
				setSelectedText(md5(str));
			});
			break;

		/*------SHA-1 HASH------*/
		case "sha1":
			getSelectedText(function(str) {
				setSelectedText(sha1hash(str));
			});
			break;

		/*------SHA-256------*/
		case "sha256":
			getSelectedText(function(str) {
				setSelectedText(sha256(str));
			});
			break;

		/*------ROT13------*/
		case "rot13":
			getSelectedText(function(str) {
				setSelectedText(rot13(str));
			});
			break;

		/*------SHA-512------*/
		case "sha512":
			getSelectedText(function(str) {
				setSelectedText(sha512(str));
			});
			break;
	}
}