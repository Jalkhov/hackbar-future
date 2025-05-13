/**
 * XSS Payload Encoder
 * -------------------
 * This function encodes selected text into various XSS-safe formats,
 * such as HTML entities or `String.fromCharCode()` representations.
 *
 * Supported operations:
 * - Convert string to HTML entity encoded format (`&#xHH;`)
 * - Generate JavaScript `String.fromCharCode(...)` output
 * - Create an `alert(...)` payload using char codes
 */

function setXss(id) {
	// Utility: Converts a string to hex HTML entities (e.g., '&#x41;' for 'A')
	function toHtmlEntity(str) {
		return str
			.split("")
			.map((char) => `&#x${char.charCodeAt(0).toString(16)};`)
			.join("");
	}

	// Utility: Converts a string to comma-separated char codes
	function toCharCodes(str, wrapWith = null) {
		const codes = str
			.split("")
			.map((char) => char.charCodeAt(0))
			.join(", ");
		if (wrapWith) {
			return `${wrapWith}(${codes})`;
		}
		return codes;
	}

	// Mapping of operation IDs to transformation functions
	const xssTransforms = {
		strtohtml: (str) => toHtmlEntity(str),
		strcharcode: (str) => `String.fromCharCode(${toCharCodes(str)})`,
		alertxss: (str) => `alert(String.fromCharCode(${toCharCodes(str)}))`,
	};

	// Get the transformation function
	const transformFn = xssTransforms[id];

	if (!transformFn) {
		console.warn(`Unsupported XSS transformation ID: "${id}"`);
		return;
	}

	// Apply transformation to selected text
	getSelectedText((str) => {
		if (typeof str !== "string" || str.length === 0) {
			console.warn("No valid text was selected for transformation.");
			return;
		}

		try {
			const result = transformFn(str);
			setSelectedText(result);
		} catch (error) {
			console.error(`Error applying XSS transformation "${id}":`, error);
			setSelectedText("[Error during transformation]");
		}
	});
}
