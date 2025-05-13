const inputPromptDialog = document.getElementById("inputPromptDialog");
const closePromptBtn = document.getElementById("closePromptBtn");

closePromptBtn.addEventListener("click", () => {
	inputPromptDialog.close();
});
