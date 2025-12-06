let idCounter = localStorage.getItem('nextId') || 1

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
            
    actualizarReservas();
}

function actualizarReservas() {
    const reservas = JSON.parse(localStorage.getItem("listaReservas")) || [];
    const contenedor = document.getElementById("reservas");

    contenedor.innerHTML = "";

    reservas.items.forEach(p => {
        const div = document.createElement("div");
        //div.className = "card-servicio-basico col-12 col-xl-5 d-flex rounded-5 justify-content-center my-3 p-4";
        div.innerHTML = `
            <thead>
                <th>
                    <tr>${p.idReserva}</tr>
                    <tr>${p.nombreServicio}</tr>
                    <tr>${p.nombreMascota}</tr>
                    <tr>${p.tamanoMascota}</tr>
                    <tr>${p.nombreGroomer}</tr>
                    <tr>${p.fechaReserva}</tr>
                    <tr>${p.horaReserva}</tr>
                    <tr><button type="button" onclick="eliminarReserva(${p.idReserva});">Eliminar</button></tr>
                </th>
            </thead>
        `;
        contenedor.appendChild(div);
    });
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

    actualizarReservas();    
}

actualizarReservas();