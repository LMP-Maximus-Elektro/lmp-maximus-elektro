const slideDuration = 5000;
let slides;
let currentSlide = 0;

function initializeSlides()
{
	slides = document.getElementById("content-slides").children;
	setInterval(loopSlide, slideDuration);
}

function loopSlide() 
{
	for (let i = 0; i < slides.length; i++)
	{
		if (i == currentSlide)
		{
			slides[i].style.display = "block";
		}
		else
		{
			slides[i].style.display = "none";
		}
	}
	currentSlide += 1;
	if (currentSlide >= slides.length)
	{	
		currentSlide = 0;
	}
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