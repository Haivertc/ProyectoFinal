function validateUser() {
    let userName = document.getElementById("txt-nameUser").value.trim();
    let password = document.getElementById("txt-password").value.trim();

    // Validar campos
    if (!userName || !password) {
        alert("Por favor, ingresa tanto el nombre de usuario como la contraseña.");
        return;
    }

    // Crear la URL para la solicitud
    let url = `http://localhost:8080/ProyectoFinal/rest/ManagementUser/validateUser?nameUser=${encodeURIComponent(userName)}&password=${encodeURIComponent(password)}`;

    fetch(url, {
        method: 'GET' // Usamos GET para la validación del usuario
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor: ' + response.statusText);
        }
        return response.json(); // Asumimos que la respuesta será JSON
    })
    .then(data => {
        if (data) { // Asumiendo que la respuesta es un Booleano
            window.location.href = "./dashboard.html";
        } else {
            alert("Nombre de usuario o contraseña incorrectos.");
        }
    })
    .catch(error => console.error('Error:', error));
}
