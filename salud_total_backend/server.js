const express = require('express');
const cors = require('cors');
const app = express();

const authRoutes = require('./routes/auth');
const registroRoutes = require('./routes/registro');
const adminRoutes = require('./routes/admin');
const medicoRoutes = require('./routes/medico');
const pacienteRoutes = require('./routes/paciente');
const especialidadesRoutes = require('./routes/especialidades');

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/registro', registroRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/medico', medicoRoutes);
app.use('/api/paciente', pacienteRoutes);
app.use('/api/especialidades', especialidadesRoutes);

app.listen(3000, () => {
  console.log('✅ Servidor corriendo en http://localhost:3000');
});
