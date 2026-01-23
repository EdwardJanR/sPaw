// URL de la API de servicios
const API_URL = 'http://localhost:8080/servicio';

// Array global para guardar los servicios
let todosLosServicios = [];

// Cuando se cargue la página, listar los servicios
window.addEventListener('DOMContentLoaded', listarServicios);

async function listarServicios() {
    const contenedor = document.getElementById('infoServicios');
    contenedor.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            <p>Cargando servicios...</p>
        </div>
    `;
 
    try {
        const headers = {
            'Content-Type': 'application/json'
        };
       
        // Intentar obtener el token si existe
        const jwtData = localStorage.getItem('jwt');
        if (jwtData) {
            try {
                const { token } = JSON.parse(jwtData);
                if (token) {
                    headers['Authorization'] = `Bearer ${token}`;
                }
            } catch (e) {
                console.warn('Error al parsear JWT:', e);
            }
        }
 
        const response = await fetch(API_URL, { headers });
       
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
 
        todosLosServicios = await response.json();
        mostrarServicios(todosLosServicios);
       
    } catch (error) {
        console.error('Error al cargar servicios:', error);
        contenedor.innerHTML = `
            <div class="error">
                <h3><i class="bi bi-exclamation-triangle"></i> Error al cargar los datos</h3>
                <p>${error.message}</p>
                <p>Verifica que el backend esté ejecutándose en: ${API_URL}</p>
            </div>
        `;
    }
}

// Función para renderizar los servicios en la tabla
function mostrarServicios(servicios) {
    const contenedor = document.getElementById("infoServicios");
    document.getElementById("totalServicios").textContent = servicios.length;

    if (!servicios || servicios.length === 0) {
        contenedor.innerHTML = `
            <tr>
                <td colspan="5" class="no-data text-center">
                    <i class="bi bi-inbox" style="font-size: 3em; color: #ccc;"></i>
                    <p>No hay servicios registrados</p>
                </td>
            </tr>
        `;
        return;
    }

    contenedor.innerHTML = '';

    servicios.forEach(g => {
        // Detecta cualquier nombre de ID
        const id =
            g.idServicio ||
            g.nombre ||
            g.descripcion ||
            g.id ||
            null;

        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td><strong>#${id ?? '-'}</strong></td>
            <td>${g.nombre || ''}</td>
            <td>${g.descripcion || '-'}</td>
            <td>${g.precioTamPequeno || '-'}</td>
            <td>${g.precioTamMediano || '-'}</td>
            <td>${g.precioTamGrande || '-'}</td>
            <td>
                <div class="action-icons">
                    <i class="bi bi-pencil action-icon" title="Editar" onclick="editarServicio(${id})"></i>
                    <i class="bi bi-trash action-icon" title="Eliminar" onclick="eliminar(${id})"></i>
                </div>
            </td>
        `;
        contenedor.appendChild(fila);
    });
}

/* Editar servicio - Carga los datos en el formulario */
async function editarServicio(id) {
    const groomer = todosLosServicios.find(g => 
        g.idGroomer == id || g.id == id || g.groomerId == id
    );
    
    if (!groomer) {
        mostrarAlerta('error', 'Groomer no encontrado');
        return;
    }

    // Llenar el formulario con los datos del groomer
    document.getElementById('nombreGroomer').value = groomer.nombre;
    document.getElementById('apellidoGroomer').value = groomer.apellido;
    document.getElementById('telefonoGroomer').value = groomer.telefono;
    document.getElementById('correoGroomer').value = groomer.correo || groomer.email;

    // Guardar ID en el formulario
    const form = document.getElementById('formGroomer');
    form.dataset.id = id;

    // Cambiar interfaz a modo "edición"
    cambiarModoFormulario('edicion');

    // Scroll al formulario
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    document.getElementById('nombreGroomer').focus();
}

/* Cambiar modo del formulario (crear/editar) */
function cambiarModoFormulario(modo) {
    const titulo = document.getElementById('tituloFormulario');
    const btnGuardar = document.getElementById('btnGuardar');
    const btnActualizar = document.getElementById('btnActualizar');
    const btnCancelar = document.getElementById('btnCancelar');

    if (modo === 'edicion') {
        titulo.textContent = 'Editar groomer';
        btnGuardar.style.display = 'none';
        btnActualizar.style.display = 'inline-block';
        btnCancelar.style.display = 'inline-block';
    } else {
        titulo.textContent = 'Ingresar groomer';
        btnGuardar.style.display = 'inline-block';
        btnActualizar.style.display = 'none';
        btnCancelar.style.display = 'none';
    }
}

