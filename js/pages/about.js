import * as _page from "./page.js";

window.addEventListener("load", () => { initAboutPage(); });

function initAboutPage() {
    _page.initPage();

    _page.scrollHandler.handlePageScrolling();
}