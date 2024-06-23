let slides;
let slideTransitionBlocks;
let currentSlide = 0;
let slideTransitionSingleBlockDuration;

const slideDuration = 5000;
const slideTransitionDuration = 1000;
const slideTransitionActive = "content-slides-transition-block-active";
const slideTransitionInactive = "content-slides-transition-block-inactive";

function initializeSlides()
{
	slideTransitionBlocks = document.getElementsByClassName("content-slides-transition-block");
	slideTransitionSingleBlockDuration = slideTransitionDuration / slideTransitionBlocks.length;
	if (slideTransitionBlocks.length != 3)
	{
		throw new Error("Functionality for the number of slideTransitionBlocks only supports a block of 3 elements.");
	}
	slideTransitionActivate(false);
	slides = document.getElementsByClassName("content-slide");
	setTimeout(waitSlide, slideDuration);
}

function slideTransitionActivate(active)
{
	if (active)
	{
		slideSetTransitionBlockActive(active, 0);
		setTimeout(() =>
		{
			slideSetTransitionBlockActive(active, 1);
			setTimeout(() => { slideSetTransitionBlockActive(active, 2); }, slideTransitionSingleBlockDuration);
		}, slideTransitionSingleBlockDuration);
	}
	else
	{
		slideSetTransitionBlockActive(active, 0);
		setTimeout(() =>
		{
			slideSetTransitionBlockActive(active, 1);
			setTimeout(() => { slideSetTransitionBlockActive(active, 2); }, slideTransitionSingleBlockDuration);
		}, slideTransitionSingleBlockDuration);
	}
}

function slideSetTransitionBlockActive(active, index)
{
	if (active)
	{
		slideTransitionBlocks[index].classList.remove(slideTransitionInactive);
		slideTransitionBlocks[index].classList.add(slideTransitionActive);
	}
	else
	{
		slideTransitionBlocks[index].classList.add(slideTransitionInactive);
		slideTransitionBlocks[index].classList.remove(slideTransitionActive);
	}
}

function waitSlide()
{
	slideTransitionActivate(true);
	setTimeout(() => { slideTransitionActivate(false); loopSlide(); }, slideTransitionDuration);
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
	currentSlide += 1;
	if (currentSlide >= slides.length)
	{	
		currentSlide = 0;
	}
	setTimeout(waitSlide, slideDuration);
}

let footer;
let header;
let headerSize;

function hideFooter()
{
	footer.style.opacity = 0;
}

function showFooter()
{
	footer.style.opacity = 1;
}

function initialize()
{
	header = document.querySelector("header");
	footer = document.querySelector("footer");
	
	loadHeaderAndFooter();
	
	headerSize = document.querySelector("header").offsetHeight;
	hideFooter();
	
	initializeSlides();
}

function loadHeaderAndFooter()
{
	fetch("pages/header.html").then((response) => { return response.text(); }).then((html) => { header.innerHTML = html; }).catch((error) => { showError(error); });
	fetch("pages/footer.html").then((response) => { return response.text(); }).then((html) => { footer.innerHTML = html; }).catch((error) => { showError(error); });
}

function showError(error)
{
	alert("Došlo je do greške web stranice. Molimo Vas da prijavite grešku na i-mejl adresu nikola2001zagorac@gmail.com\n" + error.message);
}

function handleScroll()
{
	if (window.scrollY > headerSize)
	{
		showFooter();
	}
	else
	{
		hideFooter();
	}
}