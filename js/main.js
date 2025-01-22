
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
