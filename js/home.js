const images = [
  "./images/image1.png", // First image
  "./images/image2.png", // Second image
  "./images/image3.png"  // Third image
];

let currentIndex = 0;

// Function to change the image
function changeImage() {
  const imgElement = document.getElementById("changingImage");

  // Fade out the current image
  gsap.to(imgElement, {
    duration: 1,
    opacity: 0,
    onComplete: () => {
      // Update the image source
      currentIndex = (currentIndex + 1) % images.length; // Cycle through images
      imgElement.src = images[currentIndex];

      // Ensure the image is loaded before fading in
      imgElement.onload = () => {
        // Fade in the new image
        gsap.to(imgElement, { duration: 1, opacity: 1 });
      };
    }
  });
}

// Change the image every 3 seconds
setInterval(changeImage, 3000);

// Trigger the first image change immediately
changeImage();


document.addEventListener("DOMContentLoaded", function () {
  fetch("/json/home.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (data && typeof data === "object") {
        createMusicPlayer(data);
      } else {
        console.error("Invalid data received from the JSON file");
      }
    })
    .catch((error) => {
      console.error("Error loading the JSON file:", error);
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

        const songTitle = escapeHTML(song.title || "Unknown Title");
        const songArtist = escapeHTML(song.artist || "Unknown Artist");
        const songImage = song.image || "default-image.jpg";
        const songAudio = song.audio || "#";

        const audioId = `audio-${Math.random().toString(36).substr(2, 9)}`;

        musicItem.innerHTML = `
          <img src="${songImage}" alt="${songTitle}">
          <h2>${songTitle}</h2>
          <p>${songArtist}</p>
          <audio id="${audioId}" src="${songAudio}" preload="none"></audio>
          <button class="play-button" data-audio="${audioId}">Play</button>
        `;

        container.appendChild(musicItem);
      });
    }

    // Stop all currently playing audio
    function stopAllAudio() {
      const allAudio = document.querySelectorAll("audio");
      const allButtons = document.querySelectorAll(".play-button");

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
      const div = document.createElement("div");
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

    // Global event listener for play/pause functionality
    document.addEventListener("click", (event) => {
      if (event.target.classList.contains("play-button")) {
        const button = event.target;
        const audioId = button.getAttribute("data-audio");
        const audioElement = document.getElementById(audioId);

        if (audioElement.paused) {
          stopAllAudio(); // Stop any currently playing audio
          audioElement.play();
          button.textContent = "Pause";
        } else {
          audioElement.pause();
          audioElement.currentTime = 0; // Reset audio
          button.textContent = "Play";
        }

        // Event to reset button text when the song ends
        audioElement.addEventListener("ended", () => {
          button.textContent = "Play";
        });
      }
    });
  }
});


   