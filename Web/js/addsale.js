function addSale() {
    // Obtén los valores de los campos
    let saleDate = document.getElementById("input-sale-date").value;
    let quantitySold = document.getElementById("input-quantity-sold").value;
    let unitPrice = document.getElementById("input-unit-price").value;
    let customerName = document.getElementById("input-customer-name").value;
    let liqourName = document.getElementById("input-liqour-name").value;

    // Crea el objeto de venta
    let saleData = {
        saleDate: saleDate,
        quantitySold: parseInt(quantitySold),
        unitPrice: parseFloat(unitPrice),
        customerName: customerName,
        liqourName: liqourName
    };

    // URL de la API
    let url = 'http://localhost:8080/ProyectoFinal/rest/ManagementSale/createSale';

    // Envía la solicitud a la API
    fetch(url, {
        method: 'POST',
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
        alert("Se agregó la venta con éxito.");
        window.location.href = "./dashboard.html";
    })
    .catch(error => {
        console.error('Ocurrió el siguiente error con la operación: ', error);
    });
}
