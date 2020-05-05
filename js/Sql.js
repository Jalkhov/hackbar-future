function setSqlBasics(id){
	var string = "";
	var final1 = "";
	var ascii = "";
	var i = 0;

	switch (id) {
		/*---UTF8---*/
		case "utf8":
			getSelectedText(function(str) {
				setSelectedText("CONVERT(" + str + " USING utf8)");
			});
			break;

		/*---LATIN1---*/
		case "latin1":
			getSelectedText(function(str) {
				setSelectedText("CONVERT(" + str + " USING latin1)");
			});
			break;

		/*---CAST()---*/
		case "cast":
			getSelectedText(function(str) {
				setSelectedText("cast(" + str + ")");
			});
			break;

		/*---UNHEX(HEX())---*/
		case "unhex":
			getSelectedText(function(str) {
				setSelectedText("unhex(hex(" + str + "))");
			});
			break;

		/*---UNCOMPRESS(COMPRESS())---*/
		case "uncompress":
			getSelectedText(function(str) {
				setSelectedText("uncompress(compress(" + str + "))");
			});
			break;

		/*---MYSQL CHAR()---*/
		case "mysqlchar":
			getSelectedText(function(str) {
				for (i = 0; i < str.length; i++) {
					if (i == str.length - 1) {
						final1 += "" + str.charCodeAt(i) + "";
					} else {
						final1 += "" + str.charCodeAt(i) + ", ";
					}
				}
				ascii = "CHAR(" + final1 + ")";
				setSelectedText(ascii);
			});
			break;

		/*---MSSQL CHAR()---*/
		case "mssqlchar":
			getSelectedText(function(str) {
				for (i = 0; i < str.length; i++) {
					ascii = str.charCodeAt(i);

					if (i == str.length - 1) {
						final1 += "CHAR(" + ascii + ")";
					} else {
						final1 += "CHAR(" + ascii + ")+";
					}
				}
				setSelectedText(final1);
			});
			break;

		/*---ORACLE CHAR()---*/
		case "oraclechar":
			getSelectedText(function(str) {
				for (i = 0; i < str.length; i++) {
					ascii = str.charCodeAt(i);

					if (i == str.length - 1) {
						final1 += "CHR(" + ascii + ")";
					} else {
						final1 += "CHR(" + ascii + ") ||";
					}
				}
				setSelectedText(final1);
			});
			break;

		/*---REPLACE WHITESPACE: SPACE PLUS---*/
		case "spaceplus":
			getSelectedText(function(str) {
				string = str.replace(/\/\*\*\//g, "+");
				string = final1.replace(/\/\*\&a\=\*\//g, "+");
				string = final1.replace(/ /g, "+");
				setSelectedText(string);
			});
			break;

		/*---REPLACE WHITESPACE: SPACE INLINE---*/
		case "spaceinline":
			getSelectedText(function(str) {
				string = str.replace(/\/\*\*\//g, "/**/");
				string = final1.replace(/\/\*\&a\=\*\//g, "/**/");
				string = final1.replace(/ /g, "/**/");
				setSelectedText(string);
			});
			break;

		/*---REPLACE WHITESPACE: SPACE CLEAR---*/
		case "spaceclear":
			getSelectedText(function(str) {
				string = str.replace(/\+/g, " ");
				string = final1.replace(/\/\*\*\//g, " ");
				string = final1.replace(/ /g, " ");
				setSelectedText(string);
			});
			break;

		/*---SYSTEM VARIABLES-MYSQL-VERSION: VERSION()---*/
		case "varversion":
			setSelectedText("VERSION()");
			break;

		/*---SYSTEM VARIABLES-MYSQL-VERSION: @@VERSION()---*/
		case "varversion2":
			setSelectedText("@@VERSION()");
			break;

		/*---SYSTEM VARIABLES-MYSQL-VERSION: @@GLOBAL.VERSION---*/
		case "varversion3":
			setSelectedText("@@GLOBAL.VERSION");
			break;

		/*---SYSTEM VARIABLES-MYSQL-VERSION: @@VERSION_COMMENT---*/
		case "varversion4":
			setSelectedText("@@VERSION_COMMENT");
			break;

		/*---SYSTEM VARIABLES-MYSQL-USER: USER()*/
		case "varuser1":
			setSelectedText("USER()");
			break;

		/*---SYSTEM VARIABLES-MYSQL-USER: CURRENT_USER()*/
		case "varuser2":
			setSelectedText("CURRENT_USER()");
			break;

		/*---SYSTEM VARIABLES-MYSQL-USER: SYSTEM_USER()*/
		case "varuser3":
			setSelectedText("SYSTEM_USER()");
			break;

		/*---SYSTEM VARIABLES-MYSQL-USER: SESSION_USER()*/
		case "varuser4":
			setSelectedText("SESSION_USER()");
			break;

		/*---SYSTEM VARIABLES-MYSQL-USER: SUBSTRING_INDEX(USER(),0x40,1)*/
		case "varuser5":
			setSelectedText("SUBSTRING_INDEX(USER(),0x40,1)");
			break;

		/*---SYSTEM VARIABLES-MYSQL-USER: (SELECT+CONCAT(USER)+FROM+INFORMATION_SCHEMA.PROCESSLIST)*/
		case "varuser6":
			setSelectedText("(SELECT+CONCAT(USER)+FROM+INFORMATION_SCHEMA.PROCESSLIST)");
			break;

		/*---SYSTEM VARIABLES-MYSQL-DATABASE: DATABASE()*/
		case "vardb1":
			setSelectedText("DATABASE()");
			break;

		/*---SYSTEM VARIABLES-MYSQL-DATABASE: SCHEMA()*/
		case "vardb2":
			setSelectedText("SCHEMA()");
			break;

		/*---SYSTEM VARIABLES-MYSQL-DATABASE: SCHEMA()2*/
		case "vardb3":
			setSelectedText("(SELECT+CONCAT(DB)+FROM+INFORMATION_SCHEMA.PROCESSLIST)");
			break;

		/*---SYSTEM VARIABLES-MYSQL-GET SERVER FOLDERS: @@CHARACTER_SETS_DIR*/
		case "varserver1":
			setSelectedText("@@CHARACTER_SETS_DIR");
			break;

		/*---SYSTEM VARIABLES-MYSQL-GET SERVER FOLDERS: @@LOG_ERROR*/
		case "varserver2":
			setSelectedText("@@LOG_ERROR");
			break;

		/*---SYSTEM VARIABLES-MYSQL-GET SERVER FOLDERS: @@LANGUAGE*/
		case "varserver3":
			setSelectedText("@@LANGUAGE");
			break;

		/*------SYSTEM VARIABLES-MYSQL-GET SERVER FOLDERS: @@PID_FILE*/
		case "varserver4":
			setSelectedText("@@PID_FILE");
			break;

		/*------SYSTEM VARIABLES-MYSQL-GET SERVER FOLDERS: @@PLUGIN_DIR*/
		case "varserver5":
			setSelectedText("@@PLUGIN_DIR");
			break;

		/*------SYSTEM VARIABLES-MYSQL-GET SERVER FOLDERS: @@SOCKET*/
		case "varserver6":
			setSelectedText("@@SOCKET");
			break;

		/*------SYSTEM VARIABLES-MYSQL-GET SERVER FOLDERS: @@BASEDIR*/
		case "varserver7":
			setSelectedText("@@BASEDIR");
			break;

		/*------SYSTEM VARIABLES-MYSQL-GET SERVER FOLDERS: @@DATADIR*/
		case "varserver8":
			setSelectedText("@@DATADIR");
			break;

		/*------SYSTEM VARIABLES-MYSQL-GET SERVER FOLDERS: @@SLAVE_LOAD_TMPDIR*/
		case "varserver9":
			setSelectedText("@@SLAVE_LOAD_TMPDIR");
			break;

		/*------SYSTEM VARIABLES-MYSQL-CHARSET: CHARSET CLIENT*/
		case "varcharset1":
			setSelectedText("@@CHARACTER_SET_CLIENT");
			break;

		/*------SYSTEM VARIABLES-MYSQL-CHARSET: CHARSET CONNECTION*/
		case "varcharset2":
			setSelectedText("@@CHARACTER_SET_CONNECTION");
			break;

		/*------SYSTEM VARIABLES-MYSQL-CHARSET: CHARSET DATABASE*/
		case "varcharset3":
			setSelectedText("@@CHARACTER_SET_DATABASE");
			break;

		/*------SYSTEM VARIABLES-MYSQL-CHARSET: CHARSET FILESYSTEM*/
		case "varcharset4":
			setSelectedText("@@CHARACTER_SET_FILESYSTEM");
			break;

		/*------SYSTEM VARIABLES-MYSQL-CHARSET: CHARSET SERVER*/
		case "varcharset5":
			setSelectedText("@@CHARACTER_SET_SERVER");
			break;

		/*------SYSTEM VARIABLES-MYSQL: CASE INTENSIV TABLES*/
		case "varsys1":
			setSelectedText("IF((@@LOWER_CASE_TABLE_NAMES)=0,0x594553,0x4e4f)");
			break;

		/*------SYSTEM VARIABLES-MYSQL: CASE INTENSIV SYSTEM*/
		case "varsys2":
			setSelectedText("IF((@@LOWER_CASE_FILE_SYSTEM)=0,0x594553,0x4e4f)");
			break;

		/*------SYSTEM VARIABLES-MYSQL: COLLATION SET*/
		case "varsys3":
			setSelectedText("@@COLLATION_CONNECTION");
			break;

		/*------SYSTEM VARIABLES-MYSQL: HOSTNAME*/
		case "varsys4":
			setSelectedText("@@HOSTNAME");
			break;

		/*------SYSTEM VARIABLES-MYSQL: INNODB*/
		case "varsys5":
			setSelectedText("@@HAVE_INNODB");
			break;

		/*------SYSTEM VARIABLES-MYSQL: OPERATORS*/
		case "varsys6":
			setSelectedText("@@FT_BOOLEAN_SYNTAX");
			break;

		/*------SYSTEM VARIABLES-MYSQL: PORT SQL*/
		case "varsys7":
			setSelectedText("@@PORT");
			break;

		/*------SYSTEM VARIABLES-MYSQL: RECOVER OPTIONS------*/
		case "varsys8":
			setSelectedText("@@MYISAM_RECOVER_OPTIONS");
			break;

		/*------SYSTEM VARIABLES-MYSQL: SERVER OS------*/
		case "varsys9":
			setSelectedText("@@VERSION_COMPILE_OS");
			break;

		/*------SYSTEM VARIABLES-MYSQL: SERVER OS TYPE------*/
		case "varsys10":
			setSelectedText("@@VERSION_COMPILE_MACHINE");
			break;

		/*------SYSTEM VARIABLES-MYSQL: SSL OPEN------*/
		case "varsys11":
			setSelectedText("@@HAVE_OPENSSL");
			break;

		/*------SYSTEM VARIABLES-MYSQL: SYMLINK------*/
		case "varsys12":
			setSelectedText("@@HAVE_SYMLINK");
			break;

		/*------SYSTEM VARIABLES-MYSQL: TIMEOUT CONNECTION------*/
		case "varsys13":
			setSelectedText("@@WAIT_TIMEOUT");
			break;

		/*------OTHER: LPAD()------*/
		case "othlpad":
			getSelectedText(function(str) {
				setSelectedText("LPAD(" + str + ",2,0x30)");
			});
			break;
		/*------OTHER: REPEAT()------*/
		case "othrepeat":
			getSelectedText(function(str) {
				setSelectedText("REPEAT(" + str + ",5)");
			});
			break;

		/*------OTHER: IF STATEMENT------*/
		case "othifstat":
			getSelectedText(function(str) {
				setSelectedText("IF((" + str + ")>-1,0x00,0x00)");
			});
			break;

		/*------OTHER: CASE WHEN THEN------*/
		case "othcaswth":
			getSelectedText(function(str) {
				setSelectedText("CASE+WHEN+(" + str + ")+THEN+1+ELSE+2+END");
			});
			break;
	}
}