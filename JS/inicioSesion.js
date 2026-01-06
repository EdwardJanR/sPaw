document.getElementById('mostrarPass').addEventListener('click', function() {
    const pass = document.getElementById('password');
    const eyeIcon = document.getElementById('eyeIcon');
    
    // cambia tipa de input
    const type = pass.getAttribute('type') === 'password' ? 'text' : 'password';
    pass.setAttribute('type', type);
    
    // cambia el icono del ojo
    eyeIcon.classList.toggle('bi-eye');
    eyeIcon.classList.toggle('bi-eye-slash');
});

function validaciones() {
  limpiarValidaciones();

  const email = document.getElementById("email").value.trim();
  const contrasena = document.getElementById("password").value.trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    mostrarValidaciones("email", "Por favor ingresa un email válido.");
    return false;
  }

  if (contrasena.length < 8) {
    mostrarValidaciones(
      "password",
      "La contraseña debe tener mínimo 8 caracteres"
    );
    return false;
  }

  verificarUsuario();
  limpiarFormulario();
  return true;
}

function mostrarValidaciones(id, mensaje) {
  const field = document.getElementById(id);
  const formFloating = field.closest(".form-floating");

  const errorElement = document.createElement("div");
  errorElement.className = "error-message text-danger mt-1 small";
  errorElement.textContent = mensaje;

  formFloating.appendChild(errorElement);

  field.classList.add("is-invalid");
}

function limpiarValidaciones() {
  document
    .querySelectorAll(".error-message")
    .forEach((error) => error.remove());
  document
    .querySelectorAll(".is-invalid")
    .forEach((field) => field.classList.remove("is-invalid"));
}

function verificarUsuario() {
  const email = document.getElementById("email").value.trim();
  const contrasena = document.getElementById("password").value.trim();

  const usuariosRegistrados =
    JSON.parse(localStorage.getItem("infoRegistro")) || [];

  const usuarioEncontrado = usuariosRegistrados.find(
    (usuario) => usuario.correo === email && usuario.contrasena === contrasena
  );

  if (usuarioEncontrado) {
    // Guardar usuario logueado
    const usuarioActivo = {
      nombre: usuarioEncontrado.nombre,
      apellidos: usuarioEncontrado.apellidos,
    };

    localStorage.setItem("usuarioActivo", JSON.stringify(usuarioActivo));

    alert("¡Inicio de sesión exitoso!");
    window.location.href = "../indexSesion.html";
  } else {
    alert("Usuario o contraseña incorrectos.");
  }
}

function limpiarFormulario() {
  document.getElementById("formRegistro").reset();
}
