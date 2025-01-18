const accordions = document.querySelectorAll('.accordion');

        accordions.forEach(accordion => {
            accordion.addEventListener('click', () => {
                accordion.classList.toggle('open');
                const content = accordion.querySelector('.accordion-content');

                // Update the accordion icon
                const icon = accordion.querySelector('span');
                icon.textContent = accordion.classList.contains('open') ? '-' : '+';
            });
        });

        const searchInput = document.getElementById('search');
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();

            accordions.forEach(accordion => {
                const keywords = accordion.getAttribute('data-keywords').toLowerCase();
                if (keywords.includes(query)) {
                    accordion.classList.remove('hidden');
                } else {
                    accordion.classList.add('hidden');
                }
            });
        });