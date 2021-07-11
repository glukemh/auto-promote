const saveButton = document.querySelector(".save-button");
saveButton.addEventListener("click", handleSave);

// Check for indicator in storage
chrome.storage.sync.get(["indicator"], (result) => {
	let { indicator } = result;

	if (indicator) {
		updateIndicator(indicator);
	}
});

function updateIndicator(indicator) {
	chrome.storage.sync.set({ indicator }, () => {
		// Send new indicator to content-script
		chrome.tabs.query({ url: "*://*.craniumcafe.com/*/classroom" }, (tabs) => {
			if (tabs.length) {
				chrome.tabs.sendMessage(tabs[0].id, { indicator });
			}
		});

		// Update indicator in popup
		document.querySelector(
			".promote-indicator"
		).innerHTML = `Promoting users that start with '<b>${indicator}</b>'`;
	});
}

function handleSave() {
	let indicator = document.querySelector("#promote-input").value;
	updateIndicator(indicator);
}
