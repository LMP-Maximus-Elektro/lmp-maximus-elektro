function initPopups() {
    //TODO: keep cookie of each popup for one day

    for (const popup of document.getElementsByClassName("pop-up")) {
        popup.addEventListener("click", () => { popup.remove(); });
    }
}