const saveButton = document.querySelector(".save-button");
const cancelButton = document.querySelector(".cancel-button");

saveButton.addEventListener("click", handleSave);
cancelButton.addEventListener("click", handleCancel);

// Check for indicator in storage
chrome.storage.sync.get(["indicator"], (result) => {
	let { indicator } = result;

	updateIndicator(indicator);
});

function handleSave() {
	let indicator = document.querySelector("#promote-input").value;
	updateIndicator(indicator);
}

function handleCancel() {
	updateIndicator(null);
}

function updateIndicator(indicator) {
	chrome.storage.sync.set({ indicator }, () => {
		// Send new indicator to content-script
		chrome.tabs.query({ url: "*://*.craniumcafe.com/*/classroom" }, (tabs) => {
			if (tabs.length) {
				chrome.tabs.sendMessage(tabs[0].id, { indicator });
			}
		});

		// Update indicator in popup
		document.querySelector(".promote-indicator").innerHTML = indicator
			? `Promoting users that start with '<b>${indicator}</b>'`
			: "Input a string that indicates which users to promote";
	});
}
