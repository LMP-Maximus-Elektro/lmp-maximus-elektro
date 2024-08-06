// SCROLLING

function ScrollElement(el, offset = 0)
{
	this.el = el;
	this.offset = offset;
}

let scrollElements;

function initScroll()
{
	let scrolls = document.querySelectorAll("[data-scroll]");
	scrollElements = [scrolls.length];
	for (let i = 0; i < scrolls.length; i++)
	{
		scrollElements[i] = new ScrollElement(scrolls[i], scrolls[i].getAttribute("data-scroll-offset"));
	}
}

function handleScroll()
{
	for (let i = 0; i < scrollElements.length; i++)
	{
		if (!scrollElements[i].el) {
			continue;
		}
		showScrollElement(scrollElements[i], isWithinScroll(scrollElements[i]));
	}
}

function showScrollElement(el, show)
{
	if (show)
	{
		el.el.classList.add("active");
		el.el.classList.remove("inactive");
	}
	else
	{
		el.el.classList.remove("active");
		el.el.classList.add("inactive");
	}
}

function isWithinScroll(el, offset = 0)
{
	if (window.screenTop > el.el.getBoundingClientRect().top - window.innerHeight - el.offset)
	{
		return true;
	}
	else
	{
		return false;
	}
}

// ERROR

function showError(error) {
	//alert("Došlo je do greške web stranice. Molimo Vas da prijavite grešku na i-mejl adresu nikola2001zagorac@gmail.com\n" + error.message);
}

function initContent() {
	document.getElementById("content").style.paddingTop = headerSize;
	document.querySelector(":root").style.setProperty("--header-height", headerSize.toString() + "px");
}