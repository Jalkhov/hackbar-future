/**
 * Buffer Overflow Generator Handler
 * ---------------------------------
 * This function generates predefined or custom-sized buffer overflow strings
 * based on the selected option from the UI and sets the result as selected text.
 *
 * Supported sizes:
 * - 128 bytes
 * - 256 bytes
 * - 512 bytes
 * - 1024 bytes
 * - Custom size (from selected text)
 */

function setOther(id) {
	// Mapping of action IDs to their corresponding buffer size or behavior
	const bufferSizeMap = {
		buffer128: 128,
		buffer256: 256,
		buffer512: 512,
		buffer1024: 1024,
		buffercustom: null, // Indicates a custom value must be retrieved from user input
	};

	const size = bufferSizeMap[id];

	if (size !== undefined && !Number.isNaN(size)) {
		// Use predefined buffer size
		setSelectedText(iOverflow(size));
	} else if (id === "buffercustom") {
		// Get custom buffer size from selected text
		getSelectedText((str) => {
			const customSize = Number.parseInt(str, 10);
			if (customSize && customSize > 0) {
				setSelectedText(iOverflow(customSize));
			} else {
				console.warn("Invalid custom buffer size:", str);
				setSelectedText("[Invalid buffer size]");
			}
		});
	} else {
		console.warn("Unsupported buffer operation ID:", id);
	}
}
