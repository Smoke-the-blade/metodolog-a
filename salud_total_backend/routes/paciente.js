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
  
  router.get('/medicos/especialidad/:id', async (req, res) => {
    const especialidadId = req.params.id;
    const [rows] = await db.query(`
      SELECT u.id, u.nombre
      FROM usuarios u
      JOIN medico_especialidad me ON u.id = me.medico_id
      WHERE me.especialidad_id = ? AND FIND_IN_SET('medico', u.rol)
    `, [especialidadId]);
  
    res.json(rows);
  });
  router.post('/turno', async (req, res) => {
    const { paciente_id, medico_id, especialidad_id, fecha, hora } = req.body;
  
    try {
      await db.query(`
        INSERT INTO turnos (paciente_id, medico_id, especialidad_id, fecha, hora)
        VALUES (?, ?, ?, ?, ?)
      `, [paciente_id, medico_id, especialidad_id, fecha, hora]);
  
      res.json({ mensaje: 'Turno solicitado correctamente' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al solicitar turno', error });
    }
  });
  

  module.exports = router;
