let username = ""; // Variable para almacenar el nombre de usuario

function loadPage() {
    let localStorageUser = localStorage.getItem("userData");
    if (!localStorageUser) {
        console.error("No se encontró 'userData' en localStorage.");
        return;
    }
    let userData = JSON.parse(localStorageUser);
    console.log("Datos del usuario:", userData);

    username = userData.username;
    document.getElementById("input-nameUser").value = userData.nameUser;
    document.getElementById("input-password").value = userData.password;
}

function goBack() {
    window.history.back();
}

function togglePassword() {
    const passwordInput = document.getElementById('input-password');
    const togglePassword = document.getElementById('togglePassword');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        togglePassword.classList.remove('fa-eye');
        togglePassword.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        togglePassword.classList.remove('fa-eye-slash');
        togglePassword.classList.add('fa-eye');
    }
}

window.onload = loadPage;
