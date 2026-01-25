const API_URL = 'http://localhost:8080';
let contadorMascotas = 1;
const MAX_MASCOTAS = 4;

const input = document.getElementById("contrasenaUsuario");
const bubble = document.getElementById("passwordBubble");
let timeoutBubble = null;

// Tiempo de retardo de burbuja de password
if (input && bubble) {
    input.addEventListener("focus", () => {
        bubble.style.display = "block";
        if (timeoutBubble) {
            clearTimeout(timeoutBubble);
        }
        timeoutBubble = setTimeout(() => {
            bubble.style.display = "none";
        }, 10000);
    });

    input.addEventListener("blur", () => {
        bubble.style.display = "none";
        if (timeoutBubble) {
            clearTimeout(timeoutBubble);
        }
    });
}

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

    const regexContrasena = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
    if (!regexContrasena.test(contrasenaUsuario)) {
        mostrarValidaciones(
            'contrasenaUsuario', 'La contraseña debe tener mínimo: 8 caracteres, incluir una mayúscula, una minúscula, un número y un caracter especial.');
        return false;
    }

    if (contrasenaUsuario !== confirmarContraUsuario) {
        mostrarValidaciones('confirmarContraUsuario','Las contraseñas no coinciden.');
        return false;
    }

    if (mascota1Usuario.length <= 2 || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(mascota1Usuario)) {
        mostrarValidaciones('mascota1Usuario','El nombre debe ser alfabético y mínimo de dos caracteres.');
        return false;
    }

    mostrarAlerta('<strong>¡Éxito!</strong> Todos los campos son válidos. Enviando formulario...','success');
            
    registroUsuario();

    setTimeout(() => {
        document.getElementById('formRegistro').submit();
    }, 1500);        

    limpiarFormulario();

    //Redirecciona el usuario a inicio de sesión
    setTimeout(() => {
      window.location.href = "../HTML/inicioSesion.html";
    }, 3000);

    return true;
}

// function mostrarValidaciones(id, mensaje) {
//     const field = document.getElementById(id);
//     const formFloating = field.closest('.form-floating');
    
//     const errorElement = document.createElement('div');
//     errorElement.className = 'error-message text-danger mt-1 small';
//     errorElement.textContent = mensaje;
//     formFloating.appendChild(errorElement);  
//     field.classList.add('is-invalid');
// }

function mostrarValidaciones(id, mensaje) {
    const field = document.getElementById(id);
    if (!field) return;

    const formFloating = field.closest('.form-floating');
    if (!formFloating) return;

    const errorExistente = formFloating.querySelector('.error-message');
    if (errorExistente) {
        errorExistente.textContent = mensaje;
    } else {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message text-danger mt-1 small';
        errorElement.textContent = mensaje;
        formFloating.appendChild(errorElement);
    }

    field.classList.add('is-invalid');
}

function limpiarValidaciones() {

    document.querySelectorAll('.error-message').forEach(error => error.remove());
    document.querySelectorAll('.is-invalid').forEach(field => field.classList.remove('is-invalid'));
}

