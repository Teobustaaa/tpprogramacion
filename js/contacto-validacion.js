document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formulario");

    const nombre = document.getElementById("nombreContacto");
    const email = document.getElementById("mail");
    const telefono = document.getElementById("telefono");
    const check = document.getElementById("acepto");

    const mensajeNombre = document.getElementById("mensaje-nombre");
    const mensajeEmail = document.getElementById("mensaje-email");
    const mensajeTelefono = document.getElementById("mensaje-telefono");
    const mensajeCheck = document.getElementById("mensaje-check");

    function validarNombre() {
        if (nombre.value.trim().length < 3) {
            mensajeNombre.textContent = "El nombre debe tener al menos 3 caracteres";
            nombre.classList.add("is-invalid");
            nombre.classList.remove("is-valid");
            return false;
        }
        mensajeNombre.textContent = "";
        nombre.classList.add("is-valid");
        nombre.classList.remove("is-invalid");
        return true;
    }

    function validarEmail() {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(email.value)) {
            mensajeEmail.textContent = "El email no es válido";
            email.classList.add("is-invalid");
            email.classList.remove("is-valid");
            return false;
        }
        mensajeEmail.textContent = "";
        email.classList.add("is-valid");
        email.classList.remove("is-invalid");
        return true;
    }

    function validarTelefono() {
        if (!/^\d{8,15}$/.test(telefono.value)) {
            mensajeTelefono.textContent = "Debe contener entre 8 y 15 números";
            telefono.classList.add("is-invalid");
            telefono.classList.remove("is-valid");
            return false;
        }
        mensajeTelefono.textContent = "";
        telefono.classList.add("is-valid");
        telefono.classList.remove("is-invalid");
        return true;
    }

    function validarCheck() {
        if (!check.checked) {
            mensajeCheck.textContent = "Debes aceptar que te contacten";
            check.classList.add("is-invalid");
            check.classList.remove("is-valid");
            return false;
        }
        mensajeCheck.textContent = "";
        check.classList.add("is-valid");
        check.classList.remove("is-invalid");
        return true;
    }

    nombre.addEventListener("input", validarNombre);
    email.addEventListener("input", validarEmail);
    telefono.addEventListener("input", validarTelefono);
    check.addEventListener("change", validarCheck);

    form.addEventListener("submit", function (e) {
        let valido = true;

        if (!validarNombre()) valido = false;
        if (!validarEmail()) valido = false;
        if (!validarTelefono()) valido = false;
        if (!validarCheck()) valido = false;

        if (!valido) {
            e.preventDefault();
        }
    });
});
