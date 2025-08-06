// script.js
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
</head>
<body>
    <div id="colorSchemeStyleTag"></div>
    <div id="tsparticles" style="display: none;"></div>
    <div class="animated-gradient-background" style="display: none;"></div>
    <canvas id="perlin-canvas" style="display: none;"></canvas>

    <header>
        <div class="logo">
            <a class="logo-link" href="#top" onclick="closeAllPopups(); closeMobileMenu()">
                <img alt="Logo" class="header-logo" src="{{LOGO_IMAGE_PATH}}"/>
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
            <button class="cta-button header-cta" onclick="toggleBookingPopup()">Book a Consultation</button>
        </div>
    </header>

    <div class="mobile-nav" id="mobileNav">
        <a href="#top" onclick="closeAllPopups(); closeMobileMenu()">Home</a>
        <a href="javascript:void(0);" onclick="toggleAbout(); closeMobileMenu()">About</a>
        <a href="#services" onclick="closeAllPopups(); closeMobileMenu()">Services</a>
        <a href="javascript:void(0);" onclick="toggleContactPopup(); closeMobileMenu()">Contact</a>
        <button class="cta-button" onclick="toggleBookingPopup(); closeMobileMenu()">Book a Consultation</button>
    </div>

    <div id="mainContent">
        <section class="hero">
            <div class="hero-text">
                <h1>{{HERO_HEADING}}</h1>
                <p>{{HERO_PARAGRAPH}}</p>
                <button class="cta-button" onclick="toggleBookingPopup()">📅 {{HERO_CTA_BUTTON_TEXT}}</button>
            </div>
        </section>
        
        {{AI_ASSISTANT_SECTION}}
        {{MAP_SECTION}}
        {{SERVICES_SECTION}}
        {{TESTIMONIALS_SECTION}}
        {{SOCIAL_MEDIA_SECTION}}

        <footer>
            <p>© 2024 {{WEBSITE_TITLE}}. All rights reserved.</p>
        </footer>
    </div>

    <div class="popup-overlay" id="popupForm" onclick="if (event.target === this) togglePopup()">
        <div class="popup-card">
            <button class="close-button" onclick="togglePopup()">✖</button>
            <h2 id="popupTitle">Get a Quote</h2>
            <form>
                <input placeholder="Your Name" required="" type="text"/>
                <input placeholder="Your Email" required="" type="email"/>
                <select id="projectType" required="">
                    <option value="">Select a Service</option>
                    <option value="Custom Software Development">Custom Software Development</option>
                    <option value="Embedded Systems & IoT">Embedded Systems & IoT</option>
                    <option value="AI & Data Analytics">AI & Data Analytics</option>
                    <option value="Cloud Solutions & DevOps">Cloud Solutions & DevOps</option>
                    <option value="Cybersecurity & Compliance">Cybersecurity & Compliance</option>
                    <option value="Tech Strategy & Consulting">Tech Strategy & Consulting</option>
                </select>
                <textarea placeholder="Describe your project" required=""></textarea>
                <button class="cta-button" type="submit">Submit</button>
            </form>
        </div>
    </div>

    <div class="popup-overlay" id="aboutPopup" onclick="if (event.target === this) toggleAbout()">
        <div class="popup-card">
            <button class="close-button" onclick="toggleAbout()">✖</button>
            <h2>About Us</h2>
            <p>We are a team of passionate technologists dedicated to building innovative solutions that solve real-world problems. With expertise in software development, AI, and IoT, we help businesses of all sizes achieve their goals.</p>
        </div>
    </div>

    <div class="popup-overlay" id="contactPopup" onclick="if (event.target === this) toggleContactPopup()">
        <div class="popup-card">
            <button class="close-button" onclick="toggleContactPopup()">✖</button>
            <h2>Contact Us</h2>
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
    
    <script src="https://cdn.jsdelivr.net/npm/tsparticles@2.11.1/tsparticles.bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
