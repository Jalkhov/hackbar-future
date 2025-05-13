/**
 * Encoder/Decoder Action Handler
 * -------------------------------
 * This function processes encoding and decoding actions based on the selected operation ID.
 * It retrieves the currently selected text in a browser context (e.g., content script),
 * applies the appropriate transformation, and replaces the selection with the result.
 *
 * Supported operations:
 * - Hex: encode / decode
 * - URL: encode / decode
 * - Base64: encode / decode
 * - Binary: encode / decode
 * - Hashing: MD5, SHA-1, SHA-256, SHA-512
 * - ROT13
 */

function setEncDec(id) {
	// Mapping of action IDs to their corresponding transformation functions
	const operationMap = {
		/*------FROM HEX------*/
		fromhex: hexdecode,

		/*------TO HEX------*/
		tohex: hexencode,

		/*------FROM %URL------*/
		fromurl: urldecode,

		/*------TO %URL------*/
		tourl: urlencode,

		/*------FROM BASE64------*/
		fromb64: base64_decode,

		/*------TO BASE64------*/
		tob64: base64_encode,

		/*------FROM 0bBINARY------*/
		frombinary: fromBinary,

		/*------TO 0bBINARY------*/
		tobinary: toBinary,

		/*------TO MD5------*/
		tomd5: md5,

		/*------SHA-1 HASH------*/
		sha1: sha1hash,

		/*------SHA-256------*/
		sha256: sha256,

		/*------ROT13------*/
		rot13: rot13,

		/*------SHA-512------*/
		sha512: sha512,
	};

	// Get the corresponding function for the given id
	const handler = operationMap[id];

	if (handler) {
		getSelectedText((str) => {
			try {
				const result = handler(str);
				setSelectedText(result);
			} catch (error) {
				console.error(`Error executing operation "${id}":`, error);
				setSelectedText(`[Error: ${error.message}]`);
			}
		});
	} else {
		console.warn(`Unsupported operation: "${id}"`);
	}
}
