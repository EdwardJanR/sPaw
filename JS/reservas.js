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

        mostrarAlerta('exito', 'Todos los campos son válidos.');

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

        mostrarAlerta('exito', 'Tu reserva ha sido guardada correctamente.');
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

        reservas.items.forEach(reserva => {
            const reservaCard = document.createElement('reserva-card');
            reservaCard.setAttribute('nombreServicio', reserva.nombreServicio);
            reservaCard.setAttribute('nombreMascota', reserva.nombreMascota);
            reservaCard.setAttribute('tamanoMascota', reserva.tamanoMascota);
            reservaCard.setAttribute('nombreGroomer', reserva.nombreGroomer);
            reservaCard.setAttribute('fechaReserva', reserva.fechaReserva);
            reservaCard.setAttribute('horaReserva', reserva.horaReserva);
            reservaCard.setAttribute('idReserva', reserva.idReserva);
            contenedorReservas.appendChild(reservaCard);
        }
        );
    }


    document.addEventListener('click', function (e) {

        const botonEliminar = e.target.closest('.eliminar-reserva');

        if (!botonEliminar) return;

        e.preventDefault();
        const id = parseInt(botonEliminar.dataset.id);

        mostrarAlerta('confirmar', '¿Eliminar esta reserva?<br><small>¡Esta acción no se puede deshacer!</small>', {
            botonConfirmar: 'Sí, eliminar'
        }).then((result) => {
            if (result.isConfirmed) {

                const reservas = JSON.parse(localStorage.getItem('listaReservas')) || { items: [] };
                reservas.items = reservas.items.filter(item => item.idReserva !== id);
                localStorage.setItem('listaReservas', JSON.stringify(reservas));

                const card = button.closest('reserva-card');
                if (card) card.remove();

                if (reservas.items.length === 0) {
                    document.getElementById('servicio-reservado').innerHTML =
                        '<p class="text-muted">No hay reservas</p>';
                }
            }
        });
    });


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


    function limpiarFormulario() {
        document.getElementById("formReserva").reset();
    }

    mostrarReservas();

});