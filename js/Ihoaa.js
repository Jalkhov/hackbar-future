/**
 * Left Panel Action Handler
 * -------------------------
 * Handles actions triggered from the left panel UI.
 * Currently supports incrementing or decrementing numbers in selected text,
 * based on a selected mode from a dropdown (`ihoaa`).
 *
 * Assumes:
 * - `getSelectedText(callback)` retrieves user-selected text asynchronously
 * - `setSelectedText(text)` replaces the selected text with new content
 * - `inc4number(mode, str)` increments numbers in the string
 * - `dec4number(mode, str)` decrements numbers in the string
 * - `iUpdate(value)` updates an input field UI component
 */

function setLeftPanel(id) {
	// Retrieve selected mode from the dropdown
	const dropdown = document.getElementById("ihoaa");
	if (!dropdown) {
		console.error("Dropdown element with id 'ihoaa' not found.");
		return;
	}

	const mode = dropdown.options[dropdown.selectedIndex]?.value;
	if (!mode) {
		console.warn("No mode selected from dropdown.");
		return;
	}

	// Map of supported operations
	const operations = {
		inc4number: inc4number,
		dec4number: dec4number,
	};

	const operationFn = operations[id];
	if (!operationFn || typeof operationFn !== "function") {
		console.warn(`Unsupported operation ID: "${id}"`);
		return;
	}

	// Handle selected text and apply transformation
	// FIX: No funciona como se espera
	getSelectedText((str) => {
		if (typeof str !== "string") {
			console.warn("No valid selected text provided.");
			return;
		}

		try {
			const transformedText = operationFn(mode, str);
			setSelectedText(transformedText);
			// console.log(transformedText);

			// ✅ Migrado desde jQuery: obtener valor del campo de texto
			// const textFieldValue = document.getElementById("text_field").value;
			iUpdate(transformedText);
		} catch (error) {
			console.error(`Error applying transformation for "${id}":`, error);
		}
	});
}
