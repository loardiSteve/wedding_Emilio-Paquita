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
document.addEventListener("DOMContentLoaded", function () {
  const messageForm = document.getElementById("messageForm");
  const messagesContainer = document.getElementById("messagesContainer");

  // Check if this is the first time loading the page and add dummy messages
  if (!localStorage.getItem("weddingMessages")) {
    // Add some dummy messages
    const dummyMessages = [
      {
        id: 1,
        name: "Sarah Johnson",
        message:
          "Wishing you both a lifetime of happiness and love! May your marriage be filled with joy, laughter, and endless adventures together.",
        timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      },
      {
        id: 2,
        name: "Michael & Lisa",
        message:
          "Congratulations on your special day! You make such a beautiful couple. Here's to your happily ever after!",
        timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      },
      {
        id: 3,
        name: "Aunt Maria",
        message:
          "Watching you both grow and find each other has been such a blessing. You deserve all the happiness in the world!",
        timestamp: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
      },
      {
        id: 4,
        name: "David Chen",
        message:
          "Your love story is truly inspiring. Wishing you both a wonderful wedding day and a beautiful future together!",
        timestamp: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
      },
    ];

    // Save dummy messages to localStorage
    localStorage.setItem("weddingMessages", JSON.stringify(dummyMessages));
  }

  // Load existing messages from localStorage
  loadMessages();

  messageForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const senderName = document.getElementById("senderName").value;
    const senderEmail = document.getElementById("senderEmail").value;
    const messageText = document.getElementById("message").value;

    // Create message object
    const newMessage = {
      id: Date.now(), // Use timestamp as unique ID
      name: senderName,
      message: messageText,
      timestamp: new Date().toISOString(),
    };

    // Save message to localStorage
    saveMessage(newMessage);

    // Add message to the display
    addMessageToDisplay(newMessage);

    // Reset form
    messageForm.reset();

    // Show confirmation message
    alert(
      "Thank you for your message! It has been added to our wishes collection."
    );
  });
});

// Function to save message to localStorage
function saveMessage(message) {
  let messages = JSON.parse(localStorage.getItem("weddingMessages")) || [];
  messages.unshift(message); // Add to beginning of array
  localStorage.setItem("weddingMessages", JSON.stringify(messages));
}

// Function to load messages from localStorage
function loadMessages() {
  const messages = JSON.parse(localStorage.getItem("weddingMessages")) || [];
  messagesContainer.innerHTML = ""; // Clear existing messages

  if (messages.length === 0) {
    // Show default message if no messages exist
    messagesContainer.innerHTML = `
      <div class="text-center py-10">
        <i class="fas fa-envelope-open-text text-5xl text-primary-pastel-pink mb-4"></i>
        <p class="text-lg text-text-medium">No messages yet. Be the first to share your wishes!</p>
      </div>
    `;
    return;
  }

  messages.forEach((message) => {
    addMessageToDisplay(message);
  });
}

// Function to add a single message to the display
function addMessageToDisplay(message) {
  // If the container only has the default message, clear it
  if (messagesContainer.innerHTML.includes("No messages yet")) {
    messagesContainer.innerHTML = "";
  }

  const messageElement = document.createElement("div");
  messageElement.className =
    "bg-[color:var(--secondary-ivory)] rounded-2xl p-6 shadow-md";
  messageElement.innerHTML = `
    <div class="flex items-start ">
      <div class="flex-1">
        <div class="flex justify-between items-start">
          <h4 class="font-bold [color:var(--text-dark)]">${message.name || "Anonymous"}</h4>
        </div>
        <p class="text-[color:var(--text-dark)] mt-2 mb-2">${message.message}</p>
        <span class="text-xs text-[color:var(--text-light)]">${formatDate(message.timestamp)}</span>

      </div>
    </div>
  `;

  // Add to the beginning of the container to show newest first
  messagesContainer.insertBefore(messageElement, messagesContainer.firstChild);
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
