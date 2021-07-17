console.log("Running displaySavePDF");

const pdfLiMin = document.querySelector(
	"#upload-download-drastic-tools-min.export-pdf-li"
);
const pdfLiMax = document.querySelector(
	"#upload-download-drastic-tools-max.export-pdf-li"
);

if (pdfLiMin && pdfLiMax) {
	checkDisplay();
} else {
	console.error("No export pdf button found");
}

function checkDisplay() {
	if (pdfLiMin.style.display == "none" && pdfLiMax.style.display == "none") {
		displaySavePDF();
		return;
	}

	window.setTimeout(checkDisplay, 100);
}

function displaySavePDF() {
	pdfLiMin.style.display = "block";
	pdfLiMax.style.display = "block";
}
