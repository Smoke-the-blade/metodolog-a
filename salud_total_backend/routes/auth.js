const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const [usuarios] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);

  if (usuarios.length === 0) return res.status(401).json({ mensaje: 'Usuario no encontrado' });

  const usuario = usuarios[0];
  const bcrypt = require('bcrypt');
  const valid = await bcrypt.compare(password, usuario.password);

  if (!valid) return res.status(401).json({ mensaje: 'Contraseña incorrecta' });

  res.json({
    id: usuario.id,
    nombre: usuario.nombre,
    rol: usuario.rol,
    dni: usuario.dni
  });
});

module.exports = router;
