// --- SÉCURITÉ : Vérification initiale ---
const token = localStorage.getItem('token');
if (!token) {
    alert("Veuillez vous connecter !");
    window.location.href = "1.html";
}

// Variables globales
let doctors = [];

// --- NAVIGATION ---
function showSection(id) {
    document.querySelectorAll('.form-section').forEach(sec => sec.style.display = 'none');
    document.getElementById(id).style.display = 'block';
}
showSection('profile'); // Par défaut

// Déconnexion
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.clear();
    window.location.href = "1.html";
});

// --- CHARGEMENT INITIAL ---
window.addEventListener('load', () => {
    // Profil avec Bearer Token
    fetch('http://localhost:3000/profile', {
        headers: { 'Authorization': 'Bearer ' + token }
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById('profileName').value = data.name || '';
        document.getElementById('profileEmail').value = data.email || '';
        document.getElementById('profilePhone').value = data.phone || '';
        document.getElementById('profileAddress').value = data.address || '';
        document.getElementById('profileAge').value = data.age || '';
    })
    .catch(err => console.error('Erreur profil:', err));

    loadDoctors();
});

// --- LOGIQUE MÉDECINS ---
function loadDoctors() {
    fetch('http://localhost:3000/doctors')
    .then(res => res.json())
    .then(data => {
        doctors = data;
        populateSpecialties();
        populateCities();
        populateReviewDoctors();
    })
    .catch(err => console.error('Erreur médecins:', err));
}

function populateSpecialties() {
    const specialtySelect = document.getElementById('appointmentSpecialty');
    const specialties = [...new Set(doctors.map(doc => doc.specialty))];
    specialtySelect.innerHTML = '<option value="">Choisir une spécialité</option>';
    specialties.forEach(spec => {
        const option = document.createElement('option');
        option.value = spec;
        option.textContent = spec;
        specialtySelect.appendChild(option);
    });
}

function populateCities() {
    const citySelect = document.getElementById('appointmentCity');
    const cities = [...new Set(doctors.map(doc => doc.city))];
    citySelect.innerHTML = '<option value="">Choisir une ville</option>';
    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        citySelect.appendChild(option);
    });
}

function filterDoctors() {
    const specialty = document.getElementById('appointmentSpecialty').value;
    const city = document.getElementById('appointmentCity').value;
    const doctorSelect = document.getElementById('appointmentDoctor');
    doctorSelect.innerHTML = '<option value="">Choisir un médecin</option>';
    
    const filtered = doctors.filter(doc => 
        (!specialty || doc.specialty === specialty) && 
        (!city || doc.city === city)
    );
    
    filtered.forEach(doc => {
        const option = document.createElement('option');
        option.value = doc._id;
        option.textContent = `${doc.name} (${doc.specialty})`;
        doctorSelect.appendChild(option);
    });
}

document.getElementById('appointmentSpecialty').addEventListener('change', filterDoctors);
document.getElementById('appointmentCity').addEventListener('change', filterDoctors);

// --- AFFICHAGE DÉTAILS ET AVIS ---
document.getElementById('appointmentDoctor').addEventListener('change', (e) => {
    const doctorId = e.target.value;
    const selectedDoctor = doctors.find(doc => doc._id === doctorId);
    const detailsDiv = document.getElementById('selectedDoctorDetails');
    
    if (selectedDoctor) {
        document.getElementById('selectedName').textContent = selectedDoctor.name;
        document.getElementById('selectedSpecialty').textContent = selectedDoctor.specialty;
        document.getElementById('selectedCity').textContent = selectedDoctor.city;
        document.getElementById('selectedPrice').textContent = selectedDoctor.price;
        document.getElementById('selectedCV').textContent = selectedDoctor.cv;
        document.getElementById('selectedAvailability').textContent = selectedDoctor.availability;
        
        detailsDiv.style.display = 'block';
        document.getElementById('appointmentPrice').value = selectedDoctor.price + ' MAD';
        
        showDoctorProfile(selectedDoctor);
        loadRealReviews(doctorId); // Chargement des avis
    } else {
        detailsDiv.style.display = 'none';
        hideDoctorProfile();
    }
});
document.getElementById('appointmentDoctor').addEventListener('change', (e) => {
    const doctorId = e.target.value;
    const selectedDoctor = doctors.find(doc => doc._id === doctorId);
    
    if (selectedDoctor) {
        // Met à jour les infos
        showDoctorProfile(selectedDoctor);
        // Met à jour la CARTE immédiatement selon la ville du docteur
        initMap(selectedDoctor.city); 
        loadRealReviews(doctorId);
    }
});












