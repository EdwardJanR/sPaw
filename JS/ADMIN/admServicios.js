// URL de la API de servicios
const API_URL = 'http://localhost:8080/servicio';

// Array global para guardar los servicios
let todosLosServicios = [];

// Cuando se cargue la página, listar los servicios
window.addEventListener('DOMContentLoaded', () => {
    listarServicios();
    inicializarFormateoPrecios();
});

// ✅ FUNCIÓN PARA FORMATEAR PRECIOS EN TIEMPO REAL
function inicializarFormateoPrecios() {
    const camposPrecios = ['precioPequeno', 'precioMediano', 'precioGrande'];
    
    camposPrecios.forEach(campoId => {
        const input = document.getElementById(campoId);
        
        // ✅ FUNCIÓN AUXILIAR PARA FORMATEAR
        const formatearValor = (valor) => {
            // Remover todo excepto números
            valor = valor.replace(/\D/g, '');
            
            if (!valor) {
                return '';
            }
            
            const numero = parseInt(valor);
            return new Intl.NumberFormat('es-CO').format(numero);
        };
        
        // Evento para formatear mientras se escribe
        input.addEventListener('input', function(e) {
            e.target.value = formatearValor(e.target.value);
        });
        
        // ✅ AGREGADO: Evento change para capturar autocompletado del navegador
        input.addEventListener('change', function(e) {
            e.target.value = formatearValor(e.target.value);
        });
        
        // ✅ AGREGADO: Detectar autocompletado del navegador con animationstart
        input.addEventListener('animationstart', function(e) {
            if (e.animationName === 'onAutoFillStart') {
                setTimeout(() => {
                    e.target.value = formatearValor(e.target.value);
                }, 100);
            }
        });
        
        // Evento para quitar formato al hacer foco (para editar más fácil)
        input.addEventListener('focus', function(e) {
            let valor = e.target.value;
            // Remover puntos para edición
            valor = valor.replace(/\./g, '');
            e.target.value = valor;
        });
        
        // Evento para volver a formatear al perder el foco
        input.addEventListener('blur', function(e) {
            e.target.value = formatearValor(e.target.value);
        });
    });
}

// ✅ FUNCIÓN AUXILIAR PARA OBTENER VALOR NUMÉRICO DE UN INPUT FORMATEADO
function obtenerValorNumerico(inputId) {
    const valor = document.getElementById(inputId).value;
    // Remover puntos y convertir a número
    return valor.replace(/\./g, '');
}

