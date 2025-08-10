// script.js
const indexHtmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
    <title>{{WEBSITE_TITLE}}</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet"/>
    <link href="./style.css" rel="stylesheet"/>
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
        }
        updateBodyBlurState();
    }

    function createPerlinNoiseBackground() {
        const canvas = document.getElementById('perlin-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let width, height;

        // Perlin noise generation
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
        
        // Simple Perlin Noise implementation
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
                let X = Math.floor(x) & 255,
                    Y = Math.floor(y) & 255,
                    Z = Math.floor(z) & 255;
                x -= Math.floor(x);
                y -= Math.floor(y);
                z -= Math.floor(z);
                let u = this.fade(x),
                    v = this.fade(y),
                    w = this.fade(z);
                let A = this.perm[X] + Y,
                    AA = this.perm[A] + Z,
                    AB = this.perm[A + 1] + Z;
                let B = this.perm[X + 1] + Y,
                    BA = this.perm[B] + Z,
                    BB = this.perm[B + 1] + Z;
                return this.lerp(w,
                    this.lerp(v,
                        this.lerp(u,
                            this.grad(this.perm[AA], x, y, z),
                            this.grad(this.perm[BA], x - 1, y, z)),
                        this.lerp(u,
                            this.grad(this.perm[AB], x, y - 1, z),
                            this.grad(this.perm[BB], x - 1, y - 1, z))),
                    this.lerp(v,
                        this.lerp(u,
                            this.grad(this.perm[AA + 1], x, y, z - 1),
                            this.grad(this.perm[BA + 1], x - 1, y, z - 1)),
                        this.lerp(u,
                            this.grad(this.perm[AB + 1], x, y - 1, z - 1),
                            this.grad(this.perm[BB + 1], x - 1, y - 1, z - 1))));
            };
        }
        
        window.addEventListener('resize', resize);
        resize();
        render();
    }


    function updateBackground(backgroundType, colorScheme) {
        const body = document.body;
        const particlesContainer = document.getElementById('tsparticles');
        const animatedGradientContainer = document.querySelector('.animated-gradient-background');
        const perlinCanvas = document.getElementById('perlin-canvas');
        
        // Hide all background elements first
        if (particlesContainer) particlesContainer.style.display = 'none';
        if (animatedGradientContainer) animatedGradientContainer.style.display = 'none';
        if (perlinCanvas) perlinCanvas.style.display = 'none';
        body.style.backgroundImage = 'none';
        body.style.backgroundColor = 'transparent';

        // Apply theme-specific background color to the body if not using an animated background
        if (colorScheme && backgroundType !== 'particles' && backgroundType !== 'gradient' && backgroundType !== 'perlin') {
            body.style.backgroundColor = colorScheme['--background-color'];
        }

        // Show the selected background
        if (backgroundType === 'particles') {
            if (particlesContainer && typeof tsParticles !== 'undefined') {
                particlesContainer.style.display = 'block';
                tsParticles.load({
                    id: "tsparticles",
                    options: {
                        background: {
                            color: {
                                value: colorScheme['--particles-background'] || '#0f2027',
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
                                value: colorScheme['--particles-color'] || '#ffffff',
                            },
                            links: {
                                color: colorScheme['--particles-links'] || '#2c5364',
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
        } else if (backgroundType === 'gradient') {
            if (animatedGradientContainer) {
                animatedGradientContainer.style.display = 'block';
            }
        } else if (backgroundType === 'perlin') {
            if (perlinCanvas) {
                perlinCanvas.style.display = 'block';
                createPerlinNoiseBackground();
            }
        } else if (backgroundType === 'image') {
            const imageUrl = document.body.getAttribute('data-background-image-url');
            if (imageUrl) {
                body.style.backgroundImage = 'url(' + imageUrl + ')';
            }
        }
    }


    document.addEventListener('DOMContentLoaded', function () {
        if (typeof flatpickr !== 'undefined') {
            flatpickr("#flatpickrCalendar", {
                inline: true,
                minDate: "today"
            });
        }
    });

    window.applyConfiguration = function(config) {
        const root = document.documentElement;
        if (config.colorScheme) {
            for (const [key, value] of Object.entries(config.colorScheme)) {
                root.style.setProperty(key, value);
            }
        }
        // Set the background image URL on the body element for retrieval in updateBackground
        if (config.backgroundImageUrl) {
            document.body.setAttribute('data-background-image-url', config.backgroundImageUrl);
        } else {
            document.body.removeAttribute('data-background-image-url');
        }
        updateBackground(config.backgroundType, config.colorScheme);
    }
`;


// Function to update the iframe with the current form data
function updatePreview() {
    const form = document.getElementById('builderForm');
    const formData = new FormData(form);
    const backgroundType = formData.get('BACKGROUND_TYPE');
    const colorSchemeName = formData.get('COLOR_SCHEME');
    const selectedColorScheme = colorSchemes[colorSchemeName];
    const aiAssistantEnabled = document.getElementById('aiAssistantToggle').checked;
    const mapEnabled = document.getElementById('mapToggle').checked;
    const servicesEnabled = document.getElementById('servicesToggle').checked;
    const testimonialsEnabled = document.getElementById('testimonialsToggle').checked;
    const socialMediaEnabled = document.getElementById('socialMediaToggle').checked;
    
    let htmlContent = indexHtmlTemplate;

    // Conditionally include the AI Assistant section
    if (aiAssistantEnabled) {
        htmlContent = htmlContent.replace('{{AI_ASSISTANT_SECTION}}', aiAssistantSection);
    } else {
        htmlContent = htmlContent.replace('{{AI_ASSISTANT_SECTION}}', '');
    }

    // Conditionally include the Map section
    if (mapEnabled) {
        htmlContent = htmlContent.replace('{{MAP_SECTION}}', mapSection);
    } else {
        htmlContent = htmlContent.replace('{{MAP_SECTION}}', '');
    }

    // Conditionally include the Services section
    if (servicesEnabled) {
        htmlContent = htmlContent.replace('{{SERVICES_SECTION}}', servicesSection);
    } else {
        htmlContent = htmlContent.replace('{{SERVICES_SECTION}}', '');
    }

    // Conditionally include the Testimonials section
    if (testimonialsEnabled) {
        htmlContent = htmlContent.replace('{{TESTIMONIALS_SECTION}}', testimonialsSection);
    } else {
        htmlContent = htmlContent.replace('{{TESTIMONIALS_SECTION}}', '');
    }
    
    // Conditionally include the Social Media section and populate links
    if (socialMediaEnabled) {
        let finalSocialMediaSection = socialMediaSection;
        const facebookEnabled = document.getElementById('facebookToggle').checked;
        const instagramEnabled = document.getElementById('instagramToggle').checked;
        const tiktokEnabled = document.getElementById('tiktokToggle').checked;
        
        let facebookLink = '';
        if (facebookEnabled && document.getElementById('FACEBOOK_USERNAME').value) {
            const username = document.getElementById('FACEBOOK_USERNAME').value;
            facebookLink = `<a href="https://facebook.com/${username}" target="_blank"><img src="images/facebook.svg" alt="Facebook"/></a>`;
        }
        finalSocialMediaSection = finalSocialMediaSection.replace('{{FACEBOOK_LINK}}', facebookLink);

        let instagramLink = '';
        if (instagramEnabled && document.getElementById('INSTAGRAM_USERNAME').value) {
            const username = document.getElementById('INSTAGRAM_USERNAME').value;
            instagramLink = `<a href="https://instagram.com/${username}" target="_blank"><img src="images/instagram.svg" alt="Instagram"/></a>`;
        }
        finalSocialMediaSection = finalSocialMediaSection.replace('{{INSTAGRAM_LINK}}', instagramLink);

        let tiktokLink = '';
        if (tiktokEnabled && document.getElementById('TIKTOK_USERNAME').value) {
            const username = document.getElementById('TIKTOK_USERNAME').value;
            tiktokLink = `<a href="https://tiktok.com/${username.replace('@', '')}" target="_blank"><img src="images/tiktok.svg" alt="TikTok"/></a>`;
        }
        finalSocialMediaSection = finalSocialMediaSection.replace('{{TIKTOK_LINK}}', tiktokLink);

        htmlContent = htmlContent.replace('{{SOCIAL_MEDIA_SECTION}}', finalSocialMediaSection);
    } else {
        htmlContent = htmlContent.replace('{{SOCIAL_MEDIA_SECTION}}', '');
    }

    // Use the global variables for paths, which are updated by the file inputs
    formData.set('LOGO_IMAGE_PATH', logoImagePath);
    formData.set('BACKGROUND_IMAGE_URL', backgroundImageURL);
    
    // Add default values for sections if they are not enabled
    if (!servicesEnabled) {
        htmlContent = htmlContent.replace(/{{SERVICE_1_TITLE}}/g, '');
        htmlContent = htmlContent.replace(/{{SERVICE_1_DESCRIPTION}}/g, '');
        htmlContent = htmlContent.replace(/{{SERVICE_2_TITLE}}/g, '');
        htmlContent = htmlContent.replace(/{{SERVICE_2_DESCRIPTION}}/g, '');
        htmlContent = htmlContent.replace(/{{SERVICE_3_TITLE}}/g, '');
        htmlContent = htmlContent.replace(/{{SERVICE_3_DESCRIPTION}}/g, '');
        htmlContent = htmlContent.replace(/{{SERVICES_SECTION_HEADING}}/g, '');
    }
    
    if (!testimonialsEnabled) {
        htmlContent = htmlContent.replace(/{{TESTIMONIAL_1_QUOTE}}/g, '');
        htmlContent = htmlContent.replace(/{{TESTIMONIAL_1_CLIENT_INFO}}/g, '');
        htmlContent = htmlContent.replace(/{{TESTIMONIAL_2_QUOTE}}/g, '');
        htmlContent = htmlContent.replace(/{{TESTIMONIAL_2_CLIENT_INFO}}/g, '');
        htmlContent = htmlContent.replace(/{{TESTIMONIAL_3_QUOTE}}/g, '');
        htmlContent = htmlContent.replace(/{{TESTIMONIAL_3_CLIENT_INFO}}/g, '');
        htmlContent = htmlContent.replace(/{{TESTIMONIALS_SECTION_HEADING}}/g, '');
    }
    
    // Replace all placeholders in the template with form data
    formData.forEach((value, key) => {
        const placeholder = new RegExp(`{{${key}}}`, 'g');
        htmlContent = htmlContent.replace(placeholder, value);
    });
    
const iframe = document.getElementById('previewIframe');
    if (iframe) {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        iframeDoc.open();
        iframeDoc.write(htmlContent);
        
        const script = iframeDoc.createElement('script');
        script.textContent = embeddedScript;
        iframeDoc.body.appendChild(script);
        
        iframeDoc.close();

        iframe.contentWindow.onload = () => {
             if (iframe.contentWindow.applyConfiguration) {
                 iframe.contentWindow.applyConfiguration({
                     colorScheme: selectedColorScheme,
                     backgroundType: backgroundType,
                     backgroundImageUrl: backgroundImageURL // Pass the image URL
                 });
             }
        };
    }
}

function toggleAiAssistantOptions() {
    const aiAssistantOptions = document.getElementById('aiAssistantOptions');
    const aiAssistantToggle = document.getElementById('aiAssistantToggle');
    if (aiAssistantOptions && aiAssistantToggle) {
        aiAssistantOptions.style.display = aiAssistantToggle.checked ? 'block' : 'none';
    }
}

function toggleMapOptions() {
    const mapOptions = document.getElementById('mapOptions');
    const mapToggle = document.getElementById('mapToggle');
    if (mapOptions && mapToggle) {
        mapOptions.style.display = mapToggle.checked ? 'block' : 'none';
    }
}

function toggleServicesOptions() {
    const servicesOptions = document.getElementById('servicesOptions');
    const servicesToggle = document.getElementById('servicesToggle');
    if (servicesOptions && servicesToggle) {
        servicesOptions.style.display = servicesToggle.checked ? 'block' : 'none';
    }
}

function toggleTestimonialsOptions() {
    const testimonialsOptions = document.getElementById('testimonialsOptions');
    const testimonialsToggle = document.getElementById('testimonialsToggle');
    if (testimonialsOptions && testimonialsToggle) {
        testimonialsOptions.style.display = testimonialsToggle.checked ? 'block' : 'none';
    }
}

function toggleSocialMediaOptions() {
    const socialMediaOptions = document.getElementById('socialMediaOptions');
    const socialMediaToggle = document.getElementById('socialMediaToggle');
    if (socialMediaOptions && socialMediaToggle) {
        socialMediaOptions.style.display = socialMediaToggle.checked ? 'block' : 'none';
        // Also ensure individual options are toggled if the main one is checked
        if (socialMediaToggle.checked) {
            toggleFacebookOptions();
            toggleInstagramOptions();
            toggleTiktokOptions();
        }
    } else {
    }
}

function toggleFacebookOptions() {
    const facebookOptions = document.getElementById('facebookOptions');
    const facebookToggle = document.getElementById('facebookToggle');
    if (facebookOptions && facebookToggle) {
        facebookOptions.style.display = facebookToggle.checked ? 'block' : 'none';
    }
}

function toggleInstagramOptions() {
    const instagramOptions = document.getElementById('instagramOptions');
    const instagramToggle = document.getElementById('instagramToggle');
    if (instagramOptions && instagramToggle) {
        instagramOptions.style.display = instagramToggle.checked ? 'block' : 'none';
    }
}

function toggleTiktokOptions() {
    const tiktokOptions = document.getElementById('tiktokOptions');
    const tiktokToggle = document.getElementById('tiktokToggle');
    if (tiktokOptions && tiktokToggle) {
        tiktokOptions.style.display = tiktokToggle.checked ? 'block' : 'none';
    }
}


// Function to handle logo file upload
document.getElementById('logoUpload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            logoImagePath = e.target.result; // Use Data URL for the logo
            updatePreview();
        };
        reader.readAsDataURL(file);
    } else {
        logoImagePath = "images/logo.png"; // Revert to default if no file selected
        updatePreview();
    }
});

// Function to handle background file upload
document.getElementById('backgroundUpload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            backgroundImageURL = e.target.result; // Use Data URL for the background
            document.getElementById('BACKGROUND_IMAGE_URL').value = backgroundImageURL;
            document.getElementById('BACKGROUND_TYPE').value = 'image'; // Automatically switch to image background
            updatePreview();
        };
        reader.readAsDataURL(file);
    } else {
        backgroundImageURL = ""; // Clear if no file selected
        document.getElementById('BACKGROUND_IMAGE_URL').value = "";
        updatePreview();
    }
});


function generateJsonConfig(event) {
    event.preventDefault(); 
    const form = document.getElementById('builderForm');
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Add the toggle states to the config
    data['AI_ASSISTANT_TOGGLE'] = document.getElementById('aiAssistantToggle').checked;
    data['MAP_TOGGLE'] = document.getElementById('mapToggle').checked;
    data['SERVICES_TOGGLE'] = document.getElementById('servicesToggle').checked;
    data['TESTIMONIALS_TOGGLE'] = document.getElementById('testimonialsToggle').checked;
    data['SOCIAL_MEDIA_TOGGLE'] = document.getElementById('socialMediaToggle').checked;
    data['FACEBOOK_TOGGLE'] = document.getElementById('facebookToggle').checked;
    data['INSTAGRAM_TOGGLE'] = document.getElementById('instagramToggle').checked;
    data['TIKTOK_TOGGLE'] = document.getElementById('tiktokToggle').checked;


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
            const form = document.getElementById('builderForm');
            for (const key in config) {
                if (config.hasOwnProperty(key)) {
                    const input = form.querySelector(`[name="${key}"]`);
                    if (input) {
                        if (input.type === 'checkbox') {
                            input.checked = config[key];
                        } else {
                            input.value = config[key];
                        }
                    }
                }
            }
            alert('Configuration loaded successfully!');
            // After loading, update the visibility of the options
            toggleAiAssistantOptions();
            toggleMapOptions();
            toggleServicesOptions();
            toggleTestimonialsOptions();
            toggleSocialMediaOptions();
            toggleFacebookOptions();
            toggleInstagramOptions();
            toggleTiktokOptions();
            updatePreview();
        } catch (error) {
            alert('Error parsing JSON file. Please ensure it is a valid JSON file.');
            console.error('Error parsing JSON:', error);
        }
    };
    reader.readAsText(file);
}

const form = document.getElementById('builderForm');
if (form) {
    form.addEventListener('input', updatePreview);
    document.getElementById('aiAssistantToggle').addEventListener('change', function() {
        toggleAiAssistantOptions();
        updatePreview();
    });
    document.getElementById('mapToggle').addEventListener('change', function() {
        toggleMapOptions();
        updatePreview();
    });
    document.getElementById('servicesToggle').addEventListener('change', function() {
        toggleServicesOptions();
        updatePreview();
    });
    document.getElementById('testimonialsToggle').addEventListener('change', function() {
        toggleTestimonialsOptions();
        updatePreview();
    });
    document.getElementById('socialMediaToggle').addEventListener('change', function() {
        toggleSocialMediaOptions();
        updatePreview();
    });
    document.getElementById('facebookToggle').addEventListener('change', function() {
        toggleFacebookOptions();
        updatePreview();
    });
    document.getElementById('instagramToggle').addEventListener('change', function() {
        toggleInstagramOptions();
        updatePreview();
    });
    document.getElementById('tiktokToggle').addEventListener('change', function() {
        toggleTiktokOptions();
        updatePreview();
    });
    }

window.addEventListener('load', () => {
    // Check ALL section checkboxes by default
    document.querySelectorAll('.section-header input[type="checkbox"]').forEach(cb => { cb.checked = true; });

    // Ensure AI Assistant is checked explicitly (matches your markup)
    const aiCb = document.getElementById('aiAssistantToggle');
    if (aiCb) aiCb.checked = true;

    // Run existing option-togglers so UI reflects checked state
    try { toggleAiAssistantOptions && toggleAiAssistantOptions(); } catch(e) {}
    try { toggleMapOptions && toggleMapOptions(); } catch(e) {}
    try { toggleServicesOptions && toggleServicesOptions(); } catch(e) {}
    try { toggleTestimonialsOptions && toggleTestimonialsOptions(); } catch(e) {}
    try { toggleSocialMediaOptions && toggleSocialMediaOptions(); } catch(e) {}
    try { toggleFacebookOptions && toggleFacebookOptions(); } catch(e) {}
    try { toggleInstagramOptions && toggleInstagramOptions(); } catch(e) {}
    try { toggleTiktokOptions && toggleTiktokOptions(); } catch(e) {}

    // Finally, refresh preview
    try { updatePreview && updatePreview(); } catch(e) {}
});
