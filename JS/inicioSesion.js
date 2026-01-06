function validarSesion() {

    limpiarValidacionesSesion();

    let correoUsuario = document.getElementById("email").value.trim();
    let contrasenaUsuario = document.getElementById("password").value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correoUsuario)) {
        mostrarValidaciones('correoUsuario','Por favor ingresa un email válido.');
        return false;
    }

    const regexContrasena = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
    if (!regexContrasena.test(contrasenaUsuario)) {
        mostrarValidaciones(
            'contrasenaUsuario', 'La contraseña debe tener mínimo 8 caracteres, incluir mayúscula, minúscula, número y caracter especial.');
        return false;
    }
    return true

}

function limpiarValidacionesSesion() {

    document.querySelectorAll('.error-message').forEach(error => error.remove());
    document.querySelectorAll('.is-invalid').forEach(field => field.classList.remove('is-invalid'));
}

function mostrarValidaciones(id, mensaje) {
    const field = document.getElementById(id);
    const formFloating = field.closest('.form-floating');
    
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message text-danger mt-1 small';
    errorElement.textContent = mensaje;
    
    formFloating.appendChild(errorElement);
    
    field.classList.add('is-invalid');
}