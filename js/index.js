let slideSelectors;
let slides;
let slideTransitionBlocks;
let currentSlide = 0;
let slideTransitionSingleBlockDuration;
let slideTimeout = -1;
let transitioning = false;

const slideDuration = 5000;
const slideTransitionDuration = 1000;
const activeClass = "active";
const inactiveClass = "inactive";

function loadSlideSelectors()
{
	// Todo: load from separate file
	slideSelectors = document.getElementById("content-slides-buttons").getElementsByClassName("element");
	//content-slides-button
	for (let i = 1; i < slideSelectors.length; i++)
	{
		slideSelectors[i].setAttribute("class", "element inactive");
	}
	slideSelectors[0].setAttribute("class", "element active");
}

function setActiveSlideSelector(index)
{
	for (let i = 0; i < slideSelectors.length; i++)
	{
		slideSelectors[i].setAttribute("class", "element inactive");
	}
	slideSelectors[index].setAttribute("class", "element active");
}

function initSlides()
{
	loadSlideSelectors();
	slideTransitionBlocks = document.getElementsByClassName("content-slides-transition-block");
	slideTransitionSingleBlockDuration = slideTransitionDuration / slideTransitionBlocks.length;
	if (slideTransitionBlocks.length != 3)
	{
		throw new Error("Functionality for the number of slideTransitionBlocks only supports a block of 3 elements.");
	}
	slideTransitionActivate(false);
	slides = document.getElementsByClassName("content-slide");
	startSlideTimeout();
}

function slideTransitionActivate(active)
{
	transitioning = true;
	if (active)
	{
		slideSetTransitionBlockActive(active, 0);
		setTimeout(() =>
		{
			slideSetTransitionBlockActive(active, 1);
			setTimeout(() => { slideSetTransitionBlockActive(active, 2); transitioning = false; }, slideTransitionSingleBlockDuration);
		}, slideTransitionSingleBlockDuration);
	}
	else
	{
		slideSetTransitionBlockActive(active, 0);
		setTimeout(() =>
		{
			slideSetTransitionBlockActive(active, 1);
			setTimeout(() => { slideSetTransitionBlockActive(active, 2); transitioning = false; }, slideTransitionSingleBlockDuration);
		}, slideTransitionSingleBlockDuration);
	}
}

function slideSetTransitionBlockActive(active, index)
{
	if (active)
	{
		slideTransitionBlocks[index].classList.remove(inactiveClass);
		slideTransitionBlocks[index].classList.add(activeClass);
	}
	else
	{
		slideTransitionBlocks[index].classList.add(inactiveClass);
		slideTransitionBlocks[index].classList.remove(activeClass);
	}
}

function waitSlide()
{
	slideTimeout = -1;
	slideTransitionActivate(true);
	setTimeout(() =>
	{
		slideTransitionActivate(false);
		loopSlide();
	}, slideTransitionDuration);
	setActiveSlideSelector(currentSlide);
}

function changeSlide(index)
{
	if (canSlideTo(index) == false)
	{
		return;
	}
	clearTimeout(slideTimeout);
	currentSlide = index;
	if (currentSlide >= slides.length)
		currentSlide = 0;
	if (currentSlide < 0)
		currentSlide = slides.length - 1;
	waitSlide(false);
}

function incrementSlide()
{
	currentSlide += 1;
	if (currentSlide >= slides.length)
	{	
		currentSlide = 0;
	}
}

function decrementSlide()
{
	currentSlide -= 1;
	if (currentSlide < 0)
	{	
		currentSlide = slides.length - 1;
	}
}

function nextSlide()
{
	if (canSlideTo(currentSlide + 1) == false)
	{
		return;
	}
	clearTimeout(slideTimeout);
	incrementSlide();
	waitSlide();
}

function previousSlide()
{
	if (!canSlideTo(currentSlide - 1))
	{
		return;
	}
	clearTimeout(slideTimeout);
	decrementSlide();
	waitSlide();
}

function canSlideTo(index)
{
	if (transitioning || currentSlide == index)
	{
		return false;
	}
	return true;
}

function loopSlide() 
{
	for (let k = 0; k < slides.length; k++)
	{
		if (k == currentSlide)
		{
			slides[k].style.display = "block";
		}
		else
		{
			slides[k].style.display = "none";
		}
	}
	startSlideTimeout();
}

function stopSlideTimeout()
{
	clearTimeout(slideTimeout);
	slideTimeout = -1;
}

function startSlideTimeout()
{
	if (slideTimeout != -1)
	{
		return;
	}
	slideTimeout = setTimeout(() => { incrementSlide(); waitSlide(); }, slideDuration);
}

// HEADER & FOOTER

let footer;
let header;
let headerSize;
let footerSize;

const footerDistancerId = "footer-distancer";

function initHeaderFooter()
{
	header = document.querySelector("header");
	footer = document.querySelector("footer");
	loadHeaderFooter();
	headerSize = header.offsetHeight;
	footerSize = footer.querySelector("#footer-wrapper").offsetHeight;
	hideFooter();
	document.getElementById(footerDistancerId).style.height = footerSize;
}

function loadHeaderFooter()
{
	fetch("pages/header.html").then((response) => { return response.text(); }).then((html) => { header.innerHTML = html; }).catch((error) => { showError(error); });
	fetch("pages/footer.html").then((response) => { return response.text(); }).then((html) => { footer.innerHTML = html; }).catch((error) => { showError(error); });
}

function hideFooter()
{
	footer.classList.remove("active");
	footer.classList.add("inactive");
}

function showFooter()
{
	footer.classList.remove("inactive");
	footer.classList.add("active");
}

function handleScrollFooter()
{
	if (window.scrollY > footerSize)
	{
		showFooter();
	}
	else
	{
		hideFooter();
	}
}

// SCROLL

function ScrollElement(el, offset = 0)
{
	this.el = el;
	this.offset = offset;
}

let scrollElements;

const dataScrollAttr = '[data-scroll]';
const dataScrollOffsetAttr = 'data-scroll-offset';

function initScroll()
{
	let scrolls = document.querySelectorAll(dataScrollAttr);
	scrollElements = [scrolls.length];
	for (let i = 0; i < scrolls.length; i++)
	{
		scrollElements[i] = new ScrollElement(scrolls[i], scrolls[i].getAttribute(dataScrollOffsetAttr));
	}
}

function handleScroll()
{
	for (let i = 0; i < scrollElements.length; i++)
	{
		showScrollElement(scrollElements[i], isWithinScroll(scrollElements[i]));
	}
	handleScrollFooter();
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
// INIT

function initialize()
{
	initHeaderFooter();
	document.getElementById("content").style.paddingTop = headerSize;
	
	document.querySelector(":root").style.setProperty("--header-height", headerSize.toString() + "px");
	
	initScroll();
	
	initSlides();
}

function showError(error)
{
	//alert("Došlo je do greške web stranice. Molimo Vas da prijavite grešku na i-mejl adresu nikola2001zagorac@gmail.com\n" + error.message);
}