// URL del backend - ajusta según tu configuración
const API_URL = 'http://localhost:8080/usuarios';

let todosLosUsuarios = [];

// Cargar usuarios al iniciar la página
window.addEventListener('DOMContentLoaded', cargarUsuarios);

async function cargarUsuarios() {
    const contenedor = document.getElementById('contenedor');
    contenedor.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            <p>Cargando usuarios...</p>
        </div>
    `;

    try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        todosLosUsuarios = await response.json();
        mostrarUsuarios(todosLosUsuarios);
        
    } catch (error) {
        console.error('Error al cargar usuarios:', error);
        contenedor.innerHTML = `
            <div class="error">
                <h3><i class="bi bi-exclamation-triangle"></i> Error al cargar los datos</h3>
                <p>${error.message}</p>
                <p>Verifica que el backend esté ejecutándose en: ${API_URL}</p>
            </div>
        `;
    }
}

function mostrarUsuarios(usuarios) {
    const contenedor = document.getElementById('contenedor');
    document.getElementById('totalUsuarios').textContent = usuarios.length;

    if (usuarios.length === 0) {
        contenedor.innerHTML = `
            <div class="no-data">
                <i class="bi bi-inbox" style="font-size: 3em; color: #ccc;"></i>
                <p>No se encontraron usuarios</p>
            </div>
        `;
        return;
    }

    const tablaHTML = `
        <div class="table-container">
            <table class="custom-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre Completo</th>
                        <th>Teléfono</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>Mascotas</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    ${usuarios.map(usuario => `
                        <tr>
                            <td><strong>#${usuario.idUsuario}</strong></td>
                            <td>${usuario.nombre} ${usuario.apellido}</td>
                            <td>
                                <i class="bi bi-telephone"></i> ${usuario.telefono}
                            </td>
                            <td>
                                <i class="bi bi-envelope"></i> ${usuario.email}
                            </td>
                            <td>
                                <span class="badge-rol rol-${usuario.rol.toLowerCase()}">
                                    ${usuario.rol}
                                </span>
                            </td>
                            <td>
                                ${usuario.mascotas && usuario.mascotas.length > 0 
                                    ? `<i class="bi bi-heart-fill" style="color: #2AB7AE;"></i> ${usuario.mascotas.length}` 
                                    : '<span style="color: #999;">Sin mascotas</span>'}
                            </td>
                            <td>
                                <div class="action-icons">
                                    <i class="bi bi-eye action-icon" title="Ver detalles" onclick="verDetalle(${usuario.idUsuario})"></i>
                                    <i class="bi bi-pencil action-icon" title="Editar" onclick="editar(${usuario.idUsuario})"></i>
                                    <i class="bi bi-trash action-icon" title="Eliminar" onclick="eliminar(${usuario.idUsuario})"></i>
                                </div>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;

    contenedor.innerHTML = tablaHTML;
}

function filtrarPorRol() {
    const rolSeleccionado = document.getElementById('filtroRol').value;
    
    if (rolSeleccionado === '') {
        mostrarUsuarios(todosLosUsuarios);
    } else {
        const usuariosFiltrados = todosLosUsuarios.filter(
            usuario => usuario.rol === rolSeleccionado
        );
        mostrarUsuarios(usuariosFiltrados);
    }
}

// Funciones de acción (puedes personalizarlas según tus necesidades)
function verDetalle(id) {
    const usuario = todosLosUsuarios.find(u => u.idUsuario === id);
    if (usuario) {
        let detalles = `Detalles del Usuario #${id}\n\n`;
        detalles += `Nombre: ${usuario.nombre} ${usuario.apellido}\n`;
        detalles += `Teléfono: ${usuario.telefono}\n`;
        detalles += `Email: ${usuario.email}\n`;
        detalles += `Rol: ${usuario.rol}\n`;
        if (usuario.mascotas && usuario.mascotas.length > 0) {
            detalles += `\nMascotas:\n`;
            usuario.mascotas.forEach(m => {
                detalles += `- ${m.nombre || 'Sin nombre'}\n`;
            });
        }
        alert(detalles);
    }
}

function editar(id) {
    alert(`Editar usuario #${id} - Funcionalidad por implementar`);
}

function eliminar(id) {
    if (confirm(`¿Está seguro de eliminar el usuario #${id}?`)) {
        alert(`Eliminando usuario #${id} - Funcionalidad por implementar`);
    }
}