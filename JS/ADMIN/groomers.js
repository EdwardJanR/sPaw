function guardarInformacion() {
    let nombreGroomer = document.getElementById("nombreGroomer").value;
    let telefonoGroomer = document.getElementById("telefonoGroomer").value;
    let correoGroomer = document.getElementById("correoGroomer").value;
    
    const infoGroomer = {
        nombre: nombreGroomer,
        telefono: telefonoGroomer,
        correo: correoGroomer
    };

    console.log(JSON.stringify(infoGroomer));
}