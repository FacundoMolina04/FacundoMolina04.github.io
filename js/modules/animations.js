
export function initAnimations() {

    const sections = document.querySelectorAll('section[id]'); 
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px'
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const section = entry.target;
                section.classList.add('visible');

              
                const itemsToStagger = section.querySelectorAll('.skills__item, .project-card');
                itemsToStagger.forEach((item, index) => {
                    item.style.transitionDelay = `${index * 100}ms`;
                });

                observer.unobserve(section); 
            }
        });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));


    function updateActiveNavLink() {
        const scrollPosition = window.scrollY;
        
        
        document.querySelectorAll('.nav__link.active').forEach(link => {
            link.classList.remove('active');
        });

        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (scrollPosition >= sectionTop) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (currentSectionId) {
            const currentNavLink = document.querySelector(`.nav__link[href="#${currentSectionId}"]`);
            currentNavLink?.classList.add('active');
        }
    }


    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
              
                if (href.length > 1 && href.startsWith('#')) {
                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);
    window.addEventListener('load', updateActiveNavLink);
    
    initSmoothScrolling();
}
