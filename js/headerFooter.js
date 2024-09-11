let body;
let footer;
let header;
let headerSize;
let footerSize;

let hamburger;
let hamburgerMenu;
let hamburgerDuration;
let hamburgerTimeout;

window.addEventListener("load", () => { initHeaderFooter(); });

function initHeaderFooter()
{
	body = document.querySelector("body");
	header = document.querySelector("header");
	footer = document.querySelector("footer");
	headerSize = header.offsetHeight;
	footerSize = footer.querySelector(".wrapper").offsetHeight;
	if (body.innerHeight > window.innerHeight) {
		hideFooter();
	}
	footer.querySelector(".distancer").style.height = footerSize;

	initHamburger();

	window.addEventListener("scroll", () => { handleScrollFooter(); });
}

function initHamburger() {
	hamburger = header.querySelector(".hamburger");
	hamburgerMenu = header.querySelector(".hamburger-menu");
	hamburgerDuration = parseFloat(getComputedStyle(hamburger).getPropertyValue("--animation-duration"));
	hamburger.addEventListener("click", () => {
		if (hamburgerTimeout) {
			clearTiemout(hamburgerTimeout);
		}
		showElement(hamburger, !isElementVisible(hamburger));
		hamburgerTimeout = setTimeout(() => {
			hamburgerTimeout = null;
			showElement(hamburgerMenu, !isElementVisible(hamburgerMenu));
		}, hamburgerDuration * 1000);
	});
}

function handleScrollFooter()
{
	if (window.scrollY > footerSize) {
		showElement(footer, true);
	}
	else {
		showElement(footer, false);
	}
}

function returnToTop() {
	window.scrollTo(0, 0);
}