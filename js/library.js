const images = [
    "/images/image1.png",
    "/images/image2.png",
    "/images/image3.png",
];

let currentIndex = 0;

function changeImage() {
    const imageElement = document.getElementById("changingImage");

    // Slide out to the right and fade out
    gsap.to(imageElement, {
        duration: 1,
        x: 100, // Move 100px to the right
        opacity: 0,
        onComplete: () => {
            // Update the image source after the animation completes
            currentIndex = (currentIndex + 1) % images.length;
            imageElement.src = images[currentIndex];

            // Reset position (to the left) and fade back in
            gsap.set(imageElement, { x: -100 }); // Start from left
            gsap.to(imageElement, {
                duration: 1,
                x: 0, // Slide to original position
                opacity: 1,
            });
        },
    });
}

// Change images every 3 seconds
setInterval(changeImage, 3000);


document.addEventListener("DOMContentLoaded", function () {
    fetch('/json/library.json')
        .then(response => response.json())
        .then(data => {
            const khmerSongsContainer = document.querySelector('.khmer-container');
            const foreignSongsContainer = document.querySelector('.foreign-container');

            let currentlyPlaying = null;

            function createSongCards(songs, container) {
                songs.forEach(song => {
                    const card = document.createElement('div');
                    card.classList.add('artist-card');

                    const audioId = `audio-${song.artist.replace(/\s+/g, '').toLowerCase()}`;
                    card.innerHTML = `
                        <img src="${song.image}" alt="${song.artist}">
                        <h3>${song.artist}</h3>
                        <p>${song.plays}</p>
                        <audio id="${audioId}" src="${song.audio}"></audio>
                        <button class="play-button" data-audio="${audioId}">Play</button>
                        <span class="more-icon"> ⋮</span>
                        <div class="more-options" style="display: none;">
                            <div class="controls">
                                <label for="volume-${audioId}">Volume:</label>
                                <input type="range" id="volume-${audioId}" class="volume-control" min="0" max="1" step="0.1" value="1">
                                <label for="speed-${audioId}">Speed:</label>
                                <select id="speed-${audioId}" class="speed-control">
                                    <option value="0.5">0.5x</option>
                                    <option value="1" selected>1x</option>
                                    <option value="1.5">1.5x</option>
                                    <option value="2">2x</option>
                                </select>
                            </div>
                        </div>
                    `;

                    container.appendChild(card);

                    const volumeControl = document.getElementById(`volume-${audioId}`);
                    volumeControl.addEventListener('input', (event) => {
                        const audioElement = document.getElementById(audioId);
                        audioElement.volume = event.target.value;
                    });

                    const speedControl = document.getElementById(`speed-${audioId}`);
                    speedControl.addEventListener('change', (event) => {
                        const audioElement = document.getElementById(audioId);
                        audioElement.playbackRate = parseFloat(event.target.value);
                    });

                    const moreIcon = card.querySelector('.more-icon');
                    const moreOptions = card.querySelector('.more-options');
                    moreIcon.addEventListener('click', function () {
                        // Close any other open dropdowns
                        const openDropdowns = document.querySelectorAll('.more-options');
                        openDropdowns.forEach(dropdown => {
                            if (dropdown !== moreOptions) {
                                dropdown.style.display = 'none';
                            }
                        });
                        // Toggle current dropdown
                        moreOptions.style.display = (moreOptions.style.display === 'none' || moreOptions.style.display === '') ? 'block' : 'none';
                    });
                });
            }

            // Function to handle hiding the dropdown when clicking outside
            document.addEventListener('click', function (event) {
                const moreOptions = document.querySelectorAll('.more-options');
                moreOptions.forEach(dropdown => {
                    if (!dropdown.contains(event.target) && !event.target.classList.contains('more-icon')) {
                        dropdown.style.display = 'none';
                    }
                });

                // Handle play button clicks
                if (event.target.classList.contains('play-button')) {
                    const button = event.target;
                    const audioId = button.getAttribute('data-audio');
                    const audioElement = document.getElementById(audioId);

                    if (currentlyPlaying && currentlyPlaying !== audioElement) {
                        currentlyPlaying.pause();
                        const currentButton = document.querySelector(`[data-audio='${currentlyPlaying.id}']`);
                        currentButton.textContent = 'Play'; // Reset the previous button text to 'Play'
                    }

                    if (audioElement.paused) {
                        audioElement.play();
                        button.textContent = 'Pause';
                    } else {
                        audioElement.pause();
                        button.textContent = 'Play';
                    }

                    currentlyPlaying = audioElement.paused ? null : audioElement;
                }
            });

            // Populate song cards for both Khmer and Foreign songs
            createSongCards(data.khmerSongs, khmerSongsContainer);
            createSongCards(data.foreignSongs, foreignSongsContainer);
        })
        .catch(error => console.error('Error loading JSON:', error));
});
// Next song function

function nextSong(currentAudioId) {
    const currentAudio = document.getElementById(currentAudioId);
    const card = currentAudio.closest('.artist-card');
    const nextCard = card.nextElementSibling; // Get the next card

    if (nextCard) {
        const nextAudioElement = nextCard.querySelector('audio'); // Get the next audio element
        const nextPlayButton = nextCard.querySelector('.play-button');

        // Stop and reset the current song
        if (currentlyPlaying) {
            currentlyPlaying.pause();
            currentlyPlaying.currentTime = 0; // Reset time to beginning
            const currentButton = document.querySelector(`[data-audio='${currentlyPlaying.id}']`);
            if (currentButton) currentButton.textContent = 'Play'; // Reset button text
        }

        // Play the next song
        nextAudioElement.play();
        nextPlayButton.textContent = 'Pause'; // Update button text

        // Update the currently playing song
        currentlyPlaying = nextAudioElement;
    } else {
        alert("This is the last song.");
    }
}
