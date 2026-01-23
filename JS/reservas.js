let picker = flatpickr("#fechaReserva", {
    locale: "es",
    minDate: "today",
    maxDate: new Date().fp_incr(90),
    dateFormat: "d-m-Y",
    altInput: false,
    allowInput: false,
    disableMobile: false,

    // Germán
    onChange: function (selectedDates, dateStr) {
    const fechaInput = document.getElementById("fechaReserva");

    if (dateStr) {
        fechaInput.classList.remove("is-invalid");
        fechaInput.classList.add("is-valid");
    } else {
        fechaInput.classList.remove("is-valid");
        fechaInput.classList.add("is-invalid");
    }
}
    // Germán
});


function validarInfoReserva() {

    /*Germán*/
    /* Verificar si los campos del formulario son válidos antes de permitir su envío */
    const form = document.getElementById("formReserva");
    const fechaInput = document.getElementById("fechaReserva");

    fechaInput.classList.remove("is-valid", "is-invalid");

    fechaInput.classList.remove("is-valid");
    form.classList.remove("was-validated");

    // Forzar estado inválido si está vacía
    if (!fechaInput.value) {
        fechaInput.classList.remove("is-valid");
        fechaInput.classList.add("is-invalid");
    } else {
        fechaInput.classList.remove("is-invalid");
        fechaInput.classList.add("is-valid");
    }
 
    if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return;
    }

    /*Germán*/

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

// Germán
function mostrarVal(id) {
    const field = document.getElementById(id);
    field.classList.add('is-invalid');
}

function limpiarVal() {
    document.querySelectorAll('.error-message').forEach(error => error.remove());
    document.querySelectorAll('.is-invalid').forEach(field => field.classList.remove('is-invalid'));
    document.querySelectorAll('.is-valid').forEach(field => field.classList.remove('is-valid'));
}
// Germán

function guardarInformacion() {
    let nombreServicio = document.getElementById("nombreServicio");
    let nombreMascota = document.getElementById("nombreMascota").value;
    let tamanoMascota = document.getElementById("tamanoMascota").value;
    let nombreGroomer = document.getElementById("nombreGroomer");
    let fechaReserva = document.getElementById("fechaReserva").value;
    let horaReserva = document.getElementById("horaReserva").value;

    //Se obtiene la descripción del valor seleccionado en el select nombreServicio
    let servicioSeleccionado = nombreServicio.options[nombreServicio.selectedIndex].text;
    //Se obtiene la descripción del valor seleccionado en el select nombreGroomer
    let groomerSeleccionado = nombreGroomer.options[nombreGroomer.selectedIndex].text;

    //let listaReservas = JSON.parse(localStorage.getItem("listaReservas")) || [];
    let listaReservas = JSON.parse(localStorage.getItem('listaReservas')) || { contador: 0, items: [] };

    listaReservas.contador++;
    const nuevoId = listaReservas.contador;

    const infoReservas = {
        idReserva: nuevoId,
        nombreServicio: servicioSeleccionado,
        nombreMascota: nombreMascota,
        tamanoMascota: tamanoMascota,
        nombreGroomer: groomerSeleccionado,
        fechaReserva: fechaReserva,
        horaReserva: horaReserva
    };

    console.log(JSON.stringify(infoReservas));

    listaReservas.items.push(infoReservas);

    localStorage.setItem("listaReservas", JSON.stringify(listaReservas));

    //Aleta para el usuario
    mostrarAlerta('<strong>¡Éxito!</strong> Todos los campos son válidos. Enviando formulario...', 'success');
    limpiarFormulario();
    mostrarReservas();
}

function mostrarAlerta(mensaje, tipo) {
    const alertContainer = document.getElementById('alertContainer');

    const alerta = document.createElement('div');
    alerta.className = `alert alert-${tipo} alert-dismissible fade show`;
    alerta.role = 'alert';
    alerta.innerHTML = `
        ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    alertContainer.innerHTML = '';
    alertContainer.appendChild(alerta);

    setTimeout(() => {
        alerta.classList.remove('show');
        setTimeout(() => alerta.remove(), 150);
    }, 3000);
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


// Germán
// Mostrar check en el campo nombreMascota al seleccionar opción en caché
document.addEventListener("DOMContentLoaded", () => {
  const nombreMascota = document.getElementById("nombreMascota");

  nombreMascota.addEventListener("focus", () => {
    setTimeout(() => {
      if (nombreMascota.value.trim().length >= 2) {
        nombreMascota.classList.remove("is-invalid");
        nombreMascota.classList.add("is-valid");
      }
    }, 50);
  });

  nombreMascota.addEventListener("input", () => {
    if (nombreMascota.value.trim().length >= 2) {
      nombreMascota.classList.add("is-valid");
      nombreMascota.classList.remove("is-invalid");
    } else {
      nombreMascota.classList.remove("is-valid");
    }
  });
});
// Germán