// Import modules
import { initThemeManager } from './modules/theme.js';
import { initAnimations } from './modules/animations.js';
import { initMobileMenu } from './modules/menu.js';
import { initSkillsManager } from './modules/skills.js';

// Initialize GitHub API integration
async function initGitHubIntegration() {
    const username = 'FacundoMolina04';
    const githubSection = document.querySelector('#github-repos');
    const reposContainer = document.querySelector('.github-repos__container');
    
    if (!githubSection || !reposContainer) return; // Exit if sections don't exist
    
    // Show loading state
    reposContainer.innerHTML = `
        <div class="project-card github-loading">
            <div class="project-card__content">
                <p>Cargando repositorios de GitHub...</p>
            </div>
        </div>
    `;
    
    try {
        // Fetch all repositories (GitHub API defaults to 30 per page)
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&direction=desc&per_page=30`);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch GitHub repositories: ${response.status}`);
        }
        
        const repos = await response.json();
        
        if (repos.length === 0) {
            reposContainer.innerHTML = `<p>No se encontraron repositorios públicos.</p>`;
            return;
        }
        
        // Create an array to store promises for fetching language data
        const languagePromises = [];
        
        // For each repository, create a promise to fetch its language data
        repos.forEach(repo => {
            if (repo.languages_url) {
                languagePromises.push(
                    fetch(repo.languages_url)
                        .then(response => response.json())
                        .then(languages => {
                            repo.languagesData = languages;
                            return repo;
                        })
                        .catch(error => {
                            console.error(`Error fetching languages for ${repo.name}:`, error);
                            repo.languagesData = {};
                            return repo;
                        })
                );
            } else {
                repo.languagesData = {};
                languagePromises.push(Promise.resolve(repo));
            }
        });
        
        // Wait for all language data to be fetched
        await Promise.all(languagePromises);
        
        reposContainer.innerHTML = repos.map(repo => {
            // Process language data
            let languageDisplay = '';
            
            if (repo.languagesData && Object.keys(repo.languagesData).length > 0) {
                // Calculate total bytes for percentage calculation
                const totalBytes = Object.values(repo.languagesData).reduce((sum, bytes) => sum + bytes, 0);
                
                // Format languages with percentages
                const languageEntries = Object.entries(repo.languagesData);
                
                // Sort languages by byte count (descending)
                languageEntries.sort((a, b) => b[1] - a[1]);
                
                // Take top 3 languages to avoid cluttering the UI
                const topLanguages = languageEntries.slice(0, 3);
                
                languageDisplay = topLanguages.map(([lang, bytes]) => {
                    const percentage = ((bytes / totalBytes) * 100).toFixed(1);
                    return `<span class="project-card__tag">${lang} ${percentage}%</span>`;
                }).join('');
                
                // If there are more languages, add a +X more indicator
                if (languageEntries.length > 3) {
                    languageDisplay += `<span class="project-card__tag">+${languageEntries.length - 3} más</span>`;
                }
            } else if (repo.language) {
                // Fallback to single language if available
                languageDisplay = `<span class="project-card__tag">${repo.language}</span>`;
            } else {
                // Better fallback based on common project types
                if (repo.name.toLowerCase().includes('blazor') || repo.name.toLowerCase().includes('dotnet')) {
                    languageDisplay = `<span class="project-card__tag">.NET/Blazor</span>`;
                } else if (repo.description && repo.description.toLowerCase().includes('blazor')) {
                    languageDisplay = `<span class="project-card__tag">.NET/Blazor</span>`;
                } else {
                    languageDisplay = `<span class="project-card__tag">Proyecto Web</span>`;
                }
            }
            
            return `
            <div class="project-card">
                <div class="project-card__content">
                    <h3 class="project-card__title">${repo.name}</h3>
                    <p class="project-card__description">${repo.description || 'No description available'}</p>
                    <div class="project-card__tags">
                        ${languageDisplay}
                        ${repo.stargazers_count > 0 ? `<span class="project-card__tag">⭐ ${repo.stargazers_count}</span>` : ''}
                        ${repo.forks_count > 0 ? `<span class="project-card__tag">🍴 ${repo.forks_count}</span>` : ''}
                        ${repo.topics && repo.topics.length > 0 ? repo.topics.map(topic => 
                            `<span class="project-card__tag">#${topic}</span>`
                        ).join('') : ''}
                    </div>
                    <div class="project-card__links">
                        <a href="${repo.html_url}" class="project-card__link" target="_blank" rel="noopener">
                            <i class="fab fa-github"></i> Ver Repositorio
                        </a>
                        ${repo.homepage ? `
                        <a href="${repo.homepage}" class="project-card__link" target="_blank" rel="noopener">
                            <i class="fas fa-external-link-alt"></i> Live Demo
                        </a>` : ''}
                    </div>
                </div>
            </div>
        `}).join('');
        
        console.log(`Loaded ${repos.length} GitHub repositories`);
    } catch (error) {
        console.error('Error fetching GitHub repositories:', error);
        reposContainer.innerHTML = `
            <div class="project-card error">
                <div class="project-card__content">
                    <p>Failed to load GitHub repositories: ${error.message}</p>
                    <button onclick="initGitHubIntegration()" class="form__submit">Retry</button>
                </div>
            </div>
        `;
    }
}

// Initialize all modules when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize core modules
    initThemeManager();
    initAnimations();
    initMobileMenu();
    initSkillsManager();
    
    // Initialize GitHub integration
    initGitHubIntegration();
});