function downloadFile(filename, data) {
	const downloadLink = document.createElement('a');
	if (downloadLink) {
		document.body.appendChild(downloadLink);
		downloadLink.style = 'display: none';
		downloadLink.download = filename;
		downloadLink.href = data;
		if (document.createEvent) {
			let downloadEvt = document.createEvent('MouseEvents');
			downloadEvt.initEvent('click', true, false);
			downloadLink.dispatchEvent(downloadEvt);
		} else if (document.createEventObject) {
			downloadLink.fireEvent('onclick');
		} else if (typeof downloadLink.onclick === 'function') {
			downloadLink.onclick();
		}
		document.body.removeChild(downloadLink);
	}
}

module.exports = downloadFile;
