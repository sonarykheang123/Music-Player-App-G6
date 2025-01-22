
document.addEventListener("DOMContentLoaded", () => {
    const cardContainers = document.querySelectorAll('.card-artist');
    const section = document.querySelector('.name-singer');
    
    cardContainers.forEach(container => {
        container.addEventListener('wheel', (event) => {
            event.preventDefault(); // Prevent vertical scroll
            container.scrollLeft += event.deltaY * 2; // Adjust speed by changing the multiplier (2)
            section.addEventListener('wheel', (event) => {
                event.preventDefault(); // Prevent vertical scroll
                section.scrollLeft += event.deltaY * 2; // Adjust speed by changing the multiplier (2)
            });
            cardSong.addEventListener('wheel', (event) => {
                event.preventDefault(); // Prevent vertical scroll
                cardSong.scrollLeft += event.deltaY * 2; // Adjust speed by changing the multiplier (2)
            });
        });
    });
});

fetch('/json/home.json')
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    if (data && typeof data === 'object') {
      createMusicPlayer(data);
    } else {
      console.error('Invalid data received from the JSON file');
    }
  })
  .catch((error) => {
    console.error('Error loading the JSON file:', error);
  });

// Function to generate music items
function createMusicPlayer(musicData) {
  const sections = {
    newReleasePlaylists: document.querySelector("#newReleasePlaylists"),
    hotSongsLeft: document.querySelector("#hotSongsLeft"),
    hotSongsCenter: document.querySelector("#hotSongsCenter"),
    hotSongsRight: document.querySelector("#hotSongsRight"),
    popularSongs: document.querySelector("#popularSongs"),
    hotPlaylists: document.querySelector("#hotPlaylists"),
    khmerAlbums: document.querySelector("#khmerAlbums"),
  };

  // Helper function to generate music items for a given container
  function populateContainer(container, songs) {
    if (!container || !Array.isArray(songs)) return;

    songs.forEach((song) => {
      const musicItem = document.createElement("div");
      musicItem.classList.add("cards");

      const songTitle = escapeHTML(song.title || 'Unknown Title');
      const songArtist = escapeHTML(song.artist || 'Unknown Artist');
      const songImage = song.image || 'default-image.jpg';
      const songAudio = song.audio || '#';

      // Create audio element and single play/stop button
      const audioElement = document.createElement("audio");
      audioElement.src = songAudio;
      audioElement.preload = "none";

      const toggleButton = document.createElement("btn");
      toggleButton.textContent = "Play";

      // Event listener for play/stop functionality
      toggleButton.addEventListener("click", () => {
        if (audioElement.paused) {
          stopAllAudio(); // Stop any other playing audio
          audioElement.play();
          toggleButton.textContent = "Stop";
        } else {
          audioElement.pause();
          audioElement.currentTime = 0; // Reset to the start
          toggleButton.textContent = "Play";
        }
      });

      // Event to reset button text when the song ends
      audioElement.addEventListener("ended", () => {
        toggleButton.textContent = "Play";
      });

      musicItem.innerHTML = `
        <img src="${songImage}" alt="${songTitle}">
        <h2>${songTitle}</h2>
        <p>${songArtist}</p>
      `;

      musicItem.appendChild(toggleButton);
      musicItem.appendChild(audioElement);

      container.appendChild(musicItem);
    });
  }

  // Stop all currently playing audio
  function stopAllAudio() {
    const allAudio = document.querySelectorAll("audio");
    const allButtons = document.querySelectorAll(".cards button");

    allAudio.forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });

    allButtons.forEach((button) => {
      button.textContent = "Play";
    });
  }

  // Escape HTML to prevent XSS
  function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // Populate sections with data
  populateContainer(sections.newReleasePlaylists, musicData.newReleasePlaylists);
  populateContainer(sections.hotSongsLeft, musicData.hotSongs?.left);
  populateContainer(sections.hotSongsCenter, musicData.hotSongs?.center);
  populateContainer(sections.hotSongsRight, musicData.hotSongs?.right);
  populateContainer(sections.popularSongs, musicData.popularSongs);
  populateContainer(sections.hotPlaylists, musicData.hotPlaylists);
  populateContainer(sections.khmerAlbums, musicData.khmerAlbums);
}



