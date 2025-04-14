const express = require('express');
const cors = require('cors');
const app = express();

// Rutas
const authRoutes = require('./routes/auth');
const registroRoutes = require('./routes/registro');
const pacienteRoutes = require('./routes/paciente');
const medicoRoutes = require('./routes/medico');
const adminRoutes = require('./routes/admin');

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/registro', registroRoutes);
app.use('/api/paciente', pacienteRoutes);
app.use('/api/medico', medicoRoutes);
app.use('/api/admin', adminRoutes);

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:8080');
});
