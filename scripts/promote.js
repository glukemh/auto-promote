console.log("Running promote");
let indicator;

chrome.storage.sync.get(["indicator"], (result) => {
	indicator = result.indicator;
	promote();
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	console.log("received message");
	if (request.indicator || request.indicator === null) {
		indicator = request.indicator;
	}
});

const promote = () => {
	// console.log("promoting ", indicator);
	if (indicator) {
		// if (document.querySelector(".breakout-room-header")) {
		// 	document.querySelector(".breakout-room-header").innerHTML = indicator;
		// }
		document.querySelector(`[aria-label^="Promote ${indicator}"]`)?.click();
	}

	window.setTimeout(promote, 1000);
};
