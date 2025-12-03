function guardarInformacion() {
    let nombreServicio = document.getElementById("nombreServicio").value;
    let descripcionServicio = document.getElementById("descripcionServicio").value;
    let precioPequeno = document.getElementById("precioPequeno").value;
    let precioMediano = document.getElementById("precioMediano").value;
    let precioGrande = document.getElementById("precioGrande").value;
    let duracionPequeno = document.getElementById("duracionPequeno").value;
    let duracionMediano = document.getElementById("duracionMediano").value;
    let duracionGrande = document.getElementById("duracionGrande").value;

    const infoServicios = {
        nombre: nombreServicio,
        descripcion: descripcionServicio,
        precioPequeno: precioPequeno,
        duracionPequeno: duracionPequeno,
        precioMediano: precioMediano,
        duracionMediano: duracionMediano,
        precioGrande: precioGrande,
        duracionGrande: duracionGrande
    };

    let listaServicios = JSON.parse(localStorage.getItem("listaServicios")) || [];
    listaServicios.push(infoServicios);
    localStorage.setItem("listaServicios", JSON.stringify(listaServicios));

    actualizarServicios();
}

function actualizarServicios() {
    const servicios = JSON.parse(localStorage.getItem("listaServicios")) || [];
    const contenedor = document.getElementById("servicios");

    contenedor.innerHTML = "";

    servicios.forEach(p => {
        const div = document.createElement("div");
        div.className = "card p-2";
        div.style.width = "250px";
        div.innerHTML = `
            <h3>${p.nombre}</h3>
            <h4>${p.descripcion}</h4>
            <h5>Precios</h5>
            <p>Pequeño $${p.precioPequeno}</p>
            <p>Mediano $${p.precioMediano}</p>
            <p>Grande $${p.precioGrande}</p>
        `;
        contenedor.appendChild(div);
    });
}

actualizarServicios();