function mostrarAlerta(mensaje, tipo) {
    const alertContainer = document.getElementById('alertContainer');

    alertContainer.innerHTML = '';

    const alerta = document.createElement('div');
    alerta.className = `alert alert-${tipo} alert-dismissible fade show`;
    alerta.role = 'alert';
    alerta.innerHTML = `
        <div class="d-flex align-items-center">
            <div class="flex-grow-1">
                ${mensaje}
            </div>
            <button type="button" class="btn-close ms-2" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;

    alertContainer.appendChild(alerta);

    if (tipo === 'success') {
        setTimeout(() => {
            if (alerta.parentNode === alertContainer) {
                alerta.classList.remove('show');
                setTimeout(() => {
                    if (alerta.parentNode === alertContainer) {
                        alerta.remove();
                    }
                }, 300);
            }
        }, 5000);
    }
}

function limpiarFormulario() {
    const form = document.getElementById("formRegistro");
    if (form) {
        form.reset();
        contadorMascotas = 1;

        for (let i = 2; i <= MAX_MASCOTAS; i++) {
            const container = document.getElementById(`mascotaContainer${i}`);
            if (container) {
                container.remove();
            }
        }
        const botonAgregarContainer = document.getElementById('botonAgregarMascota');
        if (botonAgregarContainer) {
            botonAgregarContainer.style.display = 'flex';
        }
    }
}

function contarCamposMascota() {
    let count = 1;
    for (let i = 2; i <= contadorMascotas; i++) {
        if (document.getElementById(`mascotaContainer${i}`)) {
            count++;
        }
    }
    return count;
}

function agregarCampoMascota() {
    const camposActuales = contarCamposMascota();

    if (camposActuales >= MAX_MASCOTAS) {
        mostrarAlerta('<strong>Límite alcanzado:</strong> Solo puedes registrar hasta 4 mascotas.', 'warning');
        return;
    }

    contadorMascotas++;

    const columnForm = document.querySelector('.column-form');
    const botonRegistro = columnForm.querySelector('.form-floating.d-flex.justify-content-center');

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

    columnForm.insertBefore(nuevoDiv, botonRegistro);

    if (contarCamposMascota() >= MAX_MASCOTAS) {
        const botonAgregarContainer = document.getElementById('botonAgregarMascota');
        if (botonAgregarContainer) {
            botonAgregarContainer.style.display = 'none';
        }
    }
}

function eliminarCampoMascota(numero) {
    const container = document.getElementById(`mascotaContainer${numero}`);
    if (container) {
        container.remove();

        const botonAgregarContainer = document.getElementById('botonAgregarMascota');
        if (botonAgregarContainer && botonAgregarContainer.style.display === 'none') {
            botonAgregarContainer.style.display = 'flex';
        }
    }
}

async function validaciones() {
    limpiarValidaciones();

    const nombreUsuario = document.getElementById("nombreUsuario").value.trim();
    const apellidosUsuario = document.getElementById("apellidosUsuario").value.trim();
    const correoUsuario = document.getElementById("correoUsuario").value.trim();
    const contrasenaUsuario = document.getElementById("contrasenaUsuario").value.trim();
    const confirmarContraUsuario = document.getElementById("confirmarContraUsuario").value.trim();
    const telefonoUsuario = document.getElementById("telefonoUsuario").value.trim();

    let esValido = true;

    // Validar nombre
    if (nombreUsuario.length <= 2 || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombreUsuario)) {
        mostrarValidaciones('nombreUsuario', 'El nombre debe ser alfabético y mínimo de dos caracteres.');
        esValido = false;
    }

    // Validar apellidos
    if (apellidosUsuario.length <= 2 || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(apellidosUsuario)) {
        mostrarValidaciones('apellidosUsuario', 'Los apellidos deben ser alfabéticos y mínimo de dos caracteres.');
        esValido = false;
    }

    // Validar teléfono
    if (!/^\d{10}$/.test(telefonoUsuario)) {
        mostrarValidaciones('telefonoUsuario', 'El teléfono debe contener 10 dígitos.');
        esValido = false;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correoUsuario)) {
        mostrarValidaciones('correoUsuario', 'Por favor ingresa un email válido.');
        esValido = false;
    }

    // Validar contraseña
    const regexContrasena = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
    if (!regexContrasena.test(contrasenaUsuario)) {
        mostrarValidaciones(
            'contrasenaUsuario',
            'La contraseña debe tener mínimo 8 caracteres, incluir mayúscula, minúscula, número y caracter especial.'
        );
        esValido = false;
    }

    // Validar confirmación de contraseña
    if (contrasenaUsuario !== confirmarContraUsuario) {
        mostrarValidaciones('confirmarContraUsuario', 'Las contraseñas no coinciden.');
        esValido = false;
    }

    // Validar mascotas
    const mascota1Usuario = document.getElementById("mascota1Usuario").value.trim();
    if (mascota1Usuario.length <= 2 || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(mascota1Usuario)) {
        mostrarValidaciones('mascota1Usuario', 'Debes ingresar al menos el nombre de una mascota (mínimo 2 caracteres alfabéticos).');
        esValido = false;
    }

    // Validar mascotas adicionales
    for (let i = 2; i <= contadorMascotas; i++) {
        const mascotaInput = document.getElementById(`mascota${i}Usuario`);
        if (mascotaInput) {
            const valorMascota = mascotaInput.value.trim();
            if (valorMascota.length > 0 && (valorMascota.length <= 2 || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valorMascota))) {
                mostrarValidaciones(`mascota${i}Usuario`, 'El nombre debe ser alfabético y mínimo de dos caracteres.');
                esValido = false;
            }
        }
    }

    if (!esValido) {
        return false;
    }


    const btnRegistro = document.getElementById('btnRegistro');
    const textoOriginal = btnRegistro.innerHTML;
    btnRegistro.disabled = true;
    btnRegistro.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Registrando...';

    try {
        mostrarAlerta('<strong>Registrando usuario...</strong>', 'info');

        const usuarioGuardado = await registrarUsuarioBackend({
            nombre: nombreUsuario,
            apellido: apellidosUsuario,
            telefono: telefonoUsuario,
            email: correoUsuario,
            passwordUsuario: contrasenaUsuario,
            rol: 'Cliente'
        });

        const usuarioId = usuarioGuardado.idUsuario;
        console.log('Usuario registrado con ID:', usuarioId);

        if (!usuarioId) {
            throw new Error('No se pudo obtener el ID del usuario registrado');
        }

        if (mascota1Usuario.length > 0) {
            mostrarAlerta('<strong>Usuario registrado. Guardando mascotas...</strong>', 'info');

            const mascotasGuardadas = await guardarMascotasParaUsuario(usuarioId);

            mostrarAlerta(
                `<strong>¡Registro exitoso!</strong><br>
                Usuario: ${nombreUsuario} ${apellidosUsuario}<br>
                Email: ${correoUsuario}<br>
                Mascotas registradas: ${mascotasGuardadas}<br>
                <small>Redirigiendo a inicio de sesión...</small>`,
                'success'
            );
        } else {
            mostrarAlerta(
                `<strong>¡Registro exitoso!</strong><br>
                Usuario: ${nombreUsuario} ${apellidosUsuario}<br>
                Email: ${correoUsuario}<br>
                <small>Redirigiendo a inicio de sesión...</small>`,
                'success'
            );
        }

        limpiarFormulario();

        setTimeout(() => {
            window.location.href = "../HTML/inicioSesion.html";
        }, 2000);

    } catch (error) {
        console.error('Error en el registro:', error);
        mostrarAlerta(`<strong>Error de registro:</strong> ${error.message}`, 'danger');

        btnRegistro.disabled = false;
        btnRegistro.innerHTML = textoOriginal;
    }

    return true;
}

async function registrarUsuarioBackend(datosUsuario) {
    try {
        console.log('Enviando datos de usuario:', datosUsuario);

        const response = await fetch(`${API_URL}/auth/registro`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: datosUsuario.nombre,
                apellido: datosUsuario.apellido,
                telefono: datosUsuario.telefono,
                email: datosUsuario.email,
                passwordUsuario: datosUsuario.passwordUsuario,
                rol: "Cliente"
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error del servidor:', errorText);
            throw new Error(`Error al registrar usuario: ${errorText}`);
        }

        const responseData = await response.json();
        console.log('Respuesta del servidor:', responseData);
        
        // Extraer el ID del usuario de la respuesta
        let usuarioId;
        
        // Diferentes formas en que podría venir el ID
        if (responseData.idUsuario) {
            usuarioId = responseData.idUsuario;
        } else if (responseData.id) {
            usuarioId = responseData.id;
        } else if (responseData.usuario && responseData.usuario.idUsuario) {
            usuarioId = responseData.usuario.idUsuario;
        } else if (responseData.usuario && responseData.usuario.id) {
            usuarioId = responseData.usuario.id;
        } else {
            // Si el backend solo retorna texto, buscar por email
            console.warn('No se encontró ID en la respuesta, buscando por email...');
            usuarioId = await obtenerIdUsuarioPorEmail(datosUsuario.email);
        }
        
        console.log('ID de usuario extraído:', usuarioId);
        
        // Retornar objeto con el ID
        return {
            idUsuario: usuarioId,
            ...responseData
        };

    } catch (error) {
        console.error('Error registrando usuario:', error);
        throw error;
    }
}

async function obtenerIdUsuarioPorEmail(email) {
    try {
        const response = await fetch(`${API_URL}/usuarios`);
        if (response.ok) {
            const usuarios = await response.json();
            const usuarioEncontrado = usuarios.find(u => u.email === email);
            return usuarioEncontrado ? usuarioEncontrado.idUsuario : null;
        }
        return null;
    } catch (error) {
        console.error('Error obteniendo usuario por email:', error);
        return null;
    }
}

async function guardarMascotaParaUsuario(usuarioId, nombreMascota) {
    try {
        const mascotaData = {
            nombreMascota: nombreMascota,
        };

        console.log(`Enviando mascota para usuario ${usuarioId}:`, mascotaData);

        const response = await fetch(`${API_URL}/usuarios/${usuarioId}/mascotas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(mascotaData)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error del servidor al guardar mascota:', errorText);
            throw new Error(`Error al guardar mascota: ${errorText}`);
        }

        const usuarioActualizado = await response.json();
        console.log('Usuario actualizado con mascota:', usuarioActualizado);

        return usuarioActualizado;

    } catch (error) {
        console.error('Error guardando mascota individual:', error);
        throw error;
    }
}

