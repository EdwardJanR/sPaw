flatpickr("#fecha", {
    locale: "es",          
    minDate: "today",      
     maxDate: new Date().fp_incr(90),
    dateFormat: "d-m-Y",  
    altInput: true,       
    altFormat: "F j, Y",  
    allowInput: true
});





















5




















function agendar() {
    const reservas = JSON.parse(localStorage.getItem("listaReservas")) || [];
    const contenedor = document.getElementById("servicio-reservado");

    contenedor.innerHTML = "";

    reservas.forEach(p => {
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
                <a class="boton-login" href="../HTML/servicios.html">Volver a servicios</a>
            </div>
        `;
        contenedor.appendChild(div);
    });
}

agendar();

