// -------------------- MyDoctor Homepage JS --------------------
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

// -------------------- Inscription sécurisée --------------------
document.getElementById("signupForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const data = {
        name: e.target.querySelector('input[placeholder="Nom complet"]').value,
        email: e.target.querySelector('input[placeholder="Email"]').value,
        phone: e.target.querySelector('input[placeholder="Téléphone"]').value,
        password: e.target.querySelector('input[placeholder="Mot de passe"]').value
    };

    fetch("signup.php", {
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

    fetch("login.php", {
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

            // Afficher nom utilisateur dans le bouton
            const openAuthBtn = document.getElementById("openAuth");
            openAuthBtn.textContent = "Bonjour, " + (res.name || data.email);
            openAuthBtn.disabled = true;

            // Redirection possible après login
            // window.location.href = "dashboard.html";
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

// Connexion
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginForm.querySelector('input[type="email"]').value;
    const patient = { email }; // tu peux ajouter nom, téléphone, etc.
    localStorage.setItem('patient', JSON.stringify(patient));
    window.location.href = "dashboard.html"; // redirection vers dashboard
});

// Inscription
const signupForm = document.getElementById('signupForm');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = signupForm.querySelector('input[type="text"]').value;
    const email = signupForm.querySelector('input[type="email"]').value;
    const phone = signupForm.querySelector('input[type="tel"]').value;
    const password = signupForm.querySelector('input[type="password"]').value;

    // Stockage simulé côté front-end (localStorage)
    const patient = {
        name: name,
        email: email,
        phone: phone,
        password: password // attention : jamais stocker mot de passe en clair en vrai projet
    };
    localStorage.setItem('patient', JSON.stringify(patient));

    // Redirection vers dashboard
    window.location.href = "dashboard.html";
});




loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const patient = { email }; // ici tu peux stocker plus d’infos
    localStorage.setItem('patient', JSON.stringify(patient));
    window.location.href = "dashboard.html"; // redirection vers dashboard
});



//-------------------------------------------------------------

