
document.addEventListener("DOMContentLoaded", function () {
    const searchBox = document.getElementById('search-box');

    searchBox.addEventListener('input', function () {
        const query = searchBox.value.toLowerCase();
        filterSongs(query);
    });

    function filterSongs(query) {
        const songCards = document.querySelectorAll('.artist-card');

        songCards.forEach(card => {
            const artistName = card.querySelector('h3').textContent.toLowerCase();
            if (artistName.includes(query)) {
                card.style.display = "block"; // Show matching songs
            } else {
                card.style.display = "none"; // Hide non-matching songs
            }
        });
    }
});


document.addEventListener("DOMContentLoaded", function () {
    // Get all the sidebar links
    const sidebarLinks = document.querySelectorAll('.sidebar_menu li a');

    // Get the current URL path
    const currentUrl = window.location.pathname;

    // Loop through each sidebar link
    sidebarLinks.forEach(link => {
        // Check if the href matches the current URL path
        if (currentUrl.includes(link.getAttribute('href'))) {
            // Add the 'active' class to the matched link
            link.classList.add('active');
        }
    });
});
