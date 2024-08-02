let saleDate = ""; // Variable para almacenar la fecha de la venta

function loadPage() {
    let localStorageSale = localStorage.getItem("saleData");
    if (!localStorageSale) {
        console.error("No se encontró 'saleData' en localStorage.");
        return;
    }
    let saleData = JSON.parse(localStorageSale);
    console.log("Datos de la venta:", saleData); // Verifica los datos

    // Asignar los valores a los campos de entrada
    document.getElementById("input-sale-date").value = saleData.saleDate;
    document.getElementById("input-quantity-sold").value = saleData.quantitySold;
    document.getElementById("input-unit-price").value = saleData.unitPrice;
    document.getElementById("input-customer-name").value = saleData.customerName;
    document.getElementById("input-liqour-name").value = saleData.liqourName;
}

function goBack() {
    window.history.back(); // Vuelve a la página anterior
}

// Cargar la información de la venta cuando la página se carga
window.onload = loadPage;
