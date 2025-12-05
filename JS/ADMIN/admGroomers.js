function guardarInformacion() {
    let nombreGroomer = document.getElementById("nombreGroomer").value;
    let telefonoGroomer = document.getElementById("telefonoGroomer").value;
    let correoGroomer = document.getElementById("correoGroomer").value;
    
    const infoGroomers = {
        nombre: nombreGroomer,
        telefono: telefonoGroomer,
        correo: correoGroomer
    };

    //console.log(JSON.stringify(infoGroomer));

    let listalistaGroomers = JSON.parse(localStorage.getItem("listaGroomers")) || [];
    listaGroomers.push(infoGroomers);
    localStorage.setItem("listaGroomers", JSON.stringify(listaGroomers));

    //Aleta para el usuario
    mostrarAlerta('Información enviada correctamente.', 'success');
            
    //actualizarGroomers();
}

function actualizarGroomers() {
    const groomers = JSON.parse(localStorage.getItem("listaGroomers")) || [];
    const contenedor = document.getElementById("infoGroomers");

    contenedor.innerHTML = "";

    servicios.forEach(p => {
        const div = document.createElement("div");
        div.className = "card-servicio-basico col-12 col-xl-5 d-flex rounded-5 justify-content-center my-3 p-4";
        div.innerHTML = `

                    <div class="d-flex flex-column">
                        <h3 class="subtittle mb-2">${p.nombre}</h3>
                        <p>${p.descripcion}</p>
                        <ul class="lista-valores p-0">
                            Precio:
                            <li><img src="/IMG/spaw0.png" class="list-style" alt="">${p.precioPequeno}</li>
                            <li><img src="/IMG/spaw0.png" class="list-style" alt="">${p.precioMediano}</li>
                            <li><img src="/IMG/spaw0.png" class="list-style" alt="">${p.precioGrande}</li>
                        </ul>
                    </div>
                    <div class="d-flex flex-column  align-items-center justify-content-evenly">
                        <button class="btn-servicios">¡Agenda ahora!</button>
                        <img src="../IMG/SERVICIOS/servicio_basico.png" class="img-básicos" alt="Imagen perro">
                    </div>

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
