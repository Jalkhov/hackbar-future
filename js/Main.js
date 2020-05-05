/*-------VARIABLES PARTE 1-------*/
var myWindowId;
var urlField = $("#text_field");
var postDataField = $("#postdataField");
var refererField = $("#refedataField");
var postDIV = $("#divPost");
var refeDIV = $("#divRefe");
var labelPdata = $("#LABPdata");
var labelRdata = $("#LABRdata");
var typePostdata = "";
var selectionStart = "";
var selectionEnd = "";


/*-------CUANDO EL MOUSE SALE, GUARDA EL CONTENIDO ACTUAL DEL CAMPO-------*/
window.addEventListener("mouseout", () => {
	browser.tabs.query({
		windowId: myWindowId,
		active: true
	}).then((tabs) => {
		let contentToStore = {};
		let arraycontent = {};
		arraycontent[0] = urlField.val();
		arraycontent[1] = postDataField.val();
		arraycontent[2] = refererField.val();
		contentToStore[tabs[0].url] = arraycontent;
		browser.storage.local.set(contentToStore);
	});
});

/*-------ACTUALIZA EL CONTENIDO DE LA BARRA LATERAL-------*/
function updateContent() {
	browser.tabs.query({
			windowId: myWindowId,
			active: true
		})
		.then((tabs) => {
			return browser.storage.local.get(tabs[0].url);
		})
		.then((storedInfo) => {
			if (storedInfo[Object.keys(storedInfo)[0]]) {
				urlField.prop('value', storedInfo[Object.keys(storedInfo)[0]][0]);
				postDataField.prop('value', storedInfo[Object.keys(storedInfo)[0]][1]);
				refererField.prop('value', storedInfo[Object.keys(storedInfo)[0]][2]);
			}
		});
}

/*-----AL CARGAR LA BARRA LATERAL, OBTIENE LA ID DE LA VENTANA Y ACTUALIZA SU CONTENIDO-----*/
browser.windows.getCurrent({
	populate: true
}).then((windowInfo) => {
	myWindowId = windowInfo.id;
	updateContent();
});

/*-------ACTUALIZA EL CONTENIDO CUANDO UNA NUEVA PESTAÑA SE ACTIVA-------*/
browser.tabs.onActivated.addListener(updateContent);

/*-------ACTUALIZA EL CONTENIDO CUANDO UNA NUEVA PAGINA SE CARGA EN UNA PESTAÑA-------*/
browser.tabs.onUpdated.addListener(updateContent);


/*-------VARIABLES PARTE 2-------*/
var loadUrlBtn = $(".load-url-btn");
var splitUrlBtn = $(".split-url-btn");
var executeBtn = $(".execute-payload-btn");

var enablePostBtn = $("#toggle-post-data");
var enableRefererBtn = $("#toggle-referer");
var currentFocusField = null;
currentFocusField = urlField;


/*-------CARGA LA CONFIGURACIÓN-------*/
browser.tabs.query({
		windowId: myWindowId,
		active: true
	})
	.then((tabs) => {
		return browser.storage.local.get("hackbarsettings");
	})
	.then((storedInfo) => {
		if (storedInfo[Object.keys(storedInfo)[0]]) {
			if (storedInfo[Object.keys(storedInfo)[0]][0] == true) {
				enablePostBtn.prop('checked', true);
				togglepostdata();
			}
			if (storedInfo[Object.keys(storedInfo)[0]][1] == true) {
				enableRefererBtn.prop('checked', true);
				togglereferer();
			}
		}
	});


/*-------GET SELECTED TEXT-------*/
/*
function getSelectedText() {
	selectionStart = text_field.selectionStart;
	selectionEnd = text_field.selectionEnd;
	if (selectionEnd - selectionStart < 1) {
		return prompt("Insert string", "String to use");
	} else {
		return text_field.value.substr(selectionStart, selectionEnd - selectionStart);
	}
}
*/


/*-------NEW PROMPT QITH JQUERY-MODAL------*/
function iPrompt(callbackFunction) {
	$('#prompt').modal({
		escapeClose: false,
		clickClose: false,
		showClose: false
	});
	$('#prompt input').val("");
	$('#prompt button').bind('click', () => {
		const selected_text = $('#prompt input').val();
		callbackFunction(selected_text);
		$.modal.close();
	});
}


