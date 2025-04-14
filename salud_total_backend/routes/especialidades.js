const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todas las especialidades
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM especialidades');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener especialidades', error });
  }
});

module.exports = router;
