// URL de la API de groomers
const API_URL = 'http://localhost:8080/groomers';

// Array global para guardar los groomers
let todosLosGroomers = [];

// Cuando se cargue la página, listar los groomers
window.addEventListener('DOMContentLoaded', listarGroomers);

// // Función para obtener los groomers desde el backend
// async function listarGroomers() {
//     const contenedor = document.getElementById("infoGroomers");
//     contenedor.innerHTML = `
//         <tr>
//             <td colspan="5" class="loading text-center">
//                 <p>Cargando groomers...</p>
//             </td>
//         </tr>
//     `;

/*    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

        //  todosLosGroomers = await response.json();
        console.log("Primer groomer:", todosLosGroomers[0]); // 👈 mira aquí el id real
        mostrarGroomers(todosLosGroomers);

    } catch (error) {
        console.error('Error al cargar groomers:', error);
        contenedor.innerHTML = `
            <tr>
                <td colspan="5" class="error text-center">
                    <h3><i class="bi bi-exclamation-triangle"></i> Error al cargar los datos</h3>
                    <p>${error.message}</p>
                    <p>Verifica que el backend esté ejecutándose en: ${API_URL}</p>
                </td>
            </tr>
        `;
    }
}*/

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
                    <i class="bi bi-trash action-icon" title="Eliminar" onclick="eliminarGroomer(${id})"></i>
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

function eliminarGroomer(id) {
    if (confirm(`¿Eliminar groomer #${id}?`)) {
        alert(`Eliminar groomer #${id} (pendiente)`);
    }
}





