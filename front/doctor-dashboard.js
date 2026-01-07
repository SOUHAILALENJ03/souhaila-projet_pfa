// Vérifier si le médecin est connecté
const token = localStorage.getItem('doctorToken');
if (!token) {
    alert("Veuillez vous connecter en tant que médecin !");
    window.location.href = "doctor-login.html";  // Redirection vers la page de connexion médecin
}

// Afficher / masquer les sections
function showSection(id) {
    document.querySelectorAll('.form-section').forEach(sec => sec.style.display = 'none');
    document.getElementById(id).style.display = 'block';
}
showSection('profile');  // Profil par défaut

// Déconnexion
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('doctorToken');
    window.location.href = "1.html";
});

// Charger profil médecin
window.addEventListener('load', () => {
    fetch('http://localhost:3000/doctor/profile', { headers: { 'Authorization': token } })
    .then(res => res.json())
    .then(data => {
        document.getElementById('profileName').value = data.name || '';
        document.getElementById('profileEmail').value = data.email || '';
        document.getElementById('profilePhone').value = data.phone || '';
        document.getElementById('profileAddress').value = data.address || '';
        document.getElementById('profileRpps').value = data.rpps || '';
        loadCalendar(data.schedule, data.vacations);
        loadAppointments();
    })
    .catch(err => {
        console.error('Erreur chargement profil médecin:', err);
        alert('Erreur de chargement du profil.');
    });
});

// Mettre à jour profil
document.getElementById('profileForm').addEventListener('submit', e => {
    e.preventDefault();
    const data = {
        name: document.getElementById('profileName').value,
        email: document.getElementById('profileEmail').value,
        phone: document.getElementById('profilePhone').value,
        address: document.getElementById('profileAddress').value,
        rpps: document.getElementById('profileRpps').value
    };
    fetch('http://localhost:3000/doctor/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': token },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => alert(res.message))
    .catch(err => {
        console.error('Erreur mise à jour profil:', err);
        alert('Erreur lors de la mise à jour.');
    });
});

// Calendrier avec FullCalendar
function loadCalendar(schedule, vacations) {
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'timeGridWeek',
        events: [
            // Ajoutez les horaires et congés comme events si nécessaire
        ]
    });
    calendar.render();
}

// Charger RDV
function loadAppointments() {
    fetch('http://localhost:3000/doctor/appointments', { headers: { 'Authorization': token } })
    .then(res => res.json())
    .then(appointments => {
        const list = document.getElementById('appointmentsList');
        list.innerHTML = appointments.map(app => `
            <div>
                <p>${app.patientId ? app.patientId.name : 'Patient inconnu'} - ${app.date} ${app.time}</p>
                <button onclick="updateAppointment('${app._id}', 'confirmed')">Confirmer</button>
                <button onclick="updateAppointment('${app._id}', 'cancelled')">Annuler</button>
            </div>
        `).join('');
    })
    .catch(err => {
        console.error('Erreur chargement RDV:', err);
        alert('Erreur de chargement des rendez-vous.');
    });
}

// Mettre à jour statut RDV
function updateAppointment(id, status) {
    fetch(`http://localhost:3000/doctor/appointments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': token },
        body: JSON.stringify({ status })
    })
    .then(() => loadAppointments())
    .catch(err => {
        console.error('Erreur mise à jour RDV:', err);
        alert('Erreur lors de la mise à jour du rendez-vous.');
    });
}

// Ajouter horaire (exemple simple)
function addSchedule() {
    const day = document.getElementById('scheduleDay').value;
    const start = document.getElementById('scheduleStart').value;
    const end = document.getElementById('scheduleEnd').value;
    if (!day || !start || !end) {
        alert('Veuillez remplir tous les champs.');
        return;
    }
    // Logique pour envoyer à l'API (ajoutez si nécessaire)
    alert(`Horaire ajouté : ${day} de ${start} à ${end}`);
    document.getElementById('scheduleForm').reset();
}