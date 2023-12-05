document.addEventListener('DOMContentLoaded', function () {

    ///////////////////////////////////////////////////////////////////////////
    //////////////////////////  LOADER  /////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    const overlay = document.querySelector(".overlay");
    const loaders = document.querySelectorAll(".loader, .loader2");


    // Simula una demora de 2 segundos
    setTimeout(function () {
        overlay.style.display = "none"; // Oculta el fondo oscuro
        loaders.forEach(function (loader) {
            loader.style.display = "none"; // Oculta el loader
        });
        content.style.display = "block"; // Muestra el contenido
    }, 500); // segundos) de demora


    ///////////////////////////////////////////////////////////////////////////
    //////////////////////////  SIDEBAR A  /////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Obtén el nombre de la página actual
    var currentPage = window.location.pathname.split("/").pop();
    if (currentPage === "soporte.html") {

        document.getElementById("soporte").style.backgroundColor = "rgb(246, 181, 29)";
        document.getElementById("soporte").style.color = "#333";
    }

        ///////////////////////////////////////////////////////////////////////////
    //////////////////////////  SUBMENU  /////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Obtiene el elemento del enlace "Configuración"
    var configLink = document.getElementById('configuracion');

    // Añade un event listener para el clic en "Configuración"
    configLink.addEventListener('click', function (event) {
        // Evita el comportamiento predeterminado del enlace
        event.preventDefault();

        // Obtiene el elemento del submenú
        var submenu = document.querySelector('.submenu');

        // Cambia la propiedad de visibilidad del submenú
        submenu.style.display = (submenu.style.display === 'block') ? 'none' : 'block';

        // Obtiene el elemento del ícono de flecha
        var cogIcon = configLink.querySelector('.material-icons');

        // Cambia la clase de rotación del ícono de flecha
        cogIcon.classList.toggle('rotate');
    });
});
