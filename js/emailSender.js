let formElement;
let initializedSender = false;

export function initMailSender() {
    if (initializedSender) {
        return;
    }
    initializedSender = true;
    emailjs.init({
        publicKey: "H8C8VtXC9h9dFJrOB",
    });
    formElement = document.querySelector("form");
    formElement.reset();
}

export function sendMail(event) {
    if (Cookies.get("form-sent")) {
        alert("Možete poslati maksimalno jedan upit dnevno. Ukoliko imate dodatnih pitanja molim Vas da pozovete na naš kontakt telefon ili nam pošaljite e-mail.");
        formElement.reset();
        event.preventDefault();
        return;
    }
    let params;
    try {
        params = gatherParameters();
    } catch (e) {
        alert(e);
        event.preventDefault();
        return;
    }
    emailjs.send("service_obx4jzn", "template_gwa7fvg", params).then(
        (response) => {
            Cookies.set("form-sent", "sent", { expires: 1 });
            formElement.reset();
            alert('Upit je uspešno poslat. Hvala Vam!');
        },
        (error) => {
            alert("Upit nije poslat. Molimo Vas da probate ponovo kasnije ili da nas kontaktirate direktno.");
        });
    event.preventDefault();
}

function gatherParameters() {
    let params = {
        from_name: document.getElementById("form-name").value,
        from_mail: document.getElementById("form-email").value,
        from_number: document.getElementById("form-phone").value,
        message: document.geteElementById("form-message").value
    };
    return params;
}