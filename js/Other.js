function setOther(id){
	switch (id) {
		/*------BUFFER OVERFLOW/128------*/
		case "buffer128":
			setSelectedText(iOverflow(128));
			break;

		/*------BUFFER OVERFLOW/256------*/
		case "buffer256":
			setSelectedText(iOverflow(256));
			break;

		/*------BUFFER OVERFLOW/512------*/
		case "buffer512":
			setSelectedText(iOverflow(512));
			break;

		/*------BUFFER OVERFLOW/1024------*/
		case "buffer1024":
			setSelectedText(iOverflow(1024));
			break;

		/*------BUFFER OVERFLOW/CUSTOM------*/
		case "buffercustom":
			getSelectedText(function(str) {
				setSelectedText(iOverflow(str));
			});
			break;
	}
}