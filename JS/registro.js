const API_URL = 'http://localhost:8080';
let contadorMascotas = 1;
const MAX_MASCOTAS = 4;
let sizeBubbleTimeout = null;

const input = document.getElementById("contrasenaUsuario");
const bubble = document.getElementById("passwordBubble");
let timeoutBubble = null;

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

document.addEventListener('DOMContentLoaded', function () {
    const btnRegistro = document.getElementById('btnRegistro');

    if (btnRegistro) {
        btnRegistro.addEventListener('click', async function (e) {
            e.preventDefault();
            await validaciones();
        });
    }
    activarTogglePassword("contrasenaUsuario", "togglePassword1");
    activarTogglePassword("confirmarContraUsuario", "togglePassword2");
});


//Función que activa el icono para revisar el password
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


//Función que realiza las validaciones de la información ingresada en el formulario
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


//Función que deshabilita los mensajes de error en ingreso de datos en formulario
function limpiarValidaciones() {
    document.querySelectorAll('.error-message').forEach(error => error.remove());
    document.querySelectorAll('.is-invalid').forEach(field => field.classList.remove('is-invalid'));
}


//Función para limpiar campos del formulario
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


//Función que cuenta los campos habilitados con datos de la mascota
function contarCamposMascota() {
    let count = 1;
    for (let i = 2; i <= contadorMascotas; i++) {
        if (document.getElementById(`mascotaContainer${i}`)) {
            count++;
        }
    }
    return count;
}


//Función que habilita más campos para ingresar datos de mascota
function agregarCampoMascota() {
    const camposActuales = contarCamposMascota();

    if (camposActuales >= MAX_MASCOTAS) {
        mostrarAlerta('info', `Límite alcanzado:</strong> Solo puedes registrar hasta 4 mascotas.`);
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
            <label for="mascota${contadorMascotas}Usuario">Nombre de tu mascota</label>
        </div>

        <div class="form-floating w-100 w-md-40 m-3">
            <select class="form-select entrada" id="tamanoMascota${contadorMascotas}">
                <option value="" disabled selected>Selecciona tamaño</option>
                <option value="Pequeno">Pequeño</option>
                <option value="Mediano">Mediano</option>
                <option value="Grande">Grande</option>
            </select>
            <label for="tamanoMascota${contadorMascotas}">Tamaño</label>
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


//Función que elimina un campos para ingresar datos de mascota
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


//Función que valida la información ingresada en los campos del formulario
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
            const mascotasGuardadas = await guardarMascotasParaUsuario(usuarioId);
            mostrarAlerta('exito', `Usuario <strong>${nombreUsuario} ${apellidosUsuario}</strong> creado exitosamente.<br>Email: <strong>${correoUsuario}</strong>.<br>Mascotas registradas: <strong>${mascotasGuardadas}</strong`);
        } else {
            mostrarAlerta('exito', `Usuario <strong>${nombreUsuario} ${apellidosUsuario}</strong> creado exitosamente.<br>Email: <strong>${correoUsuario}</strong>.<br>Mascotas registradas: <strong>${mascotasGuardadas}</strong`);
        }

        limpiarFormulario();

        setTimeout(() => {
            window.location.href = "../HTML/inicioSesion.html";
        }, 2000);

    } catch (error) {
        console.error('Error en el registro:', error);
        mostrarAlerta('error', `<strong>Error de registro:</strong> ${error.message}`);

        btnRegistro.disabled = false;
        btnRegistro.innerHTML = textoOriginal;
    }

    return true;
}


//Función para activar la ventana de alerta
function mostrarAlerta(tipo, mensaje, opciones = {}) {
    if (opciones.campoId) {
        const field = document.getElementById(opciones.campoId);
        if (!field) return;
        const formFloating = field.closest('.form-floating');
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message text-danger mt-1 small';
        errorElement.textContent = mensaje;
        formFloating.appendChild(errorElement);
        field.classList.add('is-invalid');
        return;
    }

    if (tipo === 'confirmar') {
        return Swal.fire({
            icon: 'warning',
            title: '¿Confirmar?',
            html: mensaje,
            showCancelButton: true,
            confirmButtonColor: '#e97502',
            cancelButtonColor: '#2ab7ae',
            confirmButtonText: opciones.botonConfirmar || 'Sí',
            cancelButtonText: 'Cancelar'
        });
    }

    const config = {
        html: mensaje,
        confirmButtonColor: '#e97502'
    };

    if (tipo === 'exito') {
        config.icon = 'success';
        config.title = '¡Éxito!';
        config.timer = opciones.duracion || 2000;
        config.showConfirmButton = false;
        config.timerProgressBar = true;
    } else if (tipo === 'error') {
        config.icon = 'error';
        config.title = 'Error';
        config.confirmButtonText = 'Entendido';
    } else if (tipo === 'info') {
        config.icon = 'info';
        config.title = 'Información';
    }

    if (opciones.titulo) config.title = opciones.titulo;

    Swal.fire(config);
}


//Función que registra usuario en backend
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


//Función que obtiene el id del usuario por su email registrado
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


//Función que guarda la mascota obligatoria para el usuario
async function guardarMascotaParaUsuario(usuarioId, nombreMascota, tamanoMascota) {
    const mascotaData = {
        nombreMascota,
        tamanoMascota
    };

    const response = await fetch(`${API_URL}/usuarios/${usuarioId}/mascotas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mascotaData)
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
    }

    return await response.json();
}


//Funcipón que guarda las mascotas opciones del usuario
async function guardarMascotasParaUsuario(usuarioId) {
    let mascotasGuardadas = 0;
    const mascotas = [];

    for (let i = 1; i <= contadorMascotas; i++) {
        const nombreInput = document.getElementById(`mascota${i}Usuario`);
        const tamanoSelect = document.getElementById(`tamanoMascota${i}`);

        if (nombreInput && tamanoSelect) {
            const nombreMascota = nombreInput.value.trim();
            const tamanoMascota = tamanoSelect.value;

            if (nombreMascota.length > 0 && tamanoMascota) {
                mascotas.push({ nombreMascota, tamanoMascota });
            }
        }
    }

    console.log(`Guardando ${mascotas.length} mascotas para usuario ID:`, usuarioId);

    for (const mascota of mascotas) {
        try {
            const resultado = await guardarMascotaParaUsuario(
                usuarioId,
                mascota.nombreMascota,
                mascota.tamanoMascota
            );

            if (resultado) {
                mascotasGuardadas++;
                console.log(`Mascota guardada: ${mascota.nombreMascota}`);
            }
        } catch (error) {
            console.error(`Error guardando mascota ${mascota.nombreMascota}:`, error);
        }
    }

    console.log(`Total mascotas guardadas: ${mascotasGuardadas}`);
    return mascotasGuardadas;
}


//Función que activa el bubble para especificar el rango de tamaños
function toggleSizeBubble(bubbleId) {
    const bubble = document.getElementById(bubbleId);
    if (!bubble) return;

    const isVisible = bubble.style.display === "block";

    // Ocultar cualquier bubble abierta
    document.querySelectorAll(".size-bubble").forEach(b => b.style.display = "none");

    if (sizeBubbleTimeout) {
        clearTimeout(sizeBubbleTimeout);
    }

    if (!isVisible) {
        bubble.style.display = "block";

        sizeBubbleTimeout = setTimeout(() => {
            bubble.style.display = "none";
        }, 10000);
    }
}

// Cerrar al hacer click fuera
document.addEventListener("click", (e) => {
    if (!e.target.classList.contains("size-info-icon")) {
        document.querySelectorAll(".size-bubble").forEach(b => b.style.display = "none");
    }
});
