// server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mydoctor'
});

db.connect(err => {
    if(err) console.log(err);
    else console.log("Connecté à la DB MySQL !");
});

// Route pour récupérer tous les médecins
// Exemple : ajouter un CV dans la requête
app.get('/doctors', (req, res) => {
    db.query('SELECT *, CONCAT("Adresse: ", address, ", Prix: ", price, " MAD") AS cv FROM doctors', (err, results) => {
        if(err) return res.status(500).json({error: err});
        res.json(results);
    });
});


app.listen(3000, () => console.log("Serveur lancé sur http://localhost:3000"));
