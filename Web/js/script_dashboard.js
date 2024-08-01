document.addEventListener('DOMContentLoaded', function () {
    console.log("Script cargado");

    const menuLinks = document.querySelectorAll('.nav-link');
    menuLinks.forEach(link => {
        link.addEventListener('click', function () {
            console.log("Enlace de menú clickeado");
            menuLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        });
    });
});

document.getElementById('button-liqours').addEventListener('click', function(event) {
    event.preventDefault(); /* Evita el comportamiento predeterminado */
    console.log("Botón de licores clickeado");
    loadLiqours();
});

function loadLiqours() {
    console.log("Cargando licores");

    const content = document.getElementById('content');

    const cardAdd = document.createElement('div');
    cardAdd.className = 'card';

    const cardBodyAdd = document.createElement('div');
    cardBodyAdd.className = 'card-body';

    const btnAdd = document.createElement('a');
    btnAdd.className = 'btn btn-primary';
    btnAdd.href = './addliqour.html';

    const imgAdd = document.createElement('img');
    imgAdd.src = 'resources/Liqour_a.png';

    const lblAdd = document.createElement('h3');
    lblAdd.textContent = '¡Puedes agregar nuevos licores!';

    /** Se agrega el ícono al botón */
    btnAdd.appendChild(imgAdd);

    /** Se agrega botón y título al cuerpo de la carta */
    cardBodyAdd.appendChild(btnAdd);
    cardBodyAdd.appendChild(lblAdd);

    cardAdd.appendChild(cardBodyAdd);
    content.appendChild(cardAdd);

    fetch('http://localhost:8080/ProyectoFinal/rest/ManagementLiqour/getLiqours')
    .then(response => response.json())
    .then((data) => {
        console.log("Datos de licores:", data); 
        const content = document.getElementById('content');
        data.forEach(liqour => {
            const card = document.createElement('div');
            card.className = 'card';

            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';

            /** Se hace la creación de cada componente */
            const name = document.createElement('h2');
            name.className = 'card-title';
            name.textContent = liqour.name;

            const type = document.createElement('p');
            type.className = 'card-text';
            type.textContent = `Tipo: ${liqour.type}`;

            const brand = document.createElement('p');
            brand.className = 'card-text';
            brand.textContent = `Marca: ${liqour.brand}`;

            const alcoholContent = document.createElement('p');
            alcoholContent.className = 'card-text';
            alcoholContent.textContent = `Contenido de alcohol: ${liqour.alcoholContent}`;

            const countryOfOrigin = document.createElement('p');
            countryOfOrigin.className = 'card-text';
            countryOfOrigin.textContent = `País de origen: ${liqour.countryOfOrigin}`;

            const buttonGroup = document.createElement('div');
            buttonGroup.className = 'button-group';

            const btnEliminar = document.createElement('button');
            btnEliminar.className = 'btn-danger';
            btnEliminar.id = `btn-delete-${liqour.name}`;
            btnEliminar.textContent = `Eliminar`;
            btnEliminar.setAttribute('data-name', liqour.name);

            btnEliminar.addEventListener('click', function() {
                const liqourName = this.getAttribute('data-name');
                deleteLiqourByName(liqourName);
            });

            const btnActualizar = document.createElement('a');
            btnActualizar.className = 'btn-success margin';
            btnActualizar.id = `btn-update-${liqour.name}`;
            btnActualizar.textContent = `Actualizar`;

            btnActualizar.addEventListener('click', function() {
                localStorage.setItem("liqourData", JSON.stringify(liqour));
                window.location.href = "./updatepage.html";
            });

            // Agregar el botón Consultar
            const btnConsultar = document.createElement('a');
            btnConsultar.className = 'btn-info margin';
            btnConsultar.id = `btn-consult-${liqour.name}`;
            btnConsultar.textContent = `Consultar`;

            btnConsultar.addEventListener('click', function() {
                localStorage.setItem("liqourData", JSON.stringify(liqour));
                window.location.href = "./consultpage.html";
            });

            buttonGroup.appendChild(btnEliminar);
            buttonGroup.appendChild(btnActualizar);
            buttonGroup.appendChild(btnConsultar);

            cardBody.appendChild(name);
            cardBody.appendChild(type);
            cardBody.appendChild(brand);
            cardBody.appendChild(alcoholContent);
            cardBody.appendChild(countryOfOrigin);

            cardBody.appendChild(buttonGroup);

            card.appendChild(cardBody);
            content.appendChild(card);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function cleanContent(){
    console.log("Limpiando contenido");
    const content = document.getElementById('content');
    content.innerHTML = "";
}

function deleteLiqourByName(name){
    console.log("Eliminando licor con nombre:", name);
    let url = `http://localhost:8080/ProyectoFinal/rest/ManagementLiqour/deleteLiqour?name=${name}`;
    fetch(url, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Ocurrió un error en la respuesta del servidor: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        alert("Se eliminó el registro");
        cleanContent();
        loadLiqours();
    })
    .catch(error => {
        console.error('Ocurrió el siguiente error con la operación: ', error);
    });
}
