const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use('/login', rateLimit({ windowMs: 15 * 60 * 1000, max: 10 }));

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// --- MODÈLES ---

const PatientSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    phone: String,
    password: String,
    address: String,
    age: Number,
    medicalHistory: { type: String, default: '' },
    role: { type: String, enum: ['patient', 'doctor', 'admin'], default: 'patient' }
});
const Patient = mongoose.model('Patient', PatientSchema);

const DoctorSchema = new mongoose.Schema({
    name: String,
    specialty: String,
    city: String,
    price: Number,
    photo: String,
    cv: String,
    availability: String,
    email: { type: String, unique: true },
    password: String,
    phone: String,
    address: String,
    rpps: String,
    isVerified: { type: Boolean, default: false },
    schedule: [{ day: String, start: String, end: String }],
    vacations: [{ start: Date, end: Date }]
});
const Doctor = mongoose.model('Doctor', DoctorSchema);

const AppointmentSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
    date: Date,
    time: String,
    type: { type: String, default: 'Présentiel' },
    status: { type: String, default: 'pending' }
});
const Appointment = mongoose.model('Appointment', AppointmentSchema);

const ReviewSchema = new mongoose.Schema({
    patientId: mongoose.Schema.Types.ObjectId,
    doctorId: mongoose.Schema.Types.ObjectId,
    rating: { type: Number, min: 1, max: 5 },
    comment: String,
    date: { type: Date, default: Date.now }
});
const Review = mongoose.model('Review', ReviewSchema);

// --- MIDDLEWARE D'AUTHENTIFICATION ---

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1] || req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Accès refusé' });
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; 
        next();
    } catch (err) {
        res.status(400).json({ message: 'Token invalide' });
    }
};

// --- ROUTES AUTHENTIFICATION ---

app.post('/signup', async (req, res) => {
    const { name, email, phone, password } = req.body;
    if (password.length < 6) return res.status(400).json({ status: 'error', message: 'Mot de passe trop court' });
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const patient = new Patient({ name, email, phone, password: hashedPassword });
        await patient.save();
        res.json({ status: 'success', message: 'Inscription réussie' });
    } catch (err) {
        res.status(400).json({ status: 'error', message: "Email déjà utilisé" });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await Patient.findOne({ email });
    if (!user) return res.status(400).json({ status: 'error', message: 'Utilisateur non trouvé' });
    
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(400).json({ status: 'error', message: 'Mot de passe incorrect' });

    const token = jwt.sign(
        { _id: user._id, name: user.name, role: user.role }, 
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );
    res.json({ status: 'success', token, name: user.name, role: user.role });
});

// --- ROUTES PATIENT ---

app.get('/profile', authenticateToken, async (req, res) => {
    const patient = await Patient.findById(req.user._id);
    res.json(patient);
});

app.put('/profile', authenticateToken, async (req, res) => {
    await Patient.findByIdAndUpdate(req.user._id, req.body);
    res.json({ message: 'Profil mis à jour' });
});

// --- ROUTES MÉDECINS (RECHERCHE) ---

app.get('/doctors', async (req, res) => {
    const { specialty, city, name } = req.query;
    let query = {};
    if (specialty) query.specialty = specialty;
    if (city) query.city = new RegExp(city, 'i');
    if (name) query.name = new RegExp(name, 'i');
    const doctors = await Doctor.find(query);
    res.json(doctors);
});

// --- ROUTES RENDEZ-VOUS ---

app.post('/appointments', authenticateToken, async (req, res) => {
    const { doctorId, date, time, type } = req.body;
    const appointment = new Appointment({ patientId: req.user._id, doctorId, date, time, type });
    await appointment.save();
    res.json({ message: 'Rendez-vous réservé', appointmentId: appointment._id });
});

app.get('/appointments', authenticateToken, async (req, res) => {
    const appointments = await Appointment.find({ patientId: req.user._id }).populate('doctorId');
    res.json(appointments);
});

app.delete('/appointments/:id', authenticateToken, async (req, res) => {
    try {
        await Appointment.findByIdAndDelete(req.params.id);
        res.json({ message: "Rendez-vous annulé avec succès" });
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de l'annulation" });
    }
});