/*-------GET SELECTED TEXT-------*/
function getSelectedText(callbackFunction) {
	selectionStart = text_field.selectionStart;
	selectionEnd = text_field.selectionEnd;

	if (selectionEnd - selectionStart < 1) {
		iPrompt(callbackFunction);
	} else {
		callbackFunction(text_field.value.substr(selectionStart, selectionEnd - selectionStart));
	}
}


/*-------SET SELECTED TEXT-------*/
function setSelectedText(str) {
	selectionStart = text_field.selectionStart;
	selectionEnd = text_field.selectionEnd;
	var pre = text_field.value.substr(0, selectionStart);
	var post = text_field.value.substr(selectionEnd, text_field.value.length);
	text_field.value = pre + str + post;
	text_field.selectionStart = selectionStart;
	text_field.selectionEnd = selectionStart + str.length;
	currentFocusField.focus()
}


/*-------CARGAR URL-------*/
function loadURL() {
	browser.tabs.query({
		active: true,
		currentWindow: true
	}).then(function(tabs) {
		var currentTabUrl = tabs[0].url;
		urlField.prop('value', currentTabUrl);
		storedInfo = browser.storage.local.get(currentTabUrl);

		if (storedInfo) {
			urlField.prop('value', storedInfo[Object.keys(storedInfo)[0]][1]);
		} else {
			urlField.prop('value', "");
		}
	});
}


/*-------SPLIT URL-------*/
function splitUrl() {
	var uri = currentFocusField.val();
	uri = uri.replace(new RegExp(/&/g), "\n&");
	uri = uri.replace(new RegExp(/\?/g), "\n?");
	currentFocusField.val(uri);
	return true;
}


/*-------EJECUTAR-------*/
function execute() {
	browser.tabs.query({
		active: true,
		currentWindow: true
	}).then(function(tabs) {
		var currentTabUrl = tabs[0].url;
		let contentToStore = {};
		let arraycontent = {};
		arraycontent[0] = urlField.val();
		arraycontent[1] = postDataField.val();
		arraycontent[2] = refererField.val();
		contentToStore[urlField.val()] = arraycontent;
		browser.storage.local.set(contentToStore);
		if (enableRefererBtn.prop('checked')) {
			browser.webRequest.onBeforeSendHeaders.addListener(
				rewriteReferer, {
					urls: ["<all_urls>"],
					types: ["main_frame"]
				}, ["blocking", "requestHeaders"]
			);
		}
		if (!enablePostBtn.prop('checked')) { // just get method
			var updating = browser.tabs.update({
				url: urlField.val()
			});
			updating.then(null, null);
			return;
		}
		var postData = getPostdata();
		if (typePostdata == "formdata") {
			var scriptpost = 'document.body.innerHTML += \'<form id="newhackbardynForm" action="' + urlField.val() + '" method="post">';
			for (var i = 0; i < postData.length; i++) {
				var field = postData[i].split('=');
				var fieldvalue = "";
				if (field.length == 2) {
					fieldvalue = field[1];
				} else if (field.length == 3) { // base64 case
					if (field[2] == "") {
						fieldvalue = field[1] + "%3d";
					}
				} else {
					typePostdata = "raw";
					break;
				}
				scriptpost += '<input type="hidden" name="' + field[0] + '" value="' + fieldvalue + '">';
			}
			if (typePostdata == "formdata") {
				scriptpost += '</form>\';document.getElementById("newhackbardynForm").submit();'
				var executing = browser.tabs.executeScript({
					code: scriptpost
				});
				executing.then(null, null);
			}
		}
		if (typePostdata != "formdata") // for raw data and mutilpart formdata
		{
			if (currentTabUrl != urlField.val()) {
				var updating = browser.tabs.update({
					url: urlField.val()
				});
				updating.then(null, null);
			}
			var responsePost = "";
			fetch(urlField.val(), {
				method: "POST",
				redirect: 'follow',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Cache': 'no-cache'
				},
				credentials: 'include',
				body: postDataField.val()
			}).then(function(response) {
				response.text().then(function(text) {
					responsePost = text;
					var scriptpost = 'document.body.innerHTML = unescape(\'' + urlencode(responsePost) + '\');';
					var executing = browser.tabs.executeScript({
						code: scriptpost
					});
					executing.then(null, null);
				});
			});
		}

	});
}


