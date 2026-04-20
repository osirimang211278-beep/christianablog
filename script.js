// ================================================
// CHRISTIANAH EPISTLES - JavaScript
// ================================================

// Toggle mobile menu
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('open');
}

// Close menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('open');
        document.querySelector('.hamburger').classList.remove('open');
    });
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active nav link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Newsletter form submission
document.querySelector('.newsletter-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const form = this;
    const email = form.querySelector('input[type="email"]').value;
    const submitBtn = form.querySelector('button[type="submit"]');
    const successMsg = document.getElementById('newsletterSuccess');
    
    // Disable button during submission
    submitBtn.disabled = true;
    submitBtn.textContent = 'Subscribing...';
    
    // Submit form data
    fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // Show success message
            form.style.display = 'none';
            successMsg.style.display = 'block';
            
            // Reset after 5 seconds
            setTimeout(() => {
                form.style.display = 'flex';
                successMsg.style.display = 'none';
                form.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = 'Subscribe';
            }, 5000);
        } else {
            throw new Error('Subscription failed');
        }
    })
    .catch(error => {
        alert('Oops! There was a problem with your subscription. Please try again.');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Subscribe';
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animation
document.querySelectorAll('.post-card, .category-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
