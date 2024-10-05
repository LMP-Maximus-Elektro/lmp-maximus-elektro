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
    galleryPreview.mobileTitle.textContent = activeGallery.images[index].title + " (" + (index + 1) + "/" + activeGallery.images.length + ")";
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
    galleryPreview.mobileTitle.textContent = activeGallery.images[0].title + " (" + 1 + "/" + activeGallery.images.length + ")";
    showElement(galleryPreview.element, true);
    document.documentElement.classList.add("no-scroll");
}

function closeGalleryPreview() {
    if (!activeGallery) {
        return;
    }
    activeGallery = null;
    showElement(galleryPreview.element, false);
    document.documentElement.classList.remove("no-scroll");
}

function GalleryPreview(element) {
    this.element = element;
    this.wrapper = this.element.querySelector(".wrapper");
    this.title = this.wrapper.querySelector("h1");
    this.image = this.wrapper.querySelector("img");
    this.controls = this.wrapper.querySelector(".wrapper-controls");

    this.mobileContainer = this.element.querySelector("#gallery-preview-mobile");
    this.mobileTitle = this.mobileContainer.querySelector("h1");
    this.mobilecloseButton = this.mobileContainer.querySelector(".button.close");

    this.mobilecloseButton.addEventListener("click", () => { closeGalleryPreview(); });

    this.nextButton = this.controls.querySelector(".next");
    this.lastButton = this.controls.querySelector(".last");
    this.closeButton = this.controls.querySelector(".close");

    this.nextButton.addEventListener("click", () => { nextGalleryImage(); });
    this.lastButton.addEventListener("click", () => { lastGalleryImage(); });
    this.closeButton.addEventListener("click", () => { closeGalleryPreview(); });

    this.startTouchX = 0;
    this.image.addEventListener("touchstart", (e) => {
        this.startTouchX = e.touches[0].screenX;
    });
    this.image.addEventListener("touchend", (e) => {
        if (this.startTouchX > e.changedTouches[0].screenX) {
            nextGalleryImage();
        }
        else if (this.startTouchX < e.changedTouches[0].screenX) {
            lastGalleryImage();
        }
    });
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