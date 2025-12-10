// Vérifier si l'utilisateur est connecté
const patient = JSON.parse(localStorage.getItem('patient'));
if(!patient) {
    alert("Veuillez vous connecter !");
    window.location.href = "1.html"; // page de connexion
}

// Afficher / masquer les sections
function showSection(id){
    document.querySelectorAll('.form-section').forEach(sec => sec.style.display = 'none');
    document.getElementById(id).style.display = 'block';
}
// Afficher profil par défaut
showSection('profile');

// Déconnexion
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('patient');
    window.location.href = "1.html";
});

// ------------------ CHARGEMENT DES INFOS PATIENT ------------------
window.addEventListener('load', () => {
    document.getElementById('profileName').value = patient.name || '';
    document.getElementById('profileEmail').value = patient.email || '';
    document.getElementById('profilePhone').value = patient.phone || '';
    document.getElementById('profileAddress').value = patient.address || '';
    document.getElementById('profileAge').value = patient.age || '';

    // ------------------ CHARGEMENT DES DOCTEURS ------------------
    loadDoctors(); // <-- Appel ici
});

// ------------------ METTRE À JOUR LE PROFIL ------------------
document.getElementById('profileForm').addEventListener('submit', e => {
    e.preventDefault();
    const updatedPatient = {
        name: document.getElementById('profileName').value,
        email: document.getElementById('profileEmail').value,
        phone: document.getElementById('profilePhone').value,
        address: document.getElementById('profileAddress').value,
        age: document.getElementById('profileAge').value
    };
    localStorage.setItem('patient', JSON.stringify(updatedPatient));
    alert("Profil mis à jour !");
});

// ------------------ RENDEZ-VOUS ------------------
document.getElementById('appointmentForm').addEventListener('submit', e => {
    e.preventDefault();
    alert(`Rendez-vous réservé avec ${document.getElementById('appointmentDoctor').value}`);
});

// ------------------ AVIS ------------------
document.getElementById('reviewForm').addEventListener('submit', e => {
    e.preventDefault();
    alert(`Avis envoyé pour ${document.getElementById('reviewDoctor').value}`);
    document.getElementById('reviewForm').reset();
});

// ------------------ FONCTION POUR CHARGER LES DOCTEURS ------------------
function loadDoctors() {
    fetch('http://localhost:3000/doctors')
    .then(res => res.json())
    .then(doctors => {
        const appointmentDoctor = document.getElementById('appointmentDoctor');
        const reviewDoctor = document.getElementById('reviewDoctor');

        appointmentDoctor.innerHTML = '';
        reviewDoctor.innerHTML = '';

        doctors.forEach(doc => {
            const text = `${doc.name} (${doc.specialty}) - ${doc.city} - ${doc.price} MAD`;

            const option1 = document.createElement('option');
            option1.value = doc.id; // on garde l'id pour envoyer au backend si besoin
            option1.textContent = text;
            appointmentDoctor.appendChild(option1);

            const option2 = document.createElement('option');
            option2.value = doc.id;
            option2.textContent = text;
            reviewDoctor.appendChild(option2);
        });
    })
    .catch(err => console.error(err));
}



