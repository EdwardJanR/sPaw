class Header extends HTMLElement {
    connectedCallback() {
        const base = this.getBasePath();

        this.innerHTML = `
            <nav class="navbar navbar-expand-lg menu">
                <div class="container-fluid d-flex align-items-center">
                    <a class="navbar-brand d-flex align-items-center" href="${base}index.html">
                        <img class="logo" src="${base}IMG/logo-row-02.png" alt="logo-sPaw">
                    </a>

                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav ms-auto mb-2 mb-lg-0 gap-4 pe-2">
                            <li class="nav-item">
                                <a class="nav-link" href="${base}index.html">Inicio</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="${base}HTML/quienesSomos.html">Quienes somos</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="${base}HTML/servicios.html">Servicios</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="${base}HTML/contactenos.html">Contáctanos</a>
                            </li>
                        </ul>

                        <a href="${base}HTML/inicioSesion.html" class="boton-login">
                            Iniciar Sesión
                        </a>
                    </div>
                </div>
            </nav>
        `;

        this.setActiveLink();
    }

    getBasePath() {
        const path = window.location.pathname;

        if (path.includes("/HTML/ADMIN/")) return "../../";
        if (path.includes("/HTML/")) return "../";
        return "./";
    }

    setActiveLink() {
    const path = window.location.pathname;

    if (path.includes("/ADMIN/")) return;

    const currentPage = path.split("/").pop();
    const links = this.querySelectorAll(".nav-link");

    links.forEach(link => {
        const linkPage = link.getAttribute("href").split("/").pop();
        if (linkPage === currentPage) {
            link.classList.add("active");
        }
    });
}

}

customElements.define("header-component", Header);
