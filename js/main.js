
import { initThemeManager } from './modules/theme.js';
import { initAnimations } from './modules/animations.js';
import { initMobileMenu } from './modules/menu.js';
import { initSkillsManager } from './modules/skills.js';
import { initCvModal } from './modules/cv.js';
import { initGitHubRepos } from './modules/github.js';

document.addEventListener('DOMContentLoaded', () => {

    initThemeManager();
    initAnimations();
    initMobileMenu();
    initSkillsManager();
    initCvModal();
    

    initGitHubRepos();
});
