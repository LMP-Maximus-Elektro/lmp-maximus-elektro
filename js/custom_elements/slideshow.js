let slideSelectors;
let currentSlideSelector;

let slideTransitionElements;
let slideTransitionDurationPerElement;

let slides;
let currentSlide = 0;
let slideTimeoutId = -1;
let slideTransitioning = false;

const slideDuration = 5000;
const slideTransitionDuration = 1000;

function initSlides() {
	slides = document.getElementById("slideshow-slides").querySelectorAll("picture");
	if (slides.length <= 1) {
		tools.showElement(document.getElementById("slideshow-controls"), false);
		return;
	}
	initSlideTransition();
	initSlideSelectors();
	startSlideshowLoop();
}

function initSlideTransition() {
	slideTransitionElements = document.getElementById("slideshow-transition").children;
	slideTransitionDurationPerElement = slideTransitionDuration / slideTransitionElements.length;
	showSlideTransition(false);
	if (slideTransitionElements.length != 3) {
		throw new Error("Functionality for the number of slideTransitionElements only supports a block of 3 elements.");
	}
}

function showSlideTransition(show) {
	tools.showElement(slideTransitionElements[0], show);
	setTimeout(() => {
		tools.showElement(slideTransitionElements[1], show);
		setTimeout(() => { tools.showElement(slideTransitionElements[2], show); }, slideTransitionDurationPerElement);
	}, slideTransitionDurationPerElement);
}

function initSlideSelectors() {
	let selectorWrapper = document.getElementById("slideshow-buttons");
	slideSelectors = [slides.length];
	for (let i = 0; i < slides.length; i++) {
		selector = document.createElement("div");
		selector.setAttribute("onclick", "jumpToSlide(".concat(i).concat(")"));
		selector.classList.add("element");
		selector.classList.add("inactive");
		selectorWrapper.appendChild(selector);
		slideSelectors[i] = selector;
	}
	setActiveSlideSelector(0);
}

function setActiveSlideSelector(index) {
	if (currentSlideSelector) {
		tools.showElement(currentSlideSelector, false);
	}
	currentSlideSelector = slideSelectors[index];
	tools.showElement(currentSlideSelector, true);
}

function jumpToSlide(index) {
	if (slideTransitioning) {
		return;
	}
	if (currentSlide == index) {
		return;
	}
	if (index < 0 || index >= slides.length) {
		return;
	}
	clearTimeout(slideTimeoutId);
	transitionSlideTo(index);
}

function nextSlide() {
	if (slideTransitioning) {
		return;
	}
	clearTimeout(slideTimeoutId);
	transitionSlideTo(getIncrementedCurrentSlide());
}

function previousSlide() {
	if (slideTransitioning) {
		return;
	}
	clearTimeout(slideTimeoutId);
	transitionSlideTo(getDecrementedCurrentSlide());
}

//////////////////////

function setActiveSlide(index) {
	setActiveSlideSelector(index);
	tools.showElement(slides[currentSlide], false);
	tools.showElement(slides[index], true);
    currentSlide = index;
}

function transitionSlideTo(index) {
	if (slideTransitioning) {
        return;
    }
	slideTransitioning = true;
	setActiveSlideSelector(index);
	showSlideTransition(true);
    setTimeout(() => {
        setActiveSlide(index);
		showSlideTransition(false);
		setTimeout(() => { slideTransitioning = false; startSlideshowLoop(); }, slideTransitionDuration);
    }, slideTransitionDuration);
}

function startSlideshowLoop()
{
    if (slideTransitioning) {
        return;
    }
	slideTimeoutId = setTimeout(() => { transitionSlideTo(getIncrementedCurrentSlide()); }, slideDuration);
}

function getIncrementedCurrentSlide() {
    if (currentSlide + 1 >= slides.length) {
        return 0;
    }
    return currentSlide + 1;
}

function getDecrementedCurrentSlide() {
    if (currentSlide - 1 < 0) {
        return slides.length - 1;
    }
    return currentSlide - 1;
}