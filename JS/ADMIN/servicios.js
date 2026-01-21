async function subirImagenCloudinary(file) {
  const CLOUD_NAME = "dehyt5u4e";
  const UPLOAD_PRESET = "servicios_preset";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  const data = await response.json();

  if (data.error) {
    console.error("Cloudinary error:", data.error);
    return null;
  }

  return data.secure_url || data.url;
}

async function guardarInformacion() {
  limpiarValidaciones();

  let nombreServicio = document.getElementById("nombreServicio").value.trim();
  let descripcionServicio = document.getElementById("descripcionServicio").value.trim();
  let imgServicio = document.getElementById("imgServicio");
  let precioPequeno = document.getElementById("precioPequeno").value.trim();
  let precioMediano = document.getElementById("precioMediano").value.trim();
  let precioGrande = document.getElementById("precioGrande").value.trim();
  let duracionPequeno = document.getElementById("duracionPequeno").value.trim();
  let duracionMediano = document.getElementById("duracionMediano").value.trim();
  let duracionGrande = document.getElementById("duracionGrande").value.trim();

  if (nombreServicio.length < 3 || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombreServicio)) {
    mostrarValidaciones("nombreServicio","El nombre debe ser alfabético y tener mínimo 3 caracteres");
    return;
  }

  if (descripcionServicio.length < 10) {
    mostrarValidaciones("descripcionServicio","La descripción debe tener mínimo 10 caracteres");
    return;
  }

  if (!/^\d+(\.\d{1,2})?$/.test(precioPequeno)) {
    mostrarValidaciones("precioPequeno", "Por favor ingresa un precio válido");
    return;
  }

  if (!/^\d+(\.\d{1,2})?$/.test(precioMediano)) {
    mostrarValidaciones("precioMediano", "Por favor ingresa un precio válido");
    return;
  }

  if (!/^\d+(\.\d{1,2})?$/.test(precioGrande)) {
    mostrarValidaciones("precioGrande", "Por favor ingresa un precio válido");
    return;
  }

  if (!/^\d+$/.test(duracionPequeno)) {
    mostrarValidaciones("duracionPequeno", "La duración debe ser un número en minutos");
    return;
  }

  if (!/^\d+$/.test(duracionMediano)) {
    mostrarValidaciones("duracionMediano", "La duración debe ser un número en minutos");
    return;
  }

  if (!/^\d+$/.test(duracionGrande)) {
    mostrarValidaciones("duracionGrande", "La duración debe ser un número en minutos");
    return;
  }

  if (!imgServicio.files.length) {
    mostrarValidaciones("imgServicio", "Por favor seleccionar una imagen");
    return;
  }

  try {
    const archivoImagen = imgServicio.files[0];

    limpiarAlertas();
    mostrarAlerta("Subiendo imagen...", "info");

    const imageUrl = await subirImagenCloudinary(archivoImagen);

    limpiarAlertas();

    if (!imageUrl) {
      limpiarAlertas();
      mostrarAlerta("No se pudo subir la imagen. Intenta nuevamente.","danger");
      return;
    }

    const infoServicios = {
      nombre: nombreServicio,
      descripcion: descripcionServicio,
      imagen: imageUrl,
      precioPequeno,
      duracionPequeno,
      precioMediano,
      duracionMediano,
      precioGrande,
      duracionGrande,
    };

    let listaServicios =
      JSON.parse(localStorage.getItem("listaServicios")) || [];
    listaServicios.push(infoServicios);
    localStorage.setItem("listaServicios", JSON.stringify(listaServicios));

    mostrarAlerta("Todos los campos son válidos. Enviando formulario...", "success");

    limpiarFormulario();
    actualizarServicios();
  } catch (error) {
    limpiarAlertas();
    mostrarAlerta("Ocurrió un error inesperado.", "danger");
    console.error(error);
  }
}

function actualizarServicios() {
  const contenedor = document.getElementById("servicios_Basicos");

  if (!contenedor) {
    return;
  }

  const servicios = JSON.parse(localStorage.getItem("listaServicios")) || [];

  contenedor.innerHTML = "";

  servicios.forEach((p) => {
    const col = document.createElement("div");
    col.className = "col-12 col-lg-6";

    col.innerHTML = `
      <div class="card-servicio rounded-5 p-4 h-100 d-flex flex-column justify-content-evenly">

        <h3 class="subtitulo text-center mb-3">
          ${p.nombre}
        </h3>

        <div class="d-flex flex-column flex-md-row align-items-center gap-3">
          <div class="dog-mask">
            <img src="${p.imagen}" class="img-básicos" alt="Imagen perro">
          </div>

          <div class="parrafo">
            <p class="descripcion">
              ${p.descripcion}
            </p>

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
          <button class="boton-login btn-agenda" onclick="agendar()">
            ¡Agenda ahora!
          </button>
        </div>

      </div>
    `;

    contenedor.appendChild(col);
  });
}


function mostrarAlerta(mensaje, tipo = "success") {
  const alertContainer = document.getElementById("alertContainer");

  if (!alertContainer) {
    console.warn("alertContainer no existe en el DOM");
    return;
  }

  const alerta = document.createElement("div");
  alerta.className = `alert alert-${tipo} alert-dismissible fade show`;
  alerta.role = "alert";
  alerta.innerHTML = `
    <strong>${
      tipo === "success"
        ? "¡Éxito!"
        : tipo === "danger"
          ? "¡Error!"
          : "¡Atención!"
    }</strong> ${mensaje}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;

  alertContainer.appendChild(alerta);

  setTimeout(() => {
    alerta.classList.remove("show");
    setTimeout(() => alerta.remove(), 150);
  }, 5000);
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

function limpiarFormulario() {
  const form = document.getElementById("formServicios");
  if (form) {
    form.reset();
  }
}

function limpiarAlertas() {
  const alertContainer = document.getElementById("alertContainer");
  alertContainer.innerHTML = "";
}

actualizarServicios();
