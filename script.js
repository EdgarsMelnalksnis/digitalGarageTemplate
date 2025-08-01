// script.js

// This holds the original HTML template as a string
const indexHtmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
    <title>{{WEBSITE_TITLE}}</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet"/>
    <link href="style.css" rel="stylesheet"/>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
    <script src="https://cdn.jsdelivr.net/npm/tsparticles@2.11.1/tsparticles.bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
</head>
<body>
    <div id="colorSchemeStyleTag"></div>
    <div id="tsparticles"></div>

    <header>
        <div class="logo">
            <a class="logo-link" href="#top" onclick="closeAllPopups(); closeMobileMenu()">
                <img alt="{{LOGO_ALT_TEXT}}" class="header-logo" src="{{LOGO_IMAGE_PATH}}"/>
            </a>
        </div>
        <div class="nav-group">
            <nav>
                <a href="#top" onclick="closeAllPopups(); closeMobileMenu()">Home</a>
                <a href="javascript:void(0);" onclick="toggleAbout();">About</a>
                <a href="#services" onclick="closeAllPopups(); closeMobileMenu()">Services</a>
                <a href="javascript:void(0);" onclick="toggleContactPopup();">Contact</a>
            </nav>
            <button class="hamburger" onclick="toggleMobileMenu()">☰</button>
            <button class="cta-button header-cta" onclick="toggleBookingPopup()">{{HEADER_CTA_BUTTON_TEXT}}</button>
        </div>
    </header>

    <div class="mobile-nav" id="mobileNav">
        <a href="#top" onclick="closeAllPopups(); closeMobileMenu()">Home</a>
        <a href="javascript:void(0);" onclick="toggleAbout(); closeMobileMenu()">About</a>
        <a href="#services" onclick="closeAllPopups(); closeMobileMenu()">Services</a>
        <a href="javascript:void(0);" onclick="toggleContactPopup(); closeMobileMenu()">Contact</a>
        <button class="cta-button" onclick="toggleBookingPopup(); closeMobileMenu()">{{MOBILE_NAV_CTA_BUTTON_TEXT}}</button>
    </div>

    <div id="mainContent">
        <section class="hero">
            <div class="hero-text">
                <h1>{{HERO_HEADING}}</h1>
                <p>{{HERO_PARAGRAPH}}</p>
                <button class="cta-button" onclick="toggleBookingPopup()">📅 {{HERO_CTA_BUTTON_TEXT}}</button>
            </div>
        </section>
        <section class="chatbot-section">
            <h2>🤖 Ask Our Assistant</h2>
            <div class="chatbot-box">
                <p>Chat with our virtual assistant to get service help or quick quotes.</p>
                <input type="text" placeholder="Ask a question..." />
                <button class="cta-button">Send</button>
            </div>
        </section>
        <section class="map-section">
            <h2>📍 Find Our Workshop</h2>
            <iframe
                src="https://maps.google.com/maps?q=Riga&t=&z=13&ie=UTF8&iwloc=&output=embed"
                frameborder="0"
                style="width:100%; height:300px; border-radius:10px;"
                allowfullscreen>
            </iframe>
            <div class="waze-button-wrapper">
                <a class="cta-button" href="https://waze.com/ul?ll=56.9496,24.1052&navigate=yes" target="_blank">
                    🚗 Navigate with Waze
                </a>
            </div>
        </section>
        <section class="social-section">
            <h2>📱 Follow Us</h2>
            <div class="social-icons">
                <a href="{{FACEBOOK_URL}}" target="_blank"><img src="images/facebook.svg" alt="Facebook"/></a>
                <a href="{{INSTAGRAM_URL}}" target="_blank"><img src="images/instagram.svg" alt="Instagram"/></a>
                <a href="{{TIKTOK_URL}}" target="_blank"><img src="images/tiktok.svg" alt="TikTok"/></a>
            </div>
        </section>

        <section class="services-section" id="services">
            <h2>{{SERVICES_SECTION_HEADING}}</h2>
            <div class="services-grid">
                <div class="service-item" onclick="launchProjectType('Custom Software Development')" style="cursor: pointer;">
                    <img alt="{{SERVICE_1_ICON_ALT_TEXT}}" class="service-icon" src="{{SERVICE_1_ICON_PATH}}"/>
                    <h3>{{SERVICE_1_TITLE}}</h3>
                    <p>{{SERVICE_1_DESCRIPTION}}</p>
                </div>
                <div class="service-item" onclick="launchProjectType('Embedded Systems & IoT')" style="cursor: pointer;">
                    <img alt="{{SERVICE_2_ICON_ALT_TEXT}}" class="service-icon" src="{{SERVICE_2_ICON_PATH}}"/>
                    <h3>{{SERVICE_2_TITLE}}</h3>
                    <p>{{SERVICE_2_DESCRIPTION}}</p>
                </div>
                <div class="service-item" onclick="launchProjectType('AI & Data Analytics')" style="cursor: pointer;">
                    <img alt="{{SERVICE_3_ICON_ALT_TEXT}}" class="service-icon" src="{{SERVICE_3_ICON_PATH}}"/>
                    <h3>{{SERVICE_3_TITLE}}</h3>
                    <p>{{SERVICE_3_DESCRIPTION}}</p>
                </div>
            </div>
            <button class="cta-button secondary-cta">{{EXPLORE_SERVICES_BUTTON_TEXT}}</button>
        </section>

        <section class="testimonials-section">
            <h2>{{TESTIMONIALS_SECTION_HEADING}}</h2>
            <div class="testimonial-grid">
                <div class="testimonial-item">
                    <p>"{{TESTIMONIAL_1_QUOTE}}"</p>
                    <p class="client-info">- {{TESTIMONIAL_1_CLIENT_INFO}}</p>
                </div>
                <div class="testimonial-item">
                    <p>"{{TESTIMONIAL_2_QUOTE}}"</p>
                    <p class="client-info">- {{TESTIMONIAL_2_CLIENT_INFO}}</p>
                </div>
                <div class="testimonial-item">
                    <p>"{{TESTIMONIAL_3_QUOTE}}"</p>
                    <p class="client-info">- {{TESTIMONIAL_3_CLIENT_INFO}}</p>
                </div>
            </div>
        </section>

        <footer>
            {{FOOTER_TEXT}}
        </footer>
    </div>

    <div class="popup-overlay" id="popupForm" onclick="if (event.target === this) togglePopup()">
        <div class="popup-card">
            <button class="close-button" onclick="togglePopup()">✖</button>
            <h2 id="popupTitle">{{POPUP_FORM_TITLE}}</h2>
            <form>
                <input placeholder="{{FORM_INPUT_PLACEHOLDER_NAME}}" required="" type="text"/>
                <input placeholder="{{FORM_INPUT_PLACEHOLDER_EMAIL}}" required="" type="email"/>
                <select id="projectType" required="">
                    <option value="">{{FORM_SELECT_DEFAULT_OPTION}}</option>
                    <option value="Custom Software Development">{{FORM_SELECT_OPTION_1}}</option>
                    <option value="Embedded Systems & IoT">{{FORM_SELECT_OPTION_2}}</option>
                    <option value="AI & Data Analytics">{{FORM_SELECT_OPTION_3}}</option>
                    <option value="Cloud Solutions & DevOps">{{FORM_SELECT_OPTION_4}}</option>
                    <option value="Cybersecurity & Compliance">{{FORM_SELECT_OPTION_5}}</option>
                    <option value="Tech Strategy & Consulting">{{FORM_SELECT_OPTION_6}}</option>
                </select>
                <textarea placeholder="{{FORM_TEXTAREA_PLACEHOLDER_DESCRIPTION}}" required=""></textarea>
                <button class="cta-button" type="submit">{{FORM_SUBMIT_BUTTON_TEXT}}</button>
            </form>
        </div>
    </div>

    <div class="popup-overlay" id="aboutPopup" onclick="if (event.target === this) toggleAbout()">
        <div class="popup-card">
            <button class="close-button" onclick="toggleAbout()">✖</button>
            <h2>{{ABOUT_POPUP_HEADING}}</h2>
            <p>{{ABOUT_POPUP_PARAGRAPH}}</p>
        </div>
    </div>

    <div class="popup-overlay" id="contactPopup" onclick="if (event.target === this) toggleContactPopup()">
        <div class="popup-card">
            <button class="close-button" onclick="toggleContactPopup()">✖</button>
            <h2>{{CONTACT_POPUP_HEADING}}</h2>
            <p><strong>Email:</strong> {{CONTACT_EMAIL}}</p>
            <p><strong>Phone:</strong> {{CONTACT_PHONE}}</p>
            <p><strong>Address:</strong> {{CONTACT_ADDRESS}}</p>
        </div>
    </div>

    <div class="popup-overlay" id="bookingPopup" onclick="if (event.target === this) toggleBookingPopup()">
        <div class="popup-card" style="max-width: 800px;">
            <button class="close-button" onclick="toggleBookingPopup()">✖</button>
            <h2 style="text-align: center;">📅 Select Your Appointment</h2>
            <div class="calendar-time-grid">
                <div class="calendar-column">
                    <div id="flatpickrCalendar"></div>
                </div>
                <div class="time-column">
                    <div class="time-grid">
                        <button class="cta-button">9:00 AM</button>
                        <button class="cta-button">10:00 AM</button>
                        <button class="cta-button">11:00 AM</button>
                        <button class="cta-button">12:00 PM</button>
                        <button class="cta-button">1:00 PM</button>
                        <button class="cta-button">2:00 PM</button>
                        <button class="cta-button">3:00 PM</button>
                        <button class="cta-button">4:00 PM</button>
                        <button class="cta-button">5:00 PM</button>
                        <button class="cta-button">6:00 PM</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
