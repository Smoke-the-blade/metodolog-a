const express = require('express');
const router = express.Router();
const db = require('../db');

// Ver turnos del paciente
router.get('/:id/turnos', async (req, res) => {
    const pacienteId = req.params.id;
    const [rows] = await db.query(`
      SELECT t.*, m.nombre AS medico_nombre, e.nombre AS especialidad
      FROM turnos t
      JOIN usuarios m ON t.medico_id = m.id
      JOIN especialidades e ON t.especialidad_id = e.id
      WHERE t.paciente_id = ?
    `, [pacienteId]);
  
    res.json(rows);
  });
  
  // Solicitar turno
  router.post('/turno', async (req, res) => {
    const { paciente_id, medico_id, especialidad_id, fecha, hora } = req.body;
  
    await db.query(`
      INSERT INTO turnos (paciente_id, medico_id, especialidad_id, fecha, hora)
      VALUES (?, ?, ?, ?, ?)
    `, [paciente_id, medico_id, especialidad_id, fecha, hora]);
  
    res.json({ mensaje: 'Turno solicitado correctamente' });
  });
  
  module.exports = router;
