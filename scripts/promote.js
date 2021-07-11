const iframe = document.getElementById("cafe-frame");
let indicator;

chrome.storage.sync.get(["indicator"], (result) => {
	indicator = result.indicator;
	promote();
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	console.log("received message");
	if (request.indicator) {
		indicator = request.indicator;
	}
});

const promote = () => {
	const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

	if (indicator) {
		iframeDoc.querySelector(`[aria-label^="Promote ${indicator}"]`)?.click();
	}

	window.setTimeout(promote, 1000);
};