async function listarServicios() {
    const contenedor = document.getElementById('infoServicios');
    contenedor.innerHTML = `
        <tr>
            <td colspan="7" class="text-center">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Cargando...</span>
                </div>
                <p class="mt-2">Cargando servicios...</p>
            </td>
        </tr>
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
        
        // 🔍 DEBUG: Ver qué está devolviendo el backend
        console.log('Servicios recibidos:', todosLosServicios);
        if (todosLosServicios.length > 0) {
            console.log('Primer servicio:', todosLosServicios[0]);
            console.log('Imagen del primer servicio:', todosLosServicios[0].imagen);
        }
        
        mostrarServicios(todosLosServicios);
       
    } catch (error) {
        console.error('Error al cargar servicios:', error);
        contenedor.innerHTML = `
            <tr>
                <td colspan="7" class="text-center text-danger">
                    <i class="bi bi-exclamation-triangle fs-1"></i>
                    <p class="mt-2">Error al cargar los datos</p>
                    <p>${error.message}</p>
                    <p>Verifica que el backend esté ejecutándose en: ${API_URL}</p>
                </td>
            </tr>
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
                <td colspan="8" class="text-center">
                    <i class="bi bi-inbox fs-1 text-muted"></i>
                    <p class="mt-2">No hay servicios registrados</p>
                </td>
            </tr>
        `;
        return;
    }

    contenedor.innerHTML = '';

    servicios.forEach(s => {
        const id = s.idServicio || s.id;

        // Manejar la imagen que viene como string base64
        let imagenSrc = ''; 
        if (s.imagen && s.imagen.length > 0) {
            // Detectar si es string (base64) o array de bytes
            if (typeof s.imagen === 'string') {
                // Ya viene como base64 string del backend
                let tipoImagen = 'jpeg';
                if (s.imagen.startsWith('iVBORw0KGgo')) tipoImagen = 'png';
                else if (s.imagen.startsWith('R0lGOD')) tipoImagen = 'gif';
                else if (s.imagen.startsWith('UklGR')) tipoImagen = 'webp';
                
                imagenSrc = `data:image/${tipoImagen};base64,${s.imagen}`;
            } else if (Array.isArray(s.imagen)) {
                // Si viene como array de bytes, convertir a base64
                const base64String = btoa(
                    new Uint8Array(s.imagen).reduce((data, byte) => data + String.fromCharCode(byte), '')
                );
                imagenSrc = `data:image/jpeg;base64,${base64String}`;
            }
        }

        // Formatear precios con separadores de miles y decimales
        const formatearPrecio = (precio) => {
            if (!precio && precio !== 0) return '-';
            return new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(precio);
        };

        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td><strong>#${id ?? '-'}</strong></td>
            <td>
                ${imagenSrc 
                    ? `<img src="${imagenSrc}" alt="${s.nombre}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px; cursor: pointer;" onclick="verImagenGrande('${imagenSrc}', '${s.nombre}')">` 
                    : '<i class="bi bi-image text-muted fs-3"></i>'}
            </td>
            <td>${s.nombre || ''}</td>
            <td>${s.descripcion || '-'}</td>
            <td>${formatearPrecio(s.precioTamPequeno)}</td>
            <td>${formatearPrecio(s.precioTamMediano)}</td>
            <td>${formatearPrecio(s.precioTamGrande)}</td>
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

// Función para ver imagen en grande
function verImagenGrande(imagenSrc, nombre) {
    Swal.fire({
        title: nombre,
        imageUrl: imagenSrc,
        imageAlt: nombre,
        imageWidth: 400,
        imageHeight: 400,
        confirmButtonColor: '#e97502',
        confirmButtonText: 'Cerrar'
    });
}

// ✅ FUNCIÓN PARA GUARDAR SERVICIO CON IMAGEN
async function guardarServicio() {
    const form = document.getElementById('formServicios');

    const nombre = document.getElementById('nombreServicio').value.trim();
    const descripcion = document.getElementById('descripcionServicio').value.trim();
    
    // Obtener valores numéricos sin formato
    const precioTamPequeno = obtenerValorNumerico('precioPequeno');
    const precioTamMediano = obtenerValorNumerico('precioMediano');
    const precioTamGrande = obtenerValorNumerico('precioGrande');
    
    const archivoImagen = document.getElementById('imgServicio').files[0];

    if (!nombre || !descripcion || !precioTamPequeno || !precioTamMediano || !precioTamGrande) {
        mostrarAlerta('error', 'Todos los campos son obligatorios');
        return;
    }

    const jwtData = localStorage.getItem('jwt');
    if (!jwtData) {
        mostrarAlerta('error', 'Debes iniciar sesión');
        return;
    }
    const { token } = JSON.parse(jwtData);

    // Validar tamaño de imagen (máximo 5MB)
    if (archivoImagen && archivoImagen.size > 5 * 1024 * 1024) {
        mostrarAlerta('error', 'La imagen es demasiado grande. Máximo 5MB');
        return;
    }

    // 🔥 IMPORTANTE: Usar FormData para enviar archivos
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    formData.append('precioTamPequeno', precioTamPequeno);
    formData.append('precioTamMediano', precioTamMediano);
    formData.append('precioTamGrande', precioTamGrande);
    
    // Solo agregar imagen si se seleccionó
    if (archivoImagen) {
        console.log('Archivo seleccionado:', archivoImagen.name, 'Tipo:', archivoImagen.type, 'Tamaño:', archivoImagen.size);
        formData.append('imagen', archivoImagen);
    }

    try {
        const response = await fetch(`${API_URL}/crearConImagen`, {
            method: 'POST',
            headers: { 
                'Authorization': `Bearer ${token}`
                // ⚠️ NO incluir 'Content-Type' cuando usas FormData
            },
            body: formData
        });

        if (!response.ok) {
            if (response.status === 403) {
                mostrarAlerta('error', 'Sesión expirada. Por favor vuelve a iniciar sesión');
                setTimeout(() => {
                    // Redirigir al login o limpiar sesión
                    localStorage.removeItem('jwt');
                    window.location.reload();
                }, 2000);
                return;
            }
            const errorText = await response.text();
            throw new Error(errorText || `Error ${response.status}`);
        }

        mostrarAlerta('exito', 'Servicio creado correctamente');
        form.reset();
        listarServicios();

    } catch (error) {
        console.error('Error al guardar:', error);
        mostrarAlerta('error', 'Error al crear servicio: ' + error.message);
    }
}

// ✅ FUNCIÓN PARA EDITAR SERVICIO
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

        // Llenar el formulario con valores formateados
        document.getElementById('nombreServicio').value = servicio.nombre;
        document.getElementById('descripcionServicio').value = servicio.descripcion;
        
        // Formatear los precios al cargar en el formulario
        const formatearParaInput = (precio) => {
            if (!precio && precio !== 0) return '';
            return new Intl.NumberFormat('es-CO').format(precio);
        };
        
        document.getElementById('precioPequeno').value = formatearParaInput(servicio.precioTamPequeno);
        document.getElementById('precioMediano').value = formatearParaInput(servicio.precioTamMediano);
        document.getElementById('precioGrande').value = formatearParaInput(servicio.precioTamGrande);

        const form = document.getElementById('formServicios');
        form.dataset.editando = servicio.idServicio;

        // Cambiar a modo edición
        cambiarModoFormulario('edicion');

        // Scroll suave hasta el formulario
        document.getElementById('tituloFormulario').scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });

    } catch (error) {
        mostrarAlerta('error', error.message);
    }
}

// ✅ FUNCIÓN PARA ACTUALIZAR SERVICIO (CORREGIDA)
async function confirmarActualizacion() {
    const form = document.getElementById('formServicios');
    const idServicio = form.dataset.editando;

    if (!idServicio) {
        mostrarAlerta('error', 'No hay servicio seleccionado para actualizar');
        return;
    }

    const nombre = document.getElementById('nombreServicio').value.trim();
    const descripcion = document.getElementById('descripcionServicio').value.trim();
    
    // Obtener valores numéricos sin formato
    const precioTamPequeno = obtenerValorNumerico('precioPequeno');
    const precioTamMediano = obtenerValorNumerico('precioMediano');
    const precioTamGrande = obtenerValorNumerico('precioGrande');
    
    const archivoImagen = document.getElementById('imgServicio').files[0];

    if (!nombre || !descripcion || !precioTamPequeno || !precioTamMediano || !precioTamGrande) {
        mostrarAlerta('error', 'Todos los campos son obligatorios');
        return;
    }

    const jwtData = localStorage.getItem('jwt');
    if (!jwtData) {
        mostrarAlerta('error', 'Debes iniciar sesión');
        return;
    }

    const { token } = JSON.parse(jwtData);

    // 🔥 CAMBIO IMPORTANTE: Usar FormData en lugar de JSON
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    formData.append('precioTamPequeno', precioTamPequeno);
    formData.append('precioTamMediano', precioTamMediano);
    formData.append('precioTamGrande', precioTamGrande);
    
    // Solo agregar imagen si se seleccionó una nueva
    if (archivoImagen) {
        formData.append('imagen', archivoImagen);
    }

    try {
        // 🔥 CAMBIO IMPORTANTE: Usar endpoint /actualizarConImagen
        const response = await fetch(`${API_URL}/actualizarConImagen/${idServicio}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
                // ⚠️ NO incluir 'Content-Type' cuando usas FormData
            },
            body: formData
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        }

        mostrarAlerta('exito', 'Servicio actualizado correctamente');
        
        form.reset();
        delete form.dataset.editando;
        cambiarModoFormulario('crear');
        listarServicios();

    } catch (error) {
        console.error('Error al actualizar:', error);
        mostrarAlerta('error', 'Error al actualizar: ' + error.message);
    }
}

