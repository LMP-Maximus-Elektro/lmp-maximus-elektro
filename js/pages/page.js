import * as _header from "./header.js";
import * as _footer from "./footer.js";
import * as _tools from "../tools.js";
import * as _scroll from "../scrollHandler.js";

export function initPage() {
	window["tools"] = _tools;

    window["body"] = document.querySelector("body");
	window["header"] = document.querySelector("header");
	window["footer"] = document.querySelector("footer");

	_scroll.initScroll();
	_header.initHeader();
	_footer.initFooter();
}

export let scrollHandler = _scroll;