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

// Firebase is loaded via script tag in HTML, so we can use the global firebase variables
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
      // Use scrollIntoView for better snap behavior compatibility
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Gallery Lightbox Functionality
const galleryImages = [
  "assets/img/gallery.jpg",
  "assets/img/gallery2.jpg",
  "assets/img/gallery3.jpg",
  "assets/img/gallery4.jpg",
  "assets/img/gallery5.jpg",
  "assets/img/gallery6.jpg",
  "assets/img/gallery7.jpg",
  "assets/img/gallery12.jpg",
  "assets/img/gallery9.jpg",
  "assets/img/gallery8.jpg",
  "assets/img/gallery11.jpg",
  "assets/img/gallery10.jpg",
];

let currentImageIndex = 0;

function openLightbox(index) {
  currentImageIndex = index;
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  // Reset opacity to ensure image is visible
  lightboxImg.style.opacity = "1";
  lightboxImg.style.transition = "";

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
  const lightboxImg = document.getElementById("lightbox-img");

  // Determine the animation class based on direction
  const animationClass = direction > 0 ? "slide-in-left" : "slide-in-right";

  // Add the fade-out class to fade out the current image
  lightboxImg.classList.add("fade-out");

  // After fade out completes, change the image and apply the slide animation
  setTimeout(() => {
    currentImageIndex += direction;

    // Loop around if we go beyond the array bounds
    if (currentImageIndex >= galleryImages.length) {
      currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
      currentImageIndex = galleryImages.length - 1;
    }

    lightboxImg.src = galleryImages[currentImageIndex];

    // Once the new image loads, apply the slide animation
    lightboxImg.onload = function () {
      // Remove the fade-out class and add the appropriate slide animation class
      lightboxImg.classList.remove("fade-out");

      // Add animation class based on direction
      lightboxImg.classList.add(animationClass);

      // Remove the animation class after it completes so it can be reused
      setTimeout(() => {
        lightboxImg.classList.remove(animationClass);
      }, 500); // Match to the CSS animation duration

      // Remove onload handler to prevent it from running again
      lightboxImg.onload = null;
    };
  }, 500); // Match to the CSS animation duration
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
  const messageForm = document.getElementById("messageForm");

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

    // Show confirmation toast
    showToast(
      "Thank you for your message! It has been added to our wishes collection.",
      "success",
      4000
    );
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
      // console.log(data);

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

// Toast Notification Functions
function showToast(message, type = "success", duration = 3000) {
  const toastContainer = document.getElementById("toastContainer");

  // Create toast element
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;

  // Add icon based on type
  let icon = "";
  switch (type) {
    case "success":
      icon = '<i class="fas fa-check-circle toast-icon"></i>';
      break;
    case "error":
      icon = '<i class="fas fa-exclamation-circle toast-icon"></i>';
      break;
    case "info":
      icon = '<i class="fas fa-info-circle toast-icon"></i>';
      break;
    default:
      icon = '<i class="fas fa-info-circle toast-icon"></i>';
  }

  // Add content to toast
  toast.innerHTML = `
    ${icon}
    <div class="toast-content">${message}</div>
    <button class="toast-close">&times;</button>
  `;

  // Add toast to container
  toastContainer.appendChild(toast);

  // Add close functionality
  const closeBtn = toast.querySelector(".toast-close");
  closeBtn.addEventListener("click", () => {
    removeToast(toast);
  });

  // Auto remove toast after duration
  setTimeout(() => {
    removeToast(toast);
  }, duration);
}

function removeToast(toast) {
  toast.classList.add("fade-out");
  setTimeout(() => {
    toast.remove();
  }, 300);
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

// Intersection Observer for section entrance animations
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add animated class when section comes into view
          entry.target.classList.add("animated");
        }
      });
    },
    {
      threshold: 0.1, // Trigger when 10% of the section is visible
      rootMargin: "0px 0px -20% 0px", // Trigger slightly before section reaches viewport
    }
  );

  // Observe all sections
  sections.forEach((section) => {
    observer.observe(section);
  });
});

// Google Calendar Integration
function addToGoogleCalendar() {
  // Wedding event details
  const eventTitle = "Emilio & Paquita Wedding";
  const eventLocation = "Your Wedding Venue, Wedding City"; // TODO: Update with actual venue
  const eventDescription =
    "Join us as we say 'I do' and begin our journey together. " +
    "Minggu, 26 Oktober 2025 (Sunday, October 26, 2025)"; // Indonesian for Sunday, October 26, 2025

  // Date: Sunday, October 26, 2025 (based on what I see in the HTML)
  const startDate = "20251026"; // Format: YYYYMMDD
  const startTime = "1000"; // 10:00 AM TODO: Update with actual time if different
  const endDate = "20251026"; // Format: YYYYMMDD
  const endTime = "1600"; // 4:00 PM TODO: Update with actual end time if different

  // Format dates for Google Calendar
  const startDateTime = `${startDate}T${startTime}00`;
  const endDateTime = `${endDate}T${endTime}00`;

  // Create the Google Calendar URL
  const googleCalendarUrl =
    `https://www.google.com/calendar/render?action=TEMPLATE` +
    `&text=${encodeURIComponent(eventTitle)}` +
    `&dates=${startDateTime}/${endDateTime}` +
    `&location=${encodeURIComponent(eventLocation)}` +
    `&details=${encodeURIComponent(eventDescription)}` +
    `&sprop=&sprop=name:`;

  // Open Google Calendar in a new tab
  window.open(googleCalendarUrl, "_blank");
}

function openLinkZoom() {
  window.open(
    "https://us06web.zoom.us/j/88220852894?pwd=A8WgHjbwnKhEYnqAbLzE1adaEP3pj9.1",
    "_blank"
  );
}

function linkToIg() {
  window.open(
    "https://www.instagram.com/reel/DPEiNetkoHx/?utm_source=ig_web_copy_link",
    "_blank"
  );
}

function openYoutube() {
  window.open("https://tinyurl.com/EMILIOndreamswithPAQUITA", "_blank");
}

// Make functions globally available so HTML onclick handlers can access them
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.changeImage = changeImage;
window.addToGoogleCalendar = addToGoogleCalendar;
window.openLinkZoom = openLinkZoom;
window.linkToIg = linkToIg;
window.openYoutube = openYoutube;
