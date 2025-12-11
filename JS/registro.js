function validaciones() {

    limpiarVal();

    let nombreUsuario = document.getElementById("nombreUsuario").value.trim();
    let apellidosUsuario = document.getElementById("apellidosUsuario").value.trim();
    let correoUsuario = document.getElementById("correoUsuario").value.trim();
    let contrasenaUsuario = document.getElementById("contrasenaUsuario").value.trim();
    let confirmarContraUsuario = document.getElementById("confirmarContraUsuario").value.trim();
    let telefonoUsuario = document.getElementById("telefonoUsuario").value.trim();
    let mascota1Usuario = document.getElementById("mascota1Usuario").value.trim();
    let mascota2Usuario = document.getElementById("mascota2Usuario").value.trim();
    let mascota3Usuario = document.getElementById("mascota3Usuario").value.trim();
    let mascota4Usuario = document.getElementById("mascota4Usuario").value.trim();

    let mensaje = document.getElementById("mensaje");

    const infoUsuario = {
        nombre: nombreUsuario,
        apellidos: apellidosUsuario,
        correo: correoUsuario,
        contrasena: contrasenaUsuario,
        confirmarContrasena: confirmarContraUsuario,
        telefono: telefonoUsuario,
        mascota1: mascota1Usuario,
        mascota2: mascota2Usuario,
        mascota3: mascota3Usuario,
        mascota4: mascota4Usuario
    }

    if (nombreUsuario === "" || apellidosUsuario === "" || correoUsuario === "" || contrasenaUsuario === "" || confirmarContraUsuario === "" || telefonoUsuario === "" || mascota1Usuario === "") {
        mensaje.innerText = "Todos los campos deben ser diligenciados.";
        return;
    }

    if (nombreUsuario.length <= 2 || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombreUsuario)) {
        mostrarVal('nombreUsuario','El nombre debe ser alfabético y mínimo de dos caracteres.');
        return false;
    }

    if (apellidosUsuario.length <= 2 || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(apellidosUsuario)) {
        mostrarVal('apellidosUsuario','Los apellidos deben ser alfabéticos y mínimo de dos caracteres.');
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correoUsuario)) {
        mostrarVal('correoUsuario','Por favor ingresa un email válido.');
        return false;
    }

    if (!/^\d{10}$/.test(telefonoUsuario)) {
        mostrarVal('telefonoUsuario','El teléfono debe contener 10 dígitos.');
        return false;
    }

    if (contrasenaUsuario.length < 8) {
        mostrarVal('contrasenaUsuario','La contraseña debe tener al menos 8 caracteres.');
        return false;
    }

    if (contrasenaUsuario !== confirmarContraUsuario) {
        mostrarVal('confirmarContraUsuario','Las contraseñas no coinciden.');
        return false;
    }

    mostrarAlerta('success', '<strong>¡Éxito!</strong> Todos los campos son válidos. Enviando formulario...');
            
    localStorage.setItem("usuarioRegistrado", JSON.stringify(infoUsuario));
    
    setTimeout(() => {
        document.getElementById('formRegistro').submit();
    }, 1500);        

    mensaje.innerText = "Usuario registrado correctamente.";
    mensaje.style.color = "green";

    document.getElementById("formRegistro").reset();

    return true;

}

function mostrarVal(f, m) {
    const field = document.getElementById(f);
    const formFloating = field.closest('.form-floating');
    
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message text-danger mt-1 small';
    errorElement.textContent = m;
    
    formFloating.appendChild(errorElement);
    
    field.classList.add('is-invalid');
}

function limpiarVal() {

    document.querySelectorAll('.error-message').forEach(error => error.remove());
    document.querySelectorAll('.is-invalid').forEach(field => field.classList.remove('is-invalid'));
}

function mostrarAlerta(tipo, mensaje) {
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