import * as _page from "./page.js";

window.addEventListener("load", () => { initContactPage(); });

function initContactPage() {
    _page.initPage();

    _page.scrollHandler.handlePageScrolling();
}