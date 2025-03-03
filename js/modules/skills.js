/**
 * Skills Section Manager
 * Handles the tabbed interface for the skills section
 */

export function initSkillsManager() {
    const skillsSection = document.querySelector('#skills');
    if (!skillsSection) return;

    // Create tabs container
    const tabsContainer = document.createElement('div');
    tabsContainer.className = 'skills__tabs';
    
    // Get all skill categories
    const skillCategories = skillsSection.querySelectorAll('.skills__category');
    if (!skillCategories.length) return;
    
    // Insert tabs container before the skills categories
    const skillsContainer = skillsSection.querySelector('.skills__container');
    const categoriesContainer = skillsSection.querySelector('.skills__categories');
    skillsContainer.insertBefore(tabsContainer, categoriesContainer);
    
    // Create tabs based on category titles
    skillCategories.forEach((category, index) => {
        const categoryTitle = category.querySelector('.skills__category-title').textContent;
        const tab = document.createElement('button');
        tab.className = 'skills__tab';
        tab.textContent = categoryTitle;
        tab.dataset.index = index;
        
        // Make first tab active by default
        if (index === 0) {
            tab.classList.add('active');
            category.classList.add('active');
        } else {
            category.classList.add('hidden');
        }
        
        tab.addEventListener('click', () => switchTab(index));
        tabsContainer.appendChild(tab);
    });
    
    // Function to switch between tabs
    function switchTab(activeIndex) {
        // Update tabs
        const tabs = tabsContainer.querySelectorAll('.skills__tab');
        tabs.forEach((tab, index) => {
            if (index === activeIndex) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
        
        // Update visible category
        skillCategories.forEach((category, index) => {
            if (index === activeIndex) {
                category.classList.add('active');
                category.classList.remove('hidden');
            } else {
                category.classList.remove('active');
                category.classList.add('hidden');
            }
        });
    }
}