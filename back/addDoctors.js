const mongoose = require('mongoose');
require('dotenv').config();

// Vérifier la connexion MongoDB
if (!process.env.MONGO_URI) {
  console.error('Erreur : MONGO_URI non défini dans .env');
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connexion MongoDB réussie pour le seed'))
  .catch(err => {
    console.error('Erreur de connexion MongoDB :', err);
    process.exit(1);
  });

const DoctorSchema = new mongoose.Schema({
  name: String,
  specialty: String,
  city: String,
  price: Number,
  photo: String,
  cv: String,
  availability: String
});
const Doctor = mongoose.model('Doctor', DoctorSchema);
const doctors = [
  // Généralistes (10)
  { name: "Dr. Sarra Belghazal", specialty: "Généraliste", city: "Casablanca", price: 200, photo: "https://img.freepik.com/photos-gratuite/portrait-sourire-belle-femme-medecin-blouse-blanche-montrant-pouces-vers-haut-debout-fond-blanc_1258-88183.jpg", cv: "Médecin généraliste expérimentée, soins primaires et suivi familial.", availability: "Lundi-Vendredi 9h-18h" },
  { name: "Dr. Lamia El Yandouzi", specialty: "Généraliste", city: "Casablanca", price: 220, photo: "https://previews.123rf.com/images/sifotography/sifotography1501/sifotography150100400/35554151-closeup-portrait-of-friendly-smiling-confident-female-doctor-healthcare-professional-isolated-on.jpg", cv: "Consultations générales et urgences.", availability: "Mardi-Samedi 8h-17h" },
  { name: "Dr. Hind El Yaagoubi", specialty: "Généraliste", city: "Rabat", price: 250, photo: "https://media.gettyimages.com/id/1425798958/fr/photo/photo-dune-femme-m%C3%A9decin-confiante-%C3%A0-lh%C3%B4pital-regardant-lappareil-photo-avec-le-sourire.jpg", cv: "Suivi chronique et médecine préventive.", availability: "Lundi-Vendredi 9h-19h" },
  { name: "Dr. Abdelhakim Ourrai", specialty: "Généraliste", city: "Rabat", price: 200, photo: "https://previews.123rf.com/images/kohanova/kohanova2002/kohanova200200384/140802100-portrait-of-young-handsome-man-in-professional-medical-white-coat-is-isolated-on-blue-studio.jpg", cv: "Médecine générale et échographie.", availability: "Mercredi-Dimanche 10h-18h" },
  { name: "Dr. Aicha Moutawakil", specialty: "Généraliste", city: "Marrakech", price: 210, photo: "https://img.freepik.com/photos-premium/heureuse-femme-medecin-travailleur-medical-blouse-blanche-montrant-pouces-vers-haut-signe-approbation-comme-quelque-chose-louange_1258-87706.jpg", cv: "Soins familiaux et pédiatrie légère.", availability: "Lundi-Vendredi 9h-17h" },
  { name: "Dr. Mostafa Adel", specialty: "Généraliste", city: "Fès", price: 190, photo: "https://thumbs.dreamstime.com/b/beau-chauve-homme-m%C3%A9decin-avec-barbe-portant-des-lunettes-et-st%C3%A9thoscope-sur-fond-bleu-faisant-un-clin-d-oeil-%C3%A0-la-cam%C3%A9ra-sexy-219443164.jpg", cv: "Urgences et suivi diabète.", availability: "Mardi-Samedi 9h-18h" },
  { name: "Dr. Sanaa Faouzi", specialty: "Généraliste", city: "Agadir", price: 220, photo: "https://png.pngtree.com/thumb_back/fw800/background/20250323/pngtree-young-female-doctor-in-white-coat-smiling-at-camera-confidently-photo-photo-image_67407646.webp", cv: "Nutrition et échographie.", availability: "Lundi-Jeudi 10h-19h" },
  { name: "Dr. Jamal Eddine El Khamlichi", specialty: "Généraliste", city: "Tanger", price: 200, photo: "https://us.123rf.com/450wm/kohanova/kohanova2002/kohanova200200334/140801901-portrait-d-un-m%C3%A9decin-s%C3%A9rieux-en-blouse-blanche-m%C3%A9dicale-professionnelle-sans-signe-de-mains.jpg", cv: "Médecine urgentiste.", availability: "Tous les jours 8h-20h" },
  { name: "Dr. Naima Belhassan", specialty: "Généraliste", city: "Oujda", price: 180, photo: "https://png.pngtree.com/thumb_back/fw800/background/20221110/pngtree-white-coatclad-female-doctor-in-blue-background-conducting-hospital-treatment-photo-image_40590186.jpg", cv: "Consultations familiales.", availability: "Lundi-Vendredi 9h-17h" },
  { name: "Dr. Mossadek Mourabit", specialty: "Généraliste", city: "Meknès", price: 230, photo: "https://thumbs.dreamstime.com/b/m%C3%A9decin-f%C3%A9minin-noir-de-sourire-en-blouse-blanche-posant-avec-les-bras-crois%C3%A9s-concept-m%C3%A9dical-moderne-d-%C3%A9ducation-portrait-170105929.jpg", cv: "Urgentiste et visites à domicile.", availability: "Mardi-Samedi 9h-18h" },

  // Dentistes (10)
  { name: "Dr. Doha Boukhal", specialty: "Dentiste", city: "Rabat", price: 350, photo: "https://www.shutterstock.com/image-photo/happy-female-doctor-stethoscope-on-260nw-2527451927.jpg", cv: "Implants et esthétique dentaire.", availability: "Lundi-Vendredi 9h-19h" },
  { name: "Dr. Adil Guelzim", specialty: "Dentiste", city: "Casablanca", price: 400, photo: "https://www.shutterstock.com/image-photo/studio-portrait-photo-senior-male-260nw-2527027419.jpg", cv: "Orthodontie et implantologie.", availability: "Mardi-Samedi 8h-18h" },
  { name: "Dr. Elomrani Amina", specialty: "Dentiste", city: "Casablanca", price: 300, photo: "https://img.freepik.com/photos-gratuite/portrait-sourire-belle-femme-medecin-blouse-blanche-montrant-pouces-vers-haut-debout-fond-blanc_1258-88183.jpg", cv: "Soins dentaires généraux.", availability: "Lundi-Vendredi 9h-17h" },
  { name: "Dr. Meryam Mamouni", specialty: "Dentiste", city: "Rabat", price: 380, photo: "https://previews.123rf.com/images/lacheev/lacheev2103/lacheev210300473/165817218-portrait-of-happy-professional-doctor-at-work-young-black-woman-in-white-lab-coat-with-stethoscope.jpg", cv: "Esthétique et blanchiment.", availability: "Mercredi-Dimanche 10h-18h" },
  { name: "Dr. Rabab Chraibi", specialty: "Dentiste", city: "Marrakech", price: 320, photo: "https://media.gettyimages.com/id/1425798958/fr/photo/photo-dune-femme-m%C3%A9decin-confiante-%C3%A0-lh%C3%B4pital-regardant-lappareil-photo-avec-le-sourire.jpg", cv: "Chirurgie buccale.", availability: "Lundi-Vendredi 9h-19h" },
  { name: "Dr. Benslimane Mouad", specialty: "Dentiste", city: "Fès", price: 300, photo: "https://previews.123rf.com/images/kohanova/kohanova2002/kohanova200200384/140802100-portrait-of-young-handsome-man-in-professional-medical-white-coat-is-isolated-on-blue-studio.jpg", cv: "Implantologie et parodontie.", availability: "Mardi-Samedi 8h-17h" },
  { name: "Dr. Zineb Lahyani", specialty: "Dentiste", city: "Tanger", price: 350, photo: "https://thumbs.dreamstime.com/b/beau-chauve-homme-m%C3%A9decin-avec-barbe-portant-des-lunettes-et-st%C3%A9thoscope-sur-fond-bleu-faisant-un-clin-d-oeil-%C3%A0-la-cam%C3%A9ra-sexy-219443164.jpg", cv: "Orthodontie adulte.", availability: "Lundi-Jeudi 9h-18h" },
  { name: "Dr. Khalid Jafari", specialty: "Dentiste", city: "Agadir", price: 330, photo: "https://img.freepik.com/photos-premium/heureuse-femme-medecin-travailleur-medical-blouse-blanche-montrant-pouces-vers-haut-signe-approbation-comme-quelque-chose-louange_1258-87706.jpg", cv: "Pédodontie et soins enfants.", availability: "Mercredi-Dimanche 10h-18h" },
  { name: "Dr. Nadia Slassi", specialty: "Dentiste", city: "Oujda", price: 300, photo: "https://png.pngtree.com/thumb_back/fw800/background/20250323/pngtree-young-female-doctor-in-white-coat-smiling-at-camera-confidently-photo-photo-image_67407646.webp", cv: "Esthétique du sourire.", availability: "Lundi-Vendredi 9h-17h" },
  { name: "Dr. Fouad Lamrini", specialty: "Dentiste", city: "Meknès", price: 340, photo: "https://us.123rf.com/450wm/kohanova/kohanova2002/kohanova200200334/140801901-portrait-d-un-m%C3%A9decin-s%C3%A9rieux-en-blouse-blanche-m%C3%A9dicale-professionnelle-sans-signe-de-mains.jpg", cv: "Prothèses et implants.", availability: "Mardi-Samedi 9h-18h" },

  // Dermatologues (10)
  { name: "Dr. Fatima Zahra Belgnaoui", specialty: "Dermatologue", city: "Rabat", price: 450, photo: "https://previews.123rf.com/images/sifotography/sifotography1501/sifotography150100400/35554151-closeup-portrait-of-friendly-smiling-confident-female-doctor-healthcare-professional-isolated-on.jpg", cv: "Dermatologie esthétique et lasers.", availability: "Lundi-Vendredi 10h-18h" },
  { name: "Dr. Imane Bennani", specialty: "Dermatologue", city: "Casablanca", price: 500, photo: "https://img.freepik.com/photos-gratuite/portrait-sourire-belle-femme-medecin-blouse-blanche-montrant-pouces-vers-haut-debout-fond-blanc_1258-88183.jpg", cv: "Dermatologie médicale et esthétique.", availability: "Mardi-Samedi 9h-17h" },
  { name: "Dr. Maha Bennani Lahlou", specialty: "Dermatologue", city: "Casablanca", price: 480, photo: "https://media.gettyimages.com/id/1425798958/fr/photo/photo-dune-femme-m%C3%A9decin-confiante-%C3%A0-lh%C3%B4pital-regardant-lappareil-photo-avec-le-sourire.jpg", cv: "Peelings et injections.", availability: "Lundi-Jeudi 10h-19h" },
  { name: "Dr. Noama Dahbi", specialty: "Dermatologue", city: "Marrakech", price: 450, photo: "https://previews.123rf.com/images/lacheev/lacheev2103/lacheev210300473/165817218-portrait-of-happy-professional-doctor-at-work-young-black-woman-in-white-lab-coat-with-stethoscope.jpg", cv: "Laser et maladies cutanées.", availability: "Mercredi-Dimanche 9h-18h" },
  { name: "Dr. Asmaa Afarkous", specialty: "Dermatologue", city: "Rabat", price: 460, photo: "https://img.freepik.com/photos-premium/heureuse-femme-medecin-travailleur-medical-blouse-blanche-montrant-pouces-vers-haut-signe-approbation-comme-quelque-chose-louange_1258-87706.jpg", cv: "Dermatologie pédiatrique.", availability: "Lundi-Vendredi 9h-17h" },
  { name: "Dr. Mokhtar Benzaarit", specialty: "Dermatologue", city: "Marrakech", price: 420, photo: "https://previews.123rf.com/images/kohanova/kohanova2002/kohanova200200384/140802100-portrait-of-young-handsome-man-in-professional-medical-white-coat-is-isolated-on-blue-studio.jpg", cv: "Acné et psoriasis.", availability: "Mardi-Samedi 10h-18h" },
  { name: "Dr. Ilham Housni Alaoui", specialty: "Dermatologue", city: "Fès", price: 400, photo: "https://thumbs.dreamstime.com/b/beau-chauve-homme-m%C3%A9decin-avec-barbe-portant-des-lunettes-et-st%C3%A9thoscope-sur-fond-bleu-faisant-un-clin-d-oeil-%C3%A0-la-cam%C3%A9ra-sexy-219443164.jpg", cv: "Esthétique cutanée.", availability: "Lundi-Jeudi 9h-18h" },
  { name: "Dr. Sarah Amourak", specialty: "Dermatologue", city: "Tanger", price: 450, photo: "https://png.pngtree.com/thumb_back/fw800/background/20250323/pngtree-young-female-doctor-in-white-coat-smiling-at-camera-confidently-photo-photo-image_67407646.webp", cv: "Laser et épilation.", availability: "Mercredi-Dimanche 10h-18h" },
  { name: "Dr. Najat Chourkani", specialty: "Dermatologue", city: "Casablanca", price: 500, photo: "https://png.pngtree.com/thumb_back/fw800/background/20221110/pngtree-white-coatclad-female-doctor-in-blue-background-conducting-hospital-treatment-photo-image_40590186.jpg", cv: "Dermatologie interventionnelle.", availability: "Lundi-Vendredi 9h-19h" },
  { name: "Dr. Merieme El Machkour", specialty: "Dermatologue", city: "Agadir", price: 430, photo: "https://thumbs.dreamstime.com/b/m%C3%A9decin-f%C3%A9minin-noir-de-sourire-en-blouse-blanche-posant-avec-les-bras-crois%C3%A9s-concept-m%C3%A9dical-moderne-d-%C3%A9ducation-portrait-170105929.jpg", cv: "Maladies tropicales de la peau.", availability: "Mardi-Samedi 9h-17h" },

  // Cardiologues (10)
  { name: "Dr. Youssef Allali", specialty: "Cardiologue", city: "Casablanca", price: 500, photo: "https://us.123rf.com/450wm/kohanova/kohanova2002/kohanova200200334/140801901-portrait-d-un-m%C3%A9decin-s%C3%A9rieux-en-blouse-blanche-m%C3%A9dicale-professionnelle-sans-signe-de-mains.jpg", cv: "Échocardiographie et hypertension.", availability: "Lundi-Vendredi 9h-18h" },
  { name: "Dr. Khalil Berrada", specialty: "Cardiologue", city: "Casablanca", price: 480, photo: "https://previews.123rf.com/images/kohanova/kohanova2002/kohanova200200384/140802100-portrait-of-young-handsome-man-in-professional-medical-white-coat-is-isolated-on-blue-studio.jpg", cv: "Cardiologie interventionnelle.", availability: "Mardi-Samedi 8h-17h" },
  { name: "Dr. Anass Assaidi", specialty: "Cardiologue", city: "Casablanca", price: 550, photo: "https://thumbs.dreamstime.com/b/beau-chauve-homme-m%C3%A9decin-avec-barbe-portant-des-lunettes-et-st%C3%A9thoscope-sur-fond-bleu-faisant-un-clin-d-oeil-%C3%A0-la-cam%C3%A9ra-sexy-219443164.jpg", cv: "Cardiologie pédiatrique.", availability: "Lundi-Jeudi 10h-19h" },
  { name: "Dr. Sawssane Khalloud", specialty: "Cardiologue", city: "Rabat", price: 500, photo: "https://img.freepik.com/photos-gratuite/portrait-sourire-belle-femme-medecin-blouse-blanche-montrant-pouces-vers-haut-debout-fond-blanc_1258-88183.jpg", cv: "Prévention cardiovasculaire.", availability: "Mercredi-Dimanche 9h-18h" },
  { name: "Dr. Amine Soufiane", specialty: "Cardiologue", city: "Casablanca", price: 520, photo: "https://www.shutterstock.com/image-photo/studio-portrait-photo-senior-male-260nw-2527027419.jpg", cv: "Explorations cardiovasculaires.", availability: "Lundi-Vendredi 9h-17h" },
  { name: "Dr. Chehbouni Chafia", specialty: "Cardiologue", city: "Rabat", price: 480, photo: "https://previews.123rf.com/images/sifotography/sifotography1501/sifotography150100400/35554151-closeup-portrait-of-friendly-smiling-confident-female-doctor-healthcare-professional-isolated-on.jpg", cv: "Rythmologie cardiaque.", availability: "Mardi-Samedi 10h-18h" },
  { name: "Dr. Mohamed Slaoui", specialty: "Cardiologue", city: "Fès", price: 450, photo: "https://media.gettyimages.com/id/1425798958/fr/photo/photo-dune-femme-m%C3%A9decin-confiante-%C3%A0-lh%C3%B4pital-regardant-lappareil-photo-avec-le-sourire.jpg", cv: "Insuffisance cardiaque.", availability: "Lundi-Jeudi 9h-18h" },
  { name: "Dr. Hassan El Beqqali", specialty: "Cardiologue", city: "Marrakech", price: 470, photo: "https://previews.123rf.com/images/lacheev/lacheev2103/lacheev210300473/165817218-portrait-of-happy-professional-doctor-at-work-young-black-woman-in-white-lab-coat-with-stethoscope.jpg", cv: "Cardiologie du sport.", availability: "Mercredi-Dimanche 10h-18h" },
  { name: "Dr. Ahmed Touimi Benjelloun", specialty: "Cardiologue", city: "Casablanca", price: 500, photo: "https://img.freepik.com/photos-premium/heureuse-femme-medecin-travailleur-medical-blouse-blanche-montrant-pouces-vers-haut-signe-approbation-comme-quelque-chose-louange_1258-87706.jpg", cv: "Imagerie cardiaque.", availability: "Lundi-Vendredi 9h-19h" },
  { name: "Dr. Mohamed Zarqaoui", specialty: "Cardiologue", city: "Tanger", price: 460, photo: "https://png.pngtree.com/thumb_back/fw800/background/20250323/pngtree-young-female-doctor-in-white-coat-smiling-at-camera-confidently-photo-photo-image_67407646.webp", cv: "Épreuve d'effort.", availability: "Mardi-Samedi 9h-17h" },

  // Ophtalmologues (10)
  { name: "Dr. Ahmed Bouslamti", specialty: "Ophtalmologue", city: "Tanger", price: 400, photo: "https://previews.123rf.com/images/kohanova/kohanova2002/kohanova200200384/140802100-portrait-of-young-handsome-man-in-professional-medical-white-coat-is-isolated-on-blue-studio.jpg", cv: "Chirurgie réfractive et cataracte.", availability: "Lundi-Vendredi 9h-18h" },
  { name: "Dr. Nadia Slassi", specialty: "Ophtalmologue", city: "Tanger", price: 420, photo: "https://img.freepik.com/photos-gratuite/portrait-sourire-belle-femme-medecin-blouse-blanche-montrant-pouces-vers-haut-debout-fond-blanc_1258-88183.jpg", cv: "Soins oculaires généraux.", availability: "Mardi-Samedi 8h-17h" },
  { name: "Dr. Khadija Daoudi", specialty: "Ophtalmologue", city: "Fès", price: 380, photo: "https://previews.123rf.com/images/sifotography/sifotography1501/sifotography150100400/35554151-closeup-portrait-of-friendly-smiling-confident-female-doctor-healthcare-professional-isolated-on.jpg", cv: "Strabisme et pédiatrie.", availability: "Lundi-Jeudi 10h-19h" },
  { name: "Dr. Salima Bhalil", specialty: "Ophtalmologue", city: "Fès", price: 400, photo: "https://media.gettyimages.com/id/1425798958/fr/photo/photo-dune-femme-m%C3%A9decin-confiante-%C3%A0-lh%C3%B4pital-regardant-lappareil-photo-avec-le-sourire.jpg", cv: "Glaucome et rétine.", availability: "Mercredi-Dimanche 9h-18h" },
  { name: "Dr. Idriss Benatiya Andaloussi", specialty: "Ophtalmologue", city: "Fès", price: 390, photo: "https://thumbs.dreamstime.com/b/beau-chauve-homme-m%C3%A9decin-avec-barbe-portant-des-lunettes-et-st%C3%A9thoscope-sur-fond-bleu-faisant-un-clin-d-oeil-%C3%A0-la-cam%C3%A9ra-sexy-219443164.jpg", cv: "Chirurgie de la cataracte.", availability: "Lundi-Vendredi 9h-17h" },
  { name: "Dr. Mustapha Medina", specialty: "Ophtalmologue", city: "Agadir", price: 410, photo: "https://previews.123rf.com/images/lacheev/lacheev2103/lacheev210300473/165817218-portrait-of-happy-professional-doctor-at-work-young-black-woman-in-white-lab-coat-with-stethoscope.jpg", cv: "Lentilles et adaptation.", availability: "Mardi-Samedi 10h-18h" },
  { name: "Dr. Thami Bogdar", specialty: "Ophtalmologue", city: "Agadir", price: 380, photo: "https://img.freepik.com/photos-premium/heureuse-femme-medecin-travailleur-medical-blouse-blanche-montrant-pouces-vers-haut-signe-approbation-comme-quelque-chose-louange_1258-87706.jpg", cv: "Chirurgie réfractive laser.", availability: "Lundi-Jeudi 9h-18h" },
  { name: "Dr. Khalid Jafari", specialty: "Ophtalmologue", city: "Agadir", price: 400, photo: "https://png.pngtree.com/thumb_back/fw800/background/20250323/pngtree-young-female-doctor-in-white-coat-smiling-at-camera-confidently-photo-photo-image_67407646.webp", cv: "Kératocône et cornée.", availability: "Mercredi-Dimanche 10h-18h" },
  { name: "Dr. Assia Mazrouh", specialty: "Ophtalmologue", city: "Tanger", price: 390, photo: "https://png.pngtree.com/thumb_back/fw800/background/20221110/pngtree-white-coatclad-female-doctor-in-blue-background-conducting-hospital-treatment-photo-image_40590186.jpg", cv: "Ophtalmologie pédiatrique.", availability: "Lundi-Vendredi 9h-17h" },
  { name: "Dr. Omar Darraz", specialty: "Ophtalmologue", city: "Tanger", price: 420, photo: "https://thumbs.dreamstime.com/b/m%C3%A9decin-f%C3%A9minin-noir-de-sourire-en-blouse-blanche-posant-avec-les-bras-crois%C3%A9s-concept-m%C3%A9dical-moderne-d-%C3%A9ducation-portrait-170105929.jpg", cv: "Chirurgie des paupières.", availability: "Mardi-Samedi 9h-18h" },

  // Pédiatres (10)
  { name: "Pr. Nabiha Mikou", specialty: "Pédiatre", city: "Casablanca", price: 400, photo: "https://img.freepik.com/photos-gratuite/portrait-sourire-belle-femme-medecin-blouse-blanche-montrant-pouces-vers-haut-debout-fond-blanc_1258-88183.jpg", cv: "Rhumatologie pédiatrique et néonatologie.", availability: "Lundi-Vendredi 9h-18h" },
  { name: "Dr. Salma Bichri", specialty: "Pédiatre", city: "Casablanca", price: 350, photo: "https://previews.123rf.com/images/sifotography/sifotography1501/sifotography150100400/35554151-closeup-portrait-of-friendly-smiling-confident-female-doctor-healthcare-professional-isolated-on.jpg", cv: "Allergologie pédiatrique.", availability: "Mardi-Samedi 8h-17h" },
  { name: "Dr. Soumia Kadiri", specialty: "Pédiatre", city: "Casablanca", price: 380, photo: "https://media.gettyimages.com/id/1425798958/fr/photo/photo-dune-femme-m%C3%A9decin-confiante-%C3%A0-lh%C3%B4pital-regardant-lappareil-photo-avec-le-sourire.jpg", cv: "Urgences pédiatriques.", availability: "Lundi-Jeudi 10h-19h" },
  { name: "Dr. Salla Semmane", specialty: "Pédiatre", city: "Rabat", price: 420, photo: "https://previews.123rf.com/images/lacheev/lacheev2103/lacheev210300473/165817218-portrait-of-happy-professional-doctor-at-work-young-black-woman-in-white-lab-coat-with-stethoscope.jpg", cv: "Pédiatrie générale multilingue.", availability: "Mercredi-Dimanche 9h-18h" },
  { name: "Dr. Abderrahim Moustakim", specialty: "Pédiatre", city: "Casablanca", price: 360, photo: "https://img.freepik.com/photos-premium/heureuse-femme-medecin-travailleur-medical-blouse-blanche-montrant-pouces-vers-haut-signe-approbation-comme-quelque-chose-louange_1258-87706.jpg", cv: "Asthme et développement.", availability: "Lundi-Vendredi 9h-17h" },
  { name: "Pr. Merini Mohammed Faouzi", specialty: "Pédiatre", city: "Casablanca", price: 500, photo: "https://previews.123rf.com/images/kohanova/kohanova2002/kohanova200200384/140802100-portrait-of-young-handsome-man-in-professional-medical-white-coat-is-isolated-on-blue-studio.jpg", cv: "Chirurgie pédiatrique viscérale.", availability: "Mardi-Samedi 10h-18h" },
  { name: "Dr. Mohamed Taoufiq Guessous", specialty: "Pédiatre", city: "Marrakech", price: 380, photo: "https://thumbs.dreamstime.com/b/beau-chauve-homme-m%C3%A9decin-avec-barbe-portant-des-lunettes-et-st%C3%A9thoscope-sur-fond-bleu-faisant-un-clin-d-oeil-%C3%A0-la-cam%C3%A9ra-sexy-219443164.jpg", cv: "Neuropédiatrie.", availability: "Lundi-Jeudi 9h-18h" },
  { name: "Dr. Khadija Elbaroudi", specialty: "Pédiatre", city: "Marrakech", price: 360, photo: "https://png.pngtree.com/thumb_back/fw800/background/20250323/pngtree-young-female-doctor-in-white-coat-smiling-at-camera-confidently-photo-photo-image_67407646.webp", cv: "Vaccinations et croissance.", availability: "Mercredi-Dimanche 10h-18h" },
  { name: "Dr. Chemaou Atimad", specialty: "Pédiatre", city: "Rabat", price: 400, photo: "https://png.pngtree.com/thumb_back/fw800/background/20221110/pngtree-white-coatclad-female-doctor-in-blue-background-conducting-hospital-treatment-photo-image_40590186.jpg", cv: "Endocrinologie pédiatrique.", availability: "Lundi-Vendredi 9h-19h" },
  { name: "Dr. Boulaala Mourad", specialty: "Pédiatre", city: "Marrakech", price: 370, photo: "https://thumbs.dreamstime.com/b/m%C3%A9decin-f%C3%A9minin-noir-de-sourire-en-blouse-blanche-posant-avec-les-bras-crois%C3%A9s-concept-m%C3%A9dical-moderne-d-%C3%A9ducation-portrait-170105929.jpg", cv: "Gastro pédiatrique.", availability: "Mardi-Samedi 9h-17h" },

  // Gynécologues (10)
  { name: "Dr. Sofia Salmi", specialty: "Gynécologue", city: "Casablanca", price: 450, photo: "https://img.freepik.com/photos-gratuite/portrait-sourire-belle-femme-medecin-blouse-blanche-montrant-pouces-vers-haut-debout-fond-blanc_1258-88183.jpg", cv: "Suivi grossesse et fertilité.", availability: "Lundi-Vendredi 9h-18h" },
  { name: "Dr. Sara Ibnoulkhatib Charai", specialty: "Gynécologue", city: "Casablanca", price: 500, photo: "https://previews.123rf.com/images/sifotography/sifotography1501/sifotography150100400/35554151-closeup-portrait-of-friendly-smiling-confident-female-doctor-healthcare-professional-isolated-on.jpg", cv: "Infertilité et gynécologie régénératrice.", availability: "Mardi-Samedi 8h-17h" },
  { name: "Pr. Ouazzani Taibi Mohammed", specialty: "Gynécologue", city: "Rabat", price: 550, photo: "https://previews.123rf.com/images/kohanova/kohanova2002/kohanova200200384/140802100-portrait-of-young-handsome-man-in-professional-medical-white-coat-is-isolated-on-blue-studio.jpg", cv: "Obstétrique et chirurgie.", availability: "Lundi-Jeudi 10h-19h" },
  { name: "Dr. Khalid Ouazzani Taibi", specialty: "Gynécologue", city: "Rabat", price: 520, photo: "https://thumbs.dreamstime.com/b/beau-chauve-homme-m%C3%A9decin-avec-barbe-portant-des-lunettes-et-st%C3%A9thoscope-sur-fond-bleu-faisant-un-clin-d-oeil-%C3%A0-la-cam%C3%A9ra-sexy-219443164.jpg", cv: "Fertilité et échographie.", availability: "Mercredi-Dimanche 9h-18h" },
  { name: "Dr. Wafaa Ouazzani Chahed", specialty: "Gynécologue", city: "Casablanca", price: 480, photo: "https://media.gettyimages.com/id/1425798958/fr/photo/photo-dune-femme-m%C3%A9decin-confiante-%C3%A0-lh%C3%B4pital-regardant-lappareil-photo-avec-le-sourire.jpg", cv: "Ménopause et hystéroscopie.", availability: "Lundi-Vendredi 9h-17h" },
  { name: "Dr. Mohamed Zarqaoui", specialty: "Gynécologue", city: "Casablanca", price: 460, photo: "https://previews.123rf.com/images/lacheev/lacheev2103/lacheev210300473/165817218-portrait-of-happy-professional-doctor-at-work-young-black-woman-in-white-lab-coat-with-stethoscope.jpg", cv: "Suivi grossesse à risque.", availability: "Mardi-Samedi 10h-18h" },
  { name: "Dr. Sarah Amourak", specialty: "Gynécologue", city: "Tanger", price: 450, photo: "https://img.freepik.com/photos-premium/heureuse-femme-medecin-travailleur-medical-blouse-blanche-montrant-pouces-vers-haut-signe-approbation-comme-quelque-chose-louange_1258-87706.jpg", cv: "Gynécologie médicale.", availability: "Lundi-Jeudi 9h-18h" },
  { name: "Dr. Ahmed Touimi Benjelloun", specialty: "Gynécologue", city: "Casablanca", price: 500, photo: "https://png.pngtree.com/thumb_back/fw800/background/20250323/pngtree-young-female-doctor-in-white-coat-smiling-at-camera-confidently-photo-photo-image_67407646.webp", cv: "Chirurgie laparoscopique.", availability: "Mercredi-Dimanche 10h-18h" },
  { name: "Dr. Rabab Chraibi Kaadoud", specialty: "Gynécologue", city: "Marrakech", price: 470, photo: "https://png.pngtree.com/thumb_back/fw800/background/20221110/pngtree-white-coatclad-female-doctor-in-blue-background-conducting-hospital-treatment-photo-image_40590186.jpg", cv: "Échographie obstétricale.", availability: "Lundi-Vendredi 9h-19h" },
  { name: "Dr. Meryam Mamouni", specialty: "Gynécologue", city: "Rabat", price: 480, photo: "https://thumbs.dreamstime.com/b/m%C3%A9decin-f%C3%A9minin-noir-de-sourire-en-blouse-blanche-posant-avec-les-bras-crois%C3%A9s-concept-m%C3%A9dical-moderne-d-%C3%A9ducation-portrait-170105929.jpg", cv: "Esthétique gynécologique.", availability: "Mardi-Samedi 9h-17h" },

  // Neurologues (10)
  { name: "Dr. Najat Chourkani", specialty: "Neurologue", city: "Casablanca", price: 500, photo: "https://img.freepik.com/photos-gratuite/portrait-sourire-belle-femme-medecin-blouse-blanche-montrant-pouces-vers-haut-debout-fond-blanc_1258-88183.jpg", cv: "Migraines et épilepsie.", availability: "Lundi-Vendredi 9h-18h" },
  { name: "Dr. Abdellaoui Aicha Elalaoui", specialty: "Neurologue", city: "Fès", price: 450, photo: "https://previews.123rf.com/images/sifotography/sifotography1501/sifotography150100400/35554151-closeup-portrait-of-friendly-smiling-confident-female-doctor-healthcare-professional-isolated-on.jpg", cv: "Maladies neurodégénératives.", availability: "Mardi-Samedi 8h-17h" },
  { name: "Dr. Mostafa Boutchich", specialty: "Neurologue", city: "Oujda", price: 420, photo: "https://previews.123rf.com/images/kohanova/kohanova2002/kohanova200200384/140802100-portrait-of-young-handsome-man-in-professional-medical-white-coat-is-isolated-on-blue-studio.jpg", cv: "EEG et sommeil.", availability: "Lundi-Jeudi 10h-19h" },
  { name: "Dr. Abdallah Hammouti", specialty: "Neurologue", city: "Nador", price: 430, photo: "https://thumbs.dreamstime.com/b/beau-chauve-homme-m%C3%A9decin-avec-barbe-portant-des-lunettes-et-st%C3%A9thoscope-sur-fond-bleu-faisant-un-clin-d-oeil-%C3%A0-la-cam%C3%A9ra-sexy-219443164.jpg", cv: "AVC et rééducation.", availability: "Mercredi-Dimanche 9h-18h" },
  { name: "Dr. Ahmed Farid Elkhalidi", specialty: "Neurologue", city: "Casablanca", price: 480, photo: "https://media.gettyimages.com/id/1425798958/fr/photo/photo-dune-femme-m%C3%A9decin-confiante-%C3%A0-lh%C3%B4pital-regardant-lappareil-photo-avec-le-sourire.jpg", cv: "Parkinson et tremblements.", availability: "Lundi-Vendredi 9h-17h" },
  { name: "Dr. Merieme El Machkour", specialty: "Neurologue", city: "Agadir", price: 440, photo: "https://previews.123rf.com/images/lacheev/lacheev2103/lacheev210300473/165817218-portrait-of-happy-professional-doctor-at-work-young-black-woman-in-white-lab-coat-with-stethoscope.jpg", cv: "Sclérose en plaques.", availability: "Mardi-Samedi 10h-18h" },
  { name: "Dr. Boutchich Mostafa", specialty: "Neurologue", city: "Oujda", price: 420, photo: "https://img.freepik.com/photos-premium/heureuse-femme-medecin-travailleur-medical-blouse-blanche-montrant-pouces-vers-haut-signe-approbation-comme-quelque-chose-louange_1258-87706.jpg", cv: "Neuropathies périphériques.", availability: "Lundi-Jeudi 9h-18h" },
  { name: "Dr. Chourkani Najat", specialty: "Neurologue", city: "Casablanca", price: 500, photo: "https://png.pngtree.com/thumb_back/fw800/background/20250323/pngtree-young-female-doctor-in-white-coat-smiling-at-camera-confidently-photo-photo-image_67407646.webp", cv: "Épileptologie.", availability: "Mercredi-Dimanche 10h-18h" },
  { name: "Dr. Hammouti Abdallah", specialty: "Neurologue", city: "Meknès", price: 430, photo: "https://png.pngtree.com/thumb_back/fw800/background/20221110/pngtree-white-coatclad-female-doctor-in-blue-background-conducting-hospital-treatment-photo-image_40590186.jpg", cv: "Alzheimer et mémoire.", availability: "Lundi-Vendredi 9h-19h" },
  { name: "Dr. Elkhalidi Ahmed Farid", specialty: "Neurologue", city: "Rabat", price: 480, photo: "https://thumbs.dreamstime.com/b/m%C3%A9decin-f%C3%A9minin-noir-de-sourire-en-blouse-blanche-posant-avec-les-bras-crois%C3%A9s-concept-m%C3%A9dical-moderne-d-%C3%A9ducation-portrait-170105929.jpg", cv: "Myasthénie et muscles.", availability: "Mardi-Samedi 9h-17h" }
];

//l img doctor.photo 
// Généralistes (10)
doctors[0].photo = "https://www.shutterstock.com/image-photo/portrait-confident-smiling-millennial-indian-600nw-2086121992.jpg";
doctors[1].photo = "https://thumbs.dreamstime.com/b/professional-physician-white-coat-medical-woman-medicine-healthcare-doctor-hospital-two-practice-stethoscope-397131783.jpg";
doctors[2].photo = "https://media.gettyimages.com/id/1425453868/photo/doctor-healthcare-and-medical-man-and-woman-with-smile-and-confident-leadership-at-hospital.jpg?s=612x612&w=gi&k=20&c=mbkmWYJB2kob7WoH1gOg_vlSdiEnmUk0YMTe8E1sD_Y=";
doctors[3].photo = "https://thumbs.dreamstime.com/b/professional-physician-white-coat-medical-woman-medicine-healthcare-doctor-hospital-two-practice-stethoscope-415463738.jpg";
doctors[4].photo = "https://previews.123rf.com/images/edhar/edhar1611/edhar161100155/66014109-portrait-of-happy-doctors-team-showing-thumbs-up.jpg";
doctors[5].photo = "https://www.shutterstock.com/image-photo/happy-mature-female-doctor-white-600nw-2605162145.jpg";
doctors[6].photo = "https://media.istockphoto.com/id/2153720801/photo/portrait-of-brunette-european-young-woman-doctor-with-stethoscope.jpg?s=612x612&w=0&k=20&c=1umAir8oLQj7H2pJJFp1f21066An0hJg5B801YVcpcM=";
doctors[7].photo = "https://www.shutterstock.com/image-photo/portrait-smiling-medical-team-standing-600nw-2662711253.jpg";
doctors[8].photo = "https://media.istockphoto.com/id/510414344/photo/female-doctor-at-the-hospital.jpg?s=612x612&w=0&k=20&c=7jGo4i4yP41GevKYyOU8xa4_2slLsaA0hsomL28qxhU=";
doctors[9].photo = "https://www.shutterstock.com/image-photo/passionate-helping-patients-headshot-portrait-600nw-2575919861.jpg";

// Dentistes (10)
doctors[10].photo = "https://png.pngtree.com/png-vector/20240321/ourmid/pngtree-portrait-of-confident-doctors-in-row-specialist-together-medical-care-png-image_12035479.png";
doctors[11].photo = "https://st.depositphotos.com/1011643/1490/i/450/depositphotos_14901173-stock-photo-group-of-medical-workers-portrait.jpg";
doctors[12].photo = "https://www.shutterstock.com/image-photo/happy-successful-doctor-woman-standing-600nw-2664143897.jpg";
doctors[13].photo = "https://media.istockphoto.com/id/1138673761/photo/portrait-of-happy-young-smiling-girl-doctor-dressed-in-a-white-robe-evenly-standing-with.jpg?s=612x612&w=0&k=20&c=2_nLRcws7obn02oPSkaqrznMLasO_Nt4mukXJy0Axes=";
doctors[14].photo = "https://cdn.prod.website-files.com/5fd2ba952bcd68835f2c8254/64ed2de2029f4950ecc06fc7_Guide%20to%20Medical%20Headshots-3.webp";
doctors[15].photo = "https://png.pngtree.com/thumb_back/fh260/background/20230720/pngtree-medical-report-in-the-hands-of-smiling-doctors-in-a-3d-image_3672865.jpg";
doctors[16].photo = "https://img.freepik.com/premium-photo/doctor-healthcare-team-medical-expert-working-hospital-together-doing-consultation-happy-clinic-portrait-motivation-teamwork-cardiology-arms-crossed-partnership_590464-83759.jpg?semt=ais_hybrid&w=740&q=80";
doctors[17].photo = "https://www.shutterstock.com/image-photo/smiling-female-doctor-holding-medical-600nw-2641532551.jpg";
doctors[18].photo = "https://img.freepik.com/free-photo/females-doctor-hospital-with-stethoscope_23-2148827779.jpg?semt=ais_hybrid&w=740&q=80";
doctors[19].photo = "https://thumbs.dreamstime.com/b/experienced-medical-professional-wearing-white-coat-stethoscope-smiling-towards-camera-communicating-health-wellness-421603049.jpg";

// Dermatologues (10)
doctors[20].photo = "https://cdn.prod.website-files.com/5fd2ba952bcd68835f2c8254/64ed2dc6029f4950ecc0557f_Guide%20to%20Medical%20Headshots-2.webp";
doctors[21].photo = "https://us.123rf.com/450wm/rosspetukhov/rosspetukhov1109/rosspetukhov110900016/10452733-smiling-young-female-doctor-outdoors.jpg";
doctors[22].photo = "https://healthcaresuccess.com/wp-content/uploads/2017/07/doctor-executive-portrait-min.jpg";
doctors[23].photo = "https://www.vidnoz.com/bimg/medical-headshots.webp";
doctors[24].photo = "https://previews.123rf.com/images/lenetssergey/lenetssergey1906/lenetssergey190600765/125365144-smiling-medical-doctor-woman-with-stethoscope-in-hospital.jpg";
doctors[25].photo = "https://media.istockphoto.com/id/523086961/photo/portrait-of-a-smiling-handsome-male-doctor.jpg?s=612x612&w=0&k=20&c=cB3cnru-8TC6iri2J1JDgGiF6e-L50jKghYdckIQqlQ=";
doctors[26].photo = "https://us.123rf.com/450wm/bialasiewicz/bialasiewicz1211/bialasiewicz121100086/16250976-doctor-in-white-apron-standing-with-stethoscope.jpg";
doctors[27].photo = "https://media.gettyimages.com/id/1916996520/photo/confident-female-doctor-against-white-background.jpg?s=612x612&w=gi&k=20&c=w-YnkbU2YyvK78NRX7Xfj7bsIpJDRDT-7tUmio81tng=";
doctors[28].photo = "https://thumbs.dreamstime.com/b/young-handsome-man-wearing-doctor-coat-stethoscope-looking-to-side-relax-profile-pose-natural-face-confident-smile-226613970.jpg";
doctors[29].photo = "https://us.123rf.com/450wm/pressmaster/pressmaster1201/pressmaster120100237/11938047-portrait-of-confident-female-doctor-looking-at-patient-during-medical-treatment-in-hospital.jpg";

// Cardiologues (10)
doctors[30].photo = "https://media.istockphoto.com/id/2167457569/photo/arabian-male-doctor-posing-smiling-confidently-at-camera.jpg?s=612x612&w=0&k=20&c=mv3EbB-9KBN0PVLN9N2-GS-hfmSIHE0SKY5_e33Sfxo=";
doctors[31].photo = "https://www.usatoday.com/gcdn/authoring/authoring-images/2024/03/10/USAT/72923321007-image-1.png?width=700&height=560&fit=crop&format=pjpg&auto=webp";
doctors[32].photo = "https://media.istockphoto.com/id/1346124900/photo/confident-successful-mature-doctor-at-hospital.jpg?s=612x612&w=0&k=20&c=S93n5iTDVG3_kJ9euNNUKVl9pgXTOdVQcI_oDGG-QlE=";
doctors[33].photo = "https://thumbs.dreamstime.com/b/smiling-doctor-man-wearing-stethoscope-looking-confident-male-white-lab-coat-approachable-working-bright-modern-406310745.jpg";
doctors[34].photo = "https://t3.ftcdn.net/jpg/15/63/04/10/360_F_1563041047_poq2SwMfxNtpvC1a3tkjo8ych6PaTrV1.jpg";
doctors[35].photo = "https://newclinician.com/wp-content/uploads/2025/01/photorealistic-image-of-a-group-of-happy-and-confident-doctors-5.png";
doctors[36].photo = "https://us.123rf.com/450wm/sector2012/sector20121501/sector2012150100132/35909862-doctor-with-stethoscope-in-a-hospital-high-resolution-3d-render.jpg";
doctors[37].photo = "https://images.squarespace-cdn.com/content/v1/5269fbd3e4b0eb2b76ccc1db/1656359621860-8D3Y66VBECOPGI5DIZNF/MMI+Interview+Guide_REV.jpg";
doctors[38].photo = "https://media.gettyimages.com/id/1425798958/photo/photo-of-confident-female-doctor-in-hospital-looking-at-camera-with-smile.jpg?s=612x612&w=gi&k=20&c=WM4svE1oX-n_ueAnBBHT5anH7K04390LqMTz1VMFR88=";
doctors[39].photo = "https://elcaminowomen.com/wp-content/uploads/2025/01/WhatsApp-Image-2025-01-03-at-21.43.12-768x467.jpeg";

// Ophtalmologues (10)
doctors[40].photo = "https://curogram.com/hubfs/PR1.png";
doctors[41].photo = "https://media.gettyimages.com/id/1806608544/photo/portrait-of-a-female-doctor-at-the-workplace.jpg?s=612x612&w=gi&k=20&c=Bzwxj5Ejao4gz4Wm_SRKB-V2Gvx-RzXxhuqa-n-adsE=";
doctors[42].photo = "https://img.freepik.com/premium-photo/healthcare-profession-teamwork-people-medicine-concept-smiling-male-doctor-with-stethoscope-white-coat-group-medics_380164-63630.jpg?semt=ais_hybrid&w=740&q=80";
doctors[43].photo = "https://png.pngtree.com/thumb_back/fh260/background/20230126/pngtree-young-and-handsome-male-doctor-posing-for-a-portrait-in-a-clinic-photo-image_49444930.jpg";
doctors[44].photo = "https://st3.depositphotos.com/13200112/18855/i/450/depositphotos_188552724-stock-photo-serious-confident-experienced-handsome-young.jpg";
doctors[45].photo = "https://c8.alamy.com/comp/T86H36/attractive-smiling-young-female-doctor-portrait-T86H36.jpg";
doctors[46].photo = "https://img.freepik.com/free-photo/doctor-standing-looking-camera_23-2148285676.jpg?semt=ais_hybrid&w=740&q=80";
doctors[47].photo = "https://images.freeimages.com/images/large-previews/8cd/doctor-with-stethoscope-0410-5710136.jpg?fmt=webp&w=500";
doctors[48].photo = "https://mc-34647c8d-0ad3-4e6c-832a-7092-cdn.azureedge.net/-/media/blogs/2023/lauren-turner-with-brother-william-turner-at-white-coat.jpeg?rev=c717d3ccab0645f49a6aa8d2b38db91e";
doctors[49].photo = "https://st5.depositphotos.com/4678277/78719/i/450/depositphotos_787199284-stock-photo-male-healthcare-professional-providing-support.jpg";

// Pédiatres (10)
doctors[50].photo = "http://media.univcomm.cornell.edu/photos/1280x720/14177675-B702-6ED1-4D9B941A7E13AD90.jpg";
doctors[51].photo = "https://media.gettyimages.com/id/489362281/photo/you-can-put-your-trust-in-me.jpg?s=612x612&w=gi&k=20&c=N08pl7sEK9EUamgp1SG3wpNdOzQzptowGYPEjpW5vlY=";
doctors[52].photo = "https://miro.medium.com/v2/resize:fit:2000/1*LUfeQFZIpKVlDfnosSSkGw.jpeg";
doctors[53].photo = "https://img.freepik.com/free-photo/cheerful-male-doctor-white-gown-portrait_53876-108641.jpg?semt=ais_hybrid&w=740&q=80";
doctors[54].photo = "https://st.depositphotos.com/3662505/5113/i/450/depositphotos_51131735-stock-photo-doctor-indian.jpg";
doctors[55].photo = "https://static.vecteezy.com/system/resources/thumbnails/026/375/766/small/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg";
doctors[56].photo = "https://capturely.com/wp-content/uploads/S15-Doctor-Job-Apps-Resumes.webp";
doctors[57].photo = "https://phoenixliposuction.com/wp-content/uploads/2025/03/ComfyUI_01475_.png";
doctors[58].photo = "https://cdn.prod.website-files.com/64bfea487b79203d7e95e50f/68b564640cfe3d1679129635_Warminster-Pennsylvania-audiologists.jpg";
doctors[59].photo = "https://www.universityofcalifornia.edu/sites/default/files/styles/article_default_banner/public/asuquo-white-coat.jpg?h=b8aae163&itok=fBV6mm1G";

// Gynécologues (10)
doctors[60].photo = "https://st5.depositphotos.com/13910344/68437/i/450/depositphotos_684373836-stock-photo-portrait-attractive-lady-doctor-stethoscope.jpg";
doctors[61].photo = "https://media.istockphoto.com/id/1161336374/photo/portrait-of-confident-young-medical-doctor-on-blue-background.jpg?s=612x612&w=0&k=20&c=zaa4MFrk76JzFKvn5AcYpsD8S0ePYYX_5wtuugCD3ig=";
doctors[62].photo = "https://t4.ftcdn.net/jpg/02/57/48/67/360_F_257486764_GnnrHRNIBV93mAwR0aiNkS0x5UjDfIcl.jpg";
doctors[63].photo = "https://static.mywebsites360.com/e61fb4f09be242848f353ce58be6c433/i/d56496a9b59546e5b780fb0f050e3468/1/4SoifmQpDrHbZJ6W15M1n/1049485.png";
doctors[64].photo = "https://s.yimg.com/ny/api/res/1.2/oC0M8iW3XfMYPqJ1VoNPHQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM1OQ--/https://media.zenfs.com/en/tvline.com/caaec863984b8ff00f624a9467a69fb2";
doctors[65].photo = "https://cdn.prod.website-files.com/5fd2ba952bcd68835f2c8254/64ed2df79eeca4b017880de2_Guide%20to%20Medical%20Headshots-4.webp";
doctors[66].photo = "https://img.freepik.com/free-photo/confident-doctor-clinic_23-2151983463.jpg?semt=ais_hybrid&w=740&q=80";
doctors[67].photo = "https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=1245225450968760";
doctors[68].photo = "https://www.headshotphoto.io/images/blogs/best-female-professional-headshots-medical.jpg";
doctors[69].photo = "https://umc.edu/news/News_Articles/2025/02/images/Dr.Keisha-Bell-Catchings-2.jpg";

// Neurologues (10)
doctors[70].photo = "https://us.123rf.com/450wm/sunlight19/sunlight191512/sunlight19151200067/50266772-female-doctor-with-a-stethoscope-at-neck-not-face-visible.jpg";
doctors[71].photo = "https://lookaside.instagram.com/seo/google_widget/crawler/?media_id=3431073532371104297";
doctors[72].photo = "https://t3.ftcdn.net/jpg/16/38/13/18/360_F_1638131835_pPhoKZOtw4gqC9NOKe7viEQ0Go1VUe8r.jpg";
doctors[73].photo = "https://media.gettyimages.com/id/1916997079/photo/confident-female-doctor-with-arms-crossed-against-white-background.jpg?s=612x612&w=gi&k=20&c=gdTPJA8DLBjLYsylEoFd5BPm3xkQztJFzvfO_4sbD88=";
doctors[74].photo = "https://nazarianplasticsurgery.com/_static_/masthead/masthead-03.jpg";
doctors[75].photo = "https://thumbs.dreamstime.com/b/medical-worker-portrait-smiling-african-american-male-doctor-uniform-medical-worker-portrait-smiling-african-american-418514899.jpg";
doctors[76].photo = "https://static.vecteezy.com/system/resources/thumbnails/069/033/515/small/confident-indian-doctor-in-white-coat-with-stethoscope-standing-in-hospital-hallway-smiling-brightly-healthcare-professional-photo.jpg";
doctors[77].photo = "https://c8.alamy.com/comp/H9DH1A/asian-doctor-checking-a-senior-patient-using-stethoscope-H9DH1A.jpg";
doctors[78].photo = "https://cdn3.pixelcut.app/pixa_cms/media/d43b9ca7-0c72-436e-aca2-0c2384591c2b_selling_point_1_cb1c6ac5.webp";
doctors[79].photo = "https://png.pngtree.com/png-vector/20230322/ourmid/pngtree-doctor-clinical-medicine-photo-png-image_6656263.png";

const photosOfficielles = [
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80&fit=crop&crop=face", // Homme classique
  "https://images.unsplash.com/photo-1622253692010-333db9f2c18e?w=800&q=80&fit=crop&crop=face", // Homme confiant
  "https://images.unsplash.com/photo-1559839734-2b71ea197c1c?w=800&q=80&fit=crop&crop=face", // Femme sérieuse
  "https://images.unsplash.com/photo-1594828949187-5c9f7d43e0b6?w=800&q=80&fit=crop&crop=face", // Femme professionnelle
  "https://images.unsplash.com/photo-1629909613654-28e4abbe6b56?w=800&q=80&fit=crop&crop=face", // Homme mature
  "https://images.unsplash.com/photo-1582750430705-5d8b8e13a623?w=800&q=80&fit=crop&crop=face", // Femme souriante
  "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=800&q=80&fit=crop&crop=face", // Homme en blouse
  "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=800&q=80&fit=crop&crop=face", // Femme moderne
  "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80&fit=crop&crop=face", // Homme barbe
  "https://images.unsplash.com/photo-1594828949187-5c9f7d43e0b6?w=800&q=80&fit=crop&crop=face"  // Femme neutre
];

doctors.forEach((doc, index) => {
  doc.photo = photosOfficielles[index % photosOfficielles.length];
});


Doctor.insertMany(doctors, { ordered: false }).then(() => {
  console.log('Médecins ajoutés avec succès !');
  mongoose.connection.close();
}).catch(err => {
  console.log('Erreur lors de l\'insertion (peut-être des doublons) :', err.message);
  mongoose.connection.close();
});