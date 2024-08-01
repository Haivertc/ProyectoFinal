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
    btnAdd.href = './addliquor.html'; // Asegúrate de tener esta página en tu proyecto

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
        console.log("Datos de licores:", data); // Verifica que los datos de licores se están obteniendo correctamente
        const content = document.getElementById('content');
        data.forEach(liquor => {
            const card = document.createElement('div');
            card.className = 'card';

            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';

            /** Se hace la creación de cada componente */
            const name = document.createElement('h2');
            name.className = 'card-title';
            name.textContent = liquor.name;

            const type = document.createElement('p');
            type.className = 'card-text';
            type.textContent = `Tipo: ${liquor.type}`;

            const brand = document.createElement('p');
            brand.className = 'card-text';
            brand.textContent = `Marca: ${liquor.brand}`;

            const alcoholContent = document.createElement('p');
            alcoholContent.className = 'card-text';
            alcoholContent.textContent = `Contenido de alcohol: ${liquor.alcoholContent}`;

            const countryOfOrigin = document.createElement('p');
            countryOfOrigin.className = 'card-text';
            countryOfOrigin.textContent = `País de origen: ${liquor.countryOfOrigin}`;

            const btnEliminar = document.createElement('button');
            btnEliminar.className = 'btn-danger';
            btnEliminar.id = `btn-delete-${liquor.name}`;
            btnEliminar.textContent = `Eliminar`;
            btnEliminar.setAttribute('data-name', liquor.name);

            btnEliminar.addEventListener('click', function() {
                const liquorName = this.getAttribute('data-name');
                deleteLiquorByName(liquorName);
            });

            const btnActualizar = document.createElement('a');
            btnActualizar.className = 'btn-success margin';
            btnActualizar.id = `btn-update-${liquor.name}`;
            btnActualizar.textContent = `Actualizar`;

            btnActualizar.addEventListener('click', function() {
                localStorage.setItem("liquorData", JSON.stringify(liquor));
                window.location.href = "./updatepage.html";
            });

            cardBody.appendChild(name);
            cardBody.appendChild(type);
            cardBody.appendChild(brand);
            cardBody.appendChild(alcoholContent);
            cardBody.appendChild(countryOfOrigin);
            cardBody.appendChild(btnEliminar);
            cardBody.appendChild(btnActualizar);

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

function deleteLiquorByName(name){
    console.log("Eliminando licor con nombre:", name);
    let url = `http://localhost:8080/ProyectoFinal/rest/ManagementLiqour/deleteLiquor?name=${name}`;
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
