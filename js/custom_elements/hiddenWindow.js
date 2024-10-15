let hiddenWindows = [];

function initHiddenWindows() {
    for (const window of document.querySelectorAll(".hidden-window")) {
        hiddenWindows.push(new HiddenWindow(window));
    }
}

function toggleHiddenWindow(window) {
    if (window.isOpen) {
        tools.showElement(window.header, true);
        tools.showElement(window.content, false);
        window.isOpen = false;
    }
    else {
        tools.showElement(window.header, false);
        tools.showElement(window.content, true);
        window.isOpen = true;
    }
}

function HiddenWindow(element) {
    this.element = element;
    this.header = this.element.querySelector("h2");
    this.content = this.element.querySelector(".content");
    this.closeButton = this.content.querySelector(".button.close");
    this.isOpen = false;
    tools.showElement(this.header, true);
    tools.showElement(this.content, false);

    this.closeButton.addEventListener("click", () => { toggleHiddenWindow(this); });
    this.header.addEventListener("click", () => { toggleHiddenWindow(this); });
}