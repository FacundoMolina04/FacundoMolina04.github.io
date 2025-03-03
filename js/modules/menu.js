// Mobile menu module
export function initMobileMenu() {
    const menuToggle = document.querySelector('.nav__toggle');
    const menuNav = document.querySelector('.nav__menu');
    
    if (!menuToggle || !menuNav) return; // Exit if elements don't exist

    function toggleMenu() {
        menuNav.classList.toggle('active');
        const isOpen = menuNav.classList.contains('active');
        menuToggle.setAttribute('aria-expanded', isOpen);
    }

    menuToggle.addEventListener('click', toggleMenu);

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuNav.contains(e.target) && 
            !menuToggle.contains(e.target) && 
            menuNav.classList.contains('active')) {
            toggleMenu();
        }
    });

    // Close menu when clicking a link
    menuNav.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', () => {
            if (menuNav.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
}