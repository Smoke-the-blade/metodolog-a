const express = require('express');
const router = express.Router();
const db = require('../db');

// Ver turnos del médico
router.get('/:id/turnos', async (req, res) => {
    const medicoId = req.params.id;
    const [rows] = await db.query(`
      SELECT t.*, p.nombre AS paciente_nombre, e.nombre AS especialidad
      FROM turnos t
      JOIN usuarios p ON t.paciente_id = p.id
      JOIN especialidades e ON t.especialidad_id = e.id
      WHERE t.medico_id = ?
    `, [medicoId]);
  
    res.json(rows);
  });
  
  // Cambiar estado de un turno
  router.put('/turno/:id/estado', async (req, res) => {
    const turnoId = req.params.id;
    const { estado } = req.body;
  
    await db.query('UPDATE turnos SET estado = ? WHERE id = ?', [estado, turnoId]);
    res.json({ mensaje: 'Estado actualizado' });
  });
  
  router.put('/turno/:id/estado', async (req, res) => {
    const turnoId = req.params.id;
    const { estado } = req.body;
  
    try {
      await db.query('UPDATE turnos SET estado = ? WHERE id = ?', [estado, turnoId]);
      res.json({ mensaje: 'Estado actualizado correctamente' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al actualizar estado', error });
    }
  });
  


  module.exports = router;
