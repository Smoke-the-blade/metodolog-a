const express = require('express');
const router = express.Router();
const db = require('../db');

// Ver todos los usuarios
router.get('/usuarios', async (req, res) => {
    const [rows] = await db.query('SELECT id, nombre, email, dni, rol FROM usuarios');
    res.json(rows);
  });
  
  // Ver todos los turnos
  router.get('/turnos', async (req, res) => {
    const [rows] = await db.query(`
      SELECT t.*, 
        p.nombre AS paciente_nombre, 
        m.nombre AS medico_nombre, 
        e.nombre AS especialidad
      FROM turnos t
      JOIN usuarios p ON t.paciente_id = p.id
      JOIN usuarios m ON t.medico_id = m.id
      JOIN especialidades e ON t.especialidad_id = e.id
    `);
    res.json(rows);
  });

  router.put('/turno/:id/estado', async (req, res) => {
    const turnoId = req.params.id;
    const { estado } = req.body;
  
    try {
      await db.query('UPDATE turnos SET estado = ? WHERE id = ?', [estado, turnoId]);
      res.json({ mensaje: 'Estado actualizado por admin' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al actualizar estado', error });
    }
  });
  
  
  module.exports = router;
