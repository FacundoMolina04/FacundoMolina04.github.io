
export function initSkillsManager() {
    const tabsContainer = document.querySelector('.skills__tabs');
    if (!tabsContainer) return;

    const tabs = tabsContainer.querySelectorAll('.skills__tab');
    const categories = document.querySelectorAll('.skills__category');

    tabsContainer.addEventListener('click', (e) => {
        const targetTab = e.target.closest('.skills__tab');
        if (!targetTab) return;

      
        const categoryToShow = targetTab.dataset.category;

        
        tabs.forEach(tab => {
            tab.classList.toggle('active', tab === targetTab);
        });

       
        categories.forEach(category => {
            const currentCategory = category.dataset.category;
            category.classList.toggle('active', currentCategory === categoryToShow);
            category.classList.toggle('hidden', currentCategory !== categoryToShow);
        });
    });

   
    const activeTab = document.querySelector('.skills__tab.active');
    const initialCategory = activeTab ? activeTab.dataset.category : null;

    categories.forEach(category => {
        const currentCategory = category.dataset.category;
        const shouldBeVisible = currentCategory === initialCategory;
        category.classList.toggle('active', shouldBeVisible);
        category.classList.toggle('hidden', !shouldBeVisible);
    });
}