</body>
</html>
`;

// AI Assistant Section HTML
const aiAssistantSection = `
<section class="chatbot-section">
    <h2>{{AI_ASSISTANT_HEADING}}</h2>
    <div class="chatbot-box">
        <p>{{AI_ASSISTANT_PARAGRAPH}}</p>
        <input type="text" placeholder="Ask a question..." />
        <button class="cta-button">Send</button>
    </div>
</section>
`;

// Map and Waze Section HTML
const mapSection = `
<section class="map-section">
    <h2>{{MAP_HEADING}}</h2>
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
`;

// Services Section HTML
const servicesSection = `
<section class="services-section" id="services">
    <h2>{{SERVICES_SECTION_HEADING}}</h2>
    <div class="services-grid">
        <div class="service-item" onclick="launchProjectType('Custom Software Development')" style="cursor: pointer;">
            <img alt="Service 1 Icon" class="service-icon" src="images/code.svg"/>
            <h3>{{SERVICE_1_TITLE}}</h3>
            <p>{{SERVICE_1_DESCRIPTION}}</p>
        </div>
        <div class="service-item" onclick="launchProjectType('Embedded Systems & IoT')" style="cursor: pointer;">
            <img alt="Service 2 Icon" class="service-icon" src="images/chip.svg"/>
            <h3>{{SERVICE_2_TITLE}}</h3>
            <p>{{SERVICE_2_DESCRIPTION}}</p>
        </div>
        <div class="service-item" onclick="launchProjectType('AI & Data Analytics')" style="cursor: pointer;">
            <img alt="Service 3 Icon" class="service-icon" src="images/brain.svg"/>
            <h3>{{SERVICE_3_TITLE}}</h3>
            <p>{{SERVICE_3_DESCRIPTION}}</p>
        </div>
    </div>
    <button class="cta-button secondary-cta">Explore Services</button>
</section>
`;

// Testimonials Section HTML
const testimonialsSection = `
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
`;

// Social Media Section HTML
const socialMediaSection = `
<section class="social-section">
    <h2>📱 Follow Us</h2>
    <div class="social-icons">
        {{FACEBOOK_LINK}}
        {{INSTAGRAM_LINK}}
        {{TIKTOK_LINK}}
    </div>
</section>
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
        '--background-image': 'none',
        '--background-image-overlay': 'rgba(0,0,0,0.5)',
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

