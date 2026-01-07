// Écouteur pour le formulaire de connexion médecin
document.getElementById('doctorLoginForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Empêche le rechargement de la page

    const email = document.getElementById('doctorEmail').value;
    const password = document.getElementById('doctorPassword').value;

    // Appel API vers le serveur pour connexion médecin
    fetch('http://localhost:3000/doctor-login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            // Stockage du token dans localStorage avec la clé "doctorToken"
            localStorage.setItem('doctorToken', data.token);
            // Redirection vers le dashboard médecin
            window.location.href = 'doctor-dashboard.html';
        } else {
            // Affichage d'une erreur si la connexion échoue
            alert('Erreur de connexion : ' + (data.message || 'Vérifiez vos identifiants.'));
        }
    })
    .catch(error => {
        console.error('Erreur lors de la connexion :', error);
        alert('Erreur réseau. Vérifiez votre connexion et réessayez.');
    });
});