let myWindowId;
const url_field = document.getElementById("url-field");
const postDataField = document.getElementById("post-data-input");
const refererField = document.getElementById("referer-data-input");
const post_data_container = document.getElementById("post-data-container");
const referer_data_container = document.getElementById(
	"referer-data-container",
);
const post_data_switch_label = document.getElementById(
	"post-data-switch-label",
);
const referer_data_switch_label = document.getElementById(
	"referer-data-switch-label",
);
let post_data_type = "";
let selection_start = "";
let selection_end = "";

const load_url_btn = document.getElementById("load-url-btn");
const split_url_btn = document.getElementById("split-url-btn");
const execute_payload_btn = document.getElementById("execute-payload-btn");
const post_data_switch = document.getElementById("post-data-switch");
const referer_data_switch = document.getElementById("referer-data-switch");
let current_focus_field = null;
current_focus_field = url_field;

/*-------ACTUALIZA EL CONTENIDO DE LA BARRA LATERAL-------*/
function updateContent() {
	browser.tabs
		.query({ windowId: myWindowId, active: true })
		.then((tabs) => {
			if (!tabs || !tabs[0]) {
				console.error("No hay pestaña activa");
				return;
			}
			const currentUrl = tabs[0].url;
			return browser.storage.local.get(currentUrl);
		})
		.then((storedInfo) => {
			if (!storedInfo || Object.keys(storedInfo).length === 0) {
				console.log("No hay datos guardados para esta URL");
				return;
			}

			const url = Object.keys(storedInfo)[0];

			// ✅ Acceso seguro a cada campo
			const savedUrl = storedInfo[url]?.[0];
			const postData = storedInfo[url]?.[1];
			const referer = storedInfo[url]?.[2];

			// Asigna valores a los campos (si existen)
			if (url_field) url_field.value = savedUrl || "";
			if (postDataField) postDataField.value = postData || "";
			if (refererField) refererField.value = referer || "";
		})
		.catch((error) => {
			console.error("Error en updateContent:", error);
		});
}

/*-------INTELIGENT PROMPT------*/
function iPrompt(callbackFunction) {
	console.group("[iPrompt] Iniciando diálogo inteligente");
	try {
		const modal = document.getElementById("inputPromptDialog");
		const input = document.getElementById("promptValueInput");
		const button = document.getElementById("promptConfirmBtn");

		if (!modal || !input || !button) {
			console.error("[iPrompt] Error: Elementos del modal no encontrados");
			throw new Error("Elementos del modal no disponibles");
		}

		console.debug("[iPrompt] Preparando modal...");
		input.value = "";
		input.focus();

		function handleSubmit(event) {
			console.groupCollapsed("[iPrompt] HandleSubmit");
			try {
				event?.preventDefault();
				const selected_text = input.value.trim();

				console.debug("Texto ingresado:", selected_text);
				console.debug("Ejecutando callback...");

				callbackFunction(selected_text);
				modal.close();

				console.debug("Modal cerrado, limpiando listeners...");
				button.removeEventListener("click", handleSubmit);

				console.log("[iPrompt] Proceso completado exitosamente");
			} catch (error) {
				console.error("[iPrompt] Error en handleSubmit:", error);
				throw error;
			} finally {
				console.groupEnd();
			}
		}

		console.debug("Configurando event listeners...");
		button.addEventListener("click", handleSubmit);

		modal.addEventListener("close", () => {
			console.debug("Evento close detectado, limpiando listeners");
			button.removeEventListener("click", handleSubmit);
		});

		console.log("Mostrando modal...");
		modal.showModal();
		console.log("[iPrompt] Modal listo para interacción");
	} catch (error) {
		console.error("[iPrompt] Error crítico:", error);
		throw error;
	} finally {
		console.groupEnd();
	}
}

