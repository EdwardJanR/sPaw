function validaciones() {

    limpiarVal();

    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telefono').value;
    const mensaje = document.getElementById('mensaje').value.trim();


    if (nombre.length <= 2 || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre)) {
        mostrarVal('nombre','El nombre debe ser alfabético y mínimo dos caracteres');
        return false;
    }

    if (apellido.length <= 2 || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(apellido)) {
        mostrarVal('apellido','El nombre debe ser alfabético y mínimo dos caracteres');
        return false;
    }


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        mostrarVal('email','Por favor ingresa un email válido');
        return false;
    }

    if (telefono.length < 10 || isNaN(telefono)) {
        mostrarVal('telefono','El teléfono debe contener 10 dígitos');
        return false;
    }

    if (mensaje.length < 10) {
        mostrarVal('mensaje','El mensaje debe tener al menos 10 caracteres');
        return false;
    }


    // Si todas las validaciones pasan
    mostrarAlerta('success', '<strong>¡Éxito!</strong> Todos los campos son válidos. Enviando formulario...');
            
    // Enviar el formulario después de 1.5 segundos
    setTimeout(() => {
        document.getElementById('formContactenos').submit();
    }, 1500);        

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
            
    // Auto-cerrar después de 5 segundos
    setTimeout(() => {
        alerta.classList.remove('show');
        setTimeout(() => alerta.remove(), 150);
    }, 5000);
}
