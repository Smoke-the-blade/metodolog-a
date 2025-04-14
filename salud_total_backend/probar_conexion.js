const db = require('./db');

async function testConexion() {
  try {
    const [rows] = await db.query('SELECT * FROM usuarios');
    console.log('✔ Conexión exitosa. Usuarios encontrados:', rows.length);
    console.log(rows); // Mostramos algunos resultados
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error);
  }
}

testConexion();
