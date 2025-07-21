
export function initMobileMenu() {
    const menuToggle = document.querySelector('.nav__toggle');
    const menuNav = document.querySelector('.nav__menu');
    
    if (!menuToggle || !menuNav) return;

    function toggleMenu(forceClose = false) {
        const isOpen = menuNav.classList.contains('active');
        if (forceClose || isOpen) {
            menuNav.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        } else {
            menuNav.classList.add('active');
            menuToggle.setAttribute('aria-expanded', 'true');
        }
    }

    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation(); 
        toggleMenu();
    });

   
    menuNav.addEventListener('click', (e) => {
        if (e.target.closest('.nav__link')) {
            toggleMenu(true); 
        }
    });

    
    document.addEventListener('click', (e) => {
        if (menuNav.classList.contains('active') && !menuNav.contains(e.target) && !menuToggle.contains(e.target)) {
            toggleMenu(true);
        }
    });

   
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menuNav.classList.contains('active')) {
            toggleMenu(true); 
        }
    });
}
