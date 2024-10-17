import * as _page from "./page.js";
import * as _mailSender from "../emailSender.js";

window.addEventListener("load", () => { initContactPage(); });

function initContactPage() {
    _page.initPage();
    _page.scrollHandler.handlePageScrolling();

    _mailSender.initMailSender();
    window["sendMail()"] = _mailSender.sendMail;
}