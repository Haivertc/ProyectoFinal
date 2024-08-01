let codeLiqour = "";

function loadPage() {
    console.log("Cargando página...");
    let localStorageLiqour = localStorage.getItem("liqourData");
    if (!localStorageLiqour) {
        console.error("No se encontró 'liqourData' en localStorage.");
        return;
    }
    let liqourData = JSON.parse(localStorageLiqour);
    console.log("Datos del licor:", liqourData);

    codeLiqour = liqourData.code;
    document.getElementById("input-name-liqour").value = liqourData.name;
    document.getElementById("input-type-liqour").value = liqourData.type;
    document.getElementById("input-brand-liqour").value = liqourData.brand;
    document.getElementById("input-alcohol-content").value = liqourData.alcoholContent;
    document.getElementById("input-country-of-origin").value = liqourData.countryOfOrigin;
}

function updateLiqour() {
    let name = document.getElementById("input-name-liqour").value;
    let type = document.getElementById("input-type-liqour").value;
    let brand = document.getElementById("input-brand-liqour").value;
    let alcoholContent = document.getElementById("input-alcohol-content").value;
    let countryOfOrigin = document.getElementById("input-country-of-origin").value;

    // Validar campos
    if (!name || !type || !brand || isNaN(alcoholContent) || !countryOfOrigin) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    let liqourData = {
        code: codeLiqour,
        name: name,
        type: type,
        brand: brand,
        alcoholContent: parseFloat(alcoholContent),
        countryOfOrigin: countryOfOrigin
    };

    let url = 'http://localhost:8080/ProyectoFinal/rest/ManagementLiqour/updateLiqour';

    fetch(url, {
        method: 'PUT',
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
