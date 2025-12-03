/*!
* Start Bootstrap - Resume v7.0.6 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            rootMargin: '0px 0px -40%',
        });
    }

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // ========================================================================
    // DARK MODE TOGGLE BUTTON - TOP LEFT
    // ========================================================================
    // Nuevo botón de cambio de tema (claro/oscuro)
    // Botón de tema en top-controls
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    if (themeToggleBtn) {
        // Al cargar, aplicar el tema guardado
        const savedTheme = localStorage.getItem('themeMode');
        if (savedTheme === 'dark') {
            setDarkTheme();
        } else {
            setLightTheme();
        }
        // Listener para el botón
        themeToggleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const isDark = document.body.classList.contains('dark-theme');
            if (isDark) {
                setLightTheme();
            } else {
                setDarkTheme();
            }
        });
    }
    function setDarkTheme() {
        document.body.classList.add('dark-theme');
        document.documentElement.classList.add('dark-theme');
        localStorage.setItem('themeMode', 'dark');
        updateThemeToggleIcon();
    }
    function setLightTheme() {
        document.body.classList.remove('dark-theme');
        document.documentElement.classList.remove('dark-theme');
        localStorage.setItem('themeMode', 'light');
        updateThemeToggleIcon();
    }
    function updateThemeToggleIcon() {
        const btn = document.getElementById('themeToggleBtn');
        if (!btn) return;
        const icon = btn.querySelector('i');
        const isDark = document.body.classList.contains('dark-theme');
        if (isDark) {
            icon.className = 'fas fa-sun';
            btn.title = 'Cambiar a tema claro';
        } else {
            icon.className = 'fas fa-moon';
            btn.title = 'Cambiar a tema oscuro';
        }
    }

    // Ensure profile uses 'adrifoto.jpg' if available, fallback to current 'Adri foto.jpg'
    (function(){
        const profileImg = document.querySelector('.img-profile');
        if(!profileImg) return;
        const trySrc = 'assets/img/adrifoto.jpg';
        const fallback = profileImg.getAttribute('src');
        const imgCheck = new Image();
        imgCheck.onload = function(){ profileImg.setAttribute('src', trySrc); };
        imgCheck.onerror = function(){ /* fallback stays */ };
        imgCheck.src = trySrc;
    })();

});