let logoImagePath = "images/logo.png"; // Default logo
let backgroundImageURL = ""; // Default background image is empty

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
            initializeCalendar();
        }
        updateBodyBlurState();
    }

    function initializeCalendar() {
        flatpickr("#flatpickrCalendar", {
            inline: true,
            minDate: "today",
            dateFormat: "Y-m-d",
        });
    }

    // This is the new function to handle dropdowns
    function setupDropdowns() {
        const sectionHeaders = document.querySelectorAll('.section-header');
        sectionHeaders.forEach(header => {
            const toggleButton = header.querySelector('.section-toggle');
            if (toggleButton) {
                toggleButton.addEventListener('click', (event) => {
                    event.preventDefault(); // This prevents the form submission
                    // Find the closest parent with the class 'section-container' and toggle the 'expanded' class
                    const sectionContainer = event.target.closest('.section-container');
                    if (sectionContainer) {
                        sectionContainer.classList.toggle('expanded');
                    }
                });
            }
        });
    }

    // Ensure this function is called when the DOM is fully loaded
    document.addEventListener('DOMContentLoaded', setupDropdowns);
    
    // Perlin Noise implementation
    function Perlin() {
        this.perm = new Uint8Array(512);
        this.grad = new Float32Array(512);
        this.seed = () => {
            const p = new Uint8Array(256);
            for (let i = 0; i < 256; i++) p[i] = i;
            for (let i = 0; i < 255; i++) {
                const j = Math.floor(Math.random() * (256 - i)) + i;
                [p[i], p[j]] = [p[j], p[i]];
            }
            for (let i = 0; i < 512; i++) {
                this.perm[i] = p[i & 255];
                this.grad[i] = Math.random() * 2 - 1;
            }
        };
        this.fade = t => t * t * t * (t * (t * 6 - 15) + 10);
        this.lerp = (t, a, b) => a + t * (b - a);
        this.grad = (hash, x, y, z) => {
            const h = hash & 15;
            const u = h < 8 ? x : y;
            const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
            return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
        };
        this.noise = (x, y, z) => {
            const X = Math.floor(x) & 255;
            const Y = Math.floor(y) & 255;
            const Z = Math.floor(z) & 255;
            x -= Math.floor(x);
            y -= Math.floor(y);
            z -= Math.floor(z);
            const u = this.fade(x);
            const v = this.fade(y);
            const w = this.fade(z);
            const p = this.perm;
            const n000 = this.grad(p[X + p[Y + p[Z]]], x, y, z);
            const n100 = this.grad(p[X + 1 + p[Y + p[Z]]], x - 1, y, z);
            const n010 = this.grad(p[X + p[Y + 1 + p[Z]]], x, y - 1, z);
            const n110 = this.grad(p[X + 1 + p[Y + 1 + p[Z]]], x - 1, y - 1, z);
            const n001 = this.grad(p[X + p[Y + p[Z + 1]]], x, y, z - 1);
            const n101 = this.grad(p[X + 1 + p[Y + p[Z + 1]]], x - 1, y, z - 1);
            const n011 = this.grad(p[X + p[Y + 1 + p[Z + 1]]], x, y - 1, z - 1);
            const n111 = this.grad(p[X + 1 + p[Y + 1 + p[Z + 1]]], x - 1, y - 1, z - 1);
            const nx0 = this.lerp(u, n000, n100);
            const nx1 = this.lerp(u, n010, n110);
            const ny0 = this.lerp(v, nx0, nx1);
            const ny1 = this.lerp(v, this.lerp(u, n001, n101), this.lerp(u, n011, n111));
            return this.lerp(w, ny0, ny1);
        };
    }
    
    function createPerlinNoiseBackground() {
        const canvas = document.getElementById('perlin-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let width, height;

        const perlin = new Perlin();
        perlin.seed();

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }

        function render() {
            const imageData = ctx.createImageData(width, height);
            const data = imageData.data;
            const time = Date.now() * 0.0001;

            for (let x = 0; x < width; x++) {
                for (let y = 0; y < height; y++) {
                    const value = perlin.noise(x * 0.01, y * 0.01, time);
                    const colorValue = (value + 1) * 0.5 * 255;
                    const index = (x + y * width) * 4;
                    data[index] = colorValue;
                    data[index + 1] = colorValue;
                    data[index + 2] = colorValue;
                    data[index + 3] = 255;
                }
            }
            ctx.putImageData(imageData, 0, 0);
            requestAnimationFrame(render);
        }

        resize();
        window.addEventListener('resize', resize);
        render();
    }
    
    const form = document.getElementById('builderForm');
    const previewIframe = document.querySelector('.preview-pane iframe');
    const logoUpload = document.getElementById('logoUpload');
    const backgroundUpload = document.getElementById('backgroundUpload');
    const builderForm = document.getElementById('builderForm');

    // Add this to prevent form submission
    builderForm.addEventListener('submit', (e) => {
        e.preventDefault();
    });

    const fileReaders = {};

    function handleFile(input, variableName, updateFunction) {
        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            // Revoke previous object URL if it exists
            if (fileReaders[variableName] && fileReaders[variableName].url) {
                URL.revokeObjectURL(fileReaders[variableName].url);
            }

            // Create a new URL for the selected file
            const objectUrl = URL.createObjectURL(file);
            
            // Store the new URL
            fileReaders[variableName] = { url: objectUrl, file: file };
            
            // Update the variable and the preview
            updateFunction(objectUrl);
            updatePreview();
        });
    }

    handleFile(logoUpload, 'logoImagePath', (url) => {
        logoImagePath = url;
    });

    handleFile(backgroundUpload, 'backgroundImageURL', (url) => {
        backgroundImageURL = url;
    });

    function updatePreview() {
        const formData = new FormData(builderForm);
        const formObject = Object.fromEntries(formData.entries());

        // Override form data with file URLs if files were uploaded
        if (fileReaders.logoImagePath) {
            formObject['LOGO_IMAGE_PATH'] = fileReaders.logoImagePath.url;
        } else {
            // If no new file, use the default from the hidden input
            formObject['LOGO_IMAGE_PATH'] = document.getElementById('LOGO_IMAGE_PATH').value;
        }

        if (fileReaders.backgroundImageURL) {
            formObject['BACKGROUND_IMAGE_URL'] = fileReaders.backgroundImageURL.url;
        } else {
            formObject['BACKGROUND_IMAGE_URL'] = document.getElementById('BACKGROUND_IMAGE_URL').value;
        }

        let tempHtml = indexHtmlTemplate;

        // Apply theme color variables
        const selectedColorScheme = colorSchemes[formObject.COLOR_SCHEME];
        let colorSchemeCss = '';
        if (selectedColorScheme) {
            for (const [key, value] of Object.entries(selectedColorScheme)) {
                colorSchemeCss += `${key}: \${value};`;
            }
        }
        
        // Handle AI Assistant Section
        let aiAssistantHtml = '';
        if (formObject.AI_ASSISTANT_TOGGLE) {
            aiAssistantHtml = aiAssistantSection;
        }

        // Handle Map Section
        let mapHtml = '';
        if (formObject.MAP_TOGGLE) {
            mapHtml = mapSection;
        }

        // Handle Services Section
        let servicesHtml = '';
        if (formObject.SERVICES_TOGGLE) {
            servicesHtml = servicesSection;
        }

        // Handle Testimonials Section
        let testimonialsHtml = '';
        if (formObject.TESTIMONIALS_TOGGLE) {
            testimonialsHtml = testimonialsSection;
        }
        
        // Handle Social Media Links
        let socialMediaLinks = '';
        if (formObject.SOCIAL_MEDIA_TOGGLE) {
            let tempLinks = '';
            if (formObject.FACEBOOK_URL) {
                tempLinks += `<a href="\${formObject.FACEBOOK_URL}" target="_blank">
                    <img alt="Facebook" src="images/facebook.svg" class="social-icon">
                </a>`;
            }
            if (formObject.INSTAGRAM_URL) {
                tempLinks += `<a href="\${formObject.INSTAGRAM_URL}" target="_blank">
                    <img alt="Instagram" src="images/instagram.svg" class="social-icon">
                </a>`;
            }
            if (formObject.TIKTOK_URL) {
                tempLinks += `<a href="\${formObject.TIKTOK_URL}" target="_blank">
                    <img alt="TikTok" src="images/tiktok.svg" class="social-icon">
                </a>`;
            }
            socialMediaHtml = socialMediaSection.replace('{{FACEBOOK_LINK}}{{INSTAGRAM_LINK}}{{TIKTOK_LINK}}', tempLinks);
        } else {
            socialMediaHtml = '';
        }

        // Replace placeholders with form values
        for (const key in formObject) {
            if (formObject.hasOwnProperty(key)) {
                const regex = new RegExp(`{{${key}}}`, 'g');
                tempHtml = tempHtml.replace(regex, formObject[key]);
            }
        }
        
        // Replace sections based on toggles
        tempHtml = tempHtml.replace('{{AI_ASSISTANT_SECTION}}', aiAssistantHtml);
        tempHtml = tempHtml.replace('{{MAP_SECTION}}', mapHtml);
        tempHtml = tempHtml.replace('{{SERVICES_SECTION}}', servicesHtml);
        tempHtml = tempHtml.replace('{{TESTIMONIALS_SECTION}}', testimonialsHtml);
        tempHtml = tempHtml.replace('{{SOCIAL_MEDIA_SECTION}}', socialMediaHtml);

        const iframeDocument = previewIframe.contentDocument;
        if (iframeDocument) {
            iframeDocument.open();
            iframeDocument.write(tempHtml);
            iframeDocument.close();

            // After the iframe content is loaded, apply styles and scripts
            previewIframe.onload = () => {
                const innerDoc = previewIframe.contentDocument;

                // Create and apply style for color scheme
                const colorSchemeStyleTag = innerDoc.getElementById('colorSchemeStyleTag');
                if (colorSchemeStyleTag) {
                    colorSchemeStyleTag.innerHTML = `<style> :root { \${colorSchemeCss} } </style>`;
                }

                // Call the setupDropdowns function inside the iframe
                const scriptElement = innerDoc.createElement('script');
                scriptElement.text = embeddedScript;
                innerDoc.head.appendChild(scriptElement);
                
                // Initialize the correct background based on the selection
                const backgroundType = formObject.BACKGROUND_TYPE;
                const tsparticles = innerDoc.getElementById('tsparticles');
                const animatedGradient = innerDoc.querySelector('.animated-gradient-background');
                const perlinCanvas = innerDoc.getElementById('perlin-canvas');
                const body = innerDoc.body;
                
                // Reset all backgrounds first
                if (tsparticles) tsparticles.style.display = 'none';
                if (animatedGradient) animatedGradient.style.display = 'none';
                if (perlinCanvas) perlinCanvas.style.display = 'none';
                body.style.backgroundImage = 'none';
                
                if (backgroundType === 'particles') {
                    if (tsparticles) tsparticles.style.display = 'block';
                    // Load particles.js
                    if (window.tsParticles) {
                        window.tsParticles.load('tsparticles', {
                            particles: {
                                number: { value: 80, density: { enable: true, value_area: 800 } },
                                color: { value: selectedColorScheme['--particles-color'] },
                                shape: { type: 'circle', stroke: { width: 0, color: '#000000' }, polygon: { nb_sides: 5 } },
                                opacity: { value: 0.5, random: false, anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false } },
                                size: { value: 3, random: true, anim: { enable: false, speed: 40, size_min: 0.1, sync: false } },
                                line_linked: { enable: true, distance: 150, color: selectedColorScheme['--particles-links'], opacity: 0.4, width: 1 },
                                move: { enable: true, speed: 6, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false, attract: { enable: false, rotateX: 600, rotateY: 1200 } }
                            },
                            interactivity: {
                                detect_on: 'canvas',
                                events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' }, resize: true },
                                modes: { grab: { distance: 400, line_linked: { opacity: 1 } }, bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 }, repulse: { distance: 200, duration: 0.4 }, push: { particles_nb: 4 }, remove: { particles_nb: 2 } }
                            },
                            retina_detect: true,
                            background: { color: selectedColorScheme['--particles-background'] }
                        });
                    }
                } else if (backgroundType === 'gradient') {
                    if (animatedGradient) animatedGradient.style.display = 'block';
                } else if (backgroundType === 'perlin') {
                    if (perlinCanvas) {
                        perlinCanvas.style.display = 'block';
                        // Perlin noise is handled by the embedded script
                        createPerlinNoiseBackground();
                    }
                } else if (backgroundType === 'image' && formObject.BACKGROUND_IMAGE_URL) {
                    body.style.backgroundImage = `url('\${formObject.BACKGROUND_IMAGE_URL}')`;
                }
            };
        }
    }
    
    builderForm.addEventListener('change', updatePreview);
    updatePreview();
    
    // Add this to prevent form submission on all button clicks
    document.querySelectorAll('.builder-form button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
        });
    });
`;