function showDoctorProfile(doctor) {
    document.getElementById('doctorDetails').style.display = 'block';
    document.getElementById('noDoctorSelected').style.display = 'none';
    document.getElementById('doctorPhoto').src = doctor.photo;
    document.getElementById('doctorName').textContent = doctor.name;
    document.getElementById('doctorSpecialty').textContent = doctor.specialty;
    document.getElementById('doctorCity').textContent = doctor.city;
    document.getElementById('doctorPrice').textContent = doctor.price;
    document.getElementById('doctorCV').textContent = doctor.cv;
    document.getElementById('doctorExperience').textContent = 'Expérience de 5+ ans en ' + doctor.specialty;
    document.getElementById('doctorAvailability').textContent = doctor.availability;
    initMap(doctor.city);
}

function hideDoctorProfile() {
    document.getElementById('doctorDetails').style.display = 'none';
    document.getElementById('noDoctorSelected').style.display = 'block';
}

// --- CHARGEMENT DES AVIS DANS LE DOM ---
async function loadRealReviews(doctorId) {
    try {
        const res = await fetch(`http://localhost:3000/reviews/${doctorId}`);
        const reviews = await res.json();
        let container = document.getElementById('reviewsContainer');
        if(!container) {
            container = document.createElement('div');
            container.id = 'reviewsContainer';
            container.style.marginTop = "20px";
            document.getElementById('doctorDetails').appendChild(container);
        }
        if(reviews.length === 0) {
            container.innerHTML = "<h4>Avis des patients</h4><p>Aucun avis.</p>";
        } else {
            container.innerHTML = "<h4>Avis des patients</h4>" + reviews.map(r => `
                <div style="background:#f4f7f6; padding:10px; border-radius:8px; margin-bottom:10px;">
                    <strong style="color:#FFD700;">${"★".repeat(r.rating)}</strong>
                    <p>${r.comment}</p>
                    <small>Par: ${r.patientId?.name || 'Anonyme'}</small>
                </div>
            `).join('');
        }
    } catch(e) { console.error("Erreur avis", e); }
}

// --- FORMULAIRES (AVEC REDIRECTION ET PDF) ---

// Mise à jour Profil
document.getElementById('profileForm').addEventListener('submit', e => {
    e.preventDefault();
    const updatedData = {
        name: document.getElementById('profileName').value,
        email: document.getElementById('profileEmail').value,
        phone: document.getElementById('profilePhone').value,
        address: document.getElementById('profileAddress').value,
        age: document.getElementById('profileAge').value
    };
    fetch('http://localhost:3000/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
        body: JSON.stringify(updatedData)
    })
    .then(res => res.json())
    .then(res => alert(res.message));
});

// Réservation de Rendez-vous
document.getElementById('appointmentForm').addEventListener('submit', e => {
    e.preventDefault();
    const data = {
        doctorId: document.getElementById('appointmentDoctor').value,
        date: document.getElementById('appointmentDate').value,
        time: document.getElementById('appointmentTime').value,
        type: document.getElementById('appointmentType').value
    };
    fetch('http://localhost:3000/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => {
        if(res.appointmentId) {
            alert("Rendez-vous réservé ! Téléchargement du reçu...");
            downloadReceipt(res.appointmentId);
        } else {
            alert(res.message);
        }
    });
});