/* Cancelar edición */
function cancelarEdicion() {
    const form = document.getElementById('formGroomer');
    delete form.dataset.id;
    limpiarFormulario();
    cambiarModoFormulario('crear');
}

/* Confirmar y ejecutar actualización */
async function confirmarActualizacion() {
    const form = document.getElementById('formGroomer');
    const id = form.dataset.id;

    if (!id) {
        mostrarAlerta('error', 'No hay ningún groomer seleccionado para editar');
        return;
    }

    // Validar campos
    limpiarErrores();
    
    const nombre = document.getElementById('nombreGroomer').value.trim();
    const apellido = document.getElementById('apellidoGroomer').value.trim();
    const telefono = document.getElementById('telefonoGroomer').value.trim();
    const correo = document.getElementById('correoGroomer').value.trim();
    
    let esValido = true;
    
    if (!nombre) {
        mostrarAlerta('campo', 'El nombre es obligatorio', { campoId: 'nombreGroomer' });
        esValido = false;
    }
    
    if (!apellido) {
        mostrarAlerta('campo', 'El apellido es obligatorio', { campoId: 'apellidoGroomer' });
        esValido = false;
    }
    
    if (!telefono) {
        mostrarAlerta('campo', 'El teléfono es obligatorio', { campoId: 'telefonoGroomer' });
        esValido = false;
    } else if (telefono.length < 7) {
        mostrarAlerta('campo', 'El teléfono debe tener al menos 7 dígitos', { campoId: 'telefonoGroomer' });
        esValido = false;
    }
    
    if (!correo) {
        mostrarAlerta('campo', 'El correo es obligatorio', { campoId: 'correoGroomer' });
        esValido = false;
    } else if (!validarEmail(correo)) {
        mostrarAlerta('campo', 'El correo no es válido', { campoId: 'correoGroomer' });
        esValido = false;
    }
    
    if (!esValido) return;

    // Confirmar con el usuario
    const resultado = await mostrarAlerta(
        'confirmar',
        `¿Confirmas la actualización del groomer <strong>#${id}</strong>?`,
        { botonConfirmar: 'Actualizar' }
    );

    if (!resultado || !resultado.isConfirmed) return;

    try {
        const jwtData = localStorage.getItem('jwt');
        
        if (!jwtData) {
            mostrarAlerta('error', 'No estás autenticado. Por favor, inicia sesión.');
            return;
        }
        
        const { token } = JSON.parse(jwtData);

        const groomerActualizado = {
            nombre: nombre,
            apellido: apellido,
            telefono: telefono,
            email: correo
        };

        const response = await fetch(`${API_URL}/actualizar/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(groomerActualizado)
        });

        if (response.ok) {
            mostrarAlerta('exito', 'Groomer actualizado correctamente');
            cancelarEdicion(); // Limpia el formulario y vuelve a modo crear
            listarServicios();
        } else if (response.status === 401 || response.status === 403) {
            mostrarAlerta('error', 'No tienes permisos para actualizar groomers o tu sesión ha expirado.');
        } else {
            const msg = await response.text();
            mostrarAlerta('error', `No se pudo actualizar: ${msg || 'Error del servidor'}`);
        }

    } catch (error) {
        console.error(error);
        mostrarAlerta('error', 'Error de conexión con el servidor');
    }
}

/* Eliminar servicio */
async function eliminar(id) {
    const resultado = await mostrarAlerta('confirmar',
        `¿Estás seguro de que deseas eliminar al groomer <strong>#${id}</strong>?<br>Esta acción no se puede deshacer.`,
        { botonConfirmar: 'Eliminar definitivamente' }
    );
 
    if (resultado && resultado.isConfirmed) {
        try {
            const jwtData = localStorage.getItem('jwt');
           
            if (!jwtData) {
                mostrarAlerta('error', 'No estás autenticado. Por favor, inicia sesión.');
                return;
            }
           
            const { token } = JSON.parse(jwtData);
           
            if (!token) {
                mostrarAlerta('error', 'Token no válido. Por favor, inicia sesión nuevamente.');
                return;
            }
 
            const response = await fetch(`${API_URL}/eliminar/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
 
            if (response.ok) {
                mostrarAlerta('exito', 'El groomer ha sido eliminado correctamente.');
                await listarServicios();
            } else if (response.status === 401 || response.status === 403) {
                mostrarAlerta('error', 'No tienes permisos para eliminar groomers o tu sesión ha expirado.');
            } else {
                const mensajeError = await response.text();
                mostrarAlerta('error', `No se pudo eliminar: ${mensajeError || 'Error del servidor'}`);
            }
        } catch (error) {
            console.error('Error al eliminar:', error);
            mostrarAlerta('error', 'Ocurrió un fallo en la conexión con el servidor.');
        }
    }
}

/* Guardar nuevo servicio */
async function guardarInformacion() {
    // Limpiar mensajes de error previos
    limpiarErrores();
    
    // Obtener valores del formulario
    const nombre = document.getElementById('nombreGroomer').value.trim();
    const apellido = document.getElementById('apellidoGroomer').value.trim();
    const telefono = document.getElementById('telefonoGroomer').value.trim();
    const correo = document.getElementById('correoGroomer').value.trim();
    
    // Validaciones
    let esValido = true;
    
    if (!nombre) {
        mostrarAlerta('campo', 'El nombre es obligatorio', { campoId: 'nombreGroomer' });
        esValido = false;
    }
    
    if (!apellido) {
        mostrarAlerta('campo', 'El apellido es obligatorio', { campoId: 'apellidoGroomer' });
        esValido = false;
    }
    
    if (!telefono) {
        mostrarAlerta('campo', 'El teléfono es obligatorio', { campoId: 'telefonoGroomer' });
        esValido = false;
    } else if (telefono.length < 7) {
        mostrarAlerta('campo', 'El teléfono debe tener al menos 7 dígitos', { campoId: 'telefonoGroomer' });
        esValido = false;
    }
    
    if (!correo) {
        mostrarAlerta('campo', 'El correo es obligatorio', { campoId: 'correoGroomer' });
        esValido = false;
    } else if (!validarEmail(correo)) {
        mostrarAlerta('campo', 'El correo no es válido', { campoId: 'correoGroomer' });
        esValido = false;
    }
    
    if (!esValido) return;
    
    // Crear objeto groomer
    const nuevoGroomer = {
        nombre: nombre,
        apellido: apellido,
        telefono: telefono,
        email: correo
    };
    
    try {
        // Obtener token JWT
        const jwtData = localStorage.getItem('jwt');
        
        if (!jwtData) {
            mostrarAlerta('error', 'No estás autenticado. Por favor, inicia sesión.');
            return;
        }
        
        const { token } = JSON.parse(jwtData);
        
        if (!token) {
            mostrarAlerta('error', 'Token no válido. Por favor, inicia sesión nuevamente.');
            return;
        }
        
        // Realizar petición POST
        const response = await fetch(`${API_URL}/crear`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(nuevoGroomer)
        });
        
        if (response.ok) {
            const groomerCreado = await response.json();
            mostrarAlerta('exito', `Groomer <strong>${groomerCreado.nombre} ${groomerCreado.apellido}</strong> creado exitosamente.`);
            
            // Limpiar formulario
            limpiarFormulario();
            
            // Recargar lista de groomers
            await listarServicios();
            
        } else if (response.status === 401 || response.status === 403) {
            mostrarAlerta('error', 'No tienes permisos para crear groomers o tu sesión ha expirado.');
        } else {
            const mensajeError = await response.text();
            mostrarAlerta('error', `No se pudo crear el groomer: ${mensajeError || 'Error del servidor'}`);
        }
        
    } catch (error) {
        console.error('Error al crear groomer:', error);
        mostrarAlerta('error', 'Ocurrió un fallo en la conexión con el servidor.');
    }
}

// Función para limpiar el formulario
function limpiarFormulario() {
    document.getElementById('nombreGroomer').value = '';
    document.getElementById('apellidoGroomer').value = '';
    document.getElementById('telefonoGroomer').value = '';
    document.getElementById('correoGroomer').value = '';
    
    // Eliminar el ID guardado si existe
    const form = document.getElementById('formGroomer');
    delete form.dataset.id;
    
    limpiarErrores();
}

// Función para limpiar mensajes de error
function limpiarErrores() {
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
}

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