document.addEventListener("DOMContentLoaded", function () {
    // Obtenemos referencias a los elementos del DOM
    const transactionForm = document.getElementById("transaction-form");
    const expenseForm = document.getElementById("expense-form");
    const transactionList = document.getElementById("transaction-list");
    const totalIngresosElement = document.getElementById("total-ingresos");
    const totalGastosElement = document.getElementById("total-gastos");
    const ahorroElement = document.getElementById("ahorro");
    const overlay = document.querySelector(".overlay");
    const loaders = document.querySelectorAll(".loader, .loader2");



    ///////////////////////////////////////////////////////////////////////////
    //////////////////////////  LOADER  /////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Función de Loader

    setTimeout(function () {
        overlay.style.display = "none";
        loaders.forEach(function (loader) {
            loader.style.display = "none";
        });
        content.style.display = "block";
    }, 200);


    // Obtén el nombre de la página actual
    var currentPage = window.location.pathname.split("/").pop();

    // Verifica si la página actual es "inicio.html"
    if (currentPage === "manualUsuario.html") {
        // Si es así, cambia el fondo del elemento con id "inicio"
        document.getElementById("soporte").style.backgroundColor = "rgb(246, 181, 29)";
        document.getElementById("soporte").style.color = "#333";
    };



    ///////////////////////////////////////////////////////////////////////////
    //////////////////////////  SUBMENU  /////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Obtiene el elemento del enlace "seguridad"
    var SeguLink = document.getElementById('seguridad');
    var PerfilLink = document.getElementById('perfil');
    var SoporteLink = document.getElementById('soporte');

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

    ///////////////////////////////////////////////////////////////////////////
    //////////////////////////  confirmacion eliminar transacción  ////////////
    ///////////////////////////////////////////////////////////////////////////

    window.eliminarTransaccion = function (id) {
        // Muestra el modal de confirmación
        const confirmationModal = document.getElementById("confirmationModal");
        confirmationModal.style.display = "block";

        // Configura los botones de confirmación y cancelación
        const confirmDeleteButton = document.getElementById("confirmDelete");
        const cancelDeleteButton = document.getElementById("cancelDelete");

        // Agrega un manejador de eventos al botón de confirmación
        confirmDeleteButton.addEventListener("click", function () {
            // Filtramos la transacción con el ID especificado
            const transaccionAEliminar = transactions.find((transaction) => transaction.id === id);

            // Eliminamos la transacción del array
            transactions.splice(transactions.indexOf(transaccionAEliminar), 1);

            // Actualizamos la tabla y los totales
            updateTransactionTable();

            // Ocultamos el modal de confirmación
            confirmationModal.style.display = "none";
        });

        // Agrega un manejador de eventos al botón de cancelación
        cancelDeleteButton.addEventListener("click", function () {
            // Ocultamos el modal de confirmación sin hacer nada
            confirmationModal.style.display = "none";
        });
    };


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
