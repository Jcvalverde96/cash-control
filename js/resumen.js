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
    //////////////////////////  GRÁFICO  /////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    const chartCanvas = document.getElementById('myChart'); // Elemento del gráfico

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


    const myChart = new Chart(chartCanvas, chartConfig);

    ///////////////////////////////////////////////////////////////////////////
    //////////////////////////    /////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////


});
