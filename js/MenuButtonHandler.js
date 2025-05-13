// Mapeo de clases a funciones handler
const MENU_HANDLERS = {
	"opt-sqlbasics": setSqlBasics,
	"opt-unionbased": setUnionBased,
	"opt-hacksearch": setHacksearch,
	"opt-strings": SetStrings,
	"opt-other": setOther,
	"opt-encdec": setEncDec,
	"opt-ihoaa": setLeftPanel,
	//"opt-error": setErrorBased,
	"opt-waf": setWaf,
	"opt-xss": setXss,
};

// Función para manejar el evento click
function handleMenuClick(handler) {
	return function () {
		handler(this.id);
	};
}

// Registrar eventos para cada tipo de botón
for (const buttonClass of Object.keys(MENU_HANDLERS)) {
	const elements = document.querySelectorAll(`.${buttonClass}`);
	for (const element of elements) {
		element.addEventListener(
			"click",
			handleMenuClick(MENU_HANDLERS[buttonClass]),
		);
	}
}

// Abre la página de opciones de la extensión
document.getElementById("config")?.addEventListener("click", () => {
	if (typeof browser !== "undefined" && browser.runtime.openOptionsPage) {
		browser.runtime.openOptionsPage();
	} else if (chrome && chrome.runtime && chrome.runtime.openOptionsPage) {
		chrome.runtime.openOptionsPage();
	} else {
		alert("No se puede abrir la página de opciones en este entorno.");
	}
});
