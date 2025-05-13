/**
 * Persistent Textarea Resizer (Vanilla JS)
 * ----------------------------------------
 * Saves and restores custom dimensions (width and height) of <textarea> elements
 * across browser sessions using browser.storage.local.
 *
 * Works only in WebExtensions due to the use of `browser.storage.local`.
 */

document.addEventListener("DOMContentLoaded", () => {
	// Process all textareas on the page
	const textareas = document.querySelectorAll("textarea");

	for (const textarea of textareas) {
		// Generate or reuse an ID for storage purposes
		const textareaId =
			textarea.id || `textarea_${Math.random().toString(36).substr(2, 9)}`;
		textarea.id = textareaId;

		// Restore saved size from storage
		browser.storage.local.get(textareaId).then((result) => {
			if (result[textareaId]) {
				const { height, width } = result[textareaId];
				if (height) textarea.style.height = height;
				if (width) textarea.style.width = width;
			}
		});

		// Save size when resizing ends (mouseup is a proxy for resize finish)
		textarea.addEventListener("mouseup", () => {
			const currentSize = {
				height: textarea.style.height,
				width: textarea.style.width,
			};

			const toSave = {
				[textareaId]: currentSize,
			};

			browser.storage.local.set(toSave);
		});
	}
});
