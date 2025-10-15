const CONFIG = {
  FIREBASE: {
    apiKey: "AIzaSyDmypsckUaJPTCr4u-nRtSlCQVmoHGEibk",
    authDomain: "wedding-guestbook-9d290.firebaseapp.com",
    databaseURL:
      "https://wedding-guestbook-9d290-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "wedding-guestbook-9d290",
    storageBucket: "wedding-guestbook-9d290.appspot.com",
    messagingSenderId: "955528844935",
    appId: "1:955528844935:web:c9e40f65a4901eba32ca22",
    measurementId: "G-20VMYH24QZ",
  },
};

// Firebase Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

// Mobile menu toggle functionality
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");

mobileMenuButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Smooth scrolling for all anchor links (including navigation and buttons)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      // Calculate offset to account for fixed header
      const offsetPosition = targetElement.offsetTop - 80;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Gallery Lightbox Functionality
const galleryImages = [
  "https://images.unsplash.com/photo-1519877623245-1a3f3b7413d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1513836274058-2e2d5ffe506a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1506260408121-e353d10b87c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1519877623245-1a3f3b7413d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1513836274058-2e2d5ffe506a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1506260408121-e353d10b87c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1519877623245-1a3f3b7413d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
];

let currentImageIndex = 0;

function openLightbox(index) {
  currentImageIndex = index;
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  lightboxImg.src = galleryImages[index];
  lightbox.classList.remove("hidden");
  document.body.style.overflow = "hidden"; // Prevent background scrolling
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  lightbox.classList.add("hidden");
  document.body.style.overflow = ""; // Re-enable scrolling
}

function changeImage(direction) {
  currentImageIndex += direction;

  // Loop around if we go beyond the array bounds
  if (currentImageIndex >= galleryImages.length) {
    currentImageIndex = 0;
  } else if (currentImageIndex < 0) {
    currentImageIndex = galleryImages.length - 1;
  }

  const lightboxImg = document.getElementById("lightbox-img");
  lightboxImg.src = galleryImages[currentImageIndex];
}

// Close lightbox when clicking outside the image
document.getElementById("lightbox").addEventListener("click", function (e) {
  if (e.target === this) {
    closeLightbox();
  }
});

// Keyboard navigation
document.addEventListener("keydown", function (e) {
  if (document.getElementById("lightbox").classList.contains("hidden")) return;

  if (e.key === "Escape") {
    closeLightbox();
  } else if (e.key === "ArrowLeft") {
    changeImage(-1);
  } else if (e.key === "ArrowRight") {
    changeImage(1);
  }
});

// Messages functionality
const app = initializeApp(CONFIG.FIREBASE);
const db = getDatabase(app);

document.addEventListener("DOMContentLoaded", function () {
  messageForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("senderName").value;
    const wish = document.getElementById("message").value;

    push(ref(db, "messages/weddingB"), {
      name: name,
      message: wish,
      time: Date.now(),
    });

    // Reset form
    messageForm.reset();

    // Show confirmation message
  });
});

// Function to load messages from firebase
addMessageToDisplay();

// Function to add a single message to the display
function addMessageToDisplay() {
  // If the container only has the default message, clear it

  onValue(ref(db, "messages/weddingB"), (snapshot) => {
    if (snapshot.val() === null) {
      messagesContainer.innerHTML = `
            <div class="text-center py-10">
              <i class="fas fa-envelope-open-text text-5xl text-primary-pastel-pink mb-4"></i>
              <p class="text-lg text-text-medium">No messages yet. Be the first to share your wishes!</p>
            </div>
          `;
      return;
    }

    messagesContainer.innerHTML = "";
    snapshot.forEach((childSnapshot) => {
      const data = childSnapshot.val();
      console.log(data);

      const messageElement = document.createElement("div");

      messagesContainer.insertBefore(
        messageElement,
        messagesContainer.firstChild
      );
      messageElement.className =
        "bg-[color:var(--secondary-ivory)] rounded-2xl p-6 shadow-md";
      messageElement.innerHTML = `
    <div class="flex items-start ">
      <div class="flex-1">
        <div class="flex justify-between items-start">
          <h4 class="font-bold [color:var(--text-dark)]">${data.name || "Anonymous"}</h4>
        </div>
        <p class="text-[color:var(--text-dark)] mt-2 mb-2">${data.message}</p>
        <span class="text-xs text-[color:var(--text-light)]">${formatDate(data.time)}</span>
      </div>
    </div>
  `;
    });
  });

  // Add to the beginning of the container to show newest first
}

// Helper function to format date
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Music toggle functionality
document.addEventListener("DOMContentLoaded", function () {
  const musicToggle = document.getElementById("musicToggle");
  const backgroundMusic = document.getElementById("backgroundMusic");
  let isPlaying = false;

  // Initialize music state
  updateMusicIcon();

  musicToggle.addEventListener("click", function () {
    const icon = musicToggle.querySelector("i");

    if (isPlaying) {
      // Pause the music
      backgroundMusic.pause();
      icon.classList.remove("fa-pause");
      icon.classList.add("fa-music");
      musicToggle.classList.remove("music-playing");
      isPlaying = false;
    } else {
      // Play the music
      icon.classList.remove("fa-music");
      icon.classList.add("fa-pause");
      // Add animation when music is playing
      musicToggle.classList.add("music-playing");

      backgroundMusic
        .play()
        .then(() => {
          isPlaying = true;
        })
        .catch((error) => {
          console.log("Music play failed:", error);
          // If autoplay is blocked, we'll still toggle the state so user can manually play later
          isPlaying = !isPlaying;
        });
    }

    updateMusicIcon();
  });

  function updateMusicIcon() {
    if (isPlaying) {
    } else {
    }
  }
});
