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
  
  module.exports = router;
