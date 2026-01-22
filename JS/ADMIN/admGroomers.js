// URL de la API de groomers
const API_URL = 'http://localhost:8080/groomers';

// Array global para guardar los groomers
let todosLosGroomers = [];

// Cuando se cargue la página, listar los groomers
window.addEventListener('DOMContentLoaded', listarGroomers);

async function listarGroomers() {
    const contenedor = document.getElementById('infoGroomers');
    contenedor.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            <p>Cargando groomers...</p>
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
 
        todosLosGroomers = await response.json();
        mostrarGroomers(todosLosGroomers);
       
    } catch (error) {
        console.error('Error al cargar groomers:', error);
        contenedor.innerHTML = `
            <div class="error">
                <h3><i class="bi bi-exclamation-triangle"></i> Error al cargar los datos</h3>
                <p>${error.message}</p>
                <p>Verifica que el backend esté ejecutándose en: ${API_URL}</p>
            </div>
        `;
    }
}

// Función para renderizar los groomers en la tabla
function mostrarGroomers(groomers) {
    const contenedor = document.getElementById("infoGroomers");
    document.getElementById("totalGroomers").textContent = groomers.length;

    if (!groomers || groomers.length === 0) {
        contenedor.innerHTML = `
            <tr>
                <td colspan="5" class="no-data text-center">
                    <i class="bi bi-inbox" style="font-size: 3em; color: #ccc;"></i>
                    <p>No hay groomers registrados</p>
                </td>
            </tr>
        `;
        return;
    }

    contenedor.innerHTML = '';

    groomers.forEach(g => {
        // Detecta cualquier nombre de ID
        const id =
            g.idGroomer ||
            g.id_groomer ||
            g.groomerId ||
            g.groomer_id ||
            g.id ||
            null;

        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td><strong>#${id ?? '-'}</strong></td>
            <td>${g.nombre || '-'} ${g.apellido || ''}</td>
            <td><i class="bi bi-telephone"></i> ${g.telefono || '-'}</td>
            <td><i class="bi bi-envelope"></i> ${g.correo || g.email || '-'}</td>
            <td>
                <div class="action-icons">
                    <i class="bi bi-eye action-icon" title="Ver" onclick="verGroomer(${id})"></i>
                    <i class="bi bi-pencil action-icon" title="Editar" onclick="editarGroomer(${id})"></i>
                    <i class="bi bi-trash action-icon" title="Eliminar" onclick="eliminar(${id})"></i>
                </div>
            </td>
        `;
        contenedor.appendChild(fila);
    });
}

/* Acciones (por ahora de prueba) */
function verGroomer(id) {
    const g = todosLosGroomers.find(x =>
        x.idGroomer == id || x.id == id || x.groomerId == id
    );
    if (g) {
        alert(
            `Groomer #${id}\n\n` +
            `Nombre: ${g.nombre} ${g.apellido}\n` +
            `Teléfono: ${g.telefono}\n` +
            `Email: ${g.correo || g.email}`
        );
    }
}

function editarGroomer(id) {
    alert(`Editar groomer #${id} (pendiente)`);
}

async function eliminar(id) {
    const resultado = await mostrarAlerta('confirmar',
        `¿Estás seguro de que deseas eliminar al groomer <strong>#${id}</strong>?<br>Esta acción no se puede deshacer.`,
        { botonConfirmar: 'Eliminar definitivamente' }
    );
 
    if (resultado && resultado.isConfirmed) {
        try {
            // Obtener el objeto JWT del localStorage
            const jwtData = localStorage.getItem('jwt');
           
            if (!jwtData) {
                mostrarAlerta('error', 'No estás autenticado. Por favor, inicia sesión.');
                return;
            }
           
            // Parsear el JSON y extraer el token
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
                await listarGroomers();
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
 





