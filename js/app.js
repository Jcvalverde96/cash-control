
function formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1; // Suma 1 porque los meses comienzan en 0
    const year = date.getFullYear();

    const formattedDay = day < 10 ? '0' + day : day;
    const formattedMonth = month < 10 ? '0' + month : month;

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

    let saldo = 0;
    let transacciones = [];

    const overlay = document.querySelector(".overlay");
    const loaders = document.querySelectorAll(".loader, .loader2");

    setTimeout(function () {
        overlay.style.display = "none";
        loaders.forEach(function (loader) {
            loader.style.display = "none";
        });
        content.style.display = "block";
    }, 500);

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
        showNotification("En estos momentos CARLOS está cagando. Disculpe las molestias.");
    }

    function agregarGasto(descripcion, monto, fecha, tipo) {
        agregarTransaccion(descripcion, -monto, fecha, tipo);
        showNotification("Gasto añadido con éxito");
    }

    function eliminarTransaccion(index) {
        const transaccion = transacciones[index];
        if (transaccion) {
            saldo -= transaccion.monto;
            transacciones.splice(index, 1);
            actualizarSaldo();
            calcularTotales();
            actualizarTablaTransacciones();
            actualizarGrafico();
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
                <td><button class="delete-button" data-index="${index}" title="Eliminar Transacción"><i class="fas fa-trash-alt"></i> </button></td>
            `;
            transactionList.appendChild(row);
        });

        setDeleteButtonListeners();
    }

    const confirmationModal = document.getElementById('confirmationModal');
    const confirmDeleteButton = document.getElementById('confirmDelete');
    const cancelDeleteButton = document.getElementById('cancelDelete');
    let deletingIndex = -1;

    function setDeleteButtonListeners() {
        const deleteButtons = document.querySelectorAll('.delete-button');
        deleteButtons.forEach(function (button) {
            button.addEventListener('click', function () {
                const index = button.getAttribute('data-index');
                deletingIndex = parseInt(index);
                showDeleteConfirmation();
            });
        });
    }

    function showDeleteConfirmation() {
        confirmationModal.style.display = 'block';
    }

    cancelDeleteButton.addEventListener('click', function () {
        confirmationModal.style.display = 'none';
        deletingIndex = -1;
    });

    confirmDeleteButton.addEventListener('click', function () {
        if (deletingIndex >= 0) {
            eliminarTransaccion(deletingIndex);
            confirmationModal.style.display = 'none';
            deletingIndex = -1;
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

    cargarTransaccionesDesdeLocalStorage();
    actualizarSaldo();
    calcularTotales();
    actualizarTablaTransacciones();

    transactionForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const descripcion = descriptionInput.value;
        const monto = parseFloat(amountInput.value);
        const fecha = new Date(transactionDateInput.value);
        const tipo = 'I';
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
        const tipo = 'G';
        if (isNaN(monto)) {
            alert('Por favor, ingrese un monto válido.');
            return;
        }
        agregarGasto(descripcion, monto, fecha, tipo);
        expenseDescriptionInput.value = '';
        expenseAmountInput.value = '';
        expenseDateInput.value = '';
    });

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
