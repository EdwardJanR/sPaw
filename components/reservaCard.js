class ReservaCard extends HTMLElement {

    connectedCallback() {
        const nombreServicio = this.getAttribute('nombreServicio') || 'Reserva';
        const nombreMascota = this.getAttribute('nombreMascota') || 'Mascota';
        const tamanoMascota = this.getAttribute('tamanoMascota') || 'Tamaño';
        const nombreGroomer = this.getAttribute('nombreGroomer') || 'Groomer';
        const fechaReserva = this.getAttribute('fechaReserva') || 'Fecha';
        const horaReserva = this.getAttribute('horaReserva') || 'Hora';
        const idReserva = this.getAttribute('idReserva') || '0';

        this.innerHTML = `
            <div class="col d-flex">
                <div class="card h-100 w-100 card-reserva">
                    <div class="card-header bg-light border-0 py-3" style="min-height: 80px;">
                        <div class="d-flex justify-content-between align-items-start">
                            <h3 class="h5 fw-bold mb-0 text-primary titulo-controlado"
                                title="${nombreServicio}">
                                ${nombreServicio}
                            </h3>
                            <button class="btn btn-eliminar-reserva eliminar-reserva"
                                    data-id="${idReserva}"
                                    title="Eliminar reserva">
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
                    </div>
                    <div class="card-body py-3 d-flex flex-column bg-light">
                        <div class="mb-3 flex-grow-1">
                            <div class="text-start">
                                <p class="mb-2"><strong>Nombre de la mascota:</strong> ${nombreMascota}</p>
                                <p class="mb-2"><strong>Tamaño:</strong> 
                                    <span class="badge bg-primary text-white">${tamanoMascota}</span>
                                </p>
                                <p class="mb-2"><strong>Groomer escogido:</strong> ${nombreGroomer}</p>
                                <p class="mb-2"><strong>Fecha:</strong> ${fechaReserva}</p>
                                <p class="mb-0"><strong>Hora:</strong> ${horaReserva}</p>
                            </div>
                        </div>
                        <div class="mt-auto pt-3">
                            <a href="../HTML/servicios.html" 
                            class="btn btn-primary w-100 py-2">
                                <i class="bi bi-arrow-left me-2"></i>
                                Volver a servicios
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('reserva-card', ReservaCard);