function guardarInformacion() {
    let nombreServicio = document.getElementById("nombreServicio").value;
    let descripcionServicio = document.getElementById("descripcionServicio").value;
    let imgServicio = "../../IMG/SERVICIOS/servicio_basico3.png"
    let precioPequeno = document.getElementById("precioPequeno").value;
    let precioMediano = document.getElementById("precioMediano").value;
    let precioGrande = document.getElementById("precioGrande").value;
    let duracionPequeno = document.getElementById("duracionPequeno").value;
    let duracionMediano = document.getElementById("duracionMediano").value;
    let duracionGrande = document.getElementById("duracionGrande").value;

    const infoServicios = {
        nombre: nombreServicio,
        descripcion: descripcionServicio,
        precioPequeno: precioPequeno,
        duracionPequeno: duracionPequeno,
        precioMediano: precioMediano,
        duracionMediano: duracionMediano,
        precioGrande: precioGrande,
        duracionGrande: duracionGrande
    };

    let listaServicios = JSON.parse(localStorage.getItem("listaServicios")) || [];
    listaServicios.push(infoServicios);
    localStorage.setItem("listaServicios", JSON.stringify(listaServicios));

    //Aleta para el usuario
    mostrarAlerta('Información enviada correctamente.', 'success');
            
    actualizarServicios();
}

function actualizarServicios() {
    const servicios = JSON.parse(localStorage.getItem("listaServicios")) || [];
    const contenedor = document.getElementById("servicios_Basicos");

    contenedor.innerHTML = "";

    servicios.forEach(p => {
        const col = document.createElement("div");
        col.className = "col-12 col-lg-6";

        col.innerHTML = `
            <div class="card-servicio-premium rounded-5 p-4 h-100 d-flex flex-column justify-content-evenly">

                <h3 class="subtitulo text-center mb-3">
                    ${p.nombre}
                </h3>
                <div class="d-flex flex-column flex-md-row align-items-center gap-3">
                    <img src="../IMG/SERVICIOS/servicio_basico.png" class="img-básicos" alt="Imagen perro">
                    <div>
                        <p class="descripcion">
                            ${p.descripcion}
                        </p>
                        <span class="ver-mas">ver más</span>
                        <div class="d-flex justify-content-center">
                        <ul class="lista-valores p-0 m-0">
                            <li class="fw-bold text-center">Precio:</li>
                            <li>
                                <img src="/IMG/spaw0.png" class="list-style">
                                Pequeño ${p.precioPequeno}
                            </li>
                            <li>
                                <img src="/IMG/spaw0.png" class="list-style">
                                Mediano ${p.precioMediano}
                            </li>
                            <li>
                                <img src="/IMG/spaw0.png" class="list-style">
                                Grande ${p.precioGrande}
                            </li>
                        </ul>
                        </div>
                    </div>
                </div>
                <div class="text-center mt-4">
                    <button class="boton-login btn-agenda" onclick="agendar('${p.nombre}')">
                        ¡Agenda ahora!
                    </button>
                </div>
            </div>
        `;

        contenedor.appendChild(col);
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

document.getElementById("servicios_Basicos").addEventListener("click", function (e) {
    if (e.target.classList.contains("ver-mas")) {
        const descripcion = e.target.previousElementSibling;
        descripcion.classList.toggle("expandido");
        if (descripcion.classList.contains("expandido")) {
            e.target.textContent = "ver menos";
        } else {
            e.target.textContent = "ver más";
        }
    }
});


actualizarServicios();
