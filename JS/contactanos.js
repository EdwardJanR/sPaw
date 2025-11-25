function validaciones() {

    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telefono').value;
    const mensaje = document.getElementById('mensaje').value.trim();


    if (nombre.length < 2 || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre)) {
        alert('El nombre debe tener al menos 2 caracteres y sin numeros');
        return false;
    }

    if (apellido.length < 2 || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(apellido)) {
        alert('El apellido debe tener al menos 2 caracteres sin numeros');
        return false;
    }


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor ingresa un email válido');
        return false;
    }

    if (telefono.length < 7 || isNaN(telefono)) {
        alert('El teléfono debe tener al menos 7 dígitos');
        return false;
    }

    if (mensaje.length < 10) {
        alert('El mensaje debe tener al menos 10 caracteres');
        return false;
    }

    alert('Formulario enviado correctamente');
    return true;
}