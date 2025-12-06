function guardarInformacion() {
    let nombreGroomer = document.getElementById("nombreGroomer").value;
    let telefonoGroomer = document.getElementById("telefonoGroomer").value;
    let correoGroomer = document.getElementById("correoGroomer").value;
    
    const infoGroomers = {
        nombreGroomer: nombreGroomer,
        telefonoGroomer: telefonoGroomer,
        correoGroomer: correoGroomer
    };

    //console.log(JSON.stringify(infoGroomer));

    let listaGroomers = JSON.parse(localStorage.getItem("listaGroomers")) || [];
    listaGroomers.push(infoGroomers);
    localStorage.setItem("listaGroomers", JSON.stringify(listaGroomers));

    //Aleta para el usuario
    mostrarAlerta('Información de groomer realizada.', 'success');
            
    actualizarGroomers();
}

function actualizarGroomers() {
    const groomers = JSON.parse(localStorage.getItem("listaGroomers")) || [];
    const contenedor = document.getElementById("groomers");

    contenedor.innerHTML = "";

    groomers.forEach(p => {
        const div = document.createElement("div");
        //div.className = "card-servicio-basico col-12 col-xl-5 d-flex rounded-5 justify-content-center my-3 p-4";
        div.innerHTML = `
            <p>${p.nombreGroomer}</p>
            <p>${p.telefonoGroomer}</p>
            <p>${p.correoGroomer}</p>
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

actualizarGroomers();    
