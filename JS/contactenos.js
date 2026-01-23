function validaciones() {

    limpiarVal();

    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telefono').value;
    const mensaje = document.getElementById('mensaje').value.trim();


    if (nombre.length <= 2 || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre)) {
        mostrarVal('nombre','El nombre debe ser alfabético y mínimo de dos caracteres.');
        return false;
    }

    if (apellido.length <= 2 || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(apellido)) {
        mostrarVal('apellido','El apellido debe ser alfabético y mínimo de dos caracteres.');
        return false;
    }


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        mostrarVal('email','Por favor ingresa un email válido.');
        return false;
    }

    if (telefono.length < 10 || isNaN(telefono)) {
        mostrarVal('telefono','El teléfono debe contener 10 dígitos.');
        return false;
    }

    if (mensaje.length < 10) {
        mostrarVal('mensaje','El mensaje debe tener al menos 10 caracteres.');
        return false;
    }


 
    mostrarAlerta('success', '<strong>¡Éxito!</strong> Todos los campos son válidos. Enviando formulario...');
            

    setTimeout(() => {
        document.getElementById('formContactenos').submit();
    }, 1500);        

    return true;
}

function mostrarVal(f, m) {
    const field = document.getElementById(f);
    const formFloating = field.closest('.form-floating');
    
    formFloating.classList.add('has-error');
    
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = m;
    
    formFloating.appendChild(errorElement);
    
    field.classList.add('is-invalid');
}

function limpiarVal() {
   
    document.querySelectorAll('.error-message').forEach(error => error.remove());
    
 
    document.querySelectorAll('.is-invalid').forEach(field => field.classList.remove('is-invalid'));
    

    document.querySelectorAll('.has-error').forEach(container => container.classList.remove('has-error'));
}

function mostrarAlerta(tipo, mensaje) {
    const alertContainer = document.getElementById('alertContainer');
            
    const alerta = document.createElement('div');
    alerta.className = `alert alert-${tipo} alert-dismissible fade show mt-3`;
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

// Germán
// Quitar mensaje de advertencia al diligenciar campos de formulario
function validarCampo(campo) {
  if (campo.checkValidity() && campo.value.trim() !== "") {
    campo.classList.remove("is-invalid");
    campo.classList.add("is-valid");

    // elimina mensaje de error si existe
    const error = campo
      .closest(".form-floating")
      ?.querySelector(".error-message");

    if (error) error.remove();
  }
}

document.addEventListener("DOMContentLoaded", () => {

  const campos = [
    "nombre",
    "apellido",
    "email",
    "telefono",
    "mensaje"
  ];

  campos.forEach(id => {
    const campo = document.getElementById(id);

    if (!campo) return;

    // Para inputs de texto y password
    campo.addEventListener("input", () => validarCampo(campo));

    // Por si alguno es select
    campo.addEventListener("change", () => validarCampo(campo));
  });

});