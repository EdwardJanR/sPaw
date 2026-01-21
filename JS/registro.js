
function activarTogglePassword(inputId, toggleId) {
    const input = document.getElementById(inputId);
    const toggle = document.getElementById(toggleId);

    toggle.classList.add("bi-eye");
    toggle.classList.remove("bi-eye-slash");

    toggle.addEventListener("click", () => {
        const mostrando = input.type === "text";

        if (mostrando) {
            input.type = "password";
            toggle.classList.remove("bi-eye-slash");
            toggle.classList.add("bi-eye");
        } else {
            input.type = "text";
            toggle.classList.remove("bi-eye");
            toggle.classList.add("bi-eye-slash");
        }
    });
}

activarTogglePassword("contrasenaUsuario", "togglePassword1");
activarTogglePassword("confirmarContraUsuario", "togglePassword2");

// Contador global de mascotas (empieza en 1 porque solo hay 1 campo inicial)
let contadorMascotas = 1;
const MAX_MASCOTAS = 4;


function validaciones() {

    limpiarValidaciones();

    const nombreUsuario = document.getElementById("nombreUsuario").value.trim();
    let apellidosUsuario = document.getElementById("apellidosUsuario").value.trim();
    let correoUsuario = document.getElementById("correoUsuario").value.trim();
    let contrasenaUsuario = document.getElementById("contrasenaUsuario").value.trim();
    let confirmarContraUsuario = document.getElementById("confirmarContraUsuario").value.trim();
    let telefonoUsuario = document.getElementById("telefonoUsuario").value.trim();
    //let mascota1Usuario = document.getElementById("mascota1Usuario").value.trim();
    //let mascota2Usuario = document.getElementById("mascota2Usuario").value.trim();
    //let mascota3Usuario = document.getElementById("mascota3Usuario").value.trim();
    //let mascota4Usuario = document.getElementById("mascota4Usuario").value.trim();

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

    const regexContrasena = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
    if (!regexContrasena.test(contrasenaUsuario)) {
        mostrarValidaciones(
            'contrasenaUsuario', 'La contraseña debe tener mínimo 8 caracteres, incluir mayúscula, minúscula, número y caracter especial.');
        return false;
    }

    if (contrasenaUsuario !== confirmarContraUsuario) {
        mostrarValidaciones('confirmarContraUsuario','Las contraseñas no coinciden.');
        return false;
    }

    /*if (mascota1Usuario.length <= 2 || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(mascota1Usuario)) {
        mostrarValidaciones('mascota1Usuario','El nombre debe ser alfabético y mínimo de dos caracteres.');
        return false;
    }*/

        // Validar OBLIGATORIAMENTE la primera mascota
    const mascota1Usuario = document.getElementById("mascota1Usuario").value.trim();
    if (mascota1Usuario.length <= 2 || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(mascota1Usuario)) {
        mostrarValidaciones('mascota1Usuario','Debes ingresar al menos el nombre de una mascota (mínimo 2 caracteres alfabéticos).');
        return false;
    }

    // Validar mascotas adicionales SOLO si tienen contenido (son opcionales)
    for (let i = 2; i <= contadorMascotas; i++) {
        const mascotaInput = document.getElementById(`mascota${i}Usuario`);
        if (mascotaInput) {
            const valorMascota = mascotaInput.value.trim();
            // Si el campo tiene contenido, validarlo
            if (valorMascota.length > 0 && (valorMascota.length <= 2 || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valorMascota))) {
                mostrarValidaciones(`mascota${i}Usuario`, 'El nombre debe ser alfabético y mínimo de dos caracteres.');
                return false;
            }
        }
    }

    mostrarAlerta('<strong>¡Éxito!</strong> Todos los campos son válidos. Enviando formulario...','success');
            
    registroUsuario();

    /*setTimeout(() => {
        document.getElementById('formRegistro').submit();
    }, 1500);*/        

    limpiarFormulario();

    //Redirecciona el usuario a inicio de sesión
    setTimeout(() => {
      window.location.href = "../HTML/inicioSesion.html";
    }, 3000);

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
        setTimeout(() => alerta.remove(), 500000);
    }, 500000);
}


