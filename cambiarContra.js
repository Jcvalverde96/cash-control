document.addEventListener('DOMContentLoaded', function () {

    ///////////////////////////////////////////////////////////////////////////
    //////////////////////////  LOADER  /////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    const overlay = document.querySelector(".overlay");
    const loaders = document.querySelectorAll(".loader");


    // Simula una demora de medio segundo
    setTimeout(function () {
        overlay.style.display = "none"; // Oculta el fondo oscuro
        loaders.forEach(function (loader) {
            loader.style.display = "none"; // Oculta el loader
        });
        content.style.display = "block"; // Muestra el contenido
    }, 200); // segundos) de demora


    ///////////////////////////////////////////////////////////////////////////
    //////////////////////////  SUBMENU  /////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Obtiene el elemento del enlace "seguridad"
    var SeguLink = document.getElementById('seguridad');
    var PerfilLink = document.getElementById('perfil');
    var SoporteLink = document.getElementById('soporte');

    SoporteLink.addEventListener('click', function (event) {
        // Evita el comportamiento predeterminado del enlace
        event.preventDefault();

        // Obtiene el elemento del submenú
        var submenuSoporte = document.querySelector('.submenuSoporte');

        // Cambia la propiedad de visibilidad del submenú
        submenuSoporte.style.display = (submenuSoporte.style.display === 'block') ? 'none' : 'block';

        // Obtiene el elemento del ícono de flecha
        var SoporteIcon = SoporteLink.querySelector('.fas.fa-angle-right');

        // Cambia la clase de rotación del ícono de flecha
        SoporteIcon.classList.toggle('rotate');
    });

    // Añade un event listener para el clic en "seguridad"
    SeguLink.addEventListener('click', function (event) {
        // Evita el comportamiento predeterminado del enlace
        event.preventDefault();

        // Obtiene el elemento del submenú
        var submenuSeguridad = document.querySelector('.submenuSeguridad');

        // Cambia la propiedad de visibilidad del submenú
        submenuSeguridad.style.display = (submenuSeguridad.style.display === 'block') ? 'none' : 'block';

        // Obtiene el elemento del ícono de flecha
        var SeguIcon = SeguLink.querySelector('.fas.fa-angle-right');

        // Cambia la clase de rotación del ícono de flecha
        SeguIcon.classList.toggle('rotate');
    });

    PerfilLink.addEventListener('click', function (event) {
        // Evita el comportamiento predeterminado del enlace
        event.preventDefault();

        // Obtiene el elemento del submenú
        var submenuPerfil = document.querySelector('.submenuPerfil');

        // Cambia la propiedad de visibilidad del submenú
        submenuPerfil.style.display = (submenuPerfil.style.display === 'block') ? 'none' : 'block';

        // Obtiene el elemento del ícono de flecha
        var PerfilIcon = PerfilLink.querySelector('.fas.fa-angle-right');

        // Cambia la clase de rotación del ícono de flecha
        PerfilIcon.classList.toggle('rotate');
    });

/*#######################################################################*/
/*############################## Menú Usuario #################################*/
/*#######################################################################*/


var nomUsuario = document.querySelector(".nomUsuario");
var dropdownMenu = document.getElementById("dropdownMenu");

nomUsuario.addEventListener("click", function() {
    dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
});

// Cierra el menú desplegable si haces clic fuera de él
document.addEventListener("click", function(event) {
    if (!nomUsuario.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.style.display = "none";
    }
});

});
