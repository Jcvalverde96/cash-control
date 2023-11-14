/* 
  Este código es propiedad de [Juan Carlos Valverde Vita].
  Todos los derechos reservados.
  
  Fecha de Creación: [Sept/2023]
  Última Modificación: [16/10/2023]
*/

function formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1; // Suma 1 porque los meses comienzan en 0
    const year = date.getFullYear();

    // Asegúrate de que el día y el mes tengan dos dígitos
    const formattedDay = day < 10 ? '0' + day : day;
    const formattedMonth = month < 10 ? '0' + month : month;

    // Retorna la fecha en formato "dd/mm/aaaa"
    return formattedDay + '/' + formattedMonth + '/' + year;
}

document.addEventListener('DOMContentLoaded', function () {
    const saldoElement = document.getElementById('ahorro');
    const transactionList = document.getElementById('transaction-list');
    const transactionForm = document.getElementById('transaction-form');
    const descriptionInput = document.getElementById('description');
    const amountInput = document.getElementById('amount');
    const transactionDateInput = document.getElementById('transaction-date');
    const expenseForm = document.getElementById('expense-form');
    const expenseDescriptionInput = document.getElementById('expense-description');
    const expenseAmountInput = document.getElementById('expense-amount');
    const expenseDateInput = document.getElementById('expense-date');
    const totalIngresosElement = document.getElementById('total-ingresos');
    const totalGastosElement = document.getElementById('total-gastos');
    const chartCanvas = document.getElementById('myChart'); // Elemento del gráfico

    let saldo = 0;
    let transacciones = [];

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


    // Inicialización del gráfico
    const chartConfig = {
        type: 'bar',
        data: {
            labels: ['Ingresos', 'Gastos'],
            datasets: [{
                data: [0, 0],
                backgroundColor: ['#34a853', '#ea4335'],
            }],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    };

    // Comprueba si hay datos de gráfico almacenados en localStorage y cárgalos
    const chartDataStored = localStorage.getItem('chartData');
    if (chartDataStored) {
        chartConfig.data = JSON.parse(chartDataStored);
    }

    const myChart = new Chart(chartCanvas, chartConfig);

    function actualizarSaldo() {
        saldoElement.textContent = saldo.toFixed(2) + ' €';
    }

    function calcularTotales() {
        let totalIngresos = 0;
        let totalGastos = 0;

        transacciones.forEach(function (transaccion) {
            if (transaccion.monto > 0) {
                totalIngresos += transaccion.monto;
            } else {
                totalGastos -= transaccion.monto;
            }
        });

        totalIngresosElement.textContent = totalIngresos.toFixed(2) + ' €';
        totalGastosElement.textContent = totalGastos.toFixed(2) + ' €';
    }

    function agregarTransaccion(descripcion, monto, fecha, tipo) {
        const transaccion = {
            tipo: tipo,
            descripcion: descripcion,
            monto: monto,
            fecha: formatDate(fecha),
        };
        transacciones.push(transaccion);
        saldo += monto;
        actualizarSaldo();
        calcularTotales();
        actualizarTablaTransacciones();
        actualizarGrafico();
        guardarTransaccionesEnLocalStorage();
        showNotification("Ingreso añadido con éxito")


    }

    function agregarGasto(descripcion, monto, fecha, tipo) {
        agregarTransaccion(descripcion, -monto, fecha, tipo);
        showNotification("Gasto añadido con éxito")

    }


    function eliminarTransaccion(index) {
        const transaccion = transacciones[index];
        if (transaccion) {
            saldo -= transaccion.monto;
            transacciones.splice(index, 1);
            actualizarSaldo();
            calcularTotales();
            actualizarTablaTransacciones();
            actualizarGrafico(); // Actualiza el gráfico después de eliminar una transacción
            guardarTransaccionesEnLocalStorage();
        }
    }

    function actualizarTablaTransacciones() {
        transactionList.innerHTML = '';
        transacciones.forEach(function (transaccion, index) {
            const row = document.createElement('tr');
            const tipo = transaccion.tipo === 'I' ? 'Ingreso' : 'Gasto';
            const tipoBackgroundColor = transaccion.tipo === 'I' ? '#34A853' : '#EA4335';
            row.innerHTML = `
                <td style="background-color: ${tipoBackgroundColor}; color: white;">${tipo}</td>
                <td>${transaccion.descripcion}</td>
                <td>${transaccion.monto.toFixed(2)} €</td>
                <td>${transaccion.fecha}</td>
                <td><button class="delete-button" data-index="${index}"title="Eliminar Transacción"><i class="fas fa-trash-alt"></i> </button></td>
            `;
            transactionList.appendChild(row);
        });

        setDeleteButtonListeners();
    }
    const confirmationModal = document.getElementById('confirmationModal');
    const confirmDeleteButton = document.getElementById('confirmDelete');
    const cancelDeleteButton = document.getElementById('cancelDelete');

    let deletingIndex = -1

    function setDeleteButtonListeners() {
        const deleteButtons = document.querySelectorAll('.delete-button');
        deleteButtons.forEach(function (button) {
            button.addEventListener('click', function () {
                const index = button.getAttribute('data-index');
                deletingIndex = parseInt(index);
                showDeleteConfirmation(); // Muestra el mensaje de confirmación
            });
        });
    }

    function showDeleteConfirmation() {
        const confirmationModal = document.getElementById('confirmationModal');
        confirmationModal.style.display = 'block';
    }

    // Cierra el modal de confirmación al hacer clic en "Cancelar"
    cancelDeleteButton.addEventListener('click', function () {
        confirmationModal.style.display = 'none';
        deletingIndex = -1; // Restablece el índice
    });

    // Confirma la eliminación y cierra el modal
    confirmDeleteButton.addEventListener('click', function () {
        if (deletingIndex >= 0) {
            eliminarTransaccion(deletingIndex);
            confirmationModal.style.display = 'none';
            deletingIndex = -1; // Restablece el índice
        }
    });



    function guardarTransaccionesEnLocalStorage() {
        localStorage.setItem('transacciones', JSON.stringify(transacciones));
    }

    function cargarTransaccionesDesdeLocalStorage() {
        const transaccionesGuardadas = localStorage.getItem('transacciones');
        if (transaccionesGuardadas) {
            transacciones = JSON.parse(transaccionesGuardadas);
            saldo = 0;
            transacciones.forEach(function (transaccion) {
                saldo += transaccion.monto;
            });
        }
    }


    function actualizarGrafico() {
        let totalIngresos = 0;
        let totalGastos = 0;

        transacciones.forEach(function (transaccion) {
            if (transaccion.monto > 0) {
                totalIngresos += transaccion.monto;
            } else {
                totalGastos -= transaccion.monto;
            }
        });

        // Actualiza los datos del gráfico
        myChart.data.datasets[0].data = [totalIngresos, totalGastos];
        myChart.update();

        // Guarda los datos del gráfico en localStorage
        localStorage.setItem('chartData', JSON.stringify(myChart.data));
    }

    cargarTransaccionesDesdeLocalStorage();
    actualizarSaldo();
    calcularTotales();
    actualizarTablaTransacciones();

    transactionForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const descripcion = descriptionInput.value;
        const monto = parseFloat(amountInput.value);
        const fecha = new Date(transactionDateInput.value);
        const tipo = 'I'; // Tipo de transacción ingreso
        if (isNaN(monto)) {
            alert('Por favor, ingrese un monto válido.');
            return;
        }
        agregarTransaccion(descripcion, monto, fecha, tipo);
        descriptionInput.value = '';
        amountInput.value = '';
        transactionDateInput.value = '';
    });

    expenseForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const descripcion = expenseDescriptionInput.value;
        const monto = parseFloat(expenseAmountInput.value);
        const fecha = new Date(expenseDateInput.value);
        const tipo = 'G'; // Tipo de transacción gasto
        if (isNaN(monto)) {
            alert('Por favor, ingrese un monto válido.');
            return;
        }
        agregarGasto(descripcion, monto, fecha, tipo);
        expenseDescriptionInput.value = '';
        expenseAmountInput.value = '';
        expenseDateInput.value = '';
    });

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
            footer.style.marginLeft = "180px"
            toggleBtn.style.marginLeft = "180px";

        }
    }

    // Agregar escuchadores de eventos al botón para abrir/cerrar el sidebar
    toggleBtn.addEventListener("click", toggleSidebar);

    function exportToExcel() {
        const dataToExport = [
            ['Tipo', 'Descripción', 'Cantidad', 'Fecha'],
        ];

        // Agregar datos de transacciones a dataToExport
        transacciones.forEach(function (transaccion) {
            dataToExport.push([transaccion.tipo, transaccion.descripcion, transaccion.monto, transaccion.fecha]);
        });

        // Agregar fila con Ingresos Totales
        dataToExport.push(['', 'Ingresos Totales', '', totalIngresosElement.textContent]);

        // Agregar fila con Gastos Totales
        dataToExport.push(['', 'Gastos Totales', '', totalGastosElement.textContent]);

        // Agregar fila con Ahorro
        dataToExport.push(['', 'Ahorro', '', saldoElement.textContent]);

        // Crear un libro de Excel
        const ws = XLSX.utils.aoa_to_sheet(dataToExport);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Transacciones');

        // Generar un archivo Excel
        XLSX.writeFile(wb, 'mis_transacciones.xlsx');

    }

    // Asociar la función exportToExcel al botón de exportación
    const exportButton = document.getElementById('export-button');
    exportButton.addEventListener('click', exportToExcel);

    function showNotification(message) {
        const notification = document.getElementById('notification');
        const notificationMessage = document.getElementById('notification-message');
        const closeButton = document.getElementById('close-button');

        notificationMessage.textContent = message;
        notification.style.display = 'block';

        closeButton.addEventListener('click', () => {
            notification.style.display = 'none';
        });

        setTimeout(() => {
            notification.style.display = 'none';
        }, 5000);


    }


});