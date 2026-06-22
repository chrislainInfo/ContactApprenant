const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzbzE2xrFeWZLwmw-mB4ShTrQhrvGEc5jDSibEPXuNdVeclToex0xV7wAoyNFGbHX4jpA/exec";

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const btnSubmit = document.getElementById('btnSubmit');
    const responseMessage = document.getElementById('responseMessage');

    btnSubmit.disabled = true;
    btnSubmit.innerText = "Envoi en cours...";

    const formData = {
        nom: document.getElementById('nom').value,
        prenom: document.getElementById('prenom').value,
        email: document.getElementById('email').value,
        tel: "" + document.getElementById('tel').value
    };

    fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(response => {
        if (response.status === "success") {

            responseMessage.className = "message success";
            responseMessage.innerText = "Merci ! Vos informations ont bien été enregistrées.";
            document.getElementById('contactForm').reset();

            const time = setTimeout(() => {
                responseMessage.className = "message";
                responseMessage.innerText = ""; 
                clearTimeout(time) 
            }, 4000);

        } else if (response.status === "duplicate") {

            responseMessage.className = "message error";
            responseMessage.innerText = "Désolé, cet e-mail est déjà inscrit sur notre liste.";
            
        } else {
            responseMessage.className = "message error";
            responseMessage.innerText = response.message + "veillez reessayer"

        }
    })
    .catch(error => {
        responseMessage.className = "message error";
        responseMessage.innerText = "Une erreur est survenue, veillez reessayer"
        
        console.error('Erreur:', error);
    })
    .finally(() => {
        btnSubmit.disabled = false;
        btnSubmit.innerText = "S'inscrire";
    });
});
