window.addEventListener("load", () => { initHiddenWindows(); });

let hiddenWindows = [];

function initHiddenWindows() {
    for (const window of document.querySelectorAll(".hidden-window")) {
        hiddenWindows.push(new HiddenWindow(window));
    }
}

function toggleHiddenWindow(window) {
    if (window.isOpen) {
        showElement(window.header, true);
        showElement(window.content, false);
        window.isOpen = false;
    }
    else {
        showElement(window.header, false);
        showElement(window.content, true);
        window.isOpen = true;
    }
}

function HiddenWindow(element) {
    this.element = element;
    this.header = this.element.querySelector("h2");
    this.content = this.element.querySelector(".content");
    this.closeButton = this.content.querySelector(".button.close");
    this.isOpen = false;
    showElement(this.header, true);
    showElement(this.content, false);

    this.closeButton.addEventListener("click", () => { toggleHiddenWindow(this); });
    this.header.addEventListener("click", () => { toggleHiddenWindow(this); });
}