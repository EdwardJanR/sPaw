document.addEventListener("DOMContentLoaded", () => {

  const btnLogin = document.getElementById("btnLogin");
  const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

  if (btnLogin && usuarioActivo?.nombre) {
    btnLogin.outerHTML = `
      <div class="nav-item dropdown">
        <a class="boton-login dropdown-toggle d-flex align-items-center"
           id="btnLogin"
           role="button"
           data-bs-toggle="dropdown"
           aria-expanded="false">
          <i class="bi bi-person-circle me-2"></i>
          ${capitalizeFirstLetter(usuarioActivo.nombre)}
        </a>
        <ul class="dropdown-menu dropdown-menu-end list-unstyled">
          <li>
            <a class="dropdown-item" href="#" id="cerrarSesion">
              Cerrar sesión
            </a>
          </li>
        </ul>
      </div>
    `;

    setTimeout(() => {
      const cerrarSesion = document.getElementById("cerrarSesion");

      if (cerrarSesion) {
        cerrarSesion.addEventListener("click", (e) => {
          e.preventDefault();
          localStorage.removeItem("usuarioActivo");
          window.location.href = "../index.html";
        });
      }
    }, 0);
  }

  const botonesAgenda = document.querySelectorAll(".btn-agenda");

  if (botonesAgenda.length) {
    botonesAgenda.forEach(boton => {
      boton.addEventListener("click", () => {

        if (usuarioActivo?.nombre) {
          window.location.href = "../HTML/reservas.html";
        } else {
          window.location.href = "../HTML/inicioSesion.html";
        }
      });
    });
  }

});

function capitalizeFirstLetter(string) {
  return string ? string.charAt(0).toUpperCase() + string.slice(1) : "";
}


