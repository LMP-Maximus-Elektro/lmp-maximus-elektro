import * as _page from "./page.js";

window.addEventListener("load", () => { initIndexPage(); });

function initIndexPage() {
    _page.initPage();

    if (window.scrollY > 0) {
		_page.scrollHandler.handlePageScrolling();
	}

    initPopups();
    initHiddenWindows();
    initGalleries();
    //initSlides();
}