console.log("Running promote");
let indicator;

chrome.storage.sync.get(["indicator"], (result) => {
	indicator = result.indicator;
	promote();
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.indicator || request.indicator === null) {
		indicator = request.indicator;
	}
});

const promote = () => {
	if (indicator) {
		document.querySelector(`[aria-label^="Promote ${indicator}"]`)?.click();
	}

	window.setTimeout(promote, 1000);
};
