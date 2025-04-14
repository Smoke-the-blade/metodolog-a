const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = 'clave_super_segura';

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const [usuarios] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);

    if (usuarios.length === 0) {
      return res.status(401).json({ mensaje: 'Usuario no encontrado' });
    }

    const usuario = usuarios[0];

    const valid = await bcrypt.compare(password, usuario.password);
    if (!valid) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({
      id: usuario.id,
      nombre: usuario.nombre,
      rol: usuario.rol,
      dni: usuario.dni
    }, SECRET, { expiresIn: '2h' });

    res.json({ token, nombre: usuario.nombre, rol: usuario.rol });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor', error });
  }
});

module.exports = router;
