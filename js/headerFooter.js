let body;
let footer;
let header;
let headerSize;
let footerSize;

function initHeaderFooter()
{
	body = document.querySelector("body");
	header = document.querySelector("header");
	footer = document.querySelector("footer");
	loadHeaderFooter();
	headerSize = header.offsetHeight;
	footerSize = footer.querySelector("#footer-wrapper").offsetHeight;
	if (body.innerHeight > window.innerHeight) {
		hideFooter();
	}
	document.getElementById("footer-distancer").style.height = footerSize;
}

function loadHeaderFooter()
{
	fetch("pages/header.html").then((response) => { return response.text(); }).then((html) => { header.innerHTML = html; }).catch((error) => { showError(error); });
	fetch("pages/footer.html").then((response) => { return response.text(); }).then((html) => { footer.innerHTML = html; }).catch((error) => { showError(error); });
}

function hideFooter()
{
	footer.classList.remove("active");
	footer.classList.add("inactive");
}

function showFooter()
{
	footer.classList.remove("inactive");
	footer.classList.add("active");
}

function handleScrollFooter()
{
	if (body.innerHeight <= window.innerHeight) {
		showFooter();
		return;
	}
	if (window.scrollY > footerSize) {
		showFooter();
	}
	else {
		hideFooter();
	}
}