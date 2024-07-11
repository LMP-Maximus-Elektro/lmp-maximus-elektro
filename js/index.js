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

function initializeSlides()
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
	if (window.scrollY > 0)
	{
		showFooter();
	}
	else
	{
		hideFooter();
	}
}

// SHOWCASE

let showcaseItems;
let showcaseStart;

const showcaseStartDelay = 40;

function handleScrollShowcase()
{
	if (window.scrollY > window.innerHeight - showcaseStart - showcaseStartDelay)
	{
		showShowcases();
	}
	else
	{
		hideShowcases();
	}
}

function initShowcase()
{
	showcaseItems = document.getElementsByClassName("content-showcase");
	showcaseStart = document.getElementById("content-showcase").getBoundingClientRect().top;
	hideShowcases();
}

function showShowcases()
{
	for (let i = 0; i < showcaseItems.length; i++)
	{
		showcaseItems[i].setAttribute("class", "content-showcase active");
	}
}

function hideShowcases()
{
	for (let i = 0; i < showcaseItems.length; i++)
	{
		showcaseItems[i].setAttribute("class", "content-showcase inactive");
	}
}

// INIT

function initialize()
{
	header = document.querySelector("header");
	footer = document.querySelector("footer");
	
	loadHeaderAndFooter();
	
	headerSize = document.querySelector("header").offsetHeight;
	hideFooter();
	
	document.getElementById("content").style.paddingTop = headerSize;
	document.getElementById("content-slides-background").style.top = headerSize;
	
	initializeSlides();
	initShowcase();
}

function loadHeaderAndFooter()
{
	fetch("pages/header.html").then((response) => { return response.text(); }).then((html) => { header.innerHTML = html; }).catch((error) => { showError(error); });
	fetch("pages/footer.html").then((response) => { return response.text(); }).then((html) => { footer.innerHTML = html; }).catch((error) => { showError(error); });
	document.getElementById("footer-distancer").style.height = footer.offsetHeight;
}

function showError(error)
{
	//alert("Došlo je do greške web stranice. Molimo Vas da prijavite grešku na i-mejl adresu nikola2001zagorac@gmail.com\n" + error.message);
}

function handleScroll()
{
	handleScrollFooter();
	handleScrollShowcase();
}