document.addEventListener("DOMContentLoaded", function () {
    const accordions = document.querySelectorAll('.accordion');
    const searchInput = document.querySelector('.search-bar input');

    // Accordion click behavior (expand/collapse)
    accordions.forEach(accordion => {
        accordion.addEventListener('click', () => {
            accordion.classList.toggle('open');
            const content = accordion.querySelector('.accordion-content');
            const icon = accordion.querySelector('span');
            icon.textContent = accordion.classList.contains('open') ? '-' : '+';
        });
    });

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();

        accordions.forEach(accordion => {
            const keywords = accordion.getAttribute('data-keywords').toLowerCase();

            // Check if the keywords include the search query
            if (keywords.includes(query)) {
                accordion.classList.remove('hidden');
            } else {
                accordion.classList.add('hidden');
            }
        });
    });
});