`;

// Define the color schemes as a JavaScript object
const colorSchemes = {
    'default': {
        '--primary-color': '#00d2ff',
        '--text-color': '#fff',
        '--dark-bg': '#0f2027',
        '--medium-bg': '#203a43',
        '--light-bg': '#2c5364',
        '--gradient-bg': 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
        '--card-bg': 'rgba(255, 255, 255, 0.05)',
        '--border-color': 'rgba(255, 255, 255, 0.1)',
        '--light-text-opacity': '0.9',
        '--dimmed-text-color': '#bbbbbb',
        '--particles-background': '#0f2027',
        '--particles-links': '#2c5364',
        '--particles-color': '#ffffff',
    },
    'deep_ocean': {
        '--primary-color': '#1E3A8A',
        '--primary-hover-color': '#172B68',
        '--secondary-color': '#FBBF24',
        '--secondary-hover-color': '#D97706',
        '--background-color': '#0B1437',
        '--card-background-color': '#111827',
        '--text-color': '#E5E7EB',
        '--sub-text-color': '#9CA3AF',
        '--border-color': '#374151',
        '--cta-background-color': '#FBBF24',
        '--cta-text-color': '#111827',
        '--cta-hover-background-color': '#D97706',
        '--particles-background': '#0B1437',
        '--particles-links': '#1E3A8A',
        '--particles-color': '#FBBF24',
        '--services-icon-filter': 'brightness(0) saturate(100%) invert(87%) sepia(21%) saturate(2283%) hue-rotate(334deg) brightness(101%) contrast(92%)',
    },
    'sunset_glow': {
        '--primary-color': '#A855F7',
        '--primary-hover-color': '#7E22CE',
        '--secondary-color': '#F97316',
        '--secondary-hover-color': '#EA580C',
        '--background-color': '#FDF2F8',
        '--card-background-color': '#FFFFFF',
        '--text-color': '#1F2937',
        '--sub-text-color': '#6B7280',
        '--border-color': '#F3E8FF',
        '--cta-background-color': '#A855F7',
        '--cta-text-color': '#FFFFFF',
        '--cta-hover-background-color': '#7E22CE',
        '--particles-background': '#FDF2F8',
        '--particles-links': '#A855F7',
        '--particles-color': '#F97316',
        '--services-icon-filter': 'none',
    }
};

// This is the entire JavaScript content that will be embedded inside the iframe.
const embeddedScript = `
// Helper function to update the body's blur state
function updateBodyBlurState() {
    const mobileNavActive = document.getElementById('mobileNav').classList.contains('active');
    const popupFormOpen = document.getElementById('popupForm').style.display === 'flex';
    const aboutPopupOpen = document.getElementById('aboutPopup').style.display === 'flex';
    const contactPopupOpen = document.getElementById('contactPopup').style.display === 'flex';
    const bookingPopupOpen = document.getElementById('bookingPopup').style.display === 'flex';

    if (mobileNavActive || popupFormOpen || aboutPopupOpen || contactPopupOpen || bookingPopupOpen) {
        document.body.classList.add('menu-open');
    } else {
        document.body.classList.remove('menu-open');
    }
}

