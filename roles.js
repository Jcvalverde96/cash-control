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
    //////////////////////////  SIDEBAR A  /////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Obtén el nombre de la página actual
    var currentPage = window.location.pathname.split("/").pop();
    if (currentPage === "roles.html") {

        document.getElementById("seguridad").style.backgroundColor = "rgb(246, 181, 29)";
        document.getElementById("seguridad").style.color = "#333";
    }

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


    ///////////////////////////////////////////////////////////////////////////
    //////////////////////////  NOTIFICACIÓN  /////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Obtén el formulario
    const userForm = document.getElementById('filter-form');

    // Añade un event listener al formulario para el evento submit
    userForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Evita que el formulario se envíe por defecto

        // Añade la lógica para añadir un nuevo usuario aquí

        // Muestra la notificación
        mostrarNotificacion('Usuario registrado con éxito');
    });

    // Función para mostrar la notificación
    function mostrarNotificacion(message) {
        const notification = document.querySelector('.notification');
        const notificationMessage = document.getElementById('notification-message');

        // Cambia el mensaje de la notificación
        notificationMessage.textContent = message;

        // Muestra la notificación
        notification.style.display = 'block';

        // Resetea los valores del formulario
        userForm.reset();

        // Después de un tiempo, oculta la notificación
        setTimeout(function () {
            notification.style.display = 'none';
        }, 5000); // 3000 milisegundos (3 segundos) de duración
    }

    /*#######################################################################*/
    /*############################## Menú Usuario #################################*/
    /*#######################################################################*/


    var nomUsuario = document.querySelector(".nomUsuario");
    var dropdownMenu = document.getElementById("dropdownMenu");

    nomUsuario.addEventListener("click", function () {
        dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
    });

    // Cierra el menú desplegable si haces clic fuera de él
    document.addEventListener("click", function (event) {
        if (!nomUsuario.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.style.display = "none";
        }
    });



});
