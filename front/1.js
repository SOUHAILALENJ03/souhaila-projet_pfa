console.log("MyDoctor homepage loaded!");

// -------------------- Animation recherche --------------------
const searchBtn = document.querySelector(".search-btn");
if(searchBtn){
    searchBtn.addEventListener("click", () => {
        alert("Recherche en cours...");
    });
}

// -------------------- Smooth scroll pour les ancres --------------------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});

// -------------------- Animation fade-in des cards --------------------
const cards = document.querySelectorAll(".service-card, .testimonial-card, .about-text, .about-image");

cards.forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(50px)";
});

window.addEventListener("scroll", () => {
    const triggerBottom = window.innerHeight * 0.9;
    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        if(cardTop < triggerBottom){
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
            card.style.transition = "all 0.6s ease-out";
        } else {
            card.style.opacity = "0";
            card.style.transform = "translateY(50px)";
        }
    });
});

// -------------------- Modal Connexion / Inscription --------------------
const openAuth = document.getElementById("openAuth");
const authModal = document.getElementById("authModal");
const closeModal = document.querySelector(".modal .close");

// Ouvrir modal
openAuth.addEventListener("click", () => {
    authModal.style.display = "block";
    authModal.classList.add("show");
});

// Fermer modal
closeModal.addEventListener("click", () => {
    authModal.style.display = "none";
    authModal.classList.remove("show");
});

// Fermer modal si clic en dehors
window.addEventListener("click", (e) => {
    if(e.target == authModal){
        authModal.style.display = "none";
        authModal.classList.remove("show");
    }
});

// Onglets Connexion / Inscription
const tabBtns = document.querySelectorAll(".tab-btn");
const authForms = document.querySelectorAll(".auth-form");

tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        tabBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const tab = btn.dataset.tab;
        authForms.forEach(f => {
            f.classList.remove("active");
            if(f.id.toLowerCase().includes(tab)) f.classList.add("active");
        });
    });
});

// -------------------- Ajouter Mot de Passe Oublié --------------------
window.addEventListener('load', () => {
    const loginForm = document.getElementById("loginForm");
    
    // Ajouter lien "Mot de passe oublié ?" au formulaire de connexion
    const forgotLink = document.createElement('a');
    forgotLink.href = 'forgot.html';  // Redirection vers la page séparée
    forgotLink.textContent = 'Mot de passe oublié ?';
    forgotLink.className = 'forgot-link';
    forgotLink.style.display = 'block';
    forgotLink.style.marginTop = '10px';
    forgotLink.style.fontSize = '14px';
    forgotLink.style.color = '#1E88E5';
    forgotLink.style.textDecoration = 'none';
    loginForm.appendChild(forgotLink);
});

// -------------------- Inscription sécurisée --------------------
document.getElementById("signupForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const data = {
        name: e.target.querySelector('input[placeholder="Nom complet"]').value,
        email: e.target.querySelector('input[placeholder="Email"]').value,
        phone: e.target.querySelector('input[placeholder="Téléphone"]').value,
        password: e.target.querySelector('input[placeholder="Mot de passe"]').value
    };
    fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => {
        alert(res.message);
        if(res.status === "success"){
            authModal.style.display = "none";
            authModal.classList.remove("show");
        }
    })
    .catch(err => console.error(err));
});

// -------------------- Connexion sécurisée --------------------
document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const data = {
        email: e.target.querySelector('input[placeholder="Email"]').value,
        password: e.target.querySelector('input[placeholder="Mot de passe"]').value
    };
    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => {
    if(res.status === "success") {
        // 1. Stockage des informations
        localStorage.setItem('token', res.token);
        localStorage.setItem('userName', res.name);
        localStorage.setItem('userRole', res.role); // Très important pour la suite

        alert("Bienvenue " + res.name);

        // 2. Redirection automatique selon le rôle
        if(res.role === 'doctor') {
            window.location.href = "doctor-dashboard.html";
        } else if(res.role === 'admin') {
            window.location.href = "admin.html";
        } else {
            window.location.href = "dashboard.html"; // Pour les patients
        }
    } else {
        alert("Erreur : " + res.message);
    }
})
    .catch(err => console.error(err));
});

// -------------------- Fade-in initial pour hero --------------------
const fadeElements = document.querySelectorAll('.hero-text, .hero img');
window.addEventListener('load', () => {
    fadeElements.forEach(el => {
        el.style.opacity = 0;
        setTimeout(() => {
            el.style.transition = '1s';
            el.style.opacity = 1;
        }, 200);
    });
});


if(res.role === 'doctor') {
    window.location.href = "doctor-dashboard.html";
} else {
    window.location.href = "dashboard.html";
}