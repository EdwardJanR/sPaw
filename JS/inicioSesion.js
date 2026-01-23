document.getElementById("mostrarPass").addEventListener("click", function () {
  const pass = document.getElementById("password");
  // const eyeIcon = document.getElementById("eyeIcon");

  const eyeIcon = this.querySelector("i");
  const isPassword = pass.type === "password";

  // Germán
  // Cambiar tipo de input
  pass.type = isPassword ? "text" : "password";

  // cambia el icono del ojo
  eyeIcon.classList.toggle("bi-eye", !isPassword);
  eyeIcon.classList.toggle("bi-eye-slash", isPassword);
  // Germán
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

  const regexContrasena = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
    if (!regexContrasena.test(contrasena)) {
        mostrarValidaciones(
            "password", "La contraseña debe tener mínimo: 8 caracteres, incluir una mayúscula, una minúscula, un número y un caracter especial.");
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

    mostrarAlerta("<strong>¡Inicio de sesión exitoso!</strong> Redirigiendo...", "success");

    setTimeout(() => {
      window.location.href = "../index.html";
    }, 5000);
    
  } else {
    mostrarAlerta("<strong>Usuario o contraseña incorrecto</strong>", "danger");
  }
}

function mostrarAlerta(mensaje, tipo) {
  const alertContainer = document.getElementById("alertContainer");

  const alerta = document.createElement("div");
  alerta.className = `alert alert-${tipo} alert-dismissible fade show`;
  alerta.role = "alert";
  alerta.innerHTML = `
        ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

  alertContainer.innerHTML = "";
  alertContainer.appendChild(alerta);

  setTimeout(() => {
    alerta.classList.remove("show");
    setTimeout(() => alerta.remove(), 150);
  }, 3000);
}

function limpiarFormulario() {
  document.getElementById("formRegistro").reset();
}

// Germán
// Quitar mensaje de advertencia al diligenciar campos de formulario
function validarCampo(campo) {
  if (campo.checkValidity() && campo.value.trim() !== "") {
    campo.classList.remove("is-invalid");
    campo.classList.add("is-valid");

    // elimina mensaje de error si existe
    const error = campo
      .closest(".form-floating")
      ?.querySelector(".error-message");

    if (error) error.remove();
  }
}

document.addEventListener("DOMContentLoaded", () => {

  const campos = [
    "email",
    "password"
  ];

  campos.forEach(id => {
    const campo = document.getElementById(id);

    if (!campo) return;

    // Para inputs de texto y password
    campo.addEventListener("input", () => validarCampo(campo));

    // Por si alguno es select
    campo.addEventListener("change", () => validarCampo(campo));
  });

});