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

    console.log(JSON.stringify(infoServicios));
}