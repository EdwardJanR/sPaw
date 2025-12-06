let fecha = flatpickr("#fechaReserva", {
    locale: "es",          
    minDate: "today",      
    maxDate: new Date().fp_incr(90),
    dateFormat: "d-m-Y",  
    altInput: true,       
    altFormat: "F j, Y",  
    allowInput: true
});

//let idCounter = localStorage.getItem('nextId') || 1
function guardarInformacion() {
    let nombreServicio = document.getElementById("nombreServicio").value;
    let nombreMascota = document.getElementById("nombreMascota").value;
    let tamanoMascota = document.getElementById("tamanoMascota").value;
    let nombreGroomer = document.getElementById("nombreGroomer").value;
    let fechaReserva = document.getElementById("fechaReserva").value;
    let horaReserva = document.getElementById("horaReserva").value;    
    
    //console.log(JSON.stringify(infoReservas));
    
    //let listaReservas = JSON.parse(localStorage.getItem("listaReservas")) || [];
    let listaReservas = JSON.parse(localStorage.getItem('listaReservas')) || { contador: 0, items: [] };

    listaReservas.contador++;
    const nuevoId = listaReservas.contador;

    const infoReservas = {
        idReserva: nuevoId,
        nombreServicio: nombreServicio,
        nombreMascota: nombreMascota,
        tamanoMascota: tamanoMascota,
        nombreGroomer: nombreGroomer,
        fechaReserva: fechaReserva,
        horaReserva: horaReserva
    };

    console.log(JSON.stringify(infoReservas));

    listaReservas.items.push(infoReservas);
    
    localStorage.setItem("listaReservas", JSON.stringify(listaReservas));

    //Aleta para el usuario
    mostrarAlerta('Reserva registrada.', 'success');
    mostrarReservas();
}

function mostrarAlerta(mensaje, tipo = 'success') {
    const alertContainer = document.getElementById('alertContainer');
            
    // Crear el elemento de alerta
    const alerta = document.createElement('div');
    alerta.className = `alert alert-${tipo} alert-dismissible fade show`;
    alerta.role = 'alert';
    alerta.innerHTML = `
        <strong>${tipo === 'success' ? '¡Éxito!' : tipo === 'danger' ? '¡Error!' : '¡Atención!'}</strong> ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
            
    // Agregar la alerta al contenedor
    alertContainer.appendChild(alerta);
            
    // Remover la alerta después de 5 segundos
    setTimeout(() => {
        alerta.classList.remove('show');
        setTimeout(() => alerta.remove(), 150);
    }, 5000);
}

function eliminarReserva(idAEliminar){
    let data = JSON.parse(localStorage.getItem("listaReservas"));

    // filtrar los items que NO sean el id a eliminar
    data.items = data.items.filter(item => item.idReserva !== idAEliminar);

    // guardar nuevamente
    localStorage.setItem("listaReservas", JSON.stringify(data));    

    mostrarReservas();
}

function mostrarReservas() {
    const reservas = JSON.parse(localStorage.getItem("listaReservas")) || [];
    const contenedor = document.getElementById("servicio-reservado");
 
    contenedor.innerHTML = "";
 
    reservas.items.forEach(p => {
        const div = document.createElement("div");
        div.className = "agendar d-flex rounded-5 justify-content-center m-3 p-4";
        div.innerHTML = `
            <div class="d-flex flex-column">
                <h2 class="subtitulo mb-2">${p.nombreServicio}</h2>
                <p><b>Nombre de la mascota: </b>${p.nombreMascota}</p>
                <p><b>Tamaño: </b>${p.tamanoMascota}</p>
                <p><b>Groomer escogido: </b>${p.nombreGroomer}</p>
                <p><b>Fecha: </b>${p.fechaReserva}</p>
                <p><b>Hora: </b>${p.horaReserva}</p>
                <p><i class="bi bi-trash" onclick="eliminarReserva(${p.idReserva})"></i></p>
                <a class="boton-login" href="../HTML/servicios.html">Volver a servicios</a>
            </div>
        `;
        contenedor.appendChild(div);
    });

    limpiarFormulario();
}

function limpiarFormulario() {
    document.getElementById("nombreServicio").value = "";
    document.getElementById("nombreMascota").value = "";
    document.getElementById("tamanoMascota").value = "";
    document.getElementById("nombreGroomer").value = "";
    document.getElementById("fechaReserva").value = "";
    fecha.clear();    
    document.getElementById("horaReserva").value = "";    
} 

mostrarReservas();