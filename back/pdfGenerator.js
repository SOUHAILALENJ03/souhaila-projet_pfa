const puppeteer = require('puppeteer');

async function generatePDF(data) {
    let browser;
    try {
        browser = await puppeteer.launch({
            headless: "new",
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();

        const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
                
                body {
                    font-family: 'Poppins', sans-serif;
                    margin: 0; padding: 0;
                    background-color: #f8fbff;
                }

                /* Header identique à ton dernier design */
                .top-header {
                    background: #1e88e5;
                    color: white;
                    padding: 40px;
                    text-align: center;
                    border-bottom-left-radius: 40px;
                    border-bottom-right-radius: 40px;
                }
                .top-header h1 { margin: 0; font-size: 32px; text-transform: uppercase; }

                .content { padding: 40px; }

                /* Grille pour les deux colonnes du haut */
                .top-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 30px;
                    margin-bottom: 30px;
                }

                /* Rectangles (Cards) plus massifs */
                .card {
                    background: white;
                    border-radius: 25px;
                    padding: 30px;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.06);
                    border-top: 6px solid #1e88e5; /* Bordure du haut renforcée */
                    min-height: 180px;
                }
                .card h2 { color: #1e88e5; font-size: 20px; margin-top: 0; margin-bottom: 20px; }
                .card p { font-size: 16px; margin: 12px 0; color: #333; }

                /* SECTION MÉDECIN XL (Celle que tu voulais corriger) */
                .doctor-card-xl {
                    background: white;
                    border-radius: 30px;
                    padding: 40px;
                    display: flex;
                    align-items: center;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.06);
                    border-left: 10px solid #1e88e5; /* Forte bordure latérale */
                }

                /* Image beaucoup plus grande */
                .doctor-img {
                    width: 180px; 
                    height: 180px;
                    border-radius: 25px; /* Carré arrondi moderne */
                    object-fit: cover;
                    border: 4px solid #e3f2fd;
                }

                .doctor-info { margin-left: 40px; }
                .doctor-info h3 { font-size: 28px; color: #1e88e5; margin: 0; }
                .doctor-info p { font-size: 18px; color: #666; margin: 10px 0; }

                .total-price {
                    text-align: right;
                    font-size: 35px;
                    color: #27ae60;
                    font-weight: 800;
                    margin-top: 40px;
                }

                .footer {
                    margin-top: 50px;
                    text-align: center;
                    color: #999;
                    font-size: 13px;
                }
            </style>
        </head>
        <body>
            <div class="top-header">
                <h1>MyDoctor Maroc</h1>
                <p>REÇU DE CONFIRMATION OFFICIEL</p>
            </div>

            <div class="content">
                <div class="top-grid">
                    <div class="card">
                        <h2>Patient</h2>
                        <p><strong>Nom :</strong> ${data.patientName}</p>
                        <p><strong>Email :</strong> ${data.patientEmail}</p>
                    </div>
                    <div class="card">
                        <h2>Rendez-vous</h2>
                        <p><strong>Date :</strong> ${data.date}</p>
                        <p><strong>Heure :</strong> ${data.time}</p>
                        <p><strong>Mode :</strong> ${data.type}</p>
                    </div>
                </div>

                <div class="doctor-card-xl">
                    <img src="${data.doctorPhoto}" class="doctor-img">
                    <div class="doctor-info">
                        <h3>${data.doctorName}</h3>
                        <p>Spécialité : <strong>${data.specialty}</strong></p>
                        <p>Ville : <strong>${data.city}</strong></p>
                    </div>
                </div>

                <div class="total-price">
                    TOTAL À PAYER : ${data.price} MAD
                </div>

                <div class="footer">
                    <p>Ce document est une preuve de réservation officielle.<br>
                    ID Transaction : #RDV-${Math.floor(Math.random() * 10000)}</p>
                </div>
            </div>
        </body>
        </html>`;

        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
        const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });

        await browser.close();
        return pdfBuffer;
    } catch (error) {
        if (browser) await browser.close();
        throw error;
    }
}

module.exports = { generatePDF };