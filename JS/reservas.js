let picker = flatpickr("#fechaReserva", {
    locale: "es",
    minDate: "today",
    maxDate: new Date().fp_incr(90),
    dateFormat: "d-m-Y",
    altInput: false,
    allowInput: false,
    disableMobile: false,


    onChange: function (selectedDates, dateStr, instance) {

        document.getElementById('fechaReserva').dispatchEvent(new Event('input'));
        document.getElementById('fechaReserva').dispatchEvent(new Event('change'));
    }
});


function validarInfoReserva() {

    limpiarVal();
    const nombreMascota = document.getElementById('nombreMascota').value.trim();
    const tamanoMascota = document.getElementById('tamanoMascota').value.trim();
    const nombreGroomer = document.getElementById('nombreGroomer').value.trim();
    const nombreServicio = document.getElementById('nombreServicio').value.trim();
    const fechaReserva = document.getElementById('fechaReserva').value.trim();
    const horaReserva = document.getElementById('horaReserva').value.trim();

    if (nombreMascota.length < 2 || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombreMascota)) {
        mostrarVal('nombreMascota', 'El nombre de la mascota debe ser alfabético y mínimo dos caracteres');
        return false;
    }
    if (tamanoMascota === "") {
        mostrarVal('tamanoMascota', 'Por favor selecciona el tamaño de la mascota');
        return false;
    }
    if (nombreGroomer === "") {
        mostrarVal('nombreGroomer', 'Por favor selecciona un groomer');
        return false;
    }
    if (nombreServicio === "") {
        mostrarVal('nombreServicio', 'Por favor selecciona un servicio');
        return false;
    }
    if (fechaReserva === "") {
        mostrarVal('fechaReserva', 'Por favor selecciona una fecha para la reserva');
        return false;
    }

    if (horaReserva < "08:00" || horaReserva > "18:00" || horaReserva === "") {
        mostrarVal('horaReserva', 'Debe seleccionar una hora entre 08:00 AM y 06:00 PM');
        return false;
    }

    mostrarAlerta('success', '<strong>¡Éxito!</strong> Todos los campos son válidos. Enviando formulario...');
            
    setTimeout(() => {
        document.getElementById('formContactenos').submit();
    }, 1500); 

    guardarInformacion();
    return true;
}

function mostrarVal(id, mensaje) {
    const field = document.getElementById(id);
    const formFloating = field.closest('.form-floating');

    const errorElement = document.createElement('div');
    errorElement.className = 'error-message text-danger mt-1 small';
    errorElement.textContent = mensaje;

    formFloating.appendChild(errorElement);

    field.classList.add('is-invalid');
}

function limpiarVal() {

    document.querySelectorAll('.error-message').forEach(error => error.remove());
    document.querySelectorAll('.is-invalid').forEach(field => field.classList.remove('is-invalid'));
}


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
    limpiarFormulario();
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

function eliminarReserva(idAEliminar) {
    let data = JSON.parse(localStorage.getItem("listaReservas"));

    // filtrar los items que NO sean el id a eliminar
    data.items = data.items.filter(item => item.idReserva !== idAEliminar);

    // guardar nuevamente
    localStorage.setItem("listaReservas", JSON.stringify(data));

    mostrarReservas();
}

function mostrarReservas() {
    const data = JSON.parse(localStorage.getItem("listaReservas")) || { contador: 0, items: [] };
    const contenedor = document.getElementById("servicio-reservado");

    contenedor.innerHTML = "";

    data.items.forEach(p => {
        const div = document.createElement("div");
        div.className = "agendar col-12 col-xl-5 rounded-4 justify-content-center m-2 py-5";
        div.innerHTML = `
            <div>
                <h2 class="subtitulo mb-2">${p.nombreServicio}</h2>
                <p><b>Nombre de la mascota:</b> ${p.nombreMascota}</p>
                <p><b>Tamaño:</b> ${p.tamanoMascota}</p>
                <p><b>Groomer escogido:</b> ${p.nombreGroomer}</p>
                <p><b>Fecha:</b> ${p.fechaReserva}</p>
                <p><b>Hora:</b> ${p.horaReserva}</p>
                <p><i class="bi bi-trash" onclick="eliminarReserva(${p.idReserva})"></i></p>
                <a class="boton-login" href="../HTML/servicios.html">Volver a servicios</a>
            </div>
        `;
        contenedor.appendChild(div);
    });
}


function limpiarFormulario() {
    document.getElementById("formReserva").reset();
}

mostrarReservas();