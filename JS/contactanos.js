function validaciones() {

    limpiarVal();

    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telefono').value;
    const mensaje = document.getElementById('mensaje').value.trim();


    if (nombre.length < 2 || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre)) {
        mostrarVal('nombre','El nombre debe tener al menos 2 caracteres y sin numeros');
        return false;
    }

    if (apellido.length < 2 || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(apellido)) {
        mostrarVal('apellido','El apellido debe tener al menos 2 caracteres sin numeros');
        return false;
    }


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        mostrarVal('email','Por favor ingresa un email válido');
        return false;
    }

    if (telefono.length < 7 || isNaN(telefono)) {
        mostrarVal('telefono','El teléfono debe tener al menos 7 dígitos');
        return false;
    }

    if (mensaje.length < 10) {
        mostrarVal('mensaje','El mensaje debe tener al menos 10 caracteres');
        return false;
    }

    alert('Formulario enviado correctamente');
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