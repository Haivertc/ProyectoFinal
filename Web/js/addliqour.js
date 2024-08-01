function addLiqour() {
    let name = document.getElementById("input-name-liqour").value;
    let type = document.getElementById("input-type-liqour").value;
    let brand = document.getElementById("input-brand-liqour").value;
    let alcoholContent = document.getElementById("input-alcohol-content").value;
    let countryOfOrigin = document.getElementById("input-country-of-origin").value;
    
    let liqourData = {
        name: name,
        type: type,
        brand: brand,
        alcoholContent: parseFloat(alcoholContent),
        countryOfOrigin: countryOfOrigin
    };

    let url = 'http://localhost:8080/ProyectoFinal/rest/ManagementLiqour/createLiqour';

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(liqourData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Ocurrió un error en la respuesta del servidor: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        alert("Se agregó el registro.");
        window.location.href = "./dashboard.html";
    })
    .catch(error => {
        console.error('Ocurrió el siguiente error con la operación: ', error);
    });
}
