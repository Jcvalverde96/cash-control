document.addEventListener('DOMContentLoaded', function () {
    const loginButton = document.querySelector('.login-button');
    const overlay = document.querySelector(".overlay");
    const loaders = document.querySelectorAll(".loader, .loader2");

    loginButton.addEventListener('click', function () {
        
        // Redirige a index.html
        window.location.href = 'index.html';
    });

        // Simula una demora de 2 segundos
        setTimeout(function () {
            overlay.style.display = "none"; // Oculta el fondo oscuro
            loaders.forEach(function (loader) {
                loader.style.display = "none"; // Oculta el loader
            });
            content.style.display = "block"; // Muestra el contenido
        }, 500); // segundos) de demora
});