function registroUsuario() {
    let nombreUsuario = document.getElementById("nombreUsuario").value;
    let apellidosUsuario = document.getElementById("apellidosUsuario").value;
    let correoUsuario = document.getElementById("correoUsuario").value;
    let contrasenaUsuario = document.getElementById("contrasenaUsuario").value;
    let confirmarContraUsuario = document.getElementById("confirmarContraUsuario").value;
    let telefonoUsuario = document.getElementById("telefonoUsuario").value;
    let mascota1Usuario = document.getElementById("mascota1Usuario").value;
    let mascota2Usuario = document.getElementById("mascota2Usuario").value;
    let mascota3Usuario = document.getElementById("mascota3Usuario").value;
    let mascota4Usuario = document.getElementById("mascota4Usuario").value;
    
    const infoUsuario = {
        nombre: nombreUsuario,
        apellidos: apellidosUsuario,
        correo: correoUsuario,
        contrasena: contrasenaUsuario,
        confirmarContraseña: confirmarContraUsuario,
        telefono: telefonoUsuario,
        mascotas: [
            mascota1Usuario,
            mascota2Usuario,
            mascota3Usuario,
            mascota4Usuario
        ]
    }

    let infoRegistro = JSON.parse(localStorage.getItem("infoRegistro")) || [];
    infoRegistro.push(infoUsuario);
    localStorage.setItem("infoRegistro", JSON.stringify(infoRegistro));

    limpiarFormulario();
}

function limpiarFormulario() {
    document.getElementById("formRegistro").reset()
}