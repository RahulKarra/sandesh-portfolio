
document.getElementById('currentYear').textContent = new Date().getFullYear();

function scrollToSection(sectionId) {
const element = document.getElementById(sectionId);
if (element) {
    const offsetTop = element.offsetTop;
    window.scrollTo({
        top: offsetTop - 100, // Subtracting 100px to account for the navbar
        behavior: 'smooth'
    });
}
}

// Dark mode toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Function to toggle theme
    function toggleTheme() {
    document.documentElement.setAttribute('data-theme', 
        document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
    );
    
    // Update toggle button icons
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const toggleBtns = [themeToggle, themeToggleMobile];
    
    toggleBtns.forEach(btn => {
        if (btn) {
            btn.innerHTML = isDark ? 
                '<i class="fas fa-moon text-xl"></i>' : 
                '<i class="fas fa-sun text-xl"></i>';
        }
    });
    
    // Save preference
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}


    // Set initial theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        if (savedTheme === 'dark') {
            [themeToggle, themeToggleMobile].forEach(btn => {
                if (btn) btn.innerHTML = '<i class="fas fa-moon text-xl"></i>';
            });
        }
    } else if (prefersDarkScheme.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
        [themeToggle, themeToggleMobile].forEach(btn => {
            if (btn) btn.innerHTML = '<i class="fas fa-moon text-xl"></i>';
        });
    }
    
    // Add click events
    [themeToggle, themeToggleMobile].forEach(btn => {
        if (btn) btn.addEventListener('click', toggleTheme);
    });
});



    // Replace your existing mobile menu JavaScript with this
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuLinks = mobileMenu.getElementsByTagName('a');
    
    function toggleMenu() {
    const isVisible = mobileMenu.classList.contains('menu-visible');

    if (isVisible) {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('menu-visible');
        document.body.classList.remove('overflow-hidden');
    } else {
        hamburger.classList.add('open');
        mobileMenu.classList.add('menu-visible');
        document.body.classList.add('overflow-hidden');
    }
}

    
    // Hamburger click event
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });
    
    // Close menu when clicking links
    Array.from(menuLinks).forEach(link => {
        link.addEventListener('click', function() {
            toggleMenu();
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileMenu.classList.contains('menu-visible') && 
            !mobileMenu.contains(e.target) && 
            !hamburger.contains(e.target)) {
            toggleMenu();
        }
    });
    
    // Prevent menu close when clicking inside
    mobileMenu.addEventListener('click', function(e) {
        e.stopPropagation();
    });
});


// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

// Fade in animations
const fadeElements = document.querySelectorAll('.fade-in');
const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

fadeElements.forEach(element => {
    fadeObserver.observe(element);
});

// Slide from left/right animations
const slideElements = document.querySelectorAll('.slide-from-left, .slide-from-right');
const slideObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            slideObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

slideElements.forEach(element => {
    slideObserver.observe(element);
});

// Active nav link highlighting
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('nav-content');
    if (window.scrollY > 50) {
        navbar.classList.add('nav-transparent');
    } else {
        navbar.classList.remove('nav-transparent');
    }
});

// Video play/pause functionality
document.querySelectorAll('.video-overlay button').forEach(button => {
    button.addEventListener('click', function() {
        const video = this.closest('.video-container').querySelector('video');
        if (video.paused) {
            video.play();
            this.innerHTML = '<i class="fas fa-pause text-xl"></i>';
        } else {
            video.pause();
            this.innerHTML = '<i class="fas fa-play text-xl"></i>';
        }
    });
});

//Drive Video Loader
function loadDriveVideo(wrapper, driveUrl) {
    const container = wrapper.parentElement;
    const iframe = document.createElement('iframe');
    iframe.src = driveUrl;
    iframe.className = 'w-full h-full';
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('allow', 'autoplay');
  
    container.innerHTML = ''; // Remove the thumbnail
    container.appendChild(iframe); // Insert the video
  }
  

  /*

  Utilized FormSubmit https://formsubmit.co/ 
  For Simple yet Effective way of Form submissions to Email

  */
// Handle contact form submission with validation and modal feedback
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const modal = document.getElementById('thankYouModal');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        // Send form via Formsubmit
        fetch('https://formsubmit.co/sandeshvg7@gmail.com', {
            method: 'POST',
            body: new FormData(form),
        })
        .then(response => {
            if (response.ok) {
                form.reset();
                modal.classList.remove('hidden');   
                modal.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
            } 
            else {
                alert('Failed to send message. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was a problem sending your message.');
        });
    });
});

function closeModal() {
    document.getElementById('thankYouModal').classList.add('hidden');
}
