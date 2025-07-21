
export function initCvModal() {
    const viewCvButton = document.getElementById('view-cv-button');
    const modal = document.getElementById('cv-modal');
    const closeModalButton = document.getElementById('cv-modal-close');
    const overlay = document.getElementById('cv-modal-overlay');

    if (!viewCvButton || !modal || !closeModalButton || !overlay) {
        return;
    }

    function openModal(e) {
        e.preventDefault();
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; 
    }

    function closeModal() {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; 
    }

    viewCvButton.addEventListener('click', openModal);
    closeModalButton.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);

  
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}
