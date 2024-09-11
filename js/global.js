// SCROLLING

function ScrollElement(element)
{
	this.element = element;
	this.offset = parseInt(this.element.getAttribute("data-scroll-offset"));
	if (!this.offset) {
		this.offset = 0;
	}
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
}

let scrollElements = [];

function initScroll()
{
	let scrolls = document.querySelectorAll("[data-scroll]");
	for (const scroll of scrolls) {
		scrollElements.push(new ScrollElement(scroll));
	}
	handleScroll();
}

function handleScroll()
{
	for (let i = 0; i < scrollElements.length; i++)
	{
		if (!scrollElements[i].element) {
			continue;
		}
		showScrollElement(scrollElements[i], isWithinScroll(scrollElements[i]));
	}
}

function isWithinScroll(scroll)
{
	if (scroll.mode == "once") {
		if (window.innerHeight >= scroll.element.getBoundingClientRect().top + scroll.offset) {
			return true;
		}
	}
	else if (scroll.mode == "multiple") {
		if (scroll.direction == "both") {
			if (window.innerHeight >= scroll.element.getBoundingClientRect().top + scroll.offset
				&& 0 <= scroll.element.getBoundingClientRect().bottom - scroll.offset) {
				return true;
			}
			return false;
			/*if (window.innerHeight < scroll.element.getBoundingClientRect().top) {
				return false;
			}*/
		}
		else if (scroll.direction == "default") {
			if (window.innerHeight >= scroll.element.getBoundingClientRect().top + scroll.offset) {
				return true;
			}
			if (window.innerHeight < scroll.element.getBoundingClientRect().top) {
				return false;
			}
		}
	}
	if (isElementVisible(scroll.element)) {
		return true;
	}
}

// global

function showScrollElement(scroll, show) {
	showElement(scroll.element, show);
}

function initContent() {
	//document.getElementById("content").style.paddingTop = headerSize;
	document.querySelector(":root").style.setProperty("--header-height", headerSize.toString() + "px");
}

function showElement(element, show)
{
	if (show)
	{
		element.classList.add("active");
		element.classList.remove("inactive");
	}
	else
	{
		element.classList.remove("active");
		element.classList.add("inactive");
	}
}

function isElementVisible(element) {
	return element.classList.contains("active");
}