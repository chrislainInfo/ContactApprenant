const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzEf9VvqLVV7mAwZzKlziudi0xKYNR4opKZcahN-uxBDMn2ju2p3EPginZbtBQxD6MoeQ/exec";

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const btnSubmit = document.getElementById('btnSubmit');
    const responseMessage = document.getElementById('responseMessage');

    btnSubmit.disabled = true;
    btnSubmit.innerText = "Envoi en cours...";

    const formData = {
        nom: document.getElementById('nom').value,
        prenom: document.getElementById('prenom').value,
        email: document.getElementById('email').value
    };

   
    fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', 
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(() => {
        responseMessage.className = "message success";
        responseMessage.innerText = "Merci ! Vos informations ont bien été enregistrées.";
        
        document.getElementById('contactForm').reset();
    })
    .catch(error => {

        responseMessage.className = "message error";
        responseMessage.innerText = "Une erreur est survenue. Veuillez réessayer.";
        console.error('Erreur:', error);
    })
    .finally(() => {
        btnSubmit.disabled = false;
        btnSubmit.innerText = "S'inscrire";
    });
});