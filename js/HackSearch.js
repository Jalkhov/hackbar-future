/**
 * HackSearch Module
 * -----------------
 * This function generates and opens targeted search queries in a new tab based on the selected operation.
 * It's useful for reconnaissance tasks like finding sensitive files, subdomains, misconfigurations,
 * or analyzing domain reputation and DNS information.
 *
 * For more info: http://penzil-hacksearch.blogspot.com
 */

/**
 * Opens a new browser tab with the given URL.
 * @param {string} url - The URL to open in a new tab.
 */
function newTab(url) {
	browser.tabs.create({ url });
}

/**
 * Handles all hacksearch-related actions based on the clicked button ID.
 * @param {string} id - The ID of the clicked element that determines which action to perform.
 */
function setHacksearch(id) {
	// Base URLs used for different types of searches and lookups
	const SEARCH_URLS = {
		GOOGLE_SEARCH: "https://www.google.com/search?as_q= ",
		ROBTEX_DNS: "https://www.robtex.com/dns/ ",
		INTO_DNS: "https://www.intodns.com/ ",
		GOOGLE_SAFE_BROWSING: "https://google.com/safebrowsing/diagnostic?site= ",
		SITE_ADVISOR: "https://www.siteadvisor.com/sites/ ",
		NORTON_SAFEWEB: "https://safeweb.norton.com/report/show?url= ",
		AVG_THREAT_LABS: "https://www.avgthreatlabs.com/sitereports/domain/ ",
		DNSW_INFO: "http://dnsw.info/",
		RBLS_ORG: "http://rbls.org/",
		ALEXA_SITEINFO: "https://www.alexa.com/siteinfo/ ",
		BUILT_WITH: "https://builtwith.com/ ",
	};

	// Retrieve current active tab and extract the domain
	browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
		const domain = getDomain(tabs[0].url);
		if (!domain) return;

		const cleanDomain = domain.replace("www.", "");
		const domainKeyword = cleanDomain.replace(
			/www\.|\.com|\.in|\.org|\.co\.in|\.edu|\.gov|\.net|\.info|\.uk|\.ae/gi,
			"",
		);

		/**
		 * Map of operation IDs to their corresponding URL builders.
		 * Each entry returns the full URL string to open in a new tab.
		 */
		const operations = {
			// Site-based searches
			wSite: () => `${SEARCH_URLS.GOOGLE_SEARCH}site:${cleanDomain}`,
			eSite: () => `${SEARCH_URLS.GOOGLE_SEARCH}site:${cleanDomain}`,
			iLink: () =>
				`${SEARCH_URLS.GOOGLE_SEARCH}link:${cleanDomain}+site:${cleanDomain}`,
			bLink: () =>
				`${SEARCH_URLS.GOOGLE_SEARCH}link:${cleanDomain}+-site:${cleanDomain}`,
			subdomain: () =>
				`${SEARCH_URLS.GOOGLE_SEARCH}site:${cleanDomain}+-site:www.${cleanDomain}`,
			url: () =>
				`${SEARCH_URLS.GOOGLE_SEARCH}inurl:${domainKeyword}+-site:${cleanDomain}`,
			userpass: () =>
				`${SEARCH_URLS.GOOGLE_SEARCH}intext:${domainKeyword}+intext:(username||password||passwd||pwd||uname||paswd||passw0rd)`,
			email: () => `${SEARCH_URLS.GOOGLE_SEARCH}"*@${cleanDomain}"`,
			adminlogin: () =>
				`${SEARCH_URLS.GOOGLE_SEARCH}site:${cleanDomain}+inurl:admin||administrator||adm||login||l0gin`,
			misc: () =>
				`${SEARCH_URLS.GOOGLE_SEARCH}site:${cleanDomain}+inurl:history||access||log||license||readme||meta||root||sql||source||include||private||src||cgi||conf||account||asset||attach||audit||upload||auth||backup||bkup||build||cmd||demo||sample||default||mail||bin||etc`,
			docs: () =>
				`${SEARCH_URLS.GOOGLE_SEARCH}site:${cleanDomain}+filetype:pdf||doc||xml||txt||xls||ppt||docx||wps||rtf||csv||pptx||xlsx||xlr`,
			conf: () =>
				`${SEARCH_URLS.GOOGLE_SEARCH}site:${cleanDomain}+filetype:pwl||pol||pl||sh||ini||ht||exe||cgi||api||pdb||sql||ins||cfg||keychain||prf`,
			Bkup: () =>
				`${SEARCH_URLS.GOOGLE_SEARCH}site:${cleanDomain}+filetype:ost||bak||eml||bck||bac||tmp`,
			arch: () =>
				`${SEARCH_URLS.GOOGLE_SEARCH}site:${cleanDomain}+filetype:zip||rar||jar||tar.gz||7z||tar.b2z||tar.7z||tar`,

			// DNS & Domain tools
			DHealth: () => SEARCH_URLS.INTO_DNS + cleanDomain,
			Dinfo: () => `${SEARCH_URLS.ROBTEX_DNS + cleanDomain}.html`,
			dnsw: () => SEARCH_URLS.DNSW_INFO + cleanDomain,
			rbls: () => SEARCH_URLS.RBLS_ORG + cleanDomain,

			// Security & Reputation checks
			googleSafebrowsing: () => SEARCH_URLS.GOOGLE_SAFE_BROWSING + cleanDomain,
			siteadvisor: () => SEARCH_URLS.SITE_ADVISOR + cleanDomain,
			norton: () => SEARCH_URLS.NORTON_SAFEWEB + cleanDomain,
			avgthreatlabs: () => SEARCH_URLS.AVG_THREAT_LABS + cleanDomain,
			alexa: () => SEARCH_URLS.ALEXA_SITEINFO + cleanDomain,
			builtWith: () => SEARCH_URLS.BUILT_WITH + cleanDomain,
		};

		// Execute the matched operation
		const operation = operations[id];
		if (operation && typeof operation === "function") {
			newTab(operation());
		} else {
			console.warn(`Unsupported operation ID: "${id}"`);
		}
	});
}
