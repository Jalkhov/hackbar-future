/**
 * Dynamic Section Switcher
 * ------------------------
 * Manages visibility of content sections based on selected radio buttons.
 * Updates the appearance of labels and resizes a scrollable container
 * depending on the selected section.
 *
 * Sections are controlled by classes:
 * - sqlbasics
 * - unionbased
 * - hacksearch
 * - strings
 * - other
 *
 * Each section is associated with a radio button whose `value` matches the class name.
 */

document.addEventListener("DOMContentLoaded", () => {
	const allSections = document.querySelectorAll(".type");
	const scrollEl = document.querySelector(".scroll");

	function showSection(inputValue) {
		for (const section of allSections) {
			section.style.display = section.classList.contains(inputValue)
				? "block"
				: "none";
		}

		if (scrollEl) {
			switch (inputValue) {
				case "sqlbasics":
				case "unionbased":
				case "hacksearch":
					scrollEl.style.height = "250px";
					break;
				case "strings":
				case "other":
					scrollEl.style.height = "70px";
					break;
				default:
					break;
			}
		}

		browser.storage.local.set({ activeSection: inputValue });
	}

	async function restoreSelection() {
		const result = await browser.storage.local.get("activeSection");
		const lastSection = result.activeSection || "sqlbasics";

		const radioButton = document.querySelector(`input[value="${lastSection}"]`);
		if (radioButton) {
			radioButton.checked = true;
		}

		showSection(lastSection);
	}

	document.querySelectorAll('input[type="radio"]').forEach((radio) => {
		radio.addEventListener("change", function () {
			if (this.checked) {
				showSection(this.value);
			}
		});
	});

	restoreSelection();
});
