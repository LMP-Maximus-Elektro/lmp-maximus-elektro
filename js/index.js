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