$(document).ready(function() {
	$(function() {
		$(".opt-sqlbasics").on("click", function() {
			let opt = this.id;
			var string = "";
			var str = "";
			var final1 = "";
			var ascii = "";
			var i = 0;

			switch (opt) {
				/*---UTF8---*/
				case "utf8":
					str = getSelectedText();
					string = "CONVERT(" + str + " USING utf8)";
					break;

				/*---LATIN1---*/
				case "latin1":
					str = getSelectedText();
					string = "CONVERT(" + str + " USING latin1)";
					break;

				/*---CAST()---*/
				case "cast":
					str = getSelectedText();
					string = "cast(" + str + ")";
					break;

				/*---UNHEX(HEX())---*/
				case "unhex":
					str = getSelectedText();
					string = "unhex(hex(" + str + "))";
					break;

				/*---UNCOMPRESS(COMPRESS())---*/
				case "uncompress":
					str = getSelectedText();
					string = "uncompress(compress(" + str + "))";
					break;

				/*---MYSQL CHAR()---*/
				case "mysqlchar":
					str = getSelectedText();

					for (i = 0; i < str.length; i++) {
						if (i == str.length - 1) {
							final1 += "" + str.charCodeAt(i) + "";
						} else {
							final1 += "" + str.charCodeAt(i) + ", ";
						}
					}
					ascii = "CHAR(" + final1 + ")";
					string = ascii;
					break;

				/*---MSSQL CHAR()---*/
				case "mssqlchar":
					str = getSelectedText();

					for (i = 0; i < str.length; i++) {
						ascii = str.charCodeAt(i);

						if (i == str.length - 1) {
							final1 += "CHAR(" + ascii + ")";
						} else {
							final1 += "CHAR(" + ascii + ")+";
						}
					}
					string = final1;
					break;

				/*---ORACLE CHAR()---*/
				case "oraclechar":
					str = getSelectedText();

					for (i = 0; i < str.length; i++) {
						ascii = str.charCodeAt(i);

						if (i == str.length - 1) {
							final1 += "CHR(" + ascii + ")";
						} else {
							final1 += "CHR(" + ascii + ") ||";
						}
					}
					string = final1;
					break;

				/*---REPLACE WHITESPACE: SPACE PLUS---*/
				case "spaceplus":
					str = getSelectedText();

					final1 = str.replace(/\/\*\*\//g, "+");
					final1 = final1.replace(/\/\*\&a\=\*\//g, "+");
					final1 = final1.replace(/ /g, "+");
					string = final1;
					break;

				/*---REPLACE WHITESPACE: SPACE INLINE---*/
				case "spaceinline":
					str = getSelectedText();

					final1 = str.replace(/\/\*\*\//g, "/**/");
					final1 = final1.replace(/\/\*\&a\=\*\//g, "/**/");
					final1 = final1.replace(/ /g, "/**/");
					string = final1;
					break;

				/*---REPLACE WHITESPACE: SPACE CLEAR---*/
				case "spaceclear":
					str = getSelectedText();

					final1 = str.replace(/\+/g, " ");
					final1 = final1.replace(/\/\*\*\//g, " ");
					final1 = final1.replace(/ /g, " ");
					string = final1;
					break;

				/*---SYSTEM VARIABLES-MYSQL-VERSION: VERSION()---*/
				case "varversion":
					string = "VERSION()";
					break;

				/*---SYSTEM VARIABLES-MYSQL-VERSION: @@VERSION()---*/
				case "varversion2":
					string = "@@VERSION()";
					break;

				/*---SYSTEM VARIABLES-MYSQL-VERSION: @@GLOBAL.VERSION---*/
				case "varversion3":
					string = "@@GLOBAL.VERSION";
					break;

				/*---SYSTEM VARIABLES-MYSQL-VERSION: @@VERSION_COMMENT---*/
				case "varversion4":
					string = "@@VERSION_COMMENT";
					break;

				/*---SYSTEM VARIABLES-MYSQL-USER: USER()*/
				case "varuser1":
					string = "USER()";
					break;

				/*---SYSTEM VARIABLES-MYSQL-USER: CURRENT_USER()*/
				case "varuser2":
					string = "CURRENT_USER()";
					break;

				/*---SYSTEM VARIABLES-MYSQL-USER: SYSTEM_USER()*/
				case "varuser3":
					string = "SYSTEM_USER()";
					break;

				/*---SYSTEM VARIABLES-MYSQL-USER: SESSION_USER()*/
				case "varuser4":
					string = "SESSION_USER()";
					break;

				/*---SYSTEM VARIABLES-MYSQL-USER: SUBSTRING_INDEX(USER(),0x40,1)*/
				case "varuser5":
					string = "SUBSTRING_INDEX(USER(),0x40,1)";
					break;

				/*---SYSTEM VARIABLES-MYSQL-USER: (SELECT+CONCAT(USER)+FROM+INFORMATION_SCHEMA.PROCESSLIST)*/
				case "varuser6":
					string = "(SELECT+CONCAT(USER)+FROM+INFORMATION_SCHEMA.PROCESSLIST)";
					break;

				/*---SYSTEM VARIABLES-MYSQL-DATABASE: DATABASE()*/
				case "vardb1":
					string = "DATABASE()";
					break;

				/*---SYSTEM VARIABLES-MYSQL-DATABASE: SCHEMA()*/
				case "vardb2":
					string = "SCHEMA()";
					break;

				/*---SYSTEM VARIABLES-MYSQL-DATABASE: SCHEMA()2*/
				case "vardb3":
					string = "(SELECT+CONCAT(DB)+FROM+INFORMATION_SCHEMA.PROCESSLIST)";
					break;

				/*---SYSTEM VARIABLES-MYSQL-GET SERVER FOLDERS: @@CHARACTER_SETS_DIR*/
				case "varserver1":
					string = "@@CHARACTER_SETS_DIR";
					break;

				/*---SYSTEM VARIABLES-MYSQL-GET SERVER FOLDERS: @@LOG_ERROR*/
				case "varserver2":
					string = "@@LOG_ERROR";
					break;

				/*---SYSTEM VARIABLES-MYSQL-GET SERVER FOLDERS: @@LANGUAGE*/
				case "varserver3":
					string = "@@LANGUAGE";
					break;

				/*------SYSTEM VARIABLES-MYSQL-GET SERVER FOLDERS: @@PID_FILE*/
				case "varserver4":
					string = "@@PID_FILE";
					break;

				/*------SYSTEM VARIABLES-MYSQL-GET SERVER FOLDERS: @@PLUGIN_DIR*/
				case "varserver5":
					string = "@@PLUGIN_DIR";
					break;

				/*------SYSTEM VARIABLES-MYSQL-GET SERVER FOLDERS: @@SOCKET*/
				case "varserver6":
					string = "@@SOCKET";
					break;

				/*------SYSTEM VARIABLES-MYSQL-GET SERVER FOLDERS: @@BASEDIR*/
				case "varserver7":
					string = "@@BASEDIR";
					break;

				/*------SYSTEM VARIABLES-MYSQL-GET SERVER FOLDERS: @@DATADIR*/
				case "varserver8":
					string = "@@DATADIR";
					break;

				/*------SYSTEM VARIABLES-MYSQL-GET SERVER FOLDERS: @@SLAVE_LOAD_TMPDIR*/
				case "varserver9":
					string = "@@SLAVE_LOAD_TMPDIR";
					break;

				/*------SYSTEM VARIABLES-MYSQL-CHARSET: CHARSET CLIENT*/
				case "varcharset1":
					string = "@@CHARACTER_SET_CLIENT";
					break;

				/*------SYSTEM VARIABLES-MYSQL-CHARSET: CHARSET CONNECTION*/
				case "varcharset2":
					string = "@@CHARACTER_SET_CONNECTION";
					break;

				/*------SYSTEM VARIABLES-MYSQL-CHARSET: CHARSET DATABASE*/
				case "varcharset3":
					string = "@@CHARACTER_SET_DATABASE";
					break;

				/*------SYSTEM VARIABLES-MYSQL-CHARSET: CHARSET FILESYSTEM*/
				case "varcharset4":
					string = "@@CHARACTER_SET_FILESYSTEM";
					break;

				/*------SYSTEM VARIABLES-MYSQL-CHARSET: CHARSET SERVER*/
				case "varcharset5":
					string = "@@CHARACTER_SET_SERVER";
					break;

				/*------SYSTEM VARIABLES-MYSQL: CASE INTENSIV TABLES*/
				case "varsys1":
					string = "IF((@@LOWER_CASE_TABLE_NAMES)=0,0x594553,0x4e4f)";
					break;

				/*------SYSTEM VARIABLES-MYSQL: CASE INTENSIV SYSTEM*/
				case "varsys2":
					string = "IF((@@LOWER_CASE_FILE_SYSTEM)=0,0x594553,0x4e4f)";
					break;

				/*------SYSTEM VARIABLES-MYSQL: COLLATION SET*/
				case "varsys3":
					string = "@@COLLATION_CONNECTION";
					break;

				/*------SYSTEM VARIABLES-MYSQL: HOSTNAME*/
				case "varsys4":
					string = "@@HOSTNAME";
					break;

				/*------SYSTEM VARIABLES-MYSQL: INNODB*/
				case "varsys5":
					string = "@@HAVE_INNODB";
					break;

				/*------SYSTEM VARIABLES-MYSQL: OPERATORS*/
				case "varsys6":
					string = "@@FT_BOOLEAN_SYNTAX";
					break;

				/*------SYSTEM VARIABLES-MYSQL: PORT SQL*/
				case "varsys7":
					string = "@@PORT";
					break;

				/*------SYSTEM VARIABLES-MYSQL: RECOVER OPTIONS------*/
				case "varsys8":
					string = "@@MYISAM_RECOVER_OPTIONS";
					break;

				/*------SYSTEM VARIABLES-MYSQL: SERVER OS------*/
				case "varsys9":
					string = "@@VERSION_COMPILE_OS";
					break;

				/*------SYSTEM VARIABLES-MYSQL: SERVER OS TYPE------*/
				case "varsys10":
					string = "@@VERSION_COMPILE_MACHINE";
					break;

				/*------SYSTEM VARIABLES-MYSQL: SSL OPEN------*/
				case "varsys11":
					string = "@@HAVE_OPENSSL";
					break;

				/*------SYSTEM VARIABLES-MYSQL: SYMLINK------*/
				case "varsys12":
					string = "@@HAVE_SYMLINK";
					break;

				/*------SYSTEM VARIABLES-MYSQL: TIMEOUT CONNECTION------*/
				case "varsys13":
					string = "@@WAIT_TIMEOUT";
					break;

				/*------OTHER: LPAD()------*/
				case "othlpad":
					str = getSelectedText();
					string = "LPAD(" + str + ",2,0x30)";
					break;

				/*------OTHER: REPEAT()------*/
				case "othrepeat":
					str = getSelectedText();
					string = "REPEAT(" + str + ",5)";
					break;

				/*------OTHER: IF STATEMENT------*/
				case "othifstat":
					str = getSelectedText();
					string = "IF((" + str + ")>-1,0x00,0x00)";
					break;

				/*------OTHER: CASE WHEN THEN------*/
				case "othcaswth":
					str = getSelectedText();
					string = "CASE+WHEN+(" + str + ")+THEN+1+ELSE+2+END";
					break;

				default:
					string = "www.facebook.com/Jalkhov";
			}
			setSelectedText(string);
		});
	});
});