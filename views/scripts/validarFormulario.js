function validarRegistro() {
    const pass = document.querySelector('input[name="password"]').value.trim();
    const confirm = document.querySelector('input[name="confirmPassword"]').value.trim();
    const terminos = document.getElementById('terminos').checked;

    if (pass !== confirm) {
        alert("Las contraseñas no coinciden.");
        return false;
    }

    if (!terminos) {
        alert("Debe aceptar los términos y condiciones.");
        return false;
    }
    return true;
}

function validarInicioSesion() {
    const email = document.querySelector('input[name="email"]').value.trim();
    const password = document.querySelector('input[name="password"]').value.trim();
            
    if (!email || !password) {
        alert("Por favor, complete todos los campos.");
        return false;
    }
    return true;
}