document.addEventListener('DOMContentLoaded', function () {

    const btnReservar = document.getElementById('btnReservar');
    const inputNombreMascota = document.getElementById('nombreMascota');
    const inputTamanoMascota = document.getElementById('tamanoMascota');
    const inputNombreGroomer = document.getElementById('nombreGroomer');
    const inputNombreServicio = document.getElementById('nombreServicio');
    const inputFechaReserva = document.getElementById('fechaReserva');
    const inputHoraReserva = document.getElementById('horaReserva');


    flatpickr.localize(flatpickr.l10ns.es);


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


    btnReservar.addEventListener('click', function (e) {
        e.preventDefault();

        limpiarVal();

    const nombreMascota = inputNombreMascota.value.trim();
    const tamanoMascota = inputTamanoMascota.value.trim();
    const nombreGroomer = inputNombreGroomer.value.trim();
    const nombreServicio = inputNombreServicio.value.trim();
    const fechaReserva = inputFechaReserva.value.trim();
    const horaReserva = inputHoraReserva.value.trim();


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

        procesarReserva({
            nombreMascota,
            tamanoMascota,
            fechaReserva,
            horaReserva
        });
        return true;
    });

    function procesarReserva(datosReserva) {

        let listaReservas = JSON.parse(localStorage.getItem('listaReservas')) || { contador: 0, items: [] };

        listaReservas.contador++;
        const nuevoId = listaReservas.contador;

        const infoReservas = {
            idReserva: nuevoId,
            nombreServicio: inputNombreServicio.options[inputNombreServicio.selectedIndex].text,
            nombreMascota: datosReserva.nombreMascota,
            tamanoMascota: datosReserva.tamanoMascota,
            nombreGroomer: inputNombreGroomer.options[inputNombreGroomer.selectedIndex].text,
            fechaReserva: datosReserva.fechaReserva,
            horaReserva: datosReserva.horaReserva
        };

        console.log(JSON.stringify(infoReservas));

        listaReservas.items.push(infoReservas);

        localStorage.setItem("listaReservas", JSON.stringify(listaReservas));

        //Aleta para el usuario
        mostrarAlerta('success', '<strong>¡Reserva exitosa!</strong> Tu reserva ha sido guardada correctamente.');
        limpiarFormulario();
        mostrarReservas();
    }

    function mostrarReservas() {
        const reservas = JSON.parse(localStorage.getItem("listaReservas")) || { contador: 0, items: [] };
        const contenedorReservas = document.getElementById("servicio-reservado");

        contenedorReservas.innerHTML = "";

        if (reservas.items.length === 0) {
            contenedorReservas.innerHTML = "<p>No hay reservas realizadas.</p>";
            return;
        }

        reservas.items.forEach(reseva => {
            const reservaCard = document.createElement('reserva-card');
            reservaCard.setAttribute('nombreServicio', reseva.nombreServicio);
            reservaCard.setAttribute('nombreMascota', reseva.nombreMascota);
            reservaCard.setAttribute('tamanoMascota', reseva.tamanoMascota);
            reservaCard.setAttribute('nombreGroomer', reseva.nombreGroomer);
            reservaCard.setAttribute('fechaReserva', reseva.fechaReserva);
            reservaCard.setAttribute('horaReserva', reseva.horaReserva);
            reservaCard.setAttribute('idReserva', reseva.idReserva);
            contenedorReservas.appendChild(reservaCard);
        }
        );
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



    function limpiarFormulario() {
        document.getElementById("formReserva").reset();
    }

    mostrarReservas();

});