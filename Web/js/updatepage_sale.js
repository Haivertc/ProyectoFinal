document.addEventListener('DOMContentLoaded', function() {
    console.log("Script cargado");

    // Obtiene los datos del localStorage
    const saleData = JSON.parse(localStorage.getItem("saleData"));

    if (saleData) {
        // Rellena los campos con los datos del localStorage
        document.getElementById('input-sale-date').value = saleData.saleDate || '';
        document.getElementById('input-quantity-sold').value = saleData.quantitySold || '';
        document.getElementById('input-unit-price').value = saleData.unitPrice || '';
        document.getElementById('input-customer-name').value = saleData.customerName || '';
        document.getElementById('input-liqour-name').value = saleData.liqourName || '';
    }
});

function updateSale() {
    const saleDate = document.getElementById('input-sale-date').value;
    const quantitySold = document.getElementById('input-quantity-sold').value;
    const unitPrice = document.getElementById('input-unit-price').value;
    const customerName = document.getElementById('input-customer-name').value;
    const liqourName = document.getElementById('input-liqour-name').value;

    // Construir el objeto SaleDTO
    const saleDTO = {
        saleDate: saleDate,
        quantitySold: parseInt(quantitySold, 10),
        unitPrice: parseFloat(unitPrice),
        customerName: customerName,
        liqourName: liqourName
    };

    // Enviar los datos al servidor para actualizar la venta
    fetch('http://localhost:8080/ProyectoFinal/rest/ManagementSale/updateSale', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(saleDTO)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Venta actualizada:', data);
        alert("Venta actualizada exitosamente.");
        window.location.href = "./dashboard.html";
    })
    .catch(error => {
        console.error('Error al actualizar la venta:', error);
    });
}