// ✅ FUNCIÓN PARA CANCELAR EDICIÓN
function cancelarEdicion() {
    const form = document.getElementById('formServicios');
    form.reset();
    delete form.dataset.editando;
    cambiarModoFormulario('crear');
}

// Cambiar modo del formulario (crear/editar)
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

// ✅ FUNCIÓN PARA ELIMINAR SERVICIO
async function eliminarServicio(idServicio, nombreServicio) {
    // Confirmación antes de eliminar
    const confirmacion = await mostrarAlerta(
        'confirmar',
        `¿Estás seguro de eliminar el servicio <b>${nombreServicio}</b>?<br>
        <small>Esta acción no se puede deshacer.</small>`,
        { botonConfirmar: 'Eliminar' }
    );

    if (!confirmacion.isConfirmed) return;

    // Obtener JWT
    const jwtData = localStorage.getItem('jwt');
    if (!jwtData) {
        mostrarAlerta('error', 'Debes iniciar sesión para eliminar servicios');
        return;
    }

    const { token } = JSON.parse(jwtData);

    try {
        const response = await fetch(`${API_URL}/eliminar/${idServicio}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        }

        // Éxito
        mostrarAlerta(
            'exito',
            `El servicio <b>${nombreServicio}</b> fue eliminado correctamente`
        );

        // Recargar tabla
        listarServicios();

    } catch (error) {
        console.error('Error al eliminar:', error);
        mostrarAlerta(
            'error',
            error.message || 'No se pudo eliminar el servicio'
        );
    }
}

// ✅ FUNCIÓN PARA MOSTRAR ALERTAS
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