/*-------GET SELECTED TEXT-------*/
function getSelectedText(callbackFunction) {
	console.group("[getSelectedText] Obteniendo texto seleccionado");
	try {
		selection_start = url_field.selectionStart;
		selection_end = url_field.selectionEnd;
		const selectionLength = selection_end - selection_start;

		console.debug(
			`Posición selección: start=${selection_start}, end=${selection_end}`,
		);
		console.debug(`Longitud selección: ${selectionLength}`);

		if (selectionLength < 1) {
			console.log("No hay texto seleccionado, lanzando iPrompt...");
			iPrompt(callbackFunction);
		} else {
			const selectedText = url_field.value.substring(
				selection_start,
				selection_end,
			);
			console.debug("Texto seleccionado:", selectedText);
			console.log("Ejecutando callback con texto seleccionado...");
			callbackFunction(selectedText);
		}
	} catch (error) {
		console.error("[getSelectedText] Error:", error);
		throw error;
	} finally {
		console.groupEnd();
	}
}

/*-------SET SELECTED TEXT-------*/
function setSelectedText(str) {
	console.group("[setSelectedText] Estableciendo texto");
	try {
		if (!str || typeof str !== "string") {
			console.warn("Texto no válido recibido:", str);
			return;
		}

		selection_start = url_field.selectionStart;
		selection_end = url_field.selectionEnd;

		console.debug(
			`Posición original: start=${selection_start}, end=${selection_end}`,
		);
		console.debug(`Texto a insertar (${str.length} chars):`, str);

		const pre = url_field.value.substring(0, selection_start);
		const post = url_field.value.substring(selection_end);

		console.debug("Texto antes de la selección:", pre);
		console.debug("Texto después de la selección:", post);

		url_field.value = pre + str + post;
		url_field.selectionStart = selection_start;
		url_field.selectionEnd = selection_start + str.length;

		console.debug("Nueva posición de selección:", {
			start: url_field.selectionStart,
			end: url_field.selectionEnd,
		});

		console.log("Enfocando campo...");
		current_focus_field?.focus();

		console.log("[setSelectedText] Texto establecido exitosamente");
	} catch (error) {
		console.error("[setSelectedText] Error:", error);
		throw error;
	} finally {
		console.groupEnd();
	}
}

/*-------CARGAR URL-------*/
function loadURL() {
	browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
		const currentTabUrl = tabs[0].url;

		// 1. Primero asigna la URL actual (feedback inmediato)
		url_field.value = currentTabUrl || "";

		// 2. Luego intenta cargar la URL guardada (si existe)
		browser.storage.local
			.get(currentTabUrl)
			.then((storedInfo) => {
				if (storedInfo && Object.keys(storedInfo).length > 0) {
					const savedUrl = storedInfo[Object.keys(storedInfo)[0]]?.[1];
					if (savedUrl) {
						url_field.value = savedUrl;
					}
				}
			})
			.catch((error) => {
				console.error("Error al cargar almacenamiento:", error);
			});
	});
}

