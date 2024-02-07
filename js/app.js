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


    ///////////////////////////////////////////////////////////////////////////
    //////////////////////////  FORMATEO DE FECHA  ////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Función para formatear la fecha en formato dd/mm/aa
    function formatearFecha(fecha) {
        const date = new Date(fecha);
        const dia = date.getDate().toString().padStart(2, '0');
        const mes = (date.getMonth() + 1).toString().padStart(2, '0'); // Los meses comienzan desde 0
        const año = date.getFullYear().toString().slice(2);

        return `${dia}/${mes}/${año}`;
    }


    ///////////////////////////////////////////////////////////////////////////
    //////////////////////////  TRANSACCIONES  ////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Array para almacenar transacciones
    const transactions = [];

    // Función para actualizar la tabla de transacciones
    function updateTransactionTable() {
        // Limpiamos la tabla antes de actualizarla
        transactionList.innerHTML = "";

        // Iteramos sobre las transacciones y las agregamos a la tabla
        transactions.forEach(function (transaction) {
            const row = document.createElement("tr");
            row.innerHTML = `
          <td>${transaction.tipo}</td>
          <td>${transaction.descripcion}</td>
          <td>${transaction.cantidad} €</td>
          <td>${transaction.fecha}</td>
          <td>
            <button class="delete-button" onclick="eliminarTransaccion(${transaction.id})"><i class='fas fa-trash-alt'></i></button>
            <button class="edit-button" onclick="editarTransaccion(${transaction.id})"><i class='fas fa-edit'></i></button>
          </td>
        `;
            transactionList.appendChild(row);
        });

        // Actualizamos los totales
        updateTotals();
    }

    // Función para actualizar los totales de ingresos, gastos y ahorro
    function updateTotals() {
        let totalIngresos = 0;
        let totalGastos = 0;

        // Calculamos los totales sumando los ingresos y restando los gastos
        transactions.forEach(function (transaction) {
            if (transaction.tipo === "Ingreso") {
                totalIngresos += transaction.cantidad;
            } else {
                totalGastos += transaction.cantidad;
            }
        });

        // Calculamos el ahorro restando los gastos totales de los ingresos totales
        const ahorro = totalIngresos - totalGastos;

        // Actualizamos los elementos en el DOM
        totalIngresosElement.textContent = `${totalIngresos} €`;
        totalGastosElement.textContent = `${totalGastos} €`;
        ahorroElement.textContent = `${ahorro} €`;
    }

    // Función para agregar una transacción con notificación
    function agregarTransaccionConNotificacion(tipo, descripcion, cantidad, fecha) {
        const nuevaTransaccion = {
            id: transactions.length + 1,
            tipo: tipo,
            descripcion: descripcion,
            cantidad: parseFloat(cantidad),
            fecha: formatearFecha(fecha), // Formateamos la fecha usando la nueva función
        };

        // Agregamos la transacción al array
        transactions.push(nuevaTransaccion);

        // Actualizamos la tabla y los totales
        updateTransactionTable();

        // Mostramos la notificación
        mostrarNotificacion(`${tipo} agregado con éxito.`);
    }

    // Función para mostrar la notificación con icono y cerrar al hacer clic
    function mostrarNotificacion(mensaje) {
        const notificationElement = document.getElementById("notification");
        const notificationMessageElement = document.getElementById("notification-message");

        // Cambiamos el mensaje de la notificación con el icono
        notificationMessageElement.innerHTML = `<i class="fa fa-check"></i> ${mensaje}`;

        // Mostramos la notificación
        notificationElement.style.display = "block";

        // Ocultamos la notificación después de 5 segundos
        setTimeout(function () {
            ocultarNotificacion();
        }, 5000);

        // Agregamos un evento de clic para cerrar la notificación al hacer clic en ella
        notificationElement.addEventListener("click", function () {
            ocultarNotificacion();
        });
    }

    // Función para ocultar la notificación
    function ocultarNotificacion() {
        const notificationElement = document.getElementById("notification");
        // Ocultamos la notificación
        notificationElement.style.display = "none";
    }

    // Modificamos la función agregarTransaccion para utilizar agregarTransaccionConNotificacion
    function agregarTransaccion(tipo, descripcion, cantidad, fecha) {
        agregarTransaccionConNotificacion(tipo, descripcion, cantidad, fecha);

        // Limpiamos el formulario
        if (tipo === "Ingreso") {
            transactionForm.reset();
        } else {
            expenseForm.reset();
        }
    }


    // Función para eliminar una transacción
    window.eliminarTransaccion = function (id) {
        // Filtramos la transacción con el ID especificado
        const transaccionAEliminar = transactions.find((transaction) => transaction.id === id);

        // Eliminamos la transacción del array
        transactions.splice(transactions.indexOf(transaccionAEliminar), 1);

        // Actualizamos la tabla y los totales
        updateTransactionTable();
    };

    // Manejador de eventos para el formulario de ingresos
    transactionForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const tipo = "Ingreso";
        const descripcion = document.getElementById("description").value;
        const cantidad = document.getElementById("amount").value;
        const fecha = document.getElementById("transaction-date").value;

        // Verificamos que la cantidad sea un número válido
        if (!isNaN(parseFloat(cantidad))) {
            agregarTransaccion(tipo, descripcion, cantidad, fecha);

            // Limpiamos el formulario
            transactionForm.reset();
        } else {
            alert("Por favor, ingrese una cantidad válida.");
        }
    });

    // Manejador de eventos para el formulario de gastos
    expenseForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const tipo = "Gasto";
        const descripcion = document.getElementById("expense-description").value;
        const cantidad = document.getElementById("expense-amount").value;
        const fecha = document.getElementById("expense-date").value;

        // Verificamos que la cantidad sea un número válido
        if (!isNaN(parseFloat(cantidad))) {
            agregarTransaccion(tipo, descripcion, cantidad, fecha);

            // Limpiamos el formulario
            expenseForm.reset();
        } else {
            alert("Por favor, ingrese una cantidad válida.");
        }
    });

    // Obtén el nombre de la página actual
    var currentPage = window.location.pathname.split("/").pop();

    // Verifica si la página actual es "inicio.html"
    if (currentPage === "index.html") {
        // Si es así, cambia el fondo del elemento con id "inicio"
        document.getElementById("inicio").style.backgroundColor = "rgb(246, 181, 29)";
        document.getElementById("inicio").style.color = "#333";
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
