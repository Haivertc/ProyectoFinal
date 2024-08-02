let liqourName = "";  // Cambié el nombre de la variable para que se ajuste al nuevo contexto

function loadPage() {
    console.log("Cargando página...");
    let localStorageSale = localStorage.getItem("saleData");
    if (!localStorageSale) {
        console.error("No se encontró 'saleData' en localStorage.");
        return;
    }
    let saleData = JSON.parse(localStorageSale);
    console.log("Datos de la venta:", saleData);

    liqourName = saleData.liqourName;  // Utiliza el nombre del licor para identificar la venta
    document.getElementById("input-sale-date").value = saleData.saleDate;
    document.getElementById("input-quantity-sold").value = saleData.quantitySold;
    document.getElementById("input-unit-price").value = saleData.unitPrice;
    document.getElementById("input-customer-name").value = saleData.customerName;
    document.getElementById("input-liqour-name").value = saleData.liqourName;
}

function updateSale() {
    let saleDate = document.getElementById("input-sale-date").value;
    let quantitySold = document.getElementById("input-quantity-sold").value;
    let unitPrice = document.getElementById("input-unit-price").value;
    let customerName = document.getElementById("input-customer-name").value;
    let liqourName = document.getElementById("input-liqour-name").value;

    // Validar campos
    if (!saleDate || isNaN(quantitySold) || isNaN(unitPrice) || !customerName || !liqourName) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    let saleData = {
        saleDate: saleDate,
        quantitySold: parseInt(quantitySold, 10),
        unitPrice: parseFloat(unitPrice),
        customerName: customerName,
        liqourName: liqourName
    };

    let url = 'http://localhost:8080/ProyectoFinal/rest/ManagementSale/updateSaleAttribute';
    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(saleData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Ocurrió un error en la respuesta del servidor: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        alert("Se actualizó el registro.");
        window.location.href = "./dashboard.html";
    })
    .catch(error => {
        console.error('Ocurrió el siguiente error con la operación: ', error);
    });
}

window.onload = function() {
    loadPage();
};
