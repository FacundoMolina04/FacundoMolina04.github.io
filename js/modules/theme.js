
export function initThemeManager() {
    const themeToggle = document.querySelector('.nav__theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    function toggleTheme() {
        document.body.classList.toggle('dark-theme');
        themeIcon.classList.toggle('fa-sun');
        themeIcon.classList.toggle('fa-moon');
        
      
        const isDark = document.body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }


    function initTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
            document.body.classList.add('dark-theme');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        }
    }

    themeToggle.addEventListener('click', toggleTheme);
    initTheme();
}
