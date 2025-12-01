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
    };

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

    // Theme toggle: apply saved theme, toggle class and icon, persist in localStorage
    const themeToggle = document.getElementById('theme-toggle');
    const THEME_KEY = 'theme-preference';
    function applyTheme(theme) {
        const isDark = theme === 'dark';
        document.body.classList.toggle('dark-theme', isDark);
        if (themeToggle) {
            themeToggle.setAttribute('aria-pressed', String(isDark));
            themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        }
    }

    let storedTheme = null;
    try { storedTheme = localStorage.getItem(THEME_KEY); } catch (e) { /* ignore */ }
    if (!storedTheme) {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        storedTheme = prefersDark ? 'dark' : 'light';
    }
    applyTheme(storedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const newTheme = document.body.classList.contains('dark-theme') ? 'light' : 'dark';
            applyTheme(newTheme);
            try { localStorage.setItem(THEME_KEY, newTheme); } catch (e) { /* ignore */ }
        });
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
