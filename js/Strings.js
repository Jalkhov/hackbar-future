/**
 * String Manipulation Handler
 * ---------------------------
 * This function performs various string manipulation operations based on the selected action ID.
 * It retrieves the currently selected text, applies the transformation, and replaces the selection with the result.
 *
 * Supported operations:
 * - Add slashes
 * - Strip slashes
 * - Strip spaces
 * - Reverse string
 * - Convert to lowercase / uppercase
 * - Randomize letter case
 * - Insert predefined strings like PI, Fibonacci, Lorem Ipsum
 */

function SetStrings(id) {
	// Mapping of operation IDs to corresponding handler functions
	const operationHandlers = {
		addslash: (str) => addslashes(str),
		stripslash: (str) => stripslashes(str),
		stripspace: (str) => stripspaces(str),
		reverse: (str) => reverse(str),
		lowercase: (str) => str.toLowerCase(),
		uppercase: (str) => str.toUpperCase(),
		randomcase: (str) => randomcase(str),

		// Static content inserters
		pi: () => "3.14159265",
		bigpi: () => "3.14159265358979323846264338327950288419716939937510",
		fibonacci: () =>
			"0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946, ...",
		lorem: () =>
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
	};

	const handler = operationHandlers[id];

	if (!handler) {
		console.warn(`Unsupported string operation ID: "${id}"`);
		return;
	}

	if (typeof handler === "function") {
		getSelectedText((str) => {
			if (typeof str !== "string") {
				console.warn("No valid text was selected for transformation.");
				return;
			}
			try {
				const result = handler(str);
				setSelectedText(result);
			} catch (error) {
				console.error(`Error applying transformation "${id}":`, error);
				setSelectedText(`[Error: ${error.message}]`);
			}
		});
	} else {
		// For static content insertion (e.g., pi, lorem)
		setSelectedText(handler());
	}
}
