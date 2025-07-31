// script.js

// Helper function to update the body's blur state
function updateBodyBlurState() {
  const mobileNavActive = document.getElementById('mobileNav').classList.contains('active');
  const popupFormOpen = document.getElementById('popupForm').style.display === 'flex';
  const aboutPopupOpen = document.getElementById('aboutPopup').style.display === 'flex';
  const contactPopupOpen = document.getElementById('contactPopup').style.display === 'flex';

  if (mobileNavActive || popupFormOpen || aboutPopupOpen || contactPopupOpen) {
    document.body.classList.add('menu-open');
  } else {
    document.body.classList.remove('menu-open');
  }
}

// Function to close all popups (visual closing)
function closeAllPopups() {
  const popups = ['popupForm', 'aboutPopup', 'contactPopup'];
  popups.forEach(id => {
    const popup = document.getElementById(id);
    if (popup) { // Check if popup element exists
      popup.style.display = 'none';
    }
  });
  updateBodyBlurState(); // Update blur after attempting to close all popups
}

// Popup toggle functions
function togglePopup() {
  const popup = document.getElementById('popupForm');
  if (popup.style.display === 'flex') { // If popup is currently open, close it
    popup.style.display = 'none';
  } else { // If popup is currently closed, open it
    closeAllPopups(); // Close any other open popups first
    closeMobileMenu(); // Ensure mobile menu is closed when a popup opens
    popup.style.display = 'flex';
  }
  updateBodyBlurState(); // Update blur after state change
}

function toggleAbout() {
  const popup = document.getElementById('aboutPopup');
  if (popup.style.display === 'flex') { // If popup is currently open, close it
    popup.style.display = 'none';
  } else { // If popup is currently closed, open it
    closeAllPopups(); // Close any other open popups first
    closeMobileMenu(); // Ensure mobile menu is closed when a popup opens
    popup.style.display = 'flex';
  }
  updateBodyBlurState(); // Update blur after state change
}

function toggleContactPopup() {
  const popup = document.getElementById('contactPopup');
  if (popup.style.display === 'flex') { // If popup is currently open, close it
    popup.style.display = 'none';
  } else { // If popup is currently closed, open it
    closeAllPopups(); // Close any other open popups first
    closeMobileMenu(); // Ensure mobile menu is closed when a popup opens
    popup.style.display = 'flex';
  }
  updateBodyBlurState(); // Update blur after state change
}

// Mobile menu functions
function toggleMobileMenu() {
  const mobileNav = document.getElementById('mobileNav');
  if (mobileNav.classList.contains('active')) {
    mobileNav.classList.remove('active');
  } else {
    closeAllPopups(); // Close any open popups before opening mobile menu
    mobileNav.classList.add('active');
  }
  updateBodyBlurState(); // Update blur after state change
}

function closeMobileMenu() {
  document.getElementById('mobileNav').classList.remove('active');
  updateBodyBlurState(); // Update blur after state change
}

// Function to handle the "Explore All Services" button and service item clicks
function launchProjectType(type) {
  togglePopup(); // Open the general "Get Started" popup
  const titleEl = document.getElementById('popupTitle');
  if (titleEl) {
    titleEl.textContent = `🚀 Start Your ${type} Project`;
  }
  const selectEl = document.getElementById('projectType');
  if (selectEl) {
    for (let i = 0; i < selectEl.options.length; i++) {
      if (selectEl.options[i].value === type) {
        selectEl.selectedIndex = i;
        break;
      }
    }
  }
}

// Add event listener to close popups and mobile menu when pressing 'Escape' key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeAllPopups();
    closeMobileMenu();
  }
});

// Close mobile menu when clicking outside of it (only if it's the mobile nav or hamburger that's clicked)
// Note: This specific listener might become redundant if other global click listeners are added.
// For now, it's kept to maintain existing mobile menu behavior.
document.addEventListener("click", function (event) {
  const mobileNav = document.getElementById("mobileNav");
  const hamburger = document.querySelector(".hamburger");

  if (
    mobileNav.classList.contains("active") &&
    !mobileNav.contains(event.target) &&
    !hamburger.contains(event.target)
  ) {
    closeMobileMenu();
  }
});


// Initialize tsParticles
document.addEventListener('DOMContentLoaded', () => {
  if (typeof tsParticles !== 'undefined') {
    tsParticles.load("tsparticles", {
      "background": {
        "color": {
          "value": "#0f2027"
        }
      },
      "fpsLimit": 120,
      "interactivity": {
        "events": {
          "onClick": {
            "enable": true,
            "mode": "push"
          },
          "onHover": {
            "enable": true,
            "mode": "repulse"
          },
          "resize": true
        },
        "modes": {
          "push": {
            "quantity": 4
          },
          "repulse": {
            "distance": 100,
            "duration": 0.4
          }
        }
      },
      "particles": {
        "color": {
          "value": "#00d2ff"
        },
        "links": {
          "color": "#2c5364",
          "distance": 150,
          "enable": true,
          "opacity": 0.5,
          "width": 1
        },
        "move": {
          "direction": "none",
          "enable": true,
          "outModes": {
            "default": "bounce"
          },
          "random": false,
          "speed": 1,
          "straight": false
        },
        "number": {
          "density": {
            "enable": true,
            "area": 800
          },
          "value": 80
        },
        "opacity": {
          "value": 0.5
        },
        "shape": {
          "type": "circle"
        },
        "size": {
          "value": {
            "min": 1,
            "max": 5
          }
        }
      },
      "detectRetina": true
    });
  }
});
