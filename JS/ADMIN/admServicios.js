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
                <td colspan="7" class="no-data text-center">
                    <i class="bi bi-inbox" style="font-size: 3em; color: #ccc;"></i>
                    <p>No hay servicios registrados</p>
                </td>
            </tr>
        `;
        return;
    }

    contenedor.innerHTML = '';

    servicios.forEach(s => {
        const id = s.idServicio || s.id;

        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td><strong>#${id ?? '-'}</strong></td>
            <td>${s.nombre || ''}</td>
            <td>${s.descripcion || '-'}</td>
            <td>$${s.precioTamPequeno || '-'}</td>
            <td>$${s.precioTamMediano || '-'}</td>
            <td>$${s.precioTamGrande || '-'}</td>
            <td>
                <div class="action-icons">
                    <i class="bi bi-pencil action-icon" title="Editar" onclick="editarServicio(${id})"></i>
                    <i class="bi bi-trash action-icon" title="Eliminar" onclick="eliminarServicio(${id}, '${s.nombre}')"></i>
                </div>
            </td>
        `;
        contenedor.appendChild(fila);
    });
}


async function guardarServicio() {
    const form = document.getElementById('formServicios');
    const idServicio = form.dataset.editando;

    const nombre = document.getElementById('nombreServicio').value.trim();
    const descripcion = document.getElementById('descripcionServicio').value.trim();
    const precioTamPequeno = document.getElementById('precioPequeno').value;
    const precioTamMediano = document.getElementById('precioMediano').value;
    const precioTamGrande = document.getElementById('precioGrande').value;

    if (!nombre || !descripcion || !precioTamPequeno || !precioTamMediano || !precioTamGrande) {
        mostrarAlerta('error', 'Todos los campos son obligatorios');
        return;
    }

    const servicio = {
        nombre,
        descripcion,
        precioTamPequeno: Number(precioTamPequeno),
        precioTamMediano: Number(precioTamMediano),
        precioTamGrande: Number(precioTamGrande)
    };

    const jwtData = localStorage.getItem('jwt');
    if (!jwtData) {
        mostrarAlerta('error', 'Debes iniciar sesión');
        return;
    }

    const { token } = JSON.parse(jwtData);

    const url = idServicio
        ? `${API_URL}/actualizar/${idServicio}`
        : `${API_URL}/crear`;

    const method = idServicio ? 'PUT' : 'POST';

    try {
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(servicio)
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }

        mostrarAlerta(
            'exito',
            idServicio
                ? 'Servicio actualizado correctamente'
                : 'Servicio creado correctamente'
        );

        form.reset();
        delete form.dataset.editando;
        listarServicios();

    } catch (error) {
        console.error(error);
        mostrarAlerta('error', error.message);
    }
}


async function editarServicio(id) {
    try {
        const jwtData = localStorage.getItem('jwt');
        const headers = { 'Content-Type': 'application/json' };

        if (jwtData) {
            const { token } = JSON.parse(jwtData);
            if (token) headers.Authorization = `Bearer ${token}`;
        }

        const response = await fetch(`${API_URL}/${id}`, { headers });
        if (!response.ok) throw new Error('Servicio no encontrado');

        const servicio = await response.json();

        document.getElementById('nombreServicio').value = servicio.nombre;
        document.getElementById('descripcionServicio').value = servicio.descripcion;
        document.getElementById('precioPequeno').value = servicio.precioTamPequeno;
        document.getElementById('precioMediano').value = servicio.precioTamMediano;
        document.getElementById('precioGrande').value = servicio.precioTamGrande;

        const form = document.getElementById('formServicios');
        form.dataset.editando = servicio.idServicio;

        // 🔄 Cambiar a modo edición
        cambiarModoFormulario('edicion');

        // 🎯 Foco automático en el nombre
        const inputNombre = document.getElementById('nombreServicio');
        inputNombre.focus();

        // 📍 Scroll suave hasta el campo
        inputNombre.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });

    } catch (error) {
        mostrarAlerta('error', error.message);
    }
}


/* Cambiar modo del formulario (crear/editar) */
function cambiarModoFormulario(modo) {
    const titulo = document.getElementById('tituloFormulario');
    const btnGuardar = document.getElementById('btnGuardar');
    const btnActualizar = document.getElementById('btnActualizar');
    const btnCancelar = document.getElementById('btnCancelar');

    if (modo === 'edicion') {
        titulo.textContent = 'Editar servicio';
        btnGuardar.style.display = 'none';
        btnActualizar.style.display = 'inline-block';
        btnCancelar.style.display = 'inline-block';
    } else {
        titulo.textContent = 'Ingresar servicio';
        btnGuardar.style.display = 'inline-block';
        btnActualizar.style.display = 'none';
        btnCancelar.style.display = 'none';
    }
}

async function eliminarServicio(idServicio, nombreServicio) {

    // 🔴 Confirmación antes de eliminar
    const confirmacion = await mostrarAlerta(
        'confirmar',
        `¿Estás seguro de eliminar el servicio <b>${nombreServicio}</b>?<br>
        <small>Esta acción no se puede deshacer.</small>`,
        { botonConfirmar: 'Eliminar' }
    );

    if (!confirmacion.isConfirmed) return;

    // 🔐 Obtener JWT
    const jwtData = localStorage.getItem('jwt');
    if (!jwtData) {
        mostrarAlerta('error', 'Debes iniciar sesión para eliminar servicios');
        return;
    }

    const { token } = JSON.parse(jwtData);

    try {
        const response = await fetch(
            `${API_URL}/eliminar/${idServicio}`,
            {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        if (!response.ok) {
            throw new Error(await response.text());
        }

        //Éxito
        mostrarAlerta(
            'exito',
            `El servicio <b>${nombreServicio}</b> fue eliminado correctamente`
        );

        //Recargar tabla
        listarServicios();

    } catch (error) {
        console.error(error);
        mostrarAlerta(
            'error',
            error.message || 'No se pudo eliminar el servicio'
        );
    }
}


function mostrarAlerta(tipo, mensaje, opciones = {}) {
    if (opciones.campoId) {
        const field = document.getElementById(opciones.campoId);
        if (!field) return;
        const formFloating = field.closest('.form-floating') || field.parentElement;
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