const jwt = require('jsonwebtoken');
const SECRET = 'clave_super_segura';

function verificarToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ mensaje: 'Token requerido' });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.usuario = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ mensaje: 'Token inválido' });
  }
}

function soloRol(...rolesPermitidos) {
  return (req, res, next) => {
    const { rol } = req.usuario;
    const roles = rol.split(',');
    const tienePermiso = roles.some(r => rolesPermitidos.includes(r));
    if (!tienePermiso) {
      return res.status(403).json({ mensaje: 'Acceso denegado' });
    }
    next();
  };
}

module.exports = { verificarToken, soloRol };
