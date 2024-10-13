// SCROLLING

let scrollElements = [];
let pageTopElements = [];

window.addEventListener("load", () => { initScroll(); });

function initScroll() {
	let scrolls = document.querySelectorAll("[data-scroll]");
	for (const scroll of scrolls) {
		scrollElements.push(new ScrollElement(scroll));
	}
	let pageTopScrolls = document.querySelectorAll("[data-page-top-only]");
	for (const pageTop of pageTopScrolls) {
		pageTopElements.push(new PageTopScrollElement(pageTop));
	}
	if (window.scrollY > 0) {
		handlePageScrolling();
	}
	window.addEventListener("scroll", () => { handlePageScrolling(); });
}

function showScrollElement(scroll, show) {
	showElement(scroll.element, show);
}

function PageTopScrollElement(element) {
	this.element = element;
	this.mode = this.element.getAttribute("data-page-top-only-mode");
	if (!this.mode) {
		this.mode = "once";
	} else {
		if (this.mode != "once" && this.mode != "multiple") {
			this.mode = "once";
		}
	}
}

function handleTopPageScroll() {
	if (window.scrollY > 0) {
		for (pageTop of pageTopElements) {
			showElement(pageTop.element, false);
		}
	} else {
		for (pageTop of pageTopElements) {
			if (pageTop.mode == "multiple") {
				showElement(pageTop.element, true);
			}
		}
	}
}

function ScrollElement(element) {
	const RELATIVE_ASPECT_RATIO = 1.777; // 16:9 aspect ratio

	this.element = element;
	this.active = false;
	this.mode = this.element.getAttribute("data-scroll-mode");
	if (!this.mode) {
		this.mode = "once";
	} else {
		if (this.mode != "once" && this.mode != "multiple") {
			this.mode = "once";
		}
	}
	this.direction = this.element.getAttribute("data-scroll-direction");
	if (!this.direction) {
		this.direction = "default";
	} else {
		if (this.direction != "default" && this.direction != "both") {
			this.direction = "default";
		}
	}
	this.offset = parseInt(this.element.getAttribute("data-scroll-offset"));
	if (!this.offset) {
		this.offset = 0;
	}
}

function isScrollWithinOffsetBottom(scroll) {
	if (0 <= scroll.element.getBoundingClientRect().bottom - scroll.offset) {
		return true;
	}
	else if (0 > scroll.element.getBoundingClientRect().bottom) {
		return false;
	}
	return false;
};

function isScrollWithinOffsetTop(scroll) {
	if (window.innerHeight >= scroll.element.getBoundingClientRect().top + scroll.offset) {
		return true;
	}
	else if (window.innerHeight < scroll.element.getBoundingClientRect().top) {
		return false;
	}
	return false;
};

function handlePageScrolling() {
	for (let scroll of scrollElements) {
		if (!scroll.element) {
			continue;
		}
		scroll.active = handleScrollElement(scroll);
		showScrollElement(scroll, scroll.active);
	}
	handleTopPageScroll();
}

function handleScrollElement(scroll) {
	switch (scroll.mode) {
		case "once":
			if (isScrollWithinOffsetTop(scroll) || scroll.active) {
				return true;
			}
			return false;
		case "multiple":
			if (scroll.direction == "both") {
				if (isScrollWithinOffsetTop(scroll) && isScrollWithinOffsetBottom(scroll)) {
					return true;
				}
				return false;
			}
			else if (scroll.direction == "default") {
				if (isScrollWithinOffsetTop(scroll)) {
					return true;
				}
				return false;
			}
			return true;
	}
}

// global

function initContent() {
	//document.getElementById("content").style.paddingTop = headerSize;
	document.querySelector(":root").style.setProperty("--header-height", headerSize.toString() + "px");
}

function showElement(element, show) {
	if (show) {
		element.classList.add("active");
		element.classList.remove("inactive");
	}
	else {
		element.classList.remove("active");
		element.classList.add("inactive");
	}
}

function isElementVisible(element) {
	return element.classList.contains("active");
}