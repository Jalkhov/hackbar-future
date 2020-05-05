//For more info about hack search visit http://penzil-hacksearch.blogspot.com
function setHacksearch(id){
	var b = "http://www.google.com/search?as_q=";
	var k = "http://www.robtex.com/dns/";
	var i = "http://www.intodns.com/";
	var g = "http://google.com/safebrowsing/diagnostic?site=";
	var j = "http://www.siteadvisor.com/sites/";
	var m = "http://safeweb.norton.com/report/show?url=";
	var d = "http://www.avgthreatlabs.com/sitereports/domain/";
	var l = "http://dnsw.info/";
	var e = "http://rbls.org/";
	var a = "http://www.alexa.com/siteinfo/";
	var h = "http://builtwith.com/";
	browser.tabs.query({
		active: true,
		currentWindow: true
	}).then(function(tabs) {
		var domain = getDomain(tabs[0].url);
	
		if (domain) {
			switch (id) {
				/*------WITHIN SITE SEARCH------*/
				case "wSite":
					newTab(b + "site:" + domain);
					break;

				/*------ENTIRE DOMAIN SEARCH------*/
				case "eSite":
					newTab(b + "site:" + domain.replace("www.", ""));
					break;

				/*------INTERNAL LINKS SEARCH------*/
				case "iLink":
					newTab(b + "link:" + domain.replace("www.", "") + "+site:" + domain.replace("www.", ""));
					break;

				/*------BACK LINKS SEARCH------*/
				case "bLink":
					newTab(b + "link:" + domain.replace("www.", "") + "+-site:" + domain.replace("www.", ""));
					break;

				/*------SUBDOMAIN SEARCH------*/
				case "subdomain":
					newTab(b + "site:" + domain.replace("www.", "") + "+-site:" + domain);
					break;

				/*------INURL SEARCH------*/
				case "url":
					newTab(b + "inurl:" + domain.replace(/www.|.com|.in|.org|.co.in|.edu|.gov|.net|.info|.uk|.ae/ig, "") + "+-site:" + domain.replace("www.", ""));
					break;

				/*------USERNAME/PASSWORD SEARCH------*/
				case "userpass":
					newTab(b + "intext:" + domain.replace(/www./ig, "") + "+intext:(username||password||passwd||pwd||uname||paswd||passw0rd)");
					break;

				/*------EMAIL SEARCH------*/
				case "email":
					newTab(b + '"*@' + domain.replace("www.", "") + '"');
					break;

				/*------ADMIN/LOGIN PAGE SEARCH------*/
				case "adminlogin":
					newTab(b + "site:" + domain.replace("www.", "") + "+inurl:admin||administrator||adm||login||l0gin");
					break;

				/*------MISC SEARCH------*/
				case "misc":
					newTab(b + "site:" + domain.replace("www.", "") + "+inurl:history||access||log||license||readme||meta||root||sql||source||include||private||src||cgi||conf||account||asset||attach||audit||upload||auth||backup||bkup||build||cmd||demo||sample||default||mail||bin||etc");
					break;

				/*------DOCUMENTS SEARCH------*/
				case "docs":
					newTab(b + "site:" + domain.replace("www.", "") + "+filetype:pdf || filetype:doc || filetype:xml || filetype:txt ||  filetype:xls || filetype:ppt || filetype:pps || filetype:docx || filetype:wps || filetype:rtf || filetype:csv || filetype:pptx || filetype:xlsx || filetype:xlr");
					break;

				/*------CONFIG FILE SEARCH------*/
				case "conf":
					newTab(b + "site:" + domain.replace("www.", "") + "+filetype:pwl || filetype:pol || filetype:pl || filetype:sh ||filetype:ini || filetype:ht || filetype:exe || filetype:cgi || filetype:api || filetype:pdb || filetype:sql || filetype:ins || filetype:cfg || filetype:keychain || filetype:prf");
					break;

				/*------BACKUP FILE SEARCH------*/
				case "Bkup":
					newTab(b + "site:" + domain.replace("www.", "") + "+filetype:ost || filetype:bak || filetype:eml || filetype:bck || filetype:bac || filetype:tmp");
					break;

				/*------ARCHIVE SEARCH------*/
				case "arch":
					newTab(b + "site:" + domain.replace("www.", "") + "+filetype:zip || filetype:rar || filetype:jar || filetype:tar.gz || filetype:7z || filetype:tar.b2z || filetype:tar.7z || filetype:tar");
					break;

				/*------DNS HEALTH------*/
				case "DHealth":
					newTab(i + domain.replace("www.", ""));
					break;

				/*------DNS INFORMATION------*/
				case "Dinfo":
					newTab(k + domain.replace("www.", "") + ".html");
					break;

				/*------DNS WHOIS------*/
				case "dnsw":
					newTab(l + domain.replace("www.", ""));
					break;

				/*------BLACKLIST CHECK------*/
				case "rbls":
					newTab(e + domain.replace("www.", ""));
					break;

				/*------SAFE BROWSING------*/
				case "googleSafebrowsing":
					newTab(g + domain.replace("www.", ""));
					break;

				/*------MCAFEE------*/
				case "siteadvisor":
					newTab(j + domain.replace("www.", ""));
					break;

				/*------NORTON------*/
				case "norton":
					newTab(m + domain.replace("www.", ""));
					break;

				/*------AVG------*/
				case "avgthreatlabs":
					newTab(d + domain.replace("www.", ""));
					break;

				/*------ALEXA------*/
				case "alexa":
					newTab(a + domain.replace("www.", ""));
					break;

				/*------BUILTWITH------*/
				case "builtWith":
					newTab(h + domain.replace("www.", ""));
					break;
			}
		}
	});
}