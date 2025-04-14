const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', async (req, res) => {
    const { nombre, email, password, dni, rol } = req.body;
    try {
      const bcrypt = require('bcrypt');
      const hashed = await bcrypt.hash(password, 10);
  
      await db.query(
        'INSERT INTO usuarios (nombre, email, password, dni, rol) VALUES (?, ?, ?, ?, ?)',
        [nombre, email, hashed, dni, rol]
      );
  
      res.json({ mensaje: 'Usuario registrado exitosamente' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al registrar', error });
    }
  });
  
  module.exports = router;
