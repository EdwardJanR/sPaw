
const passwordInput1 = document.getElementById("contrasenaUsuario");
const togglePassword1 = document.getElementById("togglePassword1");

togglePassword1.classList.add("bi-eye");
togglePassword1.classList.remove("bi-eye-slash");

togglePassword1.addEventListener("click", () => {
    const showing = passwordInput1.type === "text";

    if (showing) {
        passwordInput1.type = "password";
        togglePassword1.classList.remove("bi-eye-slash");
        togglePassword1.classList.add("bi-eye");
    } else {
        passwordInput1.type = "text";
        togglePassword1.classList.remove("bi-eye");
        togglePassword1.classList.add("bi-eye-slash");
    }
});

const passwordInput2 = document.getElementById("confirmarContraUsuario");
const togglePassword2 = document.getElementById("togglePassword2");

togglePassword2.classList.add("bi-eye");
togglePassword2.classList.remove("bi-eye-slash");

togglePassword2.addEventListener("click", () => {
    const showing = passwordInput2.type === "text";

    if (showing) {
        passwordInput2.type = "password";
        togglePassword2.classList.remove("bi-eye-slash");
        togglePassword2.classList.add("bi-eye");
    } else {
        passwordInput2.type = "text";
        togglePassword2.classList.remove("bi-eye");
        togglePassword2.classList.add("bi-eye-slash");
    }
});

function validaciones() {

    limpiarValidaciones();

    const nombreUsuario = document.getElementById("nombreUsuario").value.trim();
    let apellidosUsuario = document.getElementById("apellidosUsuario").value.trim();
    let correoUsuario = document.getElementById("correoUsuario").value.trim();
    let contrasenaUsuario = document.getElementById("contrasenaUsuario").value.trim();
    let confirmarContraUsuario = document.getElementById("confirmarContraUsuario").value.trim();
    let telefonoUsuario = document.getElementById("telefonoUsuario").value.trim();
    let mascota1Usuario = document.getElementById("mascota1Usuario").value.trim();
    let mascota2Usuario = document.getElementById("mascota2Usuario").value.trim();
    let mascota3Usuario = document.getElementById("mascota3Usuario").value.trim();
    let mascota4Usuario = document.getElementById("mascota4Usuario").value.trim();

    if (nombreUsuario.length <= 2 || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombreUsuario)) {
        mostrarValidaciones('nombreUsuario','El nombre debe ser alfabético y mínimo de dos caracteres.');
        return false;
    }

    if (apellidosUsuario.length <= 2 || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(apellidosUsuario)) {
        mostrarValidaciones('apellidosUsuario','Los apellidos deben ser alfabéticos y mínimo de dos caracteres.');
        return false;
    }

    if (!/^\d{10}$/.test(telefonoUsuario)) {
        mostrarValidaciones('telefonoUsuario','El teléfono debe contener 10 dígitos.');
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correoUsuario)) {
        mostrarValidaciones('correoUsuario','Por favor ingresa un email válido.');
        return false;
    }

    if (contrasenaUsuario.length < 8) {
        mostrarValidaciones('contrasenaUsuario','La contraseña debe tener al menos 8 caracteres.');
        return false;
    }

    if (contrasenaUsuario !== confirmarContraUsuario) {
        mostrarValidaciones('confirmarContraUsuario','Las contraseñas no coinciden.');
        return false;
    }

    mostrarAlerta('<strong>¡Éxito!</strong> Todos los campos son válidos. Enviando formulario...','success');
            
    localStorage.setItem("usuarioRegistrado", JSON.stringify(infoUsuario));
    
    setTimeout(() => {
        document.getElementById('formRegistro').submit();
    }, 1500);        

    document.getElementById("formRegistro").reset();

    return true;

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

function limpiarValidaciones() {

    document.querySelectorAll('.error-message').forEach(error => error.remove());
    document.querySelectorAll('.is-invalid').forEach(field => field.classList.remove('is-invalid'));
}

function mostrarAlerta(mensaje, tipo) {
    const alertContainer = document.getElementById('alertContainer');
            
    const alerta = document.createElement('div');
    alerta.className = `alert alert-${tipo} alert-dismissible fade show`;
    alerta.role = 'alert';
    alerta.innerHTML = `
        ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
            
    alertContainer.innerHTML = '';
    alertContainer.appendChild(alerta);
            
    setTimeout(() => {
        alerta.classList.remove('show');
        setTimeout(() => alerta.remove(), 150);
    }, 5000);
}