/*-------OBTENER DATOS POST-------*/
function getPostdata() {
	if ((postDataField.val() || '').indexOf("Content-Disposition: form-data; name=") > -1) {
		typePostdata = "multipart";
		return postDataField.val();
	} else if (postDataField.val().startsWith("<") || postDataField.val().startsWith("{")) {
		typePostdata = "raw";
		return postDataField.val();
	} else if ((postDataField.val() || '').indexOf("&") > -1) {
		typePostdata = "formdata";
		var dataString = postDataField.val();
		dataString = dataString.replace(new RegExp(/\n|\r/g), '');
		dataString = dataString.replace(new RegExp(/\+/g), "%2B");
		dataString = dataString.replace(new RegExp(/\=\=/g), "%3d%3d"); // for bas64 cases
		dataString = dataString.replace(new RegExp(/\=\&/g), "%3d&"); // for bas64 cases
		var fields = dataString.split('&');
		return fields;
	} else {
		typePostdata = "raw";
		return postDataField.val();
	}
}


/*-------RESCRIBIR DATOS REFERER-------*/
function rewriteReferer(e) {
	var urlFieldVal = urlField.val()
	if (e.url != urlFieldVal) return {};
	e.requestHeaders.push({
		name: "Referer",
		value: urlFieldVal
	});
	browser.webRequest.onBeforeSendHeaders.removeListener(rewriteReferer);
	return {
		requestHeaders: e.requestHeaders
	};
}


/*-------GUARDAR DATOS POST-------*/
function savePostdata(requestDetails) {
	var datapost = "";
	if (requestDetails.method == "POST") {
		let formData = requestDetails.requestBody.formData;
		if (formData) {
			Object.keys(formData).forEach(key => {
				formData[key].forEach(value => {
					if (datapost != "") datapost = datapost + "&";
					datapost = datapost + key + "=" + value;
				});
			});
		}
	}
	let contentToStore = {};
	let arraycontent = {};
	arraycontent[0] = requestDetails.url;
	arraycontent[1] = datapost;
	if (requestDetails.originUrl) {
		arraycontent[2] = requestDetails.originUrl;
	} else {
		arraycontent[2] = "";
	}
	contentToStore[requestDetails.url] = arraycontent;
	browser.storage.local.set(contentToStore);

	return {};
}


/*-------TOGGLE POST DATA-------*/
function togglepostdata() {
	if (enablePostBtn.prop('checked')) {
		postDIV.css("display", "");
		labelPdata.css("color", "#00E0C7");
		if (!browser.webRequest.onBeforeRequest.hasListener(savePostdata)) {
			browser.webRequest.onBeforeRequest.addListener(
				savePostdata, {
					urls: ["<all_urls>"],
					types: ["main_frame"]
				}, ["requestBody"]
			);
		}
	} else {
		postDIV.css("display", "none");
		labelPdata.css("color", "white");
		if (browser.webRequest.onBeforeRequest.hasListener(savePostdata)) {
			browser.webRequest.onBeforeRequest.removeListener(savePostdata);
		}
	}
	let contentToStore = {};
	let arraycontent = {};
	arraycontent[0] = enablePostBtn.prop('checked');
	arraycontent[1] = enableRefererBtn.prop('checked');
	contentToStore["hackbarsettings"] = arraycontent;
	browser.storage.local.set(contentToStore);
}


/*-------TOGGLE REFERER DATA-------*/
function togglereferer() {
	if (enableRefererBtn.prop('checked')) {
		refeDIV.css("display", "");
		labelRdata.css("color", "#00E0C7");
		if (!browser.webRequest.onBeforeRequest.hasListener(savePostdata)) {
			browser.webRequest.onBeforeRequest.addListener(
				savePostdata, {
					urls: ["<all_urls>"],
					types: ["main_frame"]
				}, ["requestBody"]
			);
		}
	} else {
		refeDIV.css("display", "none");
		labelRdata.css("color", "white");
		if (browser.webRequest.onBeforeRequest.hasListener(savePostdata)) {
			browser.webRequest.onBeforeRequest.removeListener(savePostdata);
		}
	}
	let contentToStore = {};
	let arraycontent = {};
	arraycontent[0] = enablePostBtn.prop('checked');
	arraycontent[1] = enableRefererBtn.prop('checked');
	contentToStore["hackbarsettings"] = arraycontent;
	browser.storage.local.set(contentToStore);
}


/*-------AÑADE EVENTOS ESCUCHA A LOS BOTONES-------*/
loadUrlBtn.bind('click', loadURL);
splitUrlBtn.bind('click', splitUrl);
executeBtn.bind('click', execute);

enablePostBtn.bind('change', togglepostdata);
enableRefererBtn.bind('change', togglereferer);