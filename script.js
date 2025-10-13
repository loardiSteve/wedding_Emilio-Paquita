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
        behavior: "smooth"
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
  "https://images.unsplash.com/photo-1519877623245-1a3f3b7413d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
];

let currentImageIndex = 0;

function openLightbox(index) {
  currentImageIndex = index;
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  
  lightboxImg.src = galleryImages[index];
  lightbox.classList.remove('hidden');
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.add('hidden');
  document.body.style.overflow = ''; // Re-enable scrolling
}

function changeImage(direction) {
  currentImageIndex += direction;
  
  // Loop around if we go beyond the array bounds
  if (currentImageIndex >= galleryImages.length) {
    currentImageIndex = 0;
  } else if (currentImageIndex < 0) {
    currentImageIndex = galleryImages.length - 1;
  }
  
  const lightboxImg = document.getElementById('lightbox-img');
  lightboxImg.src = galleryImages[currentImageIndex];
}

// Close lightbox when clicking outside the image
document.getElementById('lightbox').addEventListener('click', function(e) {
  if (e.target === this) {
    closeLightbox();
  }
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
  if (document.getElementById('lightbox').classList.contains('hidden')) return;
  
  if (e.key === 'Escape') {
    closeLightbox();
  } else if (e.key === 'ArrowLeft') {
    changeImage(-1);
  } else if (e.key === 'ArrowRight') {
    changeImage(1);
  }
});

// Messages functionality
document.addEventListener('DOMContentLoaded', function() {
  const messageForm = document.getElementById('messageForm');
  const messagesContainer = document.getElementById('messagesContainer');
  
  // Load existing messages from localStorage
  loadMessages();
  
  messageForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const senderName = document.getElementById('senderName').value;
    const senderEmail = document.getElementById('senderEmail').value;
    const messageText = document.getElementById('message').value;
    
    // Create message object
    const newMessage = {
      id: Date.now(), // Use timestamp as unique ID
      name: senderName,
      email: senderEmail,
      message: messageText,
      timestamp: new Date().toISOString()
    };
    
    // Save message to localStorage
    saveMessage(newMessage);
    
    // Add message to the display
    addMessageToDisplay(newMessage);
    
    // Reset form
    messageForm.reset();
    
    // Show confirmation message
    alert('Thank you for your message! It has been added to our wishes collection.');
  });
});

// Function to save message to localStorage
function saveMessage(message) {
  let messages = JSON.parse(localStorage.getItem('weddingMessages')) || [];
  messages.unshift(message); // Add to beginning of array
  localStorage.setItem('weddingMessages', JSON.stringify(messages));
}

// Function to load messages from localStorage
function loadMessages() {
  const messages = JSON.parse(localStorage.getItem('weddingMessages')) || [];
  messagesContainer.innerHTML = ''; // Clear existing messages
  
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
  
  messages.forEach(message => {
    addMessageToDisplay(message);
  });
}

// Function to add a single message to the display
function addMessageToDisplay(message) {
  // If the container only has the default message, clear it
  if (messagesContainer.innerHTML.includes('No messages yet')) {
    messagesContainer.innerHTML = '';
  }
  
  const messageElement = document.createElement('div');
  messageElement.className = 'bg-secondary-warm-white rounded-2xl p-6 shadow-md';
  messageElement.innerHTML = `
    <div class="flex items-start">
      <div class="bg-primary-pastel-pink rounded-full w-12 h-12 flex items-center justify-center mr-4 flex-shrink-0">
        <i class="fas fa-user text-white"></i>
      </div>
      <div class="flex-1">
        <div class="flex justify-between items-start">
          <h4 class="font-bold text-text-dark">${message.name || 'Anonymous'}</h4>
          <span class="text-sm text-text-light">${formatDate(message.timestamp)}</span>
        </div>
        <p class="text-text-dark mt-2">${message.message}</p>
        ${message.email ? `<p class="text-sm text-text-light mt-2 italic">Contact: ${message.email}</p>` : ''}
      </div>
    </div>
  `;
  
  // Add to the beginning of the container to show newest first
  messagesContainer.insertBefore(messageElement, messagesContainer.firstChild);
}

// Helper function to format date
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}
