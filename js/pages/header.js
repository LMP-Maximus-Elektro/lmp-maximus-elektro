let headerSize;
let hamburger;
let hamburgerMenu;
let hamburgerDuration;
let hamburgerTimeout;

export function initHeader() {
    headerSize = header.offsetHeight;
    document.querySelector(":root").style.setProperty("--header-height", headerSize.toString() + "px");
    initHamburger();
}

function initHamburger() {
	hamburger = header.querySelector(".hamburger");
	hamburgerMenu = header.querySelector(".hamburger-menu");
	hamburgerDuration = parseFloat(getComputedStyle(hamburger).getPropertyValue("--animation-duration"));
	hamburger.addEventListener("click", () => {
		if (hamburgerTimeout) {
			clearTiemout(hamburgerTimeout);
		}
		tools.showElement(hamburger, !tools.isElementVisible(hamburger));
		hamburgerTimeout = setTimeout(() => {
			hamburgerTimeout = null;
			tools.showElement(hamburgerMenu, !tools.isElementVisible(hamburgerMenu));
		}, hamburgerDuration * 500);
	});
}