// Envoi d'Avis
document.getElementById('reviewForm').addEventListener('submit', e => {
    e.preventDefault();
    const data = {
        doctorId: document.getElementById('reviewDoctor').value,
        rating: document.getElementById('reviewRating').value,
        comment: document.getElementById('reviewComment').value
    };
    fetch('http://localhost:3000/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(() => {
        alert("Merci pour votre avis !");
        location.reload();
    });
});

// --- FONCTIONS EXTERNES (MAPS & PDF) ---
function initMap(city) {
    const mapElement = document.getElementById('doctorMap');
    const cityCoords = {
        'Casablanca': { lat: 33.5731, lng: -7.5898 },
        'Rabat': { lat: 34.0209, lng: -6.8416 },
        'Marrakech': { lat: 31.6295, lng: -8.0000 },
        'Fès': { lat: 34.0331, lng: -5.0000 },
        'Tanger': { lat: 35.7595, lng: -5.8339 }
    };
    
    const coords = cityCoords[city] || { lat: 33.5731, lng: -7.5898 };
    
    const map = new google.maps.Map(mapElement, {
        zoom: 14,
        center: coords
    });
    
    new google.maps.Marker({
        position: coords,
        map: map,
        title: `Cabinet du médecin à ${city}`
    });
}

function downloadReceipt(appointmentId) {
    fetch(`http://localhost:3000/download-pdf/${appointmentId}`, {
        headers: { 'Authorization': 'Bearer ' + token }
    })
    .then(async response => {
        // Vérification si la réponse est bien un PDF
        const contentType = response.headers.get("content-type");
        if (!response.ok || !contentType || !contentType.includes("application/pdf")) {
            const errorText = await response.text();
            throw new Error("Le serveur a renvoyé une erreur : " + errorText);
        }
        return response.blob();
    })
    .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `Recu-RDV-${appointmentId}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url); // Nettoyage mémoire
        a.remove();
    })
    .catch(err => {
        console.error("Détails de l'erreur PDF:", err);
        alert("Impossible de générer le reçu. Vérifiez que Puppeteer est bien installé sur le serveur.");
    });
}

// --- Correction de la population de la liste des médecins pour les avis ---
function populateReviewDoctors() {
    const reviewDoctorSelect = document.getElementById('reviewDoctor');
    if (!reviewDoctorSelect) return;

    reviewDoctorSelect.innerHTML = '<option value="">Choisir un médecin</option>';
    
    if (doctors.length === 0) {
        console.warn("Aucun médecin chargé pour les avis");
        return;
    }

    doctors.forEach(doc => {
        const option = document.createElement('option');
        option.value = doc._id;
        option.textContent = `${doc.name} (${doc.specialty})`;
        reviewDoctorSelect.appendChild(option);
    });
}

// --- Correction de l'envoi d'Avis ---
document.getElementById('reviewForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const doctorId = document.getElementById('reviewDoctor').value;
    const rating = document.getElementById('reviewRating').value;
    const comment = document.getElementById('reviewComment').value;

    // Validation simple
    if (!doctorId) {
        alert("Veuillez sélectionner un médecin.");
        return;
    }

    const data = {
        doctorId: doctorId,
        rating: parseInt(rating),
        comment: comment
    };

    try {
        const response = await fetch('http://localhost:3000/reviews', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': 'Bearer ' + token 
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            alert("Merci pour votre avis !");
            document.getElementById('reviewForm').reset(); // Vide le formulaire
            // Optionnel : recharger les avis si on regarde le profil du médecin actuel
            loadRealReviews(doctorId);
        } else {
            alert("Erreur : " + (result.message || "Impossible d'envoyer l'avis"));
        }
    } catch (error) {
        console.error("Erreur réseau lors de l'envoi de l'avis:", error);
        alert("Erreur de connexion au serveur.");
    }
});

