document.addEventListener('DOMContentLoaded', function () {

    ///////////////////////////////////////////////////////////////////////////
    //////////////////////////  LOADER  /////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    const overlay = document.querySelector(".overlay");
    const loaders = document.querySelectorAll(".loader");


    // Simula una demora de 2 segundos
    setTimeout(function () {
        overlay.style.display = "none"; // Oculta el fondo oscuro
        loaders.forEach(function (loader) {
            loader.style.display = "none"; // Oculta el loader
        });
        content.style.display = "block"; // Muestra el contenido
    }, 500); // segundos) de demora


    ///////////////////////////////////////////////////////////////////////////
    //////////////////////////  SIDEBAR  /////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Obtener los elementos del DOM
    const toggleBtn = document.getElementById("btn");
    const sidebar = document.getElementById("mySidebar");
    const content = document.querySelector(".content");
    const footer = document.querySelector(".footer");


    // Función para abrir/cerrar el sidebar
    function toggleSidebar() {
        if (sidebar.style.width === "180px") {
            sidebar.style.width = "0";
            content.style.marginLeft = "0";
            footer.style.marginLeft = "0px";
            toggleBtn.style.marginLeft = "0px";

        } else {
            sidebar.style.width = "180px";
            content.style.marginLeft = "180px";
            footer.style.marginLeft = "0px"
            toggleBtn.style.marginLeft = "180px";

        }
    }

    // Agregar escuchadores de eventos al botón para abrir/cerrar el sidebar
    toggleBtn.addEventListener("click", toggleSidebar);


    ///////////////////////////////////////////////////////////////////////////
    //////////////////////////    /////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////


});