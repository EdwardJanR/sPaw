document.addEventListener("DOMContentLoaded", () => {
  const btnLogin = document.getElementById("btnLogin");
  const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

  if (btnLogin && usuarioActivo && usuarioActivo.nombre) {
    btnLogin.textContent = usuarioActivo.nombre;
    btnLogin.href = "#";
  }
});