/*-------SPLIT URL-------*/
function splitUrl() {
	let uri = current_focus_field.value;
	uri = uri.replace(/&/g, "\n&");
	uri = uri.replace(/\?/g, "\n?");
	current_focus_field.value = uri;
	return true;
}
/*-------EJECUTAR-------*/
function execute() {
	if (url_field.value === "") {
		return;
	}

	browser.tabs
		.query({
			active: true,
			currentWindow: true,
		})
		.then((tabs) => {
			const currentTabUrl = tabs[0].url;
			const contentToStore = {};
			const arraycontent = {};
			arraycontent[0] = url_field.value;
			arraycontent[1] = postDataField.value;
			arraycontent[2] = refererField.value;
			contentToStore[url_field.value] = arraycontent;
			browser.storage.local.set(contentToStore);

			if (referer_data_switch.checked) {
				browser.webRequest.onBeforeSendHeaders.addListener(
					rewriteReferer,
					{
						urls: ["<all_urls>"],
						types: ["main_frame"],
					},
					["blocking", "requestHeaders"],
				);
			}

			if (!post_data_switch.checked) {
				// solo método GET
				const updating = browser.tabs.update({
					url: url_field.value,
				});
				updating.then(null, null);
				return;
			}

			const postData = getPostdata();
			if (post_data_type === "formdata") {
				let scriptpost = `document.body.innerHTML += \'<form id="newhackbardynForm" action="${url_field.value}" method="post">`;
				for (let i = 0; i < postData.length; i++) {
					const field = postData[i].split("=");
					let fieldvalue = "";
					if (field.length === 2) {
						fieldvalue = field[1];
					} else if (field.length === 3) {
						// caso base64
						if (field[2] === "") {
							fieldvalue = `${field[1]}%3d`;
						}
					} else {
						post_data_type = "raw";
						break;
					}
					scriptpost += `<input type="hidden" name="${field[0]}" value="${fieldvalue}">`;
				}
				if (post_data_type === "formdata") {
					scriptpost +=
						'</form>\';document.getElementById("newhackbardynForm").submit();';
					const executing = browser.tabs.executeScript({
						code: scriptpost,
					});
					executing.then(null, null);
				}
			}

			if (post_data_type !== "formdata") {
				// para datos raw o multipart formdata
				if (currentTabUrl !== url_field.value) {
					const updating = browser.tabs.update({
						url: url_field.value,
					});
					updating.then(null, null);
				}
				let responsePost = "";
				fetch(url_field.value, {
					method: "POST",
					redirect: "follow",
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
						Cache: "no-cache",
					},
					credentials: "include",
					body: postDataField.value,
				}).then((response) => {
					response.text().then((text) => {
						responsePost = text;
						const scriptpost = `document.body.innerHTML = unescape('${urlencode(responsePost)}');`;
						const executing = browser.tabs.executeScript({
							code: scriptpost,
						});
						executing.then(null, null);
					});
				});
			}
		});
}

/*-------OBTENER DATOS POST-------*/
function getPostdata() {
	const value = postDataField.value || "";

	if (value.indexOf("Content-Disposition: form-data; name=") > -1) {
		post_data_type = "multipart";
		return value;
	}
	if (value.startsWith("<") || value.startsWith("{")) {
		post_data_type = "raw";
		return value;
	}
	if (value.indexOf("&") > -1) {
		post_data_type = "formdata";
		let dataString = value;
		dataString = dataString.replace(/\n|\r/g, "");
		dataString = dataString.replace(/\+/g, "%2B");
		dataString = dataString.replace(/\=\=/g, "%3d%3d"); // para casos base64
		dataString = dataString.replace(/\=\&/g, "%3d&"); // para casos base64
		const fields = dataString.split("&");
		return fields;
	}
	post_data_type = "raw";
	return value;
}

/*-------RESCRIBIR DATOS REFERER-------*/
function rewriteReferer(e) {
	const url_fieldVal = url_field.value;
	if (e.url !== url_fieldVal) return {};

	e.requestHeaders.push({
		name: "Referer",
		value: url_fieldVal,
	});

	browser.webRequest.onBeforeSendHeaders.removeListener(rewriteReferer);

	return {
		requestHeaders: e.requestHeaders,
	};
}

/*-------GUARDAR DATOS POST-------*/
function savePostdata(requestDetails) {
	const formData = requestDetails.requestBody?.formData;
	let datapost = "";

	if (requestDetails.method === "POST" && formData) {
		datapost = Object.entries(formData)
			.flatMap(([key, values]) => values.map((value) => `${key}=${value}`))
			.join("&");
	}

	const contentToStore = {
		[requestDetails.url]: [
			requestDetails.url,
			datapost,
			requestDetails.originUrl || "",
		],
	};

	browser.storage.local.set(contentToStore);
	return {};
}

