let footerSize;

export function initFooter()
{
	footerSize = footer.querySelector(".wrapper").offsetHeight;
	if (body.innerHeight > window.innerHeight) {
		hideFooter();
	}
	footer.querySelector(".distancer").style.height = footerSize;
	footer.querySelector(".return-to-top").addEventListener("click", () => { window.scrollTo(0, 0); });
	window.addEventListener("scroll", () => { handleScrollFooter(); });
}

function handleScrollFooter()
{
	if (window.scrollY > footerSize) {
		tools.showElement(footer, true);
	}
	else {
		tools.showElement(footer, false);
	}
}