document.addEventListener("DOMContentLoaded", () => {
  const btnLogin = document.getElementById("btnLogin");
  const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

  if (!btnLogin) return;

  if (usuarioActivo?.nombre) {
    // Icono 
    btnLogin.innerHTML = `
      <i class="bi bi-person-circle me-2"></i>
      ${capitalizeFirstLetter(usuarioActivo.nombre)} 
    `;
    

    btnLogin.href = "#";

    /*btnLogin.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("usuarioActivo");
      location.reload();
    });*/
  }
});

function capitalizeFirstLetter(string) {
  if (string.length === 0) {
    return ""; // Handle empty strings
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}