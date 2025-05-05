document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const usuario = document.getElementById('usuario').value;
    const contrasena = document.getElementById('contrasena').value;

    // Leer el archivo db.txt
    fetch('db.txt')
        .then(response => response.text())
        .then(data => {
            // Buscar coincidencias de usuario y contraseña
            const lineas = data.split('\n');
            let encontrado = false;

            for (let i = 0; i < lineas.length; i++) {
                const [usuarioGuardado, contrasenaGuardada] = lineas[i].split(':');
                if (usuario === usuarioGuardado && contrasena === contrasenaGuardada) {
                    encontrado = true;
                    break;
                }
            }

            // Mostrar mensaje de éxito o error
            if (encontrado) {
                document.getElementById('mensaje').textContent = 'Bienvenido, ' + usuario + '!';
                document.getElementById('mensaje').style.color = 'green';
            } else {
                document.getElementById('mensaje').textContent = 'Usuario o contraseña incorrectos.';
                document.getElementById('mensaje').style.color = 'red';
            }
        })
        .catch(error => {
            console.error('Error al leer el archivo:', error);
            document.getElementById('mensaje').textContent = 'Hubo un error al intentar iniciar sesión.';
            document.getElementById('mensaje').style.color = 'red';
        });
});