/*-------MANEJO UNIFICADO DE TOGGLES-------*/
function handleDataToggle(panelType) {
	const elements = {
		post: {
			container: post_data_container,
			label: post_data_switch_label,
			checkbox: post_data_switch,
		},
		referer: {
			container: referer_data_container,
			label: referer_data_switch_label,
			checkbox: referer_data_switch,
		},
	};

	const { container, label, checkbox } = elements[panelType];
	const isChecked = checkbox.checked;

	// Mostrar/ocultar panel
	if (panelType === "post") {
		container.classList.toggle("hidden-input-panel", !isChecked);
	} else {
		container.style.display = isChecked ? "block" : "none";
	}

	label.style.color = isChecked ? "#00E0C7" : "white";

	// Manejo del listener
	if (
		isChecked &&
		!browser.webRequest.onBeforeRequest.hasListener(savePostdata)
	) {
		browser.webRequest.onBeforeRequest.addListener(
			savePostdata,
			{ urls: ["<all_urls>"], types: ["main_frame"] },
			["requestBody"],
		);
	} else if (
		!isChecked &&
		browser.webRequest.onBeforeRequest.hasListener(savePostdata)
	) {
		browser.webRequest.onBeforeRequest.removeListener(savePostdata);
	}

	// Actualizar almacenamiento
	updateToggleStorage();
}

/*-------ACTUALIZAR ALMACENAMIENTO-------*/
function updateToggleStorage() {
	browser.storage.local.set({
		hackbarsettings: {
			0: post_data_switch.checked,
			1: referer_data_switch.checked,
		},
	});
}

/*-----AL CARGAR LA BARRA LATERAL, OBTIENE LA ID DE LA VENTANA Y ACTUALIZA SU CONTENIDO-----*/
browser.windows
	.getCurrent({
		populate: true,
	})
	.then((windowInfo) => {
		myWindowId = windowInfo.id;
		updateContent();
	});

/*-------CUANDO EL MOUSE SALE, GUARDA EL CONTENIDO ACTUAL DEL CAMPO-------*/
window.addEventListener("mouseout", () => {
	browser.tabs
		.query({
			windowId: myWindowId,
			active: true,
		})
		.then((tabs) => {
			const contentToStore = {};
			const arraycontent = [
				url_field.value,
				postDataField.value,
				refererField.value,
			];

			const url = tabs[0].url.trim();
			contentToStore[url] = arraycontent;

			browser.storage.local.set(contentToStore);
		});
});

/*-------ACTUALIZA EL CONTENIDO CUANDO UNA NUEVA PESTAÑA SE ACTIVA-------*/
browser.tabs.onActivated.addListener(updateContent);

/*-------ACTUALIZA EL CONTENIDO CUANDO UNA NUEVA PAGINA SE CARGA EN UNA PESTAÑA-------*/
browser.tabs.onUpdated.addListener(updateContent);

/*-------CARGA LA CONFIGURACIÓN-------*/
browser.tabs
	.query({
		windowId: myWindowId,
		active: true,
	})
	.then((tabs) => {
		return browser.storage.local.get("hackbarsettings");
	})
	.then((storedInfo) => {
		const key = Object.keys(storedInfo)[0];
		if (storedInfo[key]) {
			if (storedInfo[key][0] === true) {
				post_data_switch.checked = true;
				handleDataToggle("post");
			}
			if (storedInfo[key][1] === true) {
				referer_data_switch.checked = true;
				handleDataToggle("referer");
			}
		}
	});

/*-------AÑADE EVENTOS ESCUCHA A LOS BOTONES-------*/
load_url_btn.addEventListener("click", loadURL);
split_url_btn.addEventListener("click", splitUrl);
execute_payload_btn.addEventListener("click", execute);

post_data_switch.addEventListener("change", () => handleDataToggle("post"));
referer_data_switch.addEventListener("change", () =>
	handleDataToggle("referer"),
);