async function guardarMascotasParaUsuario(usuarioId) {
    let mascotasGuardadas = 0;

    const nombresMascotas = [];
    for (let i = 1; i <= contadorMascotas; i++) {
        const mascotaInput = document.getElementById(`mascota${i}Usuario`);
        if (mascotaInput) {
            const nombreMascota = mascotaInput.value.trim();
            if (nombreMascota.length > 0) {
                nombresMascotas.push(nombreMascota);
            }
        }
    }

    console.log(`Guardando ${nombresMascotas.length} mascotas para usuario ID:`, usuarioId);

    for (const nombreMascota of nombresMascotas) {
        try {
            const resultado = await guardarMascotaParaUsuario(usuarioId, nombreMascota);
            if (resultado) {
                mascotasGuardadas++;
                console.log(`Mascota guardada: ${nombreMascota}`);
            }
        } catch (error) {
            console.error(`Error guardando mascota ${nombreMascota}:`, error);
        }
    }

    console.log(`Total mascotas guardadas: ${mascotasGuardadas}`);
    return mascotasGuardadas;
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
    "nombreUsuario",
    "apellidosUsuario",
    "correoUsuario",
    "contrasenaUsuario",
    "confirmarContraUsuario",
    "telefonoUsuario",
    "mascota1Usuario",
    "mascota2Usuario",
    "mascota3Usuario",
    "mascota4Usuario"
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

form.addEventListener("submit", e => {
  e.preventDefault();

  for (const campo of campos) {
    if (!campo.checkValidity()) {
      marcarError(campo);
      campo.focus();
      break;
    }
  }
});

// Password Cambio de icono de ojo a slash
document.getElementById("mostrarPass1").addEventListener("click", function () {
  const input = document.getElementById("contrasenaUsuario");
  const icon = document.getElementById("togglePassword1");

  const isPassword = input.type === "password";

  // Cambiar tipo de input
  input.type = isPassword ? "text" : "password";

  // Cambiar icono 
  icon.classList.toggle("bi-eye", !isPassword);
  icon.classList.toggle("bi-eye-slash", isPassword);
});

// Confirmar Password Cambio de icono de ojo a slash
document.getElementById("mostrarPass2").addEventListener("click", function () {
  const input = document.getElementById("confirmarContraUsuario");
  const icon = document.getElementById("togglePassword2");

  const isPassword = input.type === "password";

  // Cambiar tipo de input
  input.type = isPassword ? "text" : "password";

  // Cambiar icono (ojo ↔ ojo con slash)
  icon.classList.toggle("bi-eye", !isPassword);
  icon.classList.toggle("bi-eye-slash", isPassword);
});

// Función de cambio de icono de ojo password (visible- no visible)
function togglePassword(input, icon) {
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('bi-eye-slash');
        icon.classList.add('bi-eye');
    } else {
        input.type = 'password';
        icon.classList.remove('bi-eye');
        icon.classList.add('bi-eye-slash');
    }
}