// Function to close all popups (visual closing)
function closeAllPopups() {
    const popups = ['popupForm', 'aboutPopup', 'contactPopup', 'bookingPopup'];
    popups.forEach(id => {
        const popup = document.getElementById(id);
        if (popup) {
            popup.style.display = 'none';
        }
    });
    updateBodyBlurState();
}

// Popup toggle functions
function togglePopup() {
    const popup = document.getElementById('popupForm');
    if (popup.style.display === 'flex') {
        popup.style.display = 'none';
    } else {
        closeAllPopups();
        closeMobileMenu();
        popup.style.display = 'flex';
    }
    updateBodyBlurState();
}

function toggleAbout() {
    const popup = document.getElementById('aboutPopup');
    if (popup.style.display === 'flex') {
        popup.style.display = 'none';
    } else {
        closeAllPopups();
        closeMobileMenu();
        popup.style.display = 'flex';
    }
    updateBodyBlurState();
}

function toggleContactPopup() {
    const popup = document.getElementById('contactPopup');
    if (popup.style.display === 'flex') {
        popup.style.display = 'none';
    } else {
        closeAllPopups();
        closeMobileMenu();
        popup.style.display = 'flex';
    }
    updateBodyBlurState();
}

function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    mobileNav.classList.toggle('active');
    updateBodyBlurState();
}

function closeMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    mobileNav.classList.remove('active');
    updateBodyBlurState();
}

function launchProjectType(type) {
    const projectTypeSelect = document.getElementById('projectType');
    if (projectTypeSelect) {
        // Find the option with the matching text and select it
        for (let i = 0; i < projectTypeSelect.options.length; i++) {
            if (projectTypeSelect.options[i].text === type) {
                projectTypeSelect.selectedIndex = i;
                break;
            }
        }
        togglePopup(); // Open the form popup
    }
}

function toggleBookingPopup() {
    const popup = document.getElementById('bookingPopup');
    if (popup.style.display === 'flex') {
        popup.style.display = 'none';
    } else {
        closeAllPopups();
        closeMobileMenu();
        popup.style.display = 'flex';
    }
    updateBodyBlurState();
}


document.addEventListener('DOMContentLoaded', function () {
    // Only initialize flatpickr and tsparticles if the libraries are loaded
    if (typeof flatpickr !== 'undefined') {
        flatpickr("#flatpickrCalendar", {
            inline: true,
            minDate: "today"
        });
    }

    if (typeof tsParticles !== 'undefined') {
        tsParticles.load({
            id: "tsparticles",
            options: {
                background: {
                    color: {
                        value: getComputedStyle(document.documentElement).getPropertyValue('--particles-background').trim(),
                    },
                },
                fpsLimit: 120,
                interactivity: {
                    events: {
                        onClick: {
                            enable: false,
                            mode: "push",
                        },
                        onHover: {
                            enable: false,
                            mode: "repulse",
                        },
                        resize: true,
                    },
                    modes: {
                        push: {
                            quantity: 4,
                        },
                        repulse: {
                            distance: 200,
                            duration: 0.4,
                        },
                    },
                },
                particles: {
                    color: {
                        value: getComputedStyle(document.documentElement).getPropertyValue('--particles-color').trim(),
                    },
                    links: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--particles-links').trim(),
                        distance: 150,
                        enable: true,
                        opacity: 0.5,
                        width: 1,
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outModes: {
                            default: "bounce",
                        },
                        random: false,
                        speed: 1,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 800,
                        },
                        value: 80,
                    },
                    opacity: {
                        value: 0.5,
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: { min: 1, max: 5 },
                    },
                },
                detectRetina: true,
            },
        });
    }
});
`;

// Function to update the iframe with the current form data
function updatePreview() {
    const form = document.querySelector('form');
    const formData = new FormData(form);
    const colorScheme = formData.get('COLOR_SCHEME');
    let htmlContent = indexHtmlTemplate;

    // Replace all placeholders in the template with form data
    formData.forEach((value, key) => {
        const placeholder = new RegExp(`{{${key}}}`, 'g');
        htmlContent = htmlContent.replace(placeholder, value);
    });
    
    // Inject the selected color scheme's CSS variables into a style tag
    let colorSchemeCss = '<style>:root {';
    const scheme = colorSchemes[colorScheme];
    if (scheme) {
        for (const [key, value] of Object.entries(scheme)) {
            colorSchemeCss += `${key}: ${value};`;
        }
    } else {
         // Default to an empty style if no preset is selected, so the original CSS variables apply
        colorSchemeCss += '';
    }
    colorSchemeCss += '}</style>';

    // Remove the script.js placeholder from the template to avoid local file dependency
    const finalHtml = htmlContent.replace(
        '</head>',
        `${colorSchemeCss}</head><body><script>${embeddedScript}</script>`
    );

    const iframe = document.getElementById('previewIframe');
    if (iframe) {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        iframeDoc.open();
        iframeDoc.write(finalHtml);
        iframeDoc.close();
    }
}

// Event listeners for JSON
function generateJsonConfig(event) {
    event.preventDefault(); 
    const form = document.querySelector('form');
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'website_config.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) {
        return;
    }
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const config = JSON.parse(e.target.result);
            const form = document.querySelector('form');
            for (const key in config) {
                if (config.hasOwnProperty(key)) {
                    const input = form.querySelector(`[name="${key}"]`);
                    if (input) {
                        input.value = config[key];
                    }
                }
            }
            alert('Configuration loaded successfully!');
            updatePreview();
        } catch (error) {
            alert('Error parsing JSON file. Please ensure it is a valid JSON file.');
            console.error('Error parsing JSON:', error);
        }
    };
    reader.readAsText(file);
}

// Event listeners to update the preview on any form change
const form = document.querySelector('form');
if (form) {
    form.addEventListener('input', updatePreview);
    form.addEventListener('change', updatePreview);
    
    window.addEventListener('load', updatePreview);
}
