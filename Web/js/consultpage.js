let codeLiqour = ""; // Variable para almacenar el código del licor

function loadPage() {
    let localStorageLiqour = localStorage.getItem("liqourData");
    if (!localStorageLiqour) {
        console.error("No se encontró 'liqourData' en localStorage.");
        return;
    }
    let liqourData = JSON.parse(localStorageLiqour);
    console.log("Datos del licor:", liqourData); // Verifica los datos

    codeLiqour = liqourData.code;
    document.getElementById("input-name-liqour").value = liqourData.name;
    document.getElementById("input-type-liqour").value = liqourData.type;
    document.getElementById("input-brand-liqour").value = liqourData.brand;
    document.getElementById("input-alcohol-content").value = liqourData.alcoholContent;
    document.getElementById("input-country-of-origin").value = liqourData.countryOfOrigin;
}

function goBack() {
    window.history.back(); // Vuelve a la página anterior
}

// Cargar la información del licor cuando la página se carga
window.onload = loadPage;
