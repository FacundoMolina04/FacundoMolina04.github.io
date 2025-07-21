const USERNAME = 'FacundoMolina04';
const REPOS_PER_PAGE = 6;
const CACHE_KEY = 'github_repos_cache';
const CACHE_DURATION_MS = 60 * 60 * 1000; 

let allRepos = [];
let currentPage = 1;

const container = document.querySelector('.github-repos__container');
const loadMoreButton = document.getElementById('load-more-repos');


function renderRepos() {
    const reposToRender = allRepos.slice(0, currentPage * REPOS_PER_PAGE);
    
    const repoPromises = reposToRender.map(repo => createRepoCard(repo));

    Promise.all(repoPromises).then(repoCards => {
        container.innerHTML = repoCards.join('');
    });

  
    if (allRepos.length > reposToRender.length) {
        loadMoreButton.style.display = 'inline-flex';
    } else {
        loadMoreButton.style.display = 'none';
    }
}

/**
 * Creates the HTML for a single repository card.
 * @param {object} repo - The repository object from GitHub API.
 * @returns {Promise<string>} A promise that resolves to the HTML string of the card.
 */
async function createRepoCard(repo) {
    let languageDisplay = '';
    if (repo.languages_url) {
        try {
            const langResponse = await fetch(repo.languages_url);
            if (langResponse.ok) {
                const languages = await langResponse.json();
                const totalBytes = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);
                if (totalBytes > 0) {
                    languageDisplay = Object.keys(languages)
                        .slice(0, 3)
                        .map(lang => `<span class="project-card__tag">${lang}</span>`)
                        .join('');
                }
            }
        } catch (error) {
          
            if (repo.language) {
                languageDisplay = `<span class="project-card__tag">${repo.language}</span>`;
            }
        }
    } else if (repo.language) {
        languageDisplay = `<span class="project-card__tag">${repo.language}</span>`;
    }

    return `
    <div class="project-card">
        <div class="project-card__content">
            <h3 class="project-card__title">${repo.name}</h3>
            <p class="project-card__description">${repo.description || 'No description available'}</p>
            <div class="project-card__tags">${languageDisplay}</div>
            <div class="project-card__links">
                <a href="${repo.html_url}" class="project-card__link" target="_blank" rel="noopener">
                    <i class="fab fa-github" aria-hidden="true"></i> Ver Repositorio
                </a>
                ${repo.homepage ? `
                <a href="${repo.homepage}" class="project-card__link" target="_blank" rel="noopener">
                    <i class="fas fa-external-link-alt" aria-hidden="true"></i> Live Demo
                </a>` : ''}
            </div>
        </div>
    </div>`;
}

/**
 * Fetches repositories from the GitHub API.
 * @returns {Promise<Array>} A promise that resolves to the list of repositories.
 */
async function fetchFromApi() {
    const response = await fetch(`https://api.github.com/users/${USERNAME}/repos?sort=updated&direction=desc&per_page=100`);
    if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
    }
    const repos = await response.json();
    
   
    const cacheData = {
        timestamp: Date.now(),
        repos: repos
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
    
    return repos;
}


export async function initGitHubRepos() {
    if (!container || !loadMoreButton) return;

    loadMoreButton.addEventListener('click', () => {
        currentPage++;
        renderRepos();
    });

    try {
        const cachedData = JSON.parse(localStorage.getItem(CACHE_KEY));
        const isCacheValid = cachedData && (Date.now() - cachedData.timestamp < CACHE_DURATION_MS);

        if (isCacheValid) {
            allRepos = cachedData.repos;
        } else {
            allRepos = await fetchFromApi();
        }
        
        renderRepos();

    } catch (error) {
        console.error('Failed to fetch GitHub repos:', error);
      
        const staleCache = JSON.parse(localStorage.getItem(CACHE_KEY));
        if (staleCache && staleCache.repos) {
            allRepos = staleCache.repos;
            renderRepos();
        } else {
            container.innerHTML = `<p class="error-message">Error al cargar los repositorios. ${error.message}</p>`;
        }
    }
}
