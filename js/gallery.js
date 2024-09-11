window.addEventListener("load", () => { initGallery(); });

let galleries = [];
let galleryPreview;
let activeGallery;
let currentGalleryImage = 0;

function initGallery() {
    galleryPreview = new GalleryPreview(document.getElementById("gallery-preview"));
    showElement(galleryPreview.element, false);
    if (!galleryPreview) {
        console.error("No #gallery-preview element found.");
        return;
    }
    for (const element of document.querySelectorAll("[data-gallery]")) {
        galleries.push(new Gallery(element));
    }
}

function nextGalleryImage() {
    if (!activeGallery) {
        return;
    }
    if (activeGallery.images.length <= 1) {
        return;
    }
    let next = currentGalleryImage + 1;
    if (next >= activeGallery.images.length) {
        next = 0;
    }
    showGalleryImage(next);
}

function lastGalleryImage() {
    if (!activeGallery) {
        return;
    }
    if (activeGallery.images.length <= 1) {
        return;
    }
    let last = currentGalleryImage - 1;
    if (last < 0) {
        last = activeGallery.images.length - 1;
    }
    showGalleryImage(last);
}

function showGalleryImage(index) {
    galleryPreview.title.textContent = activeGallery.images[index].title;
    galleryPreview.image.setAttribute("src", activeGallery.images[index].source);
    currentGalleryImage = index;
}

function openGalleryPreview(gallery) {
    if (activeGallery) {
        return;
    }
    activeGallery = gallery;
    currentGalleryImage = 0;
    galleryPreview.image.setAttribute("src", activeGallery.images[0].source);
    galleryPreview.title.textContent = activeGallery.images[0].title;
    showElement(galleryPreview.element, true);
}

function closeGalleryPreview() {
    if (!activeGallery) {
        return;
    }
    activeGallery = null;
    showElement(galleryPreview.element, false);
}

function GalleryPreview(element) {
    this.element = element;
    this.wrapper = this.element.querySelector(".wrapper");
    this.title = this.wrapper.querySelector("h1");
    this.image = this.wrapper.querySelector("img");
    this.controls = this.wrapper.querySelector(".wrapper-controls");

    this.nextButton = this.controls.querySelector(".next");
    this.lastButton = this.controls.querySelector(".last");
    this.closeButton = this.controls.querySelector(".close");

    this.nextButton.addEventListener("click", () => { nextGalleryImage(); });
    this.lastButton.addEventListener("click", () => { lastGalleryImage(); });
    this.closeButton.addEventListener("click", () => { closeGalleryPreview(); });
}

function Gallery(element) {
    this.element = element;
    this.images = [];
    for (const image of this.element.querySelectorAll("img")) {
        this.images.push(new GalleryImage(image));
    }
    if (this.images.length == 0) {
        console.error("Gallery must have <img> children.");
    }
    this.element.addEventListener("click", () => { openGalleryPreview(this); });
}

function GalleryImage(element) {
    this.element = element;
    this.source = element.getAttribute("src");
    this.title = element.getAttribute("alt");
    if (!this.title) {
        this.title = "";
    }
}