function registroUsuario() {
    let nombreUsuario = document.getElementById("nombreUsuario").value;
    let apellidosUsuario = document.getElementById("apellidosUsuario").value;
    let correoUsuario = document.getElementById("correoUsuario").value;
    let contrasenaUsuario = document.getElementById("contrasenaUsuario").value;
    let confirmarContraUsuario = document.getElementById("confirmarContraUsuario").value;
    let telefonoUsuario = document.getElementById("telefonoUsuario").value;
    //let mascota1Usuario = document.getElementById("mascota1Usuario").value;
    //let mascota2Usuario = document.getElementById("mascota2Usuario").value;
    //let mascota3Usuario = document.getElementById("mascota3Usuario").value;
    //let mascota4Usuario = document.getElementById("mascota4Usuario").value;

    // Recopilar todas las mascotas dinámicamente (solo las que tengan valor)
    const mascotas = [];
    for (let i = 1; i <= contadorMascotas; i++) {
        const mascotaInput = document.getElementById(`mascota${i}Usuario`);
        if (mascotaInput) {
            const valorMascota = mascotaInput.value.trim();
            if (valorMascota.length > 0) {
                mascotas.push(valorMascota);
            }
        }
    }
    
    const infoUsuario = {
        nombre: nombreUsuario,
        apellidos: apellidosUsuario,
        correo: correoUsuario,
        contrasena: contrasenaUsuario,
        confirmarContraseña: confirmarContraUsuario,
        telefono: telefonoUsuario,
        mascotas: mascotas
    }

    let infoRegistro = JSON.parse(localStorage.getItem("infoRegistro")) || [];
    infoRegistro.push(infoUsuario);
    localStorage.setItem("infoRegistro", JSON.stringify(infoRegistro));


}

function limpiarFormulario() {
    document.getElementById("formRegistro").reset();
}

// Función para contar cuántos campos de mascota existen actualmente
function contarCamposMascota() {
    let count = 1; // Siempre existe mascota1Usuario (obligatorio)
    for (let i = 2; i <= contadorMascotas; i++) {
        if (document.getElementById(`mascotaContainer${i}`)) {
            count++;
        }
    }
    return count;
}

// Función para agregar un nuevo campo de mascota
function agregarCampoMascota() {
    // Contar campos actuales en lugar de usar el contador
    const camposActuales = contarCamposMascota();
    
    // Verificar si ya se alcanzó el máximo
    if (camposActuales >= MAX_MASCOTAS) {
        mostrarAlerta('<strong>Límite alcanzado:</strong> Solo puedes registrar hasta 4 mascotas.', 'warning');
        return;
    }

    contadorMascotas++;    
    
    const columnForm = document.querySelector('.column-form');
    const botonRegistro = columnForm.querySelector('.form-floating.d-flex.justify-content-center');
    
    // Crear el nuevo div para la mascota
    const nuevoDiv = document.createElement('div');
    nuevoDiv.className = 'd-flex flex-column flex-md-row w-100 w-lg-75 align-items-center px-3 my-lg-1';
    nuevoDiv.id = `mascotaContainer${contadorMascotas}`;
    
    nuevoDiv.innerHTML = `
        <div class="form-floating w-100 w-md-50 m-3">
            <input type="text" class="form-control entrada" id="mascota${contadorMascotas}Usuario" placeholder="">
            <label for="mascota${contadorMascotas}Usuario">Ingresa el nombre de tu mascota (opcional)</label>
        </div>
        <div class="w-100 w-md-50 m-3 d-flex align-items-center justify-content-center justify-content-md-start">
            <button type="button" class="btn-eliminar-mascota" onclick="eliminarCampoMascota(${contadorMascotas})">
                <i class="bi bi-trash"></i> Eliminar
            </button>        
        </div>
    `;    

    // Insertar antes del botón de registro
    columnForm.insertBefore(nuevoDiv, botonRegistro);
    
    // Si se alcanzó el máximo, ocultar el botón de agregar
    if (contarCamposMascota() >= MAX_MASCOTAS) {
        const botonAgregarContainer = document.getElementById('botonAgregarMascota');
        botonAgregarContainer.style.display = 'none';
    }
}

// Función para eliminar un campo de mascota
function eliminarCampoMascota(numero) {
    const container = document.getElementById(`mascotaContainer${numero}`);
    if (container) {
        container.remove();
        
        // Mostrar nuevamente el botón de agregar si estaba oculto
        const botonAgregarContainer = document.getElementById('botonAgregarMascota');
        if (botonAgregarContainer.style.display === 'none') {
            botonAgregarContainer.style.display = 'flex';
        }
    }
}
