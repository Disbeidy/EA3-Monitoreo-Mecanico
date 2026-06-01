require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

const sensoresRoutes = require('./routes/sensores');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/sensores', sensoresRoutes);

app.listen(PORT, () => {
  console.log(`Servidor levantado en el puerto ${PORT}`);
});
