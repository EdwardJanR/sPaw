function registrarUsuario() {
    let nombreUsuario = document.getElementById("nombreUsuario").value.trim();
    let apellidosUsuario = document.getElementById("apellidosUsuario").value.trim();
    let correoUsuario = document.getElementById("correoUsuario").value.trim();
    let contrasenaUsuario = document.getElementById("contrasenaUsuario").value.trim();
    let confirmarContraUsuario = document.getElementById("confirmarContraUsuario").value.trim();
    let telefonoUsuario = document.getElementById("telefonoUsuario").value.trim();
    let mascota1Usuario = document.getElementById("mascota1Usuario").value.trim();
    let mascota2Usuario = document.getElementById("mascota2Usuario").value.trim();
    let mascota3Usuario = document.getElementById("mascota3Usuario").value.trim();
    let mascota4Usuario = document.getElementById("mascota4Usuario").value.trim();

    const infoUsuario = {
        nombre: nombreUsuario,
        apellidos: apellidosUsuario,
        correo: correoUsuario,
        contrasena: contrasenaUsuario,
        confirmarContrasena: confirmarContraUsuario,
        telefono: telefonoUsuario,
        mascota1: mascota1Usuario,
        mascota2: mascota2Usuario,
        mascota3: mascota3Usuario,
        mascota4: mascota4Usuario
    }

    if (nombre === "" || apellidos === "" || correo === "" || contrasena === "" || confirmarContrasena === "" || telefono === "" || mascota1 === "") {
        mensaje.innerText = "Todos los campos deben ser diligenciados.";
        mensaje.style.color = "red";
        return;
    }

    if (nombre.length <= 2 || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre)) {
        mostrarVal('nombre','El nombre debe ser alfabético y mínimo de dos caracteres.');
        mensaje.style.color = "red";
        return false;
    }

    if (apellidos.length <= 2 || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(apellidos)) {
        mostrarVal('apellidos','Los apellidos deben ser alfabéticos y mínimo de dos caracteres.');
        mensaje.style.color = "red";
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
        mostrarVal('correo','Por favor ingresa un email válido.');
        mensaje.style.color = "red";
        return false;
    }

    if (telefono.length < 10 || isNaN(telefono)) {
        mostrarVal('telefono','El teléfono debe contener 10 dígitos.');
        mensaje.style.color = "red";
        return false;
    }

    if (password.lenght < 8) {
        mensaje.innerText = "La contraseña debe tener al menos 8 caracteres.";
        mensaje.style.color = "red";
        return false;
    }

    mostrarAlerta('success', '<strong>¡Éxito!</strong> Todos los campos son válidos. Enviando formulario...');
            
    setTimeout(() => {
        document.getElementById('formRegistro').submit();
    }, 1500);        

    return true;

    localStorage.setItem("usuarioRegistrado", JSON.stringify(infoUsuario));

    mensaje.innerText = "Usuario registrado correctamente.";
    mensaje.style.color = "green";

    document.getElementById("formRegistro").reset();

}
