document.addEventListener('DOMContentLoaded', function () {
    const loginButton = document.querySelector('.login-button');
    const overlay = document.querySelector(".overlay");
    const loaders = document.querySelectorAll(".loader");

    loginButton.addEventListener('click', function () {
        
        // Redirige a index.html
        window.location.href = 'index.html';
    });


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
    }, 400);
});
