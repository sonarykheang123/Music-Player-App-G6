document.addEventListener("DOMContentLoaded", function () {
    fetch('/json/library.json')
        .then(response => response.json())
        .then(data => {
            const khmerSongsContainer = document.querySelector('.khmer-container');
            const foreignSongsContainer = document.querySelector('.foreign-container');
            const playerCard = document.getElementById("player-card");
            const audioPlayer = document.getElementById("audio");
            const songTitle = document.getElementById("song-title");
            const songArtist = document.getElementById("song-artist");
            const songImage = document.getElementById("current-image");
            const playButton = document.createElement("button"); // Creating play button
            playButton.id = "play-button";
            playButton.classList.add("control-button");
            playButton.textContent = "▶️"; // Default to play icon
            document.querySelector(".player-controls").appendChild(playButton);
            const progressBar = document.getElementById("progress-bar");
            const backButton = document.getElementById("back-button");
            const previousButton = document.getElementById("previous-button");
            const nextButton = document.getElementById("next-button");
            const loopButton = document.getElementById("loop-button");

            let currentKhmerSongIndex = -1;
            let currentForeignSongIndex = -1;
            let khmerSongsList = [];
            let foreignSongsList = [];
            let currentSongList = ''; // Track the current song list (khmer or foreign)

            // Create song cards for each category
            function createSongCards(songs, container, listType) {
                if (!songs || songs.length === 0) {
                    container.innerHTML = `<p>No songs available.</p>`;
                    return;
                }

                songs.forEach((song, index) => {
                    const card = document.createElement('div');
                    card.classList.add('artist-card');
                    card.innerHTML = `
                        <img src="${song.image}" alt="${song.artist}">
                        <h3>${song.artist}</h3>
                        <p>${song.plays}</p>
                    `;

                    // Add click listener to play the song based on its list
                    card.addEventListener("click", function () {
                        playSong(index, listType);
                    });

                    container.appendChild(card);
                });

                if (listType === 'khmer') {
                    khmerSongsList = songs; // Store Khmer songs in the list
                } else if (listType === 'foreign') {
                    foreignSongsList = songs; // Store Foreign songs in the list
                }
            }

            // Create cards for both Khmer and Foreign songs
            createSongCards(data.khmerSongs, khmerSongsContainer, 'khmer');
            createSongCards(data.foreignSongs, foreignSongsContainer, 'foreign');

            // Play the selected song
            function playSong(index, listType) {
                let song;
                if (listType === 'khmer' && khmerSongsList.length > 0) {
                    song = khmerSongsList[index];
                    currentKhmerSongIndex = index; // Update current Khmer song index
                    currentSongList = 'khmer'; // Set current song list to khmer
                } else if (listType === 'foreign' && foreignSongsList.length > 0) {
                    song = foreignSongsList[index];
                    currentForeignSongIndex = index; // Update current Foreign song index
                    currentSongList = 'foreign'; // Set current song list to foreign
                }

                if (song && song.audio) {
                    audioPlayer.src = song.audio;
                    audioPlayer.play();
                    playButton.textContent = '⏸️';
                }

                songTitle.textContent = song.title || "Unknown Title";
                songArtist.textContent = song.artist || "Unknown Artist";
                songImage.src = song.image || "";

                playerCard.style.display = "block";
                document.body.classList.add("no-scroll");
                khmerSongsContainer.style.display = "none";
                foreignSongsContainer.style.display = "none";
            }

            // Back button functionality
            backButton.addEventListener("click", () => {
                playerCard.style.display = "none";
                document.body.classList.remove("no-scroll");
                khmerSongsContainer.style.display = "grid";
                foreignSongsContainer.style.display = "grid";
                audioPlayer.pause();
                playButton.textContent = '▶️';
            });

            // Previous button functionality (to play previous song)
            previousButton.addEventListener("click", () => {
                if (currentSongList === 'khmer' && khmerSongsList.length > 0) {
                    const previousIndex = (currentKhmerSongIndex - 1 + khmerSongsList.length) % khmerSongsList.length;
                    playSong(previousIndex, 'khmer');
                } else if (currentSongList === 'foreign' && foreignSongsList.length > 0) {
                    const previousIndex = (currentForeignSongIndex - 1 + foreignSongsList.length) % foreignSongsList.length;
                    playSong(previousIndex, 'foreign');
                }
            });

            // Next button functionality (to play next song)
            nextButton.addEventListener("click", () => {
                if (currentSongList === 'khmer' && khmerSongsList.length > 0) {
                    const nextIndex = (currentKhmerSongIndex + 1) % khmerSongsList.length;
                    playSong(nextIndex, 'khmer');
                } else if (currentSongList === 'foreign' && foreignSongsList.length > 0) {
                    const nextIndex = (currentForeignSongIndex + 1) % foreignSongsList.length;
                    playSong(nextIndex, 'foreign');
                }
            });

            // Loop button functionality
            loopButton.addEventListener("click", () => {
                audioPlayer.loop = !audioPlayer.loop;
                loopButton.style.color = audioPlayer.loop ? 'green' : 'white';
                loopButton.textContent = audioPlayer.loop ? '🔁' : '↻';
            });

            // Progress bar functionality
            audioPlayer.addEventListener("timeupdate", () => {
                if (!isNaN(audioPlayer.duration)) {
                    progressBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
                }
            });

            progressBar.addEventListener("input", () => {
                if (!isNaN(audioPlayer.duration)) {
                    audioPlayer.currentTime = (progressBar.value / 100) * audioPlayer.duration;
                }
            });
        })
        .catch(error => console.error('Error loading JSON:', error));
});