// --- ROUTES ESPACE MÉDECIN ---

app.get('/doctor/appointments', authenticateToken, async (req, res) => {
    try {
        if (req.user.role !== 'doctor') return res.status(403).json({ message: "Accès refusé" });
        const appointments = await Appointment.find({ doctorId: req.user._id }).populate('patientId');
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur" });
    }
});

// --- GÉNÉRATION PDF ---

const { generatePDF } = require('./pdfGenerator');
// --- GÉNÉRATION PDF (Version Unique et Propre) ---
const PDFDocument = require('pdfkit');

// --- GÉNÉRATION PDF (Version Corrigée) ---
app.get('/download-pdf/:appointmentId', authenticateToken, async (req, res) => {
    try {
        // 1. On récupère le rendez-vous et le médecin
        const appointment = await Appointment.findById(req.params.appointmentId).populate('doctorId');
        if (!appointment) return res.status(404).send("Rendez-vous introuvable");

        // 2. IMPORTANT : On récupère l'email du patient dans la base de données via son ID
        const patient = await Patient.findById(req.user._id);
        if (!patient) return res.status(404).send("Patient introuvable");

        // 3. On prépare les données avec l'email réel
        const pdfData = {
            patientName: patient.name,
            patientEmail: patient.email, // <--- L'email sera maintenant correctement affiché
            doctorName: appointment.doctorId.name,
            doctorPhoto: appointment.doctorId.photo,
            specialty: appointment.doctorId.specialty,
            city: appointment.doctorId.city,
            date: appointment.date,
            time: appointment.time,
            type: appointment.type,
            price: appointment.doctorId.price
        };

        const pdfBuffer = await generatePDF(pdfData);
        
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Length': pdfBuffer.length,
        });
        res.send(pdfBuffer);

    } catch (error) {
        console.error("Erreur PDF:", error);
        res.status(500).send("Erreur serveur");
    }
});

// --- MOT DE PASSE OUBLIÉ (NODEMAILER) ---

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});

app.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    const user = await Patient.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Email non trouvé' });
    
    const resetToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Réinitialisation Mot de Passe',
        text: `Lien de reset : http://localhost:3000/reset-password.html?token=${resetToken}`
    };
    transporter.sendMail(mailOptions, (err) => {
        if (err) return res.status(500).json({ message: "Erreur d'envoi" });
        res.json({ message: 'Email envoyé' });
    });
});

// Route Admin pour voir tous les patients
app.get('/admin/patients', authenticateToken, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).send("Interdit");
    const patients = await Patient.find({ role: 'patient' });
    res.json(patients);
});

// Route Admin pour voir tous les RDV
app.get('/admin/appointments', authenticateToken, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).send("Interdit");
    const appointments = await Appointment.find()
        .populate('patientId', 'name')
        .populate('doctorId', 'name');
    res.json(appointments);
});



// --- ROUTES POUR LES AVIS (REVIEWS) ---

// 1. Envoyer un avis (POST)
app.post('/reviews', authenticateToken, async (req, res) => {
    try {
        const { doctorId, rating, comment } = req.body;
        
        // Création du nouvel avis
        const newReview = new Review({
            patientId: req.user._id, // Récupéré du token
            doctorId: doctorId,
            rating: Number(rating),
            comment: comment
        });

        await newReview.save();
        res.status(201).json({ status: 'success', message: 'Avis enregistré avec succès' });
    } catch (err) {
        console.error("Erreur lors de l'enregistrement de l'avis:", err);
        res.status(500).json({ status: 'error', message: 'Erreur serveur lors de l\'envoi' });
    }
});

// 2. Récupérer les avis d'un médecin spécifique (GET)
app.get('/reviews/:doctorId', async (req, res) => {
    try {
        const reviews = await Review.find({ doctorId: req.params.doctorId })
            .sort({ date: -1 }); // Les plus récents en premier
            
        // Si vous voulez aussi le nom du patient, vous devrez peupler le patientId
        // mais cela nécessite que ReviewSchema utilise une référence (ref: 'Patient')
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la récupération des avis' });
    }
});

app.listen(3000, () => console.log('Serveur MyDoctor démarré sur le port 3